import { db } from '@/lib/db/drizzle';
import { eq, sql } from 'drizzle-orm';
import { dine_market_cart } from '@/lib/db/schema';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(request: NextRequest) {
  const userId = request.headers.get('authorization');
  if (userId) {
    const user_id = userId;
    try {
      const result = await db
        .select({
          numItems: sql<number>`sum(dine_market_cart.product_quantity)`,
        })
        .from(dine_market_cart)
        .where(eq(dine_market_cart.user_id, user_id));
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      return NextResponse.json([{ numItems: 0 }], { status: 500 });
    }
  } else {
    return NextResponse.json([{ numItems: 0 }], { status: 500 });
  }
}