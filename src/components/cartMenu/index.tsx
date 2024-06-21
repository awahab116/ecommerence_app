import React from "react";
import CartItem from "../cartItem";
import { useSelector } from "react-redux";
import { RootState } from "@/provider/redux/store";
import OrderNote from "@/components/orderNote";
import CartSummary from "@/components/cartSummary";
import { useRouter } from "next/navigation";
import { useAddCartMutation } from "@/provider/redux/mutation";

interface CartProps {
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartMenu: React.FC<CartProps> = ({ setShowCart }) => {
  const cart = useSelector((state: RootState) => state.cart);
  const router = useRouter();
  const [addCart, { isError, isLoading }] = useAddCartMutation();

  const handleCheckout = () => {
    addCart(cart)
      .unwrap()
      .then((res) => {
        console.log("Res is ", res);
        setShowCart(false);
        router.push(`/checkout/${res.id}`);
      });
  };

  return (
    <div className=" flex flex-col max-h-calc-height">
      <div className="bg-white overflow-auto px-5 pt-5 flex-grow">
        {cart.products.map((item) => (
          <CartItem
            key={item.productId}
            productId={item.productId}
            quantity={item.quantity}
            disableQuantityChange={false}
          />
        ))}
        <OrderNote />
        <CartSummary
          handleCheckout={handleCheckout}
          isError={isError}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default CartMenu;
