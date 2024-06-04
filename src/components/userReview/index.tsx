import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

export default function UserReview() {
  return (
    <div className="flex py-8 border-b border-gray-300">
      <div className="flex flex-col gap-6 pr-[120px] border-r border-gray-300">
        <h5 className="font-bold">Abdul Wahab</h5>
        <div>
          <p className="text-[13px]">
            <b>Gender:</b> Male
            <br />
            <b>Age:</b> 18-34
          </p>
        </div>

        <Button className="bg-gray-300 text-black">Recommended</Button>
      </div>
      <div className="flex flex-col gap-4 px-8">
        <div className="flex gap-1">
          {Array(5)
            .fill("")
            .map((_, index) => (
              <Image
                key={index}
                src="/review-star.svg"
                width={20}
                height={20}
                alt="Star Icon"
              />
            ))}
          <p className="text-gray-300 text-[14px]">1 week ago</p>
        </div>
        <h5 className="font-bold">Inferno</h5>
        <p>
          It was my first experience with, my order took more than a week.
          However I received it according to my expectation. Highly recommended.
        </p>
      </div>
      <div>
        <Image
          src="/review-image.jpg"
          width={250}
          height={250}
          alt="Review Image"
        />
      </div>
    </div>
  );
}
