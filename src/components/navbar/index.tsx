import React from "react";
import SearchBar from "@/components/ui/searchBar";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="bg-black text-white ">
      {/* Line 1 */}
      <div className="flex justify-between items-center px-10 py-0">
        <SearchBar />
        {/* <div>Icon</div> */}
        <Image
          src="/Main_Logo.avif"
          alt="Picture of the author"
          width={240}
          height={52}
        />
        <div className="flex align-center">
          <Link href="/profile" className="flex align-end px-3 py-4">
            <Image
              src="/profile.svg"
              width={27}
              height={27}
              alt="Profile Icon"
            />
            <span className="ml-[15px]">Account</span>
          </Link>
          <Link href="/profile" className="flex align-end px-3 py-4">
            <Image src="/cart.svg" width={27} height={27} alt="Cart Icon" />
            <span className="ml-[15px] ">Cart</span>
          </Link>
        </div>
      </div>

      {/* Line 2 */}
      <div className="border-b-[0.5px] border-gray"></div>

      {/* Line 3 */}
      <ul className="flex flex-wrap justify-center items-center px-10 py-0">
        <li className="px-5 py-4">SHOPS</li>
        <li className="px-5 py-4">WEEKLY DEALS</li>
        <li className="px-5 py-4">LESS THAN 1500</li>
        <li className="px-5 py-4">BUNDLES</li>
        <li className="px-5 py-4">ATTARS</li>
        <li className="px-5 py-4">BLOGS</li>
        <li className="px-5 py-4">CONTACT US</li>
      </ul>
      <div className="w-full">
        <Image
          src="/home-image1.webp"
          alt="Home Image"
          layout="responsive"
          width={1920} // assuming your image has a width of 1920px
          height={1080} // assuming your image has a height of 1080px
        />
      </div>
    </div>
  );
}
