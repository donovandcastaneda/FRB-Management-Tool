"use client";
import { useEffect, useState } from "react";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import axios from 'axios';
import { readUserSession } from "../auth/actions";
import { redirect } from "next/navigation";

const useCustomers = () => {
  const [loading, setLoading] = useState(true);
  const [customerData, setCustomerData] = useState<Payment[]>([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/stripe/get-customers');
        console.log('API response:', response.data);
        setCustomerData(response.data.payments);
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
