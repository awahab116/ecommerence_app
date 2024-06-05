import React, { useState } from "react";
import CartItem from "../cartItem";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/provider/redux/store";

export default function Cart() {
  const [isAddingNote, setIsAddingNote] = useState(false);
  const cart = useSelector((state: RootState) => state.cart);

  const handleAddNoteClick = () => {
    setIsAddingNote(true);
  };

  const handleCloseNoteClick = () => {
    setIsAddingNote(false);
  };

  return (
    <div className="flex flex-col max-h-calc-height">
      <div className="overflow-auto px-5 pt-5 flex-grow">
        {cart.products.map((item) => (
          <CartItem
            key={item.productId}
            productId={item.productId}
            quantity={item.quantity}
          />
        ))}
        <div className="mt-5">
          <div className="flex items-center">
            <p className="text-black">Add Order note </p>
            {!isAddingNote ? (
              <span
                className="text-black cursor-pointer"
                onClick={handleAddNoteClick}
              >
                O
              </span>
            ) : (
              <span
                className="text-black cursor-pointer"
                onClick={handleCloseNoteClick}
              >
                X
              </span>
            )}
          </div>
          {isAddingNote && (
            <textarea
              className="w-full mt-2 p-2 border text-black"
              rows={5}
              placeholder="Add your note here..."
            ></textarea>
          )}
        </div>
        <div className="flex items-center w-full mt-5">
          <p className="text-black pr-3">E-Gift Card:</p>
          <Input
            className="m-w-[250px]"
            placeholder="GK-123456789ABCD-1234"
            maxLength={20}
          />
        </div>
      </div>
      <div className="bg-white p-5 border-t border-gray-300">
        <div className="flex justify-between mb-5">
          <p className="font-bold text-black">Subtotal</p>
          <p className="font-bold text-black">
            Rs {cart.totalPrice.toFixed(2)}
          </p>
        </div>
        <Button className="bg-[#C21010] text-white font-bold rounded-[25px] mb-5 w-full">
          Checkout
        </Button>
        <div className="flex items-center">
          <p className="text-black text-[14px] text-center">
            Taxes included. Shipping and discount codes calculated at checkout.
          </p>
        </div>
      </div>
    </div>
  );
}
