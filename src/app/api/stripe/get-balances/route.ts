import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const balance = await stripe.balance.retrieve();

    const avaliableBalance = balance.available
    const pendingBalance = balance.pending

    return NextResponse.json({ avaliableBalance, pendingBalance  });
  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.json(
      { error: "Error fetching customers" },
      { status: 500 }
    );
  }
}