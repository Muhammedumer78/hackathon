import { db } from '@/lib/db/drizzle';
import { NewCartItem, dine_market_cart } from '@/lib/db/schema';
import { sql, eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const base_url = process.env.NEXT_PUBLIC_BASE_URL;
  console.log("line no 9")
  const url = request.nextUrl;

  if (url.searchParams.has('user_id') && url.searchParams.has('session_id')) {
    const user_id = url.searchParams.get('user_id') as string;
    console.log("line no 13")
    const session_id = url.searchParams.get('session_id') as string;
    try {
      await db
        .delete(dine_market_cart)
        .where(eq(dine_market_cart.user_id, user_id));
        console.log("line no 19")
      return NextResponse.redirect(`${base_url}/successPayment`);
      
    } catch (error) {
      console.log("line no 23")
      return NextResponse.redirect(`${base_url}/successPaymentError`);
    }
  } else {
    console.log("line no 27")
    return NextResponse.redirect(`${base_url}/cart`);
  }
}