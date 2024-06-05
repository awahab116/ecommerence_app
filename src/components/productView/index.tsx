"use client";
import React from "react";
import GridIconList from "@/components/gridIconList";
import { ProductFilterSelect } from "@/components/productSelect";
import ProductCard from "../productCard";
import { useGetProductQuery } from "@/provider/redux/query/product";
import { ProductInfo } from "@/interfaces/product.interface";

export default function Product() {
  const { data, isLoading, isError } = useGetProductQuery({});
  console.log({ data, isLoading, isError });

  // Handle loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products</div>;

  // Ensure data is defined and has the expected type
  const products: ProductInfo[] = data || [];

  return (
    <div>
      <div className="flex justify-between items-center">
        <span>Number of Products: {products.length}</span>
        <div className="flex">
          <div className="pr-[15px] mr-[15px] border-r border-gray-300 hidden sm:block">
            <ProductFilterSelect />
          </div>
          <GridIconList />
        </div>
      </div>
      <div
        className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3`}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} height="400px" />
        ))}
      </div>
    </div>
  );
}
