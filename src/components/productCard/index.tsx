import React from "react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function ProductCard({ imageHeight }: { imageHeight: string }) {
  return (
    <Card className="rounded-[15px] overflow-hidden h-full">
      <CardHeader className="p-0 m-0">
        <div
          className="relative"
          style={{
            height: imageHeight,
          }}
        >
          <Image
            src="/card-image.webp"
            alt="Product Image"
            fill
            objectFit="fill"
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
