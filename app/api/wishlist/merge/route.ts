import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../lib/auth';
import { supabaseAdmin } from '../../../../lib/supabaseClient';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { guestItems }: { guestItems: any[] } = await request.json();

    if (!Array.isArray(guestItems)) {
      return NextResponse.json({ error: 'Invalid guest items' }, { status: 400 });
    }

    // Insert guest items into user's wishlist, ignoring duplicates
    const itemsToInsert = guestItems.map((item: any) => ({
      user_id: session.user.id,
      item_id: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      location: item.location,
    }));

    const { data, error } = await supabaseAdmin
      .from('wishlist_items')
      .upsert(itemsToInsert, {
        onConflict: 'user_id,item_id',
        ignoreDuplicates: true
      })
      .select();

    if (error) {
      console.error('Error merging wishlist:', error);
      return NextResponse.json({ error: 'Failed to merge wishlist' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Wishlist merged successfully', data });
  } catch (error) {
    console.error('Error in POST /api/wishlist/merge:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}