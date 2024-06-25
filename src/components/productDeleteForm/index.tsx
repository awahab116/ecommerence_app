"use client";

import React, { Dispatch, SetStateAction } from "react";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useDeleteProductMutation } from "@/provider/redux/query";

const formSchema = z.object({
  productId: z.number(),
});

export default function ProductDeleteForm({
  productId,
  setIsOpen,
  refetchProducts,
}: {
  productId: number;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  refetchProducts: () => void;
}) {
  const [
    deleteProductMutation,
    { isLoading, isError, error, isSuccess, data },
  ] = useDeleteProductMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId,
    },
  });

  const onSubmit = async () => {
    try {
      deleteProductMutation(productId)
        .unwrap()
        .then((res) => {
          console.log("Res is ", res);
          refetchProducts();
          setIsOpen(false);
        })
        .catch((err) => {
          console.log("Error is ", err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6  sm:px-0 px-4"
      >
        <div className="w-full flex justify-center sm:space-x-6">
          {isError && (
            <div className="text-red-500 text-sm font-medium">
              Something went wrong
            </div>
          )}

          <Button
            size="lg"
            variant="outline"
            disabled={isLoading}
            className="w-full hidden sm:block"
            type="button"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            size="lg"
            type="submit"
            disabled={isLoading}
            className="w-full bg-red-500 hover:bg-red-400"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting
              </>
            ) : (
              <span>Delete</span>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
