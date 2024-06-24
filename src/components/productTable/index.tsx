"use client";
import React from "react";
import { useGetProductQuery } from "@/provider/redux/query";
import {
  Table,
  TableHead,
  TableHeader,
  TableCaption,
  TableRow,
  TableBody,
  TableCell,
  TableFooter,
} from "../ui/table";
import Image from "next/image";
import DropdownMenu from "@/components/dropDownMenu";

export default function ProductTable() {
  const { data, error, isLoading } = useGetProductQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error in getting products</p>;

  return (
    <Table className="w-full">
      <TableCaption>A list of your products.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Product Id</TableHead>
          <TableHead>Product Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data &&
          data.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={60}
                    height={30}
                  />
                  <p>{product.title}</p>
                </div>
              </TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>
                <DropdownMenu product={product} />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
      <TableFooter>{/* <p>Pagination</p> */}</TableFooter>
    </Table>
  );
}
