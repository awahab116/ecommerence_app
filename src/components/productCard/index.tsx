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

export default function ProductCard({
  product,
  height,
}: {
  product: ProductInfo;
  height: string;
}) {
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
            // objectFit="cover"
            // layout="responsive"
            className={`rounded-t-[15px] ${
              height == "400px"
                ? "h-[400px]"
                : height == "250px"
                ? "h-[250px]"
                : "h-[600px]"
            } w-full object-contain`}
          />
        </CardHeader>
        <CardContent className="bg-gray-50 p-4 h-full">
          <CardTitle className="text-[16px] font-normal overflow-hidden whitespace-nowrap text-ellipsis leading-8">
            {product.title}
          </CardTitle>
          <CardDescription className="text-[16px] font-normal text-gray-400 overflow-hidden whitespace-nowrap text-ellipsis leading-10">
            {product.description}
          </CardDescription>
          <CardDescription className="text-[18px] font-semibold text-[#C21010]">
            Rs {product.price}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
