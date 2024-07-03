"use client";
import React, { useState, useEffect, useRef } from "react";
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
import { useRouter } from "next/navigation";

export default function Product() {
  const { productFilter } = useParams();
  const router = useRouter();
  const [gridView, setGridView] = useState<string>("small");
  const [page, setPage] = useState(1);
  const [limit] = useState(3);
  const [products, setProducts] = useState<ProductInfo[]>([]);
  const [hasMoreData, setHasMoreData] = useState(true);
  const scrollTrigger = useRef<HTMLDivElement>(null);

  const {
    data: productData,
    isLoading: isProductLoading,
    isError: isProductError,
  } = useGetProductQuery({
    page,
    limit,
  });

  const {
    data: categoryData,
    isLoading: isCategoryLoading,
    isError: isCategoryError,
  } = useGetProductByCategoryQuery(
    {
      category: productFilter,
      page,
      limit,
    },
    { skip: !productFilter }
  );

  const data = productFilter ? categoryData : productData;
  const isLoading = productFilter ? isCategoryLoading : isProductLoading;
  const isError = productFilter ? isCategoryError : isProductError;

  const onIntersection = (entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting && hasMoreData) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    setProducts([]);
  }, [productFilter]);

  useEffect(() => {
    console.log("categoryData", categoryData);
    if (productFilter && categoryData?.products.length === 0) {
      router.push("/");
    }
  }, [categoryData]);

  useEffect(() => {
    if (data) {
      setProducts((prevProducts) => [...prevProducts, ...data.products]);
      if (data.products.length < limit) {
        setHasMoreData(false);
      }
    }
  }, [data]);

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);
    if (scrollTrigger.current) {
      observer.observe(scrollTrigger.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [scrollTrigger.current]);

  if (isLoading && page === 1) return <div>Loading...</div>;
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
        {products.map((product, index) =>
          gridView === "list" ? (
            <ProductListCard key={index} product={product} />
          ) : (
            <ProductCard
              key={index}
              product={product}
              height={gridView === "small" ? "400px" : "550px"}
            />
          )
        )}
      </div>
      {hasMoreData && (
        <div ref={scrollTrigger} className="text-center">
          Loading...
        </div>
      )}
    </div>
  );
}
