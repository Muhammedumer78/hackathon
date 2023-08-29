import { db } from '@/lib/db/drizzle';
import { dine_market_cart } from '@/lib/db/schema';
import { asc, eq, sql } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const userId = request.headers.get('authorization');
  if (userId) {
    const user_id = userId;
    try {
      const result = await db
        .select()
        .from(dine_market_cart)
        .where(eq(dine_market_cart.user_id, user_id))
        .orderBy(
          asc(dine_market_cart.product_name),
          asc(dine_market_cart.product_size)
        );
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      return NextResponse.json([], { status: 500 });
    }
  } else {
    return NextResponse.json([], { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  const userId = request.headers.get('authorization');
  const cartId = request.headers.get('cartId');

  if (userId && cartId) {
    try {
      await db
        .delete(dine_market_cart)
        .where(
          sql`${dine_market_cart.cart_id} = ${cartId} AND ${dine_market_cart.user_id} = ${userId}`
        );
      return NextResponse.json({ response: 'success' }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ response: 'failed' }, { status: 500 });
    }
  } else {
    return NextResponse.json({ response: 'failed' }, { status: 500 });
  }
}