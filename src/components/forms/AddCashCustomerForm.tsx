"use client";
import React, {
  Dispatch,
  SetStateAction,
  useState,
  useTransition,
} from "react";
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
import { ArrowRight, Dumbbell, LoaderCircle, Medal } from "lucide-react";
import { createCustomer } from "@/app/api/supabase/actions";
import { toast, useToast } from "../ui/use-toast";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(1),
  age: z.coerce.number().min(1),
  wgt: z.string().min(1),
  email: z.string().min(1),
  phone: z.string().min(1),
  plan: z.string().min(1),
  status: z.string().min(1),
  amount: z.coerce.number().min(1),
  level: z.string().min(1),
});

export function AddCashCustomerForm({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [formStep, setFormStep] = React.useState(0);
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
        data.wgt,
        data.email,
        data.plan,
        data.phone,
        data.status,
        data.amount,
        data.level
      );
      const { error } = JSON.parse(result);

      if (error?.message) {
        console.log("Error message:", error.message);
        toast({
          title: "Error",
          variant: "destructive",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                Couldnt add customer: {error.message}
              </code>
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
        <div
          className={cn({
            hidden: formStep == 1,
          })}
        >
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
                      <SelectItem value="Pee Wee (55)">Pee Wee (55)</SelectItem>
                      <SelectItem value="Bantam (65)">Bantam (65)</SelectItem>
                      <SelectItem value="Junior (80)">Junior (80)</SelectItem>
                      <SelectItem value="Intermediate (95)">
                        Intermediate (95)
                      </SelectItem>
                      <SelectItem value="Atomweight (102)">
                        Atomweight (102)
                      </SelectItem>

                      <SelectItem value="Mini Flyweight (105)">
                        Mini Flyweight (105)
                      </SelectItem>
                      <SelectItem value="Light Flyweight (108)">
                        Light Flyweight (108)
                      </SelectItem>
                      <SelectItem value="Flyweight (112)">
                        Flyweight (112)
                      </SelectItem>
                      <SelectItem value="Super Flyweight (115)">
                        Super Flyweight (115)
                      </SelectItem>
                      <SelectItem value="Bantamweight (118)">
                        Bantamweight (118)
                      </SelectItem>
                      <SelectItem value="Super Bantamweight (122)">
                        Super Bantamweight (122)
                      </SelectItem>
                      <SelectItem value="Featherweight (126)">
                        Featherweight (126)
                      </SelectItem>
                      <SelectItem value="Super Featherweight (130)">
                        Super Featherweight (130)
                      </SelectItem>
                      <SelectItem value="Lightweight (135)">
                        Lightweight (135)
                      </SelectItem>
                      <SelectItem value="Super Lightweight (140)">
                        Super Lightweight (140)
                      </SelectItem>
                      <SelectItem value="Welterweight (147)">
                        Welterweight (147)
                      </SelectItem>
                      <SelectItem value="Super Welterweight (154)">
                        Super Welterweight (154)
                      </SelectItem>
                      <SelectItem value="Middleweight (160)">
                        Middleweight (160)
                      </SelectItem>
                      <SelectItem value="Super Middleweight (168)">
                        Super Middleweight (168)
                      </SelectItem>
                      <SelectItem value="Light Heavyweight (175)">
                        Light Heavyweight (175)
                      </SelectItem>
                      <SelectItem value="Cruiserweight (200)">
                        Cruiserweight (200)
                      </SelectItem>
                      <SelectItem value="Heavyweight (200+)">
                        Heavyweight (200+)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
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
        </div>
        <div
          className={cn({
            hidden: formStep == 0,
          })}
        >
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
                      <SelectItem value="Competitive">
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
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Level</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status for the customer..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Red">Red</SelectItem>
                      <SelectItem value="Yellow">Yellow</SelectItem>
                      <SelectItem value="Green">Green</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
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
        </div>

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant={"ghost"}
            className={cn({
              hidden: formStep == 1,
            })}
            onClick={() => {
              // validation
              form.trigger(["email", "name", "age", "wgt", "phone"]);
              const emailState = form.getFieldState("email");
              const nameState = form.getFieldState("name");
              const ageState = form.getFieldState("age");
              const wgtState = form.getFieldState("wgt");
              const phoneState = form.getFieldState("phone");

              if (!emailState.isDirty || emailState.invalid) return;
              if (!nameState.isDirty || nameState.invalid) return;
              if (!ageState.isDirty || ageState.invalid) return;
              if (!wgtState.isDirty || wgtState.invalid) return;
              if (!phoneState.isDirty || phoneState.invalid) return;

              setFormStep(1);
            }}
          >
            Next Step
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button
            type="button"
            variant={"ghost"}
            onClick={() => {
              setFormStep(0);
            }}
            className={cn({
              hidden: formStep == 0,
            })}
          >
            Go Back
          </Button>

          <Button
            type="submit"
            className={cn({
              hidden: formStep == 0,
            })}
          >
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
