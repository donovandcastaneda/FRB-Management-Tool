"use server";

import createSupabaseServerClient from "@/lib/supabase/server";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";

export async function createCustomer(
  name: string,
  age: number,
  wgt: string,
  email: string,
  plan: string,
  phone: string,
  status: string,
  amount: number,
  level: string,
) {
  const supabase = await createSupabaseServerClient();

  const result = await supabase
    .from("Customers")
    .insert({ name, age, wgt, phone, email, status, plan, amount, level})
    .single();

  revalidatePath("/dashboard"); 

  return JSON.stringify(result);
}

export async function createStripeCustomer(id: any) {
  const supabase = await createSupabaseServerClient();

  const result = await supabase.from("Stripe_Customers").insert({ id }).single();

  revalidatePath("/dashboard"); 

  return JSON.stringify(result);
}

export async function readCashCustomer() {
  noStore();

  const supabase = await createSupabaseServerClient();

  return await supabase.from("Customers").select("*");
}

export async function readStripeCustomer() {
  noStore();

  const supabase = await createSupabaseServerClient();

  return await supabase.from("StripeCustomers").select("*");
}

export async function updateCashCustomer(
  id: string,
  name: string,
  age: number,
  wgt: string,
  email: string,
  plan: string,
  phone: string,
  status: string,
  amount: number,
  level: string
) {
  const supabase = await createSupabaseServerClient();



  const { data, error } = await supabase
    .from("Customers")
    .update({ name, age, wgt, email, plan, phone, status, amount, level })
    .eq("id", id);

  if (error) {
    console.log(error);
    return JSON.stringify({ error });
  }
  revalidatePath("/dashboard");
  return JSON.stringify({ data });
}

export async function updateStripeCustomer(
  id: string,
  age: number,
  wgt: string,
 
) {
  const supabase = await createSupabaseServerClient();



  const { data, error } = await supabase
    .from("StripeCustomers")
    .update({ age, wgt })
    .eq("id", id);

  if (error) {
    console.log(error);
    return JSON.stringify({ error });
  }
  revalidatePath("/dashboard");
  return JSON.stringify({ data });
}

export async function deleteCustomer(id: string) {
  const supabase = await createSupabaseServerClient();

  await supabase.from("Customers").delete().eq("id", id);
  revalidatePath("/dashboard");
}
