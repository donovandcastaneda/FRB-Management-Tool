import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const customers = await stripe.customers.list({
      limit: 10,
    });

    const payments = await Promise.all(customers.data.map(async (customer) => {
      const subscriptions = await stripe.subscriptions.list({
        customer: customer.id,
        status: 'all',
      });

      const customerPayments = await Promise.all(subscriptions.data.map(async (subscription) => {
        const item = subscription.items.data[0];
        const price = await stripe.prices.retrieve(item.price.id);
        const product = await stripe.products.retrieve(price.product as string);
        // const checkout = await stripe.checkout.sessions.retrieve()

       

        return {
          id: customer.id,
          name: customer.name,
          // age:
          email: customer.email,
          phone: customer.phone,
          status: subscription.status,
          plan: product.name,
          amount: (item.price.unit_amount ?? 0) / 100, 
          creation: new Date(customer.created * 1000),
        };
      }));

      return customerPayments;
    }));



    const flattenedPayments = payments.flat();

    return NextResponse.json({ payments: flattenedPayments });
  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.json(
      { error: "Error fetching customers" },
      { status: 500 }
    );
  }
}