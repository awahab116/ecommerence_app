import React from "react";
import SearchBar from "@/components/ui/searchBar";
import Image from "next/image";
import Link from "next/link";
import AccountAndCart from "@/components/accountCart";
import MenuItems from "@/components/menuItems";

export default function Navbar() {
  return (
    <div className="relative bg-black text-white">
      <div className="flex flex-wrap justify-between items-center px-10 py-0">
        <SearchBar />

        <Link href="/">
          <Image
            src="/Main_Logo.avif"
            alt="Picture of the author"
            width={240}
            height={52}
          />
        </Link>

        <AccountAndCart />
      </div>

      <div className="border-b-[0.5px] border-gray"></div>

      <MenuItems />
    </div>
  );
}
