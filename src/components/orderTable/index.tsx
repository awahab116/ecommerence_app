"use client";
import React from "react";
import { useGetOrdersQuery } from "@/provider/redux/query";
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

export default function OrderTable() {
  const { data, error, isLoading } = useGetOrdersQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error in getting orders</p>;
  return (
    <Table className="w-full">
      <TableCaption>A list of your recent orders.</TableCaption>
      <TableHeader>
        {/* <p>Orders</p> */}
        <TableRow>
          <TableHead className="w-[100px]">OrderId</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>No of items</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data &&
          data.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.userDetails?.username} </TableCell>
              <TableCell>{order.products.length} items</TableCell>
              <TableCell>{order.orderStatus}</TableCell>
              <TableCell className="text-right">${order.totalPrice}</TableCell>
            </TableRow>
          ))}
      </TableBody>
      <TableFooter>{/* <p>Paginataion</p> */}</TableFooter>
    </Table>
  );
}
