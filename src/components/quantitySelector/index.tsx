import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProductQuantity } from "@/provider/redux/cartSlice";

interface QuantitySelectorProps {
  productId: number;
  initialQuantity: number;
  price: number;
}

export default function QuantitySelector({
  productId,
  initialQuantity,
  price,
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initialQuantity);
  const dispatch = useDispatch();

  const incrementQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    dispatch(
      updateProductQuantity({ productId, price, quantity: newQuantity })
    );
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      dispatch(
        updateProductQuantity({ productId, price, quantity: newQuantity })
      );
    }
  };

  return (
    <div className="inline-flex items-center border border-gray-300 w-auto tabular-nums">
      <button className="px-[10px]" onClick={decrementQuantity}>
        -
      </button>
      <span className="px-1 py-[5px]">{quantity}</span>
      <button className="px-[10px]" onClick={incrementQuantity}>
        +
      </button>
    </div>
  );
}
