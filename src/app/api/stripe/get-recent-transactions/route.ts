
import createSupabaseServerClient from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);


async function getLatestTransaction(customerId: string) {
  try {
    const charges = await stripe.charges.list({
      limit: 10,
    });



    return {
     
    };
  } catch (error) {
    console.error('Error fetching latest transaction:', error);
    return null;
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const customers = await stripe.customers.list({
      limit: 10,
    });

    const supabase = createSupabaseServerClient();
    const { data: supabaseCustomers, error: supabaseError } = await (await supabase).from('Customers').select('*');
    if (supabaseError) throw new Error(supabaseError.message);

    const customerData = await Promise.all(customers.data.map(async (customer) => {
      const supabaseCustomer = supabaseCustomers.find((c: { stripe_customer_id: string; }) => c.stripe_customer_id === customer.id);
      const latestTransaction = await getLatestTransaction(customer.id);

      return {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        age: supabaseCustomer?.age || null,
        wgt: supabaseCustomer?.wgt || null,
        latestTransaction,
      };
    }));

    return NextResponse.json({ customers: customerData });
  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.json(
      { error: "Error fetching customers" },
      { status: 500 }
    );
  }
}
