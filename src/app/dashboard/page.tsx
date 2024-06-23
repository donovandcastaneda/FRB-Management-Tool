"use client";
import { useEffect, useState } from "react";
import { Payment, columns } from "./components/data-table/columns";
import { DataTable } from "./components/data-table/data-table";
import axios from "axios";
import { readUserSession } from "../auth/actions";
import { redirect } from "next/navigation";
import { readCustomer } from "../api/supabase/actions";
import Dashboard from "./components/dashboard";

const useCustomers = () => {
  const [loading, setLoading] = useState(true);
  const [customerData, setCustomerData] = useState<Payment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: supabaseCustomers } = await readCustomer();
        const stripeResponse = await axios.get("/api/stripe/get-customers");
        const stripeCustomers = stripeResponse.data.payments;
        console.log(stripeCustomers);

        const combinedData = [
          ...(supabaseCustomers || []),
          ...(stripeCustomers || []),
        ];
        setCustomerData(combinedData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { customerData, loading };
};

export default function DemoPage() {
  const { customerData, loading } = useCustomers();
  const [sessionChecked, setSessionChecked] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await readUserSession();
      if (!data.user) {
        redirect("/");
      } else {
        setSessionChecked(true);
      }
    };

    checkSession();
  }, []);

  if (loading || !sessionChecked) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto py-20">
      <Dashboard />

      <DataTable columns={columns} data={customerData} />
    </div>
  );
}
