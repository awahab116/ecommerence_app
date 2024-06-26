"use client";
import React, { Dispatch, SetStateAction } from "react";
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

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddProductMutation } from "@/provider/redux/mutation";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  price: z.coerce
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    })
    .int()
    .positive()
    .min(1, { message: "Price should be at least 1" }),
  description: z.string().optional(),
  category: z.string().min(3, "Category must be at least 3 characters long"),
  image: z.string().url("Must be a valid URL"),
});

export default function AddProductForm({
  setIsOpen,
  refetchProducts,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  refetchProducts: () => void;
}) {
  const [addProductMutation, { isLoading, isError, error, isSuccess, data }] =
    useAddProductMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      price: 0,
      description: "",
      category: "",
      image: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Add product ", values);
    const processedValues = {
      ...values,
      price: Number(values.price),
    };

    console.log("Add product ", processedValues);

    addProductMutation(values)
      .unwrap()
      .then((res) => {
        console.log("Res is ", res);
        refetchProducts();
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
                    className="max-w-[400px] font-light py-2 px-[10px] w-full"
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
                    className="max-w-[400px] font-light py-2 px-[10px] w-full"
                    type="number"
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
                    className="max-w-[400px] font-light py-2 px-[10px] w-full"
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
                    className="max-w-[400px] font-light py-2 px-[10px] w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="max-w-[400px] w-full mb-[30px]">
                <FormLabel className="text-[16px] font-bold mb-[10px] w-full">
                  Image URL
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="max-w-[400px] font-light py-2 px-[10px] w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* {isError && <FormMessage>Error in adding product</FormMessage>} */}

          <Button type="submit">Add Product</Button>
        </form>
      </Form>
    </div>
  );
}
