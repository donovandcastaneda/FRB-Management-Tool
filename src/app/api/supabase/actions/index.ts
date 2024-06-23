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
    .insert({ name, age, wgt, phone, email, status, plan })
    .single();

  revalidatePath("/dashboard"); //when we mutuate

  return JSON.stringify(result);
}

export async function readCustomer() {
  noStore();

  const supabase = await createSupabaseServerClient();

  return await supabase.from("Customers").select("*");
}

export async function updateCustomer(
  id: string,
  name: string,
  age: number,
  wgt: string,
  email: string,
  plan: string,
  phone: string,
  status: string
) {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from('Customers')
    .update({ name, age, wgt, email, plan, phone, status })
    .eq('id', id)

  if (error) {
    console.log(error)
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
