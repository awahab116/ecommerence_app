"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Product from "@/components/product";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import UserReview from "@/components/userReview";
import { useGetProductByIdQuery } from "@/provider/redux/query/product";

export default function ProductDetails() {
  const params = useParams<{ id: string }>();
  console.log(params);
  const {
    data: product,
    error,
    isLoading,
  } = useGetProductByIdQuery(Number(params.id));
  console.log("product data by id is ", product);

  const [activeTab, setActiveTab] = useState<"reviews" | "questions">(
    "reviews"
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading product data.</p>;

  return (
    <div className="pt-10">
      {product && <Product product={product} />}
      <Image
        width={1600}
        height={500}
        layout="responsive"
        src="/product-detail-page.webp"
        alt="Product detail page"
      />
      <div className="px-10">
        <div className="flex pt-[45px]">
          <div
            className={`flex items-center justify-center w-full cursor-pointer ${
              activeTab === "reviews"
                ? "border-b-[6px] border-black"
                : "text-gray-500 border-b-[6px] border-gray-500"
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            <h2 className="text-2xl pb-[15px]">Reviews</h2>
          </div>
          <div
            className={`flex items-center justify-center w-full cursor-pointer ${
              activeTab === "questions"
                ? "border-b-[6px] border-black"
                : "text-gray-500 border-b-[6px] border-gray-500"
            }`}
            onClick={() => setActiveTab("questions")}
          >
            <h2 className="text-2xl pb-[15px]">Questions</h2>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center pt-6">
          <div className="flex gap-2">
            <h2 className="text-4xl font-bold">4.9/5 </h2>
            <div className="flex gap-1">
              {Array(5)
                .fill("")
                .map((_, index) => (
                  <Image
                    key={index}
                    src="/review-star.svg"
                    width={30}
                    height={30}
                    alt="Star Icon"
                  />
                ))}
            </div>
          </div>
          <p className="text-gray-500 ">Based on 62 Reviews</p>
        </div>
        <div className="flex justify-between">
          <Input
            placeholder="Search for name or content"
            className="w-[300px]"
          />
          <Button className="bg-black text-white px-16">Write a Review</Button>
        </div>
        <div className="flex justify-between pt-12">
          <p>Showing 5 reviews</p>
          <div className="flex gap-3">
            <Button className="bg-gray-300 text-black">Filters</Button>
            <Button className="bg-gray-300 text-black">Sort</Button>
          </div>
        </div>
        <UserReview />
        <UserReview />
        <UserReview />
        <UserReview />
      </div>
    </div>
  );
}
