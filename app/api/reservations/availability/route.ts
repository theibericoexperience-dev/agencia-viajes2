import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../../lib/supabaseClient';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const destinationId = searchParams.get('destinationId');
    const checkInDate = searchParams.get('checkInDate');
    const checkOutDate = searchParams.get('checkOutDate');

    if (!destinationId || !checkInDate || !checkOutDate) {
      return NextResponse.json({
        error: 'Missing required parameters: destinationId, checkInDate, checkOutDate'
      }, { status: 400 });
    }

    // Validate dates
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
      return NextResponse.json({ error: 'Invalid date format' }, { status: 400 });
    }

    if (checkOut <= checkIn) {
      return NextResponse.json({ error: 'Check-out date must be after check-in date' }, { status: 400 });
    }

    // Get existing confirmed reservations for this destination and date range
    const { data: reservations, error: reservationsError } = await supabaseAdmin
      .from('reservations')
      .select('adults, children, check_in_date, check_out_date')
      .eq('destination_id', destinationId)
      .eq('status', 'confirmed')
      .or(`and(check_in_date.lte.${checkOutDate},check_out_date.gt.${checkInDate})`);

    if (reservationsError) {
      console.error('Error fetching reservations:', reservationsError);
      return NextResponse.json({ error: 'Failed to check availability' }, { status: 500 });
    }

    // Calculate total people already booked
    const totalBooked = reservations?.reduce((sum, res) => sum + (res.adults || 0) + (res.children || 0), 0) || 0;

    // Assume max capacity of 20 people per destination per date range
    const maxCapacity = 20;
    const availableSpots = Math.max(0, maxCapacity - totalBooked);

    // Get availability data from availability table if it exists
    const { data: availabilityData, error: availabilityError } = await supabaseAdmin
      .from('destination_availability')
      .select('*')
      .eq('destination_id', destinationId)
      .gte('date', checkInDate)
      .lte('date', checkOutDate)
      .eq('is_blocked', false);

    if (availabilityError) {
      console.error('Error fetching availability data:', availabilityError);
    }

    // Calculate availability for each date in the range
    const dateRange = [];
    const currentDate = new Date(checkIn);
    const endDate = new Date(checkOut);

    while (currentDate < endDate) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const dayAvailability = availabilityData?.find(a => a.date === dateStr);

      dateRange.push({
        date: dateStr,
        available: dayAvailability ? dayAvailability.available_slots > 0 : availableSpots > 0,
        slots: dayAvailability?.available_slots || availableSpots,
        priceModifier: dayAvailability?.price_modifier || 1.0,
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Check if the entire date range is available
    const isAvailable = dateRange.every(day => day.available);

    return NextResponse.json({
      destinationId,
      checkInDate,
      checkOutDate,
      isAvailable,
      availableSpots,
      totalBooked,
      maxCapacity,
      dateRange,
    });

  } catch (error) {
    console.error('Error in GET /api/reservations/availability:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}