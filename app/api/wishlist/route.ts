import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../lib/auth';
import { supabaseAdmin } from '../../../lib/supabaseClient';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabaseAdmin
      .from('wishlist_items')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching wishlist:', error);
      return NextResponse.json({ error: 'Failed to fetch wishlist' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in GET /api/wishlist:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { itemId, name, image, price, location } = await request.json();

    if (!itemId || !name || !image) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('wishlist_items')
      .insert({
        user_id: session.user.id,
        item_id: itemId,
        name,
        image,
        price,
        location,
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding to wishlist:', error);
      return NextResponse.json({ error: 'Failed to add item to wishlist' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in POST /api/wishlist:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const itemId = searchParams.get('itemId');

    if (itemId) {
      // Delete specific item
      const { error } = await supabaseAdmin
        .from('wishlist_items')
        .delete()
        .eq('user_id', session.user.id)
        .eq('item_id', itemId);

      if (error) {
        console.error('Error removing from wishlist:', error);
        return NextResponse.json({ error: 'Failed to remove item from wishlist' }, { status: 500 });
      }

      return NextResponse.json({ message: 'Item removed from wishlist' });
    } else {
      // Clear entire wishlist
      const { error } = await supabaseAdmin
        .from('wishlist_items')
        .delete()
        .eq('user_id', session.user.id);

      if (error) {
        console.error('Error clearing wishlist:', error);
        return NextResponse.json({ error: 'Failed to clear wishlist' }, { status: 500 });
      }

      return NextResponse.json({ message: 'Wishlist cleared' });
    }
  } catch (error) {
    console.error('Error in DELETE /api/wishlist:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}