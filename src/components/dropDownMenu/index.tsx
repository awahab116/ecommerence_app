"use client";
import React, { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProductInfo } from "@/interfaces/product.interface";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ResponsiveDialog } from "@/components/responsiveDialog";
import ProductEditForm from "../productEditForm";
import ProductDeleteForm from "@/components/productDeleteForm";
import { SquarePen, Trash2 } from "lucide-react";

export default function ProductDropdownMenu({
  product,
  refetchProducts,
}: {
  product: ProductInfo;
  refetchProducts: () => void;
}) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    if (product.id && !isEditOpen && !isDeleteOpen) {
      console.log("Product id is ", product.id);
      refetchProducts();
    }
  }, [isEditOpen, isDeleteOpen]);

  return (
    <>
      <ResponsiveDialog
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        title="Edit Person"
      >
        <ProductEditForm product={product} setIsOpen={setIsEditOpen} />
      </ResponsiveDialog>
      <ResponsiveDialog
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        title="Delete Product"
        description="Are you sure you want to delete this product?"
      >
        <ProductDeleteForm productId={product.id} setIsOpen={setIsDeleteOpen} />
      </ResponsiveDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <Image
              src="three-dot-menu.svg"
              alt="Three dot menu"
              width={20}
              height={20}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px] z-50">
          <DropdownMenuItem className="group flex w-full items-center justify-between  text-left p-0 text-sm font-base text-neutral-500 ">
            <button
              onClick={() => {
                setIsEditOpen(true);
              }}
              className="w-full justify-start flex rounded-md p-2 transition-all duration-75 hover:bg-neutral-100"
            >
              <div className="flex items-center">
                <SquarePen className="h-4 w-4 mr-2" />
                <span>Edit</span>
              </div>
            </button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem className="group flex w-full items-center justify-between  text-left p-0 text-sm font-base text-neutral-500 ">
            <button
              onClick={() => {
                setIsDeleteOpen(true);
              }}
              className="w-full justify-start flex text-red-500 rounded-md p-2 transition-all duration-75 hover:bg-neutral-100"
            >
              <div className="flex items-center">
                <Trash2 className="h-4 w-4 mr-2 " />
                <span>Delete</span>
              </div>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

{
  /* <DropdownMenu modal={false}>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" className="h-8 w-8 p-0">
      <MoreHorizontal className="h-4 w-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem
      onSelect={() => router.push(`tickets/edit`)}
    >
      Edit
    </DropdownMenuItem>
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem>
          Children Button
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        This is a modal.
      </DialogContent>
    </Dialog>
  </DropdownMenuContent>
</DropdownMenu> */
}
