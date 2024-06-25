"use client";
import React, { useState, useEffect } from "react";
import GridIconList from "@/components/gridIconList";
import { ProductFilterSelect } from "@/components/productSelect";
import ProductCard from "../productCard";
import ProductListCard from "../productListCard";
import Paginator from "@/components/paginator";
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
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [NoOfProducts, setNoOfProducts] = useState(0);

  const {
    data: categoryProductsData,
    isLoading: categoryLoading,
    isError: categoryError,
  } = useGetProductByCategoryQuery(
    {
      category: productFilter || "",
      page,
      limit,
    },
    {
      skip: !Boolean(productFilter),
    }
  );

  const categoryProducts = categoryProductsData?.products || [];
  const noCategoryProducts =
    !productFilter || (productFilter && categoryProducts.length === 0);

  const {
    data: allProductsData,
    isLoading: allLoading,
    isError: allError,
  } = useGetProductQuery(
    {
      page,
      limit,
    },
    {
      skip: !!productFilter && !fetchAllProducts && !noCategoryProducts,
    }
  );

  const allProducts = allProductsData?.products || [];

  const isLoading = allLoading || categoryLoading;
  const isError = allError || categoryError;
  const products: ProductInfo[] =
    productFilter && categoryProducts.length > 0
      ? categoryProducts
      : allProducts;

  useEffect(() => {
    if (productFilter && categoryProductsData?.totalProducts) {
      setNoOfProducts(categoryProductsData?.totalProducts);
    } else {
      setNoOfProducts(allProductsData?.totalProducts || 0);
    }
  }),
    [productFilter, categoryProductsData, allProductsData];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products</div>;

  const newPage = (page: number) => {
    console.log(`Fetching products for page ${page}`);
    setPage(page);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <span>Number of Products: {NoOfProducts}</span>
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
      <div className="py-4">
        <Paginator
          totalPages={Math.ceil(NoOfProducts / limit)}
          currentPage={page}
          setPage={newPage}
        />
      </div>
    </div>
  );
}
