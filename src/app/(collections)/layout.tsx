import React from "react";
import Image from "next/image";
import Sidebar from "@/components/sidebar";
import RecentProducts from "@/components/recentProducts";

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
          width={1920}
          height={1080}
        />
      </div>
      <div className="pt-[25px] mt-[35px] px-0 md:px-10">
        <div className="grid grid-cols-[1fr] sm:grid-cols-[1fr_5fr]">
          <Sidebar />
          {children}
        </div>
        <RecentProducts />
      </div>
    </main>
  );
};

export default CollectionLayout;
