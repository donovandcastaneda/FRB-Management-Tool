"use client";
import { useEffect, useState } from "react";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import axios from 'axios';
import { readUserSession } from "../auth/actions";
import { redirect } from "next/navigation";
import { readCustomer } from "../api/supabase/actions";

const useCustomers = () => {
  const [loading, setLoading] = useState(true);
  const [customerData, setCustomerData] = useState<Payment[]>([]); 


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: supabaseCustomers } = await readCustomer();
        const stripeResponse = await axios.get('/api/stripe/get-customers');
        console.log('API response:', stripeResponse.data);
        const stripeCustomers = stripeResponse.data.payments;

        const combinedData = [...(supabaseCustomers || []), ...(stripeCustomers || [])];
        setCustomerData(combinedData)

      } catch (error) {
        console.error('Error fetching customers:', error);
        console.log(error)
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
        redirect('/');
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
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={customerData} /> 
    </div>
  );
}
