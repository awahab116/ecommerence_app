import React from "react";
import Image from "next/image";
import ProductCard from "@/components/productCard";
import Sidebar from "@/components/sidebar";

const CollectionLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main>
      <div className="w-full">
        <Image
          src="/home-image1.webp"
          alt="Home Image"
          layout="responsive"
          width={1920}
          height={1080}
        />
      </div>
      <div className="pt-[25px] mt-[35px] px-0 md:px-10">
        <div className="grid grid-cols-[1fr] sm:grid-cols-[1fr_5fr]">
          <Sidebar />
          {children}
        </div>
        <div className="flex flex-col w-full my-[60px]">
          <h1 className="font-bold text-2xl">Recently reviewed</h1>
          <div
            className={`grid grid-cols-auto-fill-minmax gap-3 mt-3 overflow-x-auto`}
          >
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </div>
    </main>
  );
};

export default CollectionLayout;
