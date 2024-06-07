"use client";
import React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Product from "@/components/product";
import TabSection from "@/components/tabSection";

export default function ProductDetails() {
  const params = useParams<{ id: string }>();

  return (
    <div className="pt-10">
      <Product productId={Number(params.id)} />
      <Image
        width={1600}
        height={500}
        layout="responsive"
        src="/product-detail-page.webp"
        alt="Product detail page"
      />
      <TabSection />
    </div>
  );
}
