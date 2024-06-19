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
  status: string
) {
  const supabase = await createSupabaseServerClient();

  const result = await supabase
    .from("Customers")
    .insert({ name, age, wgt, phone, email, status, plan,  })
    .single();

  revalidatePath("/dashboard"); //when we mutuate

  return JSON.stringify(result);
}

export async function readCustomer() {
  noStore(); //cache stuff

  const supabase = await createSupabaseServerClient();

  return await supabase.from("Customers").select("*");
}

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
