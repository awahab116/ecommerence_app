"use client";
import React, { useState } from "react";
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
import ProductDropdownMenu from "@/components/dropDownMenu";
import Paginator from "@/components/paginator";

export default function ProductTable() {
  const [page, setPage] = useState(1);
  const [limit] = useState(4);
  const { data, error, isLoading, refetch } = useGetProductQuery({
    page,
    limit,
  });

  const totalPages = data ? Math.ceil(data.totalProducts / limit) : 1;

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
        {data?.products &&
          data.products.map((product) => (
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
                <ProductDropdownMenu
                  product={product}
                  refetchProducts={refetch}
                />
              </TableCell>
            </TableRow>
          ))}
        <TableRow className="bg-transparent hover:bg-transparent w-full ">
          <TableCell colSpan={5} className="text-right">
            <Paginator
              currentPage={page}
              totalPages={totalPages}
              setPage={setPage}
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
