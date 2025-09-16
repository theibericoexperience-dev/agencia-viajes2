import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    ok: true,
    env: {
      hasSupabaseUrl: !!process.env.SUPABASE_URL,
      hasSupabaseServiceRoleKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      hasNextPublicAnon: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    },
  });
}
