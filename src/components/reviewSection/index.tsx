import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import UserReview from "@/components/userReview";
import Image from "next/image";

const ReviewSection = () => {
  return (
    <div className="px-10">
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
        <Input placeholder="Search for name or content" className="w-[300px]" />
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
  );
};

export default ReviewSection;
