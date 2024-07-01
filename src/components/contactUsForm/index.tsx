"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

export default function ContactUsForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (values: any) => {
    console.log("Form values:", values);
    // Handle form submission here
  };

  return (
    <div className="flex justify-center items-center w-1/2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="flex space-x-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-[16px] font-bold mb-[10px]">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input {...field} className="w-full py-2 px-[10px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-[16px] font-bold mb-[10px]">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input {...field} className="w-full py-2 px-[10px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="w-full mt-[30px]">
                <FormLabel className="text-[16px] font-bold mb-[10px]">
                  Message
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="w-full py-2 px-[10px] h-[220px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-[30px]">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
