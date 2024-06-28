import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { useEffect, useState } from "react";


interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: string;
  created: Date;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number | null;
  wgt: number | null;
  latestTransaction: Transaction | null;
}


export function RecentTransactions() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {

      const response = await axios.get('/api/stripe/get-revenue')
      console.log('API Response:', response.data); // Log the API response
      setCustomers(response.data.customers)
      } catch (error) {

        console.log(error)
      }
    };
 fetchCustomers },
[]);

  return (
    <div className="space-y-8">
    {customers.map((customer) => (
      <div key={customer.id} className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>{customer.name?.[0]?.toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">{customer.name}</p>
          <p className="text-sm text-muted-foreground">{customer.email}</p>
        </div>
        <div className="ml-auto font-medium">
          {customer.latestTransaction ? `+$${(customer.latestTransaction.amount / 100).toFixed(2)}` : 'N/A'}
        </div>
      </div>
    ))}
  </div>)}
