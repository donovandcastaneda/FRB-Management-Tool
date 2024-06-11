"use client";
import { useEffect, useState } from "react";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import axios from 'axios';

const useCustomers = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Payment[]>([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/get-customers');
        console.log('API response:', response.data); // Log API response
        setData(response.data.payments);
      } catch (error) {
        console.error('Error fetching customers:', error);
        console.log(error)
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []);

  return { data, loading }; 
};

export default function DemoPage() {
  const { data, loading } = useCustomers(); 

  if (loading) {
    return <p>Loading...</p>; 
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} /> 
    </div>
  );
}
