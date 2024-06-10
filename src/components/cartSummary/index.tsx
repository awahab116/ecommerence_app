import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/provider/redux/store";

interface CartSummaryProps {
  handleCheckout: () => void;
  isError: boolean;
  isLoading: boolean;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  handleCheckout,
  isError,
  isLoading,
}) => {
  const cart = useSelector((state: RootState) => state.cart);

  return (
    <>
      <div className="flex items-center w-full mt-5">
        <p className="text-black pr-3">E-Gift Card:</p>
        <Input
          className="m-w-[250px]"
          placeholder="GK-123456789ABCD-1234"
          maxLength={20}
        />
      </div>
      <div className="p-5 border-t border-gray-300">
        <div className="flex justify-between mb-5">
          <p className="font-bold text-black">Subtotal</p>
          <p className="font-bold text-black">
            Rs {cart.totalPrice.toFixed(2)}
          </p>
        </div>

        {isLoading ? (
          <Button
            className="bg-[#C21010] text-white font-bold rounded-[25px] mb-5 w-full"
            disabled
          >
            Processing...
          </Button>
        ) : (
          <Button
            className="bg-[#C21010] text-white font-bold rounded-[25px] mb-5 w-full"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </Button>
        )}
        {isError && (
          <p className="text-red-500 text-center">Something went wrong</p>
        )}

        <div className="flex items-center">
          <p className="text-black text-[14px] text-center">
            Taxes included. Shipping and discount codes calculated at checkout.
          </p>
        </div>
      </div>
    </>
  );
};

export default CartSummary;
