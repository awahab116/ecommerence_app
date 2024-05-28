import React from "react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function ProductCard() {
  return (
    <Card className="rounded-[15px] overflow-hidden">
      <CardHeader className="p-0 m-0">
        <div className="relative w-full h-[550px]">
          <Image
            src="/card-image.webp"
            alt="Product Image"
            layout="fill"
            objectFit="cover"
            className="rounded-t-[15px]"
          />
        </div>
      </CardHeader>
      <CardContent className="bg-gray-100 p-4">
        <CardTitle>Product 1</CardTitle>
        <CardDescription>Product Description</CardDescription>
        <div>Product Price</div>
      </CardContent>
    </Card>
  );
}
