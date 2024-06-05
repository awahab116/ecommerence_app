"use client";
import React, { useState } from "react";
import SearchBar from "@/components/ui/searchBar";
import Image from "next/image";
import Link from "next/link";
import Cart from "@/components/cart"; // Import your Cart component
import { useSelector } from "react-redux";
import { RootState } from "@/provider/redux/store";

export default function Navbar() {
  const [showCart, setShowCart] = useState(false);
  const cart = useSelector((state: RootState) => state.cart);
  console.log("cart data is ", cart);

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  return (
    <div className="relative bg-black text-white">
      {/* Line 1 */}
      <div className="flex flex-wrap justify-between items-center px-10 py-0">
        <SearchBar />
        {/* <div>Icon</div> */}
        <Link href="/">
          <Image
            src="/Main_Logo.avif"
            alt="Picture of the author"
            width={240}
            height={52}
          />
        </Link>
        <div className="flex align-center">
          <Link href="/login" className="flex align-end px-3 py-4">
            <Image
              src="/profile.svg"
              width={27}
              height={27}
              alt="Profile Icon"
            />
            <span className="ml-[15px]">Account</span>
          </Link>
          <div
            onClick={toggleCart}
            className="flex align-end px-3 py-4 cursor-pointer"
          >
            <Image src="/cart.svg" width={27} height={27} alt="Cart Icon" />
            <span className="ml-[15px]">Cart {cart.products.length}</span>
          </div>
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

      {/* Cart Menu */}
      {showCart && (
        <div className="absolute top-[60px] right-[92px] w-full h-full flex justify-end z-50">
          <div className="bg-white w-[450px] h-fit overflow-y-auto shadow-lg">
            <Cart />
          </div>
        </div>
      )}
    </div>
  );
}
