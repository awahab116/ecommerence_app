"use client";
import React from "react";
import { useGetProductQuery } from "@/provider/redux/query";
import ProductCard from "@/components/productCard";

export default function RecentProducts() {
  const { data, error, isLoading } = useGetProductQuery({
    page: 1,
    limit: 5,
  });

  return (
    <div className="flex flex-col w-full my-[60px]">
      <h1 className="font-bold text-2xl">Recently reviewed</h1>
      <div className="grid grid-cols-auto-fill-minmax gap-3 mt-3 overflow-x-auto">
        {isLoading && <p>Loading...</p>}
        {data?.products &&
          data.products.map((product) => (
            <ProductCard key={product.id} product={product} height="250px" />
          ))}
      </div>
    </div>
  );
}
