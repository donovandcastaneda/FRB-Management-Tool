"use client";
import React, { Dispatch, SetStateAction, useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import IconMenu from "../IconMenu";
import { Dumbbell, LoaderCircle, Medal } from "lucide-react";

import { toast, useToast } from "../ui/use-toast";
import { cn } from "@/lib/utils";
import { updateStripeCustomer } from "@/app/api/supabase/actions";

const formSchema = z.object({
  id: z.any(),
  name: z.string().min(1),
  age: z.coerce.number().min(1),
  wgt: z.string().min(1),
  email: z.string().min(1),
  phone: z.string().min(1),
  plan: z.string().min(1),
  status: z.string().min(1),
});

interface Payment {
  id: string;
  name: string;
  email: string;
  phone: string;
  creation: Date;
  age: number;
  wgt: string;
  plan: string;
  status: string;
}

interface UpdateCashCustomerFormProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  payment: Payment;
}

export function UpdateStripeCustomerForm({
  payment,
  setIsOpen,
}: UpdateCashCustomerFormProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: payment,
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("Submitted data:", data);

    startTransition(async () => {
      const result = await updateStripeCustomer(data.id, data.age, data.wgt);

      const { error } = JSON.parse(result);

      if (error?.message) {
        toast({
          title: "Error",
          variant: "destructive",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                Could not update customer: {error.message}
              </code>
            </pre>
          ),
        });
        setTimeout(() => {
          setIsOpen(false);
        }, 2000);
      } else {
        toast({
          title: "Success",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">Updated Customer</code>
            </pre>
          ),
        });

        setTimeout(() => {
          setIsOpen(false);
        }, 1000);
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
   
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter Age..."
                  min={1}
                  {...field}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="wgt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weight</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a weight for the customer..." />
                  </SelectTrigger>
                  <SelectContent>
                    {/* your weight categories here */}
                    <SelectItem value="Pee Wee (55)">Pee Wee (55)</SelectItem>
                    <SelectItem value="Bantam (65)">Bantam (65)</SelectItem>
                    <SelectItem value="Junior (80)">Junior (80)</SelectItem>
                    <SelectItem value="Intermediate (95)">
                      Intermediate (95)
                    </SelectItem>
                    <SelectItem value="Atomweight (102)">
                      Atomweight (102)
                    </SelectItem>
                    {/* Add more weight categories as needed */}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit">
            Update
            {isPending && <LoaderCircle className="animate-spin ml-2" />}
          </Button>
        </div>
      </form>
    </Form>
  );
}
