"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast, useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { signInWithEmailAndPassword } from "../actions";
import { redirect } from "next/navigation";

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

export default function SignInForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      console.log("Submitting data...", data); // Add logging here
      const result = await signInWithEmailAndPassword(data);
      console.log("Result:", result); // Add logging here

      const  error  = JSON.parse(result)

      if (error?.message) {
        console.log("Error message:", error.message); // Add logging here
        toast({
          title: "Error",
          variant: "destructive",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{error.message}</code>
            </pre>
          ),
        });
      } else {
        console.log("Login successful");
        toast({
          title: "Success",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">Successfully Logged In</code>
            </pre>
          ),
          
        });
        redirect('/dashboard')

      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="example@gmail.com"
                  {...field}
                  type="email"
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="password"
                  {...field}
                  type="password"
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full flex gap-2">
          Sign In
          <Loader2 className={cn("animate-spin", { hidden: !isPending })} />
        </Button>
      </form>
    </Form>
  );
}
