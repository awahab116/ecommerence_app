"use client";
import React from "react";
import StatCard from "../statCard";
import { useAdminStatsQuery } from "@/provider/redux/query";
import {
  BadgeDollarSign,
  UsersRound,
  ReceiptText,
  ShoppingCart,
} from "lucide-react";

export default function AdminOverview() {
  const { data, isLoading, isError } = useAdminStatsQuery();

  console.log("stats ", data);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <div className="flex flex-row gap-2">
      <StatCard
        name="Revenue"
        statLogo={<BadgeDollarSign />}
        price={"$" + data?.totalRevenue?.toString()!}
        value="+30$"
      />
      <StatCard
        name="Orders"
        statLogo={<ShoppingCart />}
        price={data?.totalOrders?.toString()!}
        value="+42"
      />
      <StatCard
        name="Products"
        statLogo={<ReceiptText />}
        price={data?.totalProducts?.toString()!}
        value="+5"
      />
      <StatCard
        name="Users"
        statLogo={<UsersRound />}
        price={data?.totalUsers?.toString()!}
        value="+1"
      />
    </div>
  );
}
