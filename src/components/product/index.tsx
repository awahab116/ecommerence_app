import React from "react";
import { useState } from "react";
import Image from "next/image";
import { ProductInfo } from "@/interfaces/productInfo.interface";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import QuantitySelector from "../quantitySelector";
import { Button } from "../ui/button";

type TabData = {
  [key: string]: string;
};

const productTabs = [
  "BRIEF",
  "DESCRIPTION",
  "PERFORMANCE",
  "SHIPPING",
  "UNBOXING VIDEO",
];

export default function Product({ product }: { product: ProductInfo }) {
  const [selectedTab, setSelectedTab] = useState<string>("BRIEF");

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  const tabData: TabData = {
    BRIEF: "Brief description of the product",
    DESCRIPTION: "Detailed description of the product",
    PERFORMANCE: "Performance metrics of the product",
    SHIPPING: "Shipping information",
    "UNBOXING VIDEO": "Watch the unboxing video",
  };

  return (
    <div className="grid grid-cols-2 gap-5 px-10">
      <div className="flex gap-3 mt-[10px]">
        <div>
          <div className="relative h-[120px] w-[80px] overflow-hidden border border-gray-300 mb-[15px] ">
            <Image
              src={product.image}
              alt={product.description}
              objectFit="fill"
              layout="fill"
            />
          </div>
          <div className="relative h-[120px] w-[80px] overflow-hidden border border-gray-300 mb-[15px]">
            <Image
              src={product.image}
              alt={product.description}
              objectFit="fill"
              layout="fill"
            />
          </div>
        </div>
        <Image
          src={product.image}
          alt={product.description}
          width={800}
          height={1200}
          layout="responsive"
        />
      </div>
      <div className="flex flex-col gap-5 pt-[65px] pl-[45px]">
        <h1 className="font-bold text-3xl">{product.title}</h1>
        <div>
          <div className="flex gap-2">
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
            </div>
            <div>62 reviews</div>
          </div>
          <p>Our Best Oud Fragrance</p>
        </div>
        <div>
          <p>Format</p>
          <Select defaultValue="100ml" value="100ml">
            <SelectTrigger className="w-auto border-[2px] border-black p-2">
              <SelectValue placeholder="Product Variants" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Format</SelectLabel>
                <SelectItem value="100ml">100ml</SelectItem>
                <SelectItem value="200ml">200ml</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <p>Price</p>
          <h2 className="text-2xl text-red-500">${product.price}</h2>
        </div>
        <div>
          <p>Quantity</p>
          <QuantitySelector />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Image
              src="/review-star.svg"
              width={20}
              height={20}
              alt="Star Icon"
            />
            <p>15 Days Easy Returns</p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/review-star.svg"
              width={20}
              height={20}
              alt="Star Icon"
            />
            <p>Surprise in Every Order</p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/review-star.svg"
              width={20}
              height={20}
              alt="Star Icon"
            />
            <p>Award Winning Fragrance Brand</p>
          </div>
        </div>
        <div>
          <p className="font-bold">is it gift?</p>
        </div>
        <Button className="font-bold rounded-[25px] bg-[#C21010] hover:bg-[#C21010]">
          Add To Cart
        </Button>

        <div>
          <ul className="flex items-center justify-between bg-black font-bold text-white rounded-t-lg">
            {[
              "BRIEF",
              "DESCRIPTION",
              "PERFORMANCE",
              "SHIPPING",
              "UNBOXING VIDEO",
            ].map((tab) => (
              <li
                key={tab}
                className={`px-2 py-2 cursor-pointer text-center ${
                  selectedTab === tab ? "bg-[#B5B3B3] text-black" : ""
                }`}
                onClick={() => handleTabClick(tab)}
              >
                {tab}
              </li>
            ))}
          </ul>
          <div className="border border-gray-300">
            <p>{tabData[selectedTab]}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
