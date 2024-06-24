"use client";
import React, { Dispatch, ReactNode, SetStateAction, useState } from "react";
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
// import { Textarea } from '@/components/ui/textarea';

import { ProductInfo } from "@/interfaces/product.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEditProductMutation } from "@/provider/redux/mutation";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  price: z.number().positive("Price must be a positive number"),
  description: z.string().optional(),
  category: z.string().min(3, "Category must be at least 3 characters long"),
});

export default function ProductEditForm({
  product,
  setIsOpen,
}: {
  product: ProductInfo;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [
    updateProductMutation,
    { isLoading, isError, error, isSuccess, data },
  ] = useEditProductMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Update prouct ", values);

    updateProductMutation({ id: product.id, ...values })
      .unwrap()
      .then((res) => {
        console.log("Res is ", res);
        setIsOpen(false);
      })
      .catch((err) => {
        console.log("Error is ", err);
      });
  }

  return (
    <div className="flex justify-center items-center w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="max-w-[400px] w-full mb-[30px]">
                <FormLabel className="text-[16px] font-bold mb-[10px] w-full">
                  Title
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="max-w-[400px] font-light py-2 px-[10px]  w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="max-w-[400px] w-full mb-[30px]">
                <FormLabel className="text-[16px] font-bold mb-[10px] w-full">
                  Price
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="max-w-[400px] font-light py-2 px-[10px]  w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="max-w-[400px] w-full mb-[30px]">
                <FormLabel className="text-[16px] font-bold mb-[10px] w-full">
                  Description
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="max-w-[400px] font-light py-2 px-[10px]  w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="max-w-[400px] w-full mb-[30px]">
                <FormLabel className="text-[16px] font-bold mb-[10px] w-full">
                  Category
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="max-w-[400px] font-light py-2 px-[10px]  w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {isError && <FormMessage>Error in updating product</FormMessage>}

          <Button type="submit">Update</Button>
        </form>
      </Form>
    </div>
  );
}
