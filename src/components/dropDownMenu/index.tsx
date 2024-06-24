"use client";
import React, { useState } from "react";
import {
  DropdownMenu as ShadCNDropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProductInfo } from "@/interfaces/product.interface";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function DropdownMenu({ product }: { product: ProductInfo }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: product.title,
    category: product.category,
    price: product.price,
  });
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSaveChanges = () => {
    // Implement save functionality here
    console.log("Saved data:", formData);
    setIsEditOpen(false);
  };

  const [inputValue, setInputValue] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="relative">
      <ShadCNDropdownMenu>
        <DropdownMenuTrigger> Dropdown Menu </DropdownMenuTrigger>
        <DropdownMenuContent>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                }}
              >
                Test
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent>
              <Input
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  console.log("input changed", e.target.value);
                }}
              />
              This is a modal.
            </DialogContent>
          </Dialog>
        </DropdownMenuContent>
      </ShadCNDropdownMenu>
    </div>
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
