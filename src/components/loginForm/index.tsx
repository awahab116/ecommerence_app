"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Input } from "@/components/ui/input";
import React from "react";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="flex justify-center items-center w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-start max-w-[400px] w-full  py-[35px] px-[40px]"
        >
          <h1 className="text-4xl font-bold mb-6 ">Login</h1>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="max-w-[400px] w-full mb-[30px]">
                <FormLabel className="text-[16px] font-bold mb-[10px] w-full">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="email@example.com"
                    {...field}
                    className="max-w-[400px] font-light py-2 px-[10px]  w-full"
                    // style={{ marginBottom: "30px" }}
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
              <FormItem className="max-w-[400px] w-full mb-[30px]">
                <FormLabel className="text-[16px] font-bold mb-[10px] w-full">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Your password"
                    {...field}
                    className="max-w-[400px] font-light py-2 px-[10px] w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="max-w-[400px] w-full rounded-[25px] mb-2"
          >
            Submit
          </Button>
          <FormDescription className="text-[14px] text-black">
            Create Account
          </FormDescription>
        </form>
      </Form>
    </div>
  );
}
