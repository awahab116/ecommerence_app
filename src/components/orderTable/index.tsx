"use client";
import React, { useState } from "react";
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
import Paginator from "@/components/paginator";

export default function OrderTable() {
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const { data, error, isLoading } = useGetOrdersQuery({
    page,
    limit,
  });

  const totalPages = data ? Math.ceil(data.totalOrders / limit) : 1;

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
        {data?.order &&
          data.order.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.userDetails?.username} </TableCell>
              <TableCell>{order.products.length} items</TableCell>
              <TableCell>{order.orderStatus}</TableCell>
              <TableCell className="text-right">${order.totalPrice}</TableCell>
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
