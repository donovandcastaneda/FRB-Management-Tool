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
import { createCustomer } from "@/app/api/supabase/actions";
import { toast, useToast } from "../ui/use-toast";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(1),
  age: z.coerce.number().min(1),
  email: z.string().min(1),
  amount: z.coerce.number().min(1),
  phone: z.string().min(1),
  plan: z.string().min(1),
  status: z.string().min(1),
});

export function AddCashCustomerForm({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  // 2. Define a submit handler.
  function onSubmit(data: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const result = await createCustomer(
        data.name,
        data.age,
        data.email,
        data.amount,
        data.plan,
        data.phone,
        data.status
      );
      const { error } = JSON.parse(result);




      if (error?.message) {
        console.log("Error message:", error.message); // Add logging here
        toast({
          title: "Error",
          variant: "destructive",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">Couldnt add customer: {error.message}</code>
            </pre>
          ),
        });
      } else {
        console.log("Login successful");
        toast({
          title: "Success",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">Added Customer</code>
            </pre>
          ),
          
        });

      }

      

    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter Name..." {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
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
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter Phone Number..." {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter Email..." {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status for the customer..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="plan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plan</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a plan..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Non-Competitive">
                      <IconMenu
                        text="Non-Competive"
                        icon={<Dumbbell className="h-4 w-4" />}
                      />{" "}
                    </SelectItem>
                    <SelectItem value="Newbie Competitive">
                      <IconMenu
                        text="Competive"
                        icon={<Medal className="h-4 w-4" />}
                      />{" "}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter Amount..."
                  min={1}
                  {...field}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" className="">
            Submit
            <LoaderCircle
              className={cn("animate-spin", { hidden: !isPending })}
            />
          </Button>
        </div>
      </form>
    </Form>
  );
}
