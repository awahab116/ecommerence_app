"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import CartMenu from "@/components/cartMenu";
import { useSelector } from "react-redux";
import { RootState } from "@/provider/redux/store";
import { useSession, signOut } from "next-auth/react";

const AccountAndCart: React.FC = () => {
  const { data: session } = useSession();
  const [showCart, setShowCart] = useState(false);
  const cart = useSelector((state: RootState) => state.cart);
  const router = useRouter();
  const pathname = usePathname();

  const toggleCart = () => {
    if (cart.products.length === 0) {
      router.push("/cart");
    } else {
      setShowCart(!showCart);
    }
  };

  return (
    <div className="flex align-center">
      {!showCart ? (
        <>
          <Link href="/cart" className="flex align-end px-3 py-4">
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
            <span className="ml-[15px]">Cart</span>
            {/* {cart.products.length && (
              <div className="relative">
                <p className="absolute top-0 right-3 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart.products.length}
                </p>
              </div>
            )} */}
          </div>

          {pathname !== "/login" &&
            (session?.user ? (
              <div
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="flex align-end px-3 py-4 cursor-pointer"
              >
                <span className="ml-[15px]">Sign Out</span>
              </div>
            ) : (
              <Link href="/login" className="flex align-end px-3 py-4">
                <span className="ml-[15px]">Sign In</span>
              </Link>
            ))}
        </>
      ) : (
        <div
          onClick={toggleCart}
          className="flex align-end px-3 py-4 cursor-pointer"
        >
          <span className="ml-[15px]">X Close</span>
        </div>
      )}
      {showCart && (
        <div className="absolute top-[60px] right-[92px] w-full h-full flex justify-end z-50">
          <div className="bg-white w-[450px] h-fit overflow-y-auto shadow-lg">
            <CartMenu setShowCart={setShowCart} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountAndCart;
