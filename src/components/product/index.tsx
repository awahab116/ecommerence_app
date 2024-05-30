import React from "react";
import GridIconList from "@/components/gridIconList";
import { ProductFilterSelect } from "@/components/productSelect";
import ProductCard from "../productCard";
import ProductGrid from "@/components/productGrid";

export default function Product() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <span>Number of Products</span>
        <div className="flex">
          <div className="pr-[15px] mr-[15px] border-r border-gray-300">
            <ProductFilterSelect />
          </div>
          <GridIconList />
        </div>
      </div>
      <div className={`grid md:grid-cols-3 sm:grid-cols-2 gap-3 mt-3`}>
        <ProductCard imageHeight={"550px"} />
        <ProductCard imageHeight={"550px"} />
        <ProductCard imageHeight={"550px"} />
        <ProductCard imageHeight={"550px"} />
      </div>
    </div>
  );
}
