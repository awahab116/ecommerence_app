"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/provider/redux/store";
import { Button } from "../ui/button";
import CartItem from "../cartItem";
import OrderNote from "../orderNote";
import CartSummary from "@/components/cartSummary";
import { useAddCartMutation } from "@/provider/redux/mutation";
import { useRouter } from "next/navigation";

export default function Cart() {
  const [addCart, { isError, isLoading }] = useAddCartMutation();
  const cart = useSelector((state: RootState) => state.cart);
  const router = useRouter();

  const handleCheckout = () => {
    addCart(cart)
      .unwrap()
      .then((res) => {
        console.log("Res is ", res);
        router.push("/checkout");
      });
  };

  return (
    <>
      {cart.products.length === 0 ? (
        <div className="flex flex-col justify-center items-center pt-20 mb-10">
          <h2 className="text-2xl">Cart</h2>
          <p className="my-[10px]"> Your cart is currently empty.</p>
          <Button className="bg-[#C21010] text-white font-bold rounded-[25px] mb-5">
            Continue Shopping
          </Button>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          {cart.products.map((item) => (
            <CartItem
              key={item.productId}
              productId={item.productId}
              quantity={item.quantity}
              disableQuantityChange={false}
            />
          ))}
          <div className="flex flex-col flex-shrink flex-grow-0 basis-[35%] bg-gray-300 p-[30px] ">
            <OrderNote />
            <CartSummary
              handleCheckout={handleCheckout}
              isError={isError}
              isLoading={isLoading}
            />
          </div>
        </div>
      )}
    </>
  );
}
