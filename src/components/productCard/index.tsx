"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ResponsiveDialog } from "@/components/responsiveDialog";
import Product from "@/components/product";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/provider/redux/store";
import { addProduct } from "@/provider/redux/cartSlice";
import { ProductInfo } from "@/interfaces/product.interface";
import { Plus, Search } from "lucide-react";

export default function ProductCard({
  product,
  height,
}: {
  product: ProductInfo;
  height: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const handleAddToCart = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (product) {
      dispatch(
        addProduct({ productId: product.id, quantity: 1, price: product.price })
      );
    }
  };

  const handleProductDialogOpen = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsOpen(true);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ResponsiveDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isHeightFull={true}
        title="Product Details"
      >
        <Product productId={product.id} />
      </ResponsiveDialog>

      <Link href={`/product-detail/${product.id}`}>
        <Card
          className="rounded-[15px] relative group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <CardHeader className="p-0 m-0 relative">
            <Image
              src={isHovered ? "/card-image.webp" : product.image}
              alt={product.title}
              width={200}
              height={200}
              className={`rounded-t-[15px] ${
                height == "400px"
                  ? "h-[400px]"
                  : height == "250px"
                  ? "h-[250px]"
                  : "h-[600px]"
              } w-full object-fill`}
            />
            <div className="absolute text-[12px] bottom-0 left-0 bg-[#C21010] text-white p-1">
              SALE
            </div>

            <Search
              className="absolute top-[-2px] right-[-8px] text-white bg-[#C21010] rounded-full p-1 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-125 z-50"
              onClick={handleProductDialogOpen}
            />
            <Plus
              className="absolute top-9 right-[-8px] text-white bg-[#C21010] rounded-full p-1 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-125 z-50"
              onClick={handleAddToCart}
            />
          </CardHeader>
          <CardContent className="bg-gray-50 p-4 rounded-b-[15px] overflow-hidden">
            <CardTitle className="text-[16px] font-normal overflow-hidden whitespace-nowrap text-ellipsis leading-8">
              {product.title}
            </CardTitle>
            <CardDescription className="text-[16px] font-normal text-gray-400 overflow-hidden whitespace-nowrap text-ellipsis leading-10">
              {product.description}
            </CardDescription>
            <CardDescription className="flex gap-3">
              <p className="text-[18px] font-semibold text-[#C21010]">
                {" "}
                Rs {product.price}
              </p>
              <p className="text-[12px] font-semibold text-[#C21010] line-through">
                {" "}
                Rs {product.price}
              </p>
            </CardDescription>
          </CardContent>
        </Card>
      </Link>
    </>
  );
}
