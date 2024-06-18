import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const customers = await stripe.customers.list({
      limit: 10,
    });

    const payments = customers.data.map((customer: any) => ({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      creation: customer.created,
    }));

    return NextResponse.json({ payments });
  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.json(
      { error: "Error fetching customers" },
      { status: 500 }
    );
  }
}
