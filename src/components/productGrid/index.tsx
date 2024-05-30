import React from "react";
import ProductCard from "@/components/productCard";

export default function ProductGrid({ itemsPerRow }: { itemsPerRow: number }) {
  return (
    <div className={`grid md:grid-cols-3 sm:grid-cols-2 gap-3 mt-3`}>
      {/* <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard /> */}
    </div>
  );
}
