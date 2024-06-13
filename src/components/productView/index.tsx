"use client";
import React, { useState, useEffect } from "react";
import GridIconList from "@/components/gridIconList";
import { ProductFilterSelect } from "@/components/productSelect";
import ProductCard from "../productCard";
import ProductListCard from "../productListCard";
import {
  useGetProductQuery,
  useGetProductByCategoryQuery,
} from "@/provider/redux/query";
import { ProductInfo } from "@/interfaces/product.interface";
import { useParams } from "next/navigation";

export default function Product() {
  const { productFilter } = useParams();
  const [gridView, setGridView] = useState<string>("small");
  const [fetchAllProducts, setFetchAllProducts] = useState(false);

  const {
    data: allProducts,
    isLoading: allLoading,
    isError: allError,
    refetch: refetchAllProducts,
  } = useGetProductQuery(undefined, {
    skip: !!productFilter && !fetchAllProducts,
  });

  const {
    data: categoryProducts,
    isLoading: categoryLoading,
    isError: categoryError,
    refetch: refetchCategoryProducts,
  } = useGetProductByCategoryQuery(productFilter!, {
    skip: !Boolean(productFilter),
  });

  useEffect(() => {
    if (productFilter && categoryProducts && categoryProducts.length === 0) {
      setFetchAllProducts(true);
    }
  }, [categoryProducts, productFilter]);

  useEffect(() => {
    if (fetchAllProducts) {
      refetchAllProducts();
    }
  }, [fetchAllProducts, refetchAllProducts]);

  const isLoading = allLoading || categoryLoading;
  const isError = allError || categoryError;
  const products: ProductInfo[] =
    productFilter && categoryProducts && categoryProducts.length > 0
      ? categoryProducts
      : allProducts || [];

  console.log("productFilter", productFilter);
  console.log({ products, isLoading, isError });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products</div>;

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
