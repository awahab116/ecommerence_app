"use client";
import React, { useState } from "react";
import GridIconList from "@/components/gridIconList";
import { ProductFilterSelect } from "@/components/productSelect";
import ProductCard from "../productCard";
import ProductListCard from "../productListCard";
import { useGetProductQuery } from "@/provider/redux/query";
import { ProductInfo } from "@/interfaces/product.interface";
import { useParams } from "next/navigation";

export default function Product() {
  const { data, isLoading, isError } = useGetProductQuery();
  const { productFilter } = useParams();
  const [gridView, setGridView] = useState<string>("small");

  console.log("productFilter", productFilter);
  console.log({ data, isLoading, isError });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products</div>;

  const products: ProductInfo[] = data || [];

  return (
    <div>
      <div className="flex justify-between items-center">
        <span>Number of Products: {products.length}</span>
        <div className="flex">
          <div className="pr-[15px] mr-[15px] border-r border-gray-300 hidden sm:block">
            <ProductFilterSelect />
          </div>
          <GridIconList setGridView={setGridView} />
        </div>
      </div>
      <div
        className={`grid ${
          gridView === "list"
            ? "grid-cols-1"
            : gridView === "small"
            ? "grid-cols-2 md:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-2"
        } gap-3 mt-3`}
      >
        {products.map((product) =>
          gridView === "list" ? (
            <ProductListCard key={product.id} product={product} />
          ) : (
            <ProductCard
              key={product.id}
              product={product}
              height={gridView === "small" ? "400px" : "550px"}
            />
          )
        )}
      </div>
    </div>
  );
}
