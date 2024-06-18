"use server";

import createSupabaseServerClient from "@/lib/supabase/server";


export async function createCustomer(
  name: string,
  age: number,
  email: string,
  amount: number,
  plan: string,
  phone: string,
  status: string
) {
  const supabase = await createSupabaseServerClient();

  const result = await supabase
    .from("Customers")
    .insert({ name, age, phone, email, status, plan, amount }).single();

  return JSON.stringify(result);
}

// export async function readCustomer(){

//     const supabase = await createSupabaseServerClient()

//     const result = await supabase.from("Customers").

// }

export async function updateCustomer(
  name: string,
  age: number,
  email: string,
  amount: number,
  plan: string,
  phone: string,
  status: string
) {
  const supabase = await createSupabaseServerClient();

  const result = await supabase
    .from("Customers")
    .update({ name, age, phone, email, status, plan, amount });
}

// export async function deleteCustomer(){

//     const supabase = await createSupabaseServerClient()

//     const result = await supabase.from("Customers").

// }
