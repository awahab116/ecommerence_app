import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ProductInfo } from "@/interfaces/product.interface";

export default function ProductCard({ product }: { product: ProductInfo }) {
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Link href={`/product-detail/${product.id}`}>
      <Card className="rounded-[15px] overflow-hidden h-full">
        <CardHeader className="p-0 m-0">
          <Image
            src={product.image}
            alt={product.title}
            width={200}
            height={200}
            layout="responsive"
            className="rounded-t-[15px]"
          />
        </CardHeader>
        <CardContent className="bg-gray-100 p-4">
          <CardTitle>{product.title}</CardTitle>
          <CardDescription>{product.description}</CardDescription>
          <div>${product.price}</div>
        </CardContent>
      </Card>
    </Link>
  );
}
