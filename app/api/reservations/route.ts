import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../lib/auth';
import { supabaseAdmin } from '../../../lib/supabaseClient';
import { z } from 'zod';

// Validation schema for reservation creation
const createReservationSchema = z.object({
  destinationId: z.string().min(1, 'Destination ID is required'),
  destinationName: z.string().min(1, 'Destination name is required'),
  destinationImage: z.string().optional(),
  checkInDate: z.string().refine((date) => !isNaN(Date.parse(date)), 'Invalid check-in date'),
  checkOutDate: z.string().refine((date) => !isNaN(Date.parse(date)), 'Invalid check-out date'),
  adults: z.number().min(1, 'At least 1 adult required').max(10, 'Maximum 10 adults'),
  children: z.number().min(0).max(10, 'Maximum 10 children').default(0),
  totalPrice: z.number().positive('Total price must be positive'),
  currency: z.string().default('EUR'),
  specialRequests: z.string().optional(),
  guestEmail: z.string().email().optional(),
  guestName: z.string().min(1).optional(),
});

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const destinationId = searchParams.get('destinationId');

    let query = supabaseAdmin
      .from('reservations')
      .select('*')
      .order('created_at', { ascending: false });

    // If user is authenticated, show only their reservations
    if (session?.user?.id) {
      query = query.eq('user_id', session.user.id);
    } else {
      // For guests, we might want to show reservations by email if provided
      const guestEmail = searchParams.get('guestEmail');
      if (guestEmail) {
        query = query.eq('guest_email', guestEmail);
      } else {
        return NextResponse.json({ error: 'Authentication required or guest email needed' }, { status: 401 });
      }
    }

    // Filter by status if provided
    if (status) {
      query = query.eq('status', status);
    }

    // Filter by destination if provided
    if (destinationId) {
      query = query.eq('destination_id', destinationId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching reservations:', error);
      return NextResponse.json({ error: 'Failed to fetch reservations' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in GET /api/reservations:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const body = await request.json();

    // Validate input
    const validationResult = createReservationSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json({
        error: 'Validation failed',
        details: validationResult.error.issues
      }, { status: 400 });
    }

    const {
      destinationId,
      destinationName,
      destinationImage,
      checkInDate,
      checkOutDate,
      adults,
      children,
      totalPrice,
      currency,
      specialRequests,
      guestEmail,
      guestName,
    } = validationResult.data;

    // Check date validity
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkIn < today) {
      return NextResponse.json({ error: 'Check-in date cannot be in the past' }, { status: 400 });
    }

    if (checkOut <= checkIn) {
      return NextResponse.json({ error: 'Check-out date must be after check-in date' }, { status: 400 });
    }

    // Check availability (simplified - in production you'd check against availability table)
    const { data: existingReservations, error: availabilityError } = await supabaseAdmin
      .from('reservations')
      .select('id')
      .eq('destination_id', destinationId)
      .eq('status', 'confirmed')
      .or(`and(check_in_date.lte.${checkOutDate},check_out_date.gt.${checkInDate})`);

    if (availabilityError) {
      console.error('Error checking availability:', availabilityError);
      return NextResponse.json({ error: 'Failed to check availability' }, { status: 500 });
    }

    // For now, assume max 10 people per destination per date range
    if (existingReservations && existingReservations.length >= 10) {
      return NextResponse.json({ error: 'No availability for selected dates' }, { status: 409 });
    }

    // Create reservation
    const reservationData = {
      user_id: session?.user?.id || null,
      guest_email: guestEmail || session?.user?.email || null,
      guest_name: guestName || session?.user?.name || null,
      destination_id: destinationId,
      destination_name: destinationName,
      destination_image: destinationImage,
      check_in_date: checkInDate,
      check_out_date: checkOutDate,
      adults,
      children,
      total_price: totalPrice,
      currency,
      special_requests: specialRequests,
      status: 'pending',
      payment_status: 'pending',
    };

    const { data, error } = await supabaseAdmin
      .from('reservations')
      .insert(reservationData)
      .select()
      .single();

    if (error) {
      console.error('Error creating reservation:', error);
      return NextResponse.json({ error: 'Failed to create reservation' }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/reservations:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const reservationId = searchParams.get('id');

    if (!reservationId) {
      return NextResponse.json({ error: 'Reservation ID required' }, { status: 400 });
    }

    const body = await request.json();
    const { status, specialRequests } = body;

    // Only allow updating certain fields
    const updateData: any = {};
    if (status && ['confirmed', 'cancelled'].includes(status)) {
      updateData.status = status;
      updateData.updated_at = new Date().toISOString();

      if (status === 'confirmed') {
        updateData.confirmed_at = new Date().toISOString();
      } else if (status === 'cancelled') {
        updateData.cancelled_at = new Date().toISOString();
      }
    }

    if (specialRequests !== undefined) {
      updateData.special_requests = specialRequests;
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('reservations')
      .update(updateData)
      .eq('id', reservationId)
      .eq('user_id', session.user.id)
      .eq('status', 'pending') // Only allow updating pending reservations
      .select()
      .single();

    if (error) {
      console.error('Error updating reservation:', error);
      return NextResponse.json({ error: 'Failed to update reservation' }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: 'Reservation not found or cannot be updated' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in PUT /api/reservations:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const reservationId = searchParams.get('id');

    if (!reservationId) {
      return NextResponse.json({ error: 'Reservation ID required' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('reservations')
      .update({
        status: 'cancelled',
        cancelled_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', reservationId)
      .eq('user_id', session.user.id)
      .eq('status', 'pending') // Only allow cancelling pending reservations
      .select()
      .single();

    if (error) {
      console.error('Error cancelling reservation:', error);
      return NextResponse.json({ error: 'Failed to cancel reservation' }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: 'Reservation not found or cannot be cancelled' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Reservation cancelled successfully', data });
  } catch (error) {
    console.error('Error in DELETE /api/reservations:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}