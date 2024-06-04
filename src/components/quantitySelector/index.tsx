import React, { useState } from "react";

export default function QuantitySelector() {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="inline-flex items-center border border-gray-300 w-auto tabular-nums">
      <button className="px-[10px] " onClick={decrementQuantity}>
        -
      </button>
      <span className="px-1 py-[5px]">{quantity}</span>
      <button className="px-[10px]" onClick={incrementQuantity}>
        +
      </button>
    </div>
  );
}
