"use client"

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

import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/app/auth/login/actions";

const FormSchema = z.object({
  username: z.string().min(7, {
    message: "Username is incorrect",
  }),
  password: z.string().min(7, {
    message: "Password is incorrect",
  }),
});

export default function SignInForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();


  async function onSubmit(values: any) {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("password", values.password);

    try {
      await login(formData);
      toast({ title: "Login successful" });
      router.push("/dashboard");
    } catch (error) {
      toast({ title: "Login failed", variant: "destructive" }); 
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Username"
                  {...field}
                  type="username"
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
                  placeholder="Password"
                  {...field}
                  type="password"
                  onChange={field.onChange}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full flex gap-2"
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="animate-spin" /> : "Sign In"}
        </Button>
      </form>
    </Form>
  );
}
