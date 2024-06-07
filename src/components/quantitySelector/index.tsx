import React, { useState } from "react";

interface QuantitySelectorProps {
  initialQuantity: number;
  disabled: boolean;
  onQuantityChange: (quantity: number) => void;
}

export default function QuantitySelector({
  initialQuantity,
  disabled,
  onQuantityChange,
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initialQuantity);
  console.log("initialQuantity", initialQuantity);

  const incrementQuantity = () => {
    if (!disabled) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
    }
  };

  const decrementQuantity = () => {
    if (!disabled && quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
    }
  };

  return (
    <div className="inline-flex items-center border border-gray-300 w-auto tabular-nums">
      <button
        className="px-[10px]"
        onClick={decrementQuantity}
        disabled={disabled}
      >
        -
      </button>
      <span className="px-1 py-[5px]">{quantity}</span>
      <button
        className="px-[10px]"
        onClick={incrementQuantity}
        disabled={disabled}
      >
        +
      </button>
    </div>
  );
}
