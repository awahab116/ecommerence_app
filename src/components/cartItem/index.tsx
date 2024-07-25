import React, { useState } from "react";
import Image from "next/image";
import QuantitySelector from "../quantitySelector";
import { useGetProductByIdQuery } from "@/provider/redux/query";
import { useDispatch } from "react-redux";
import { updateProductQuantity } from "@/provider/redux/cartSlice";

interface CartItemProps {
  productId: number;
  quantity: number;
  disableQuantityChange: boolean;
}

const CartItem: React.FC<CartItemProps> = ({
  productId,
  quantity: initialQuantity,
  disableQuantityChange,
}) => {
  const { data: product, error, isLoading } = useGetProductByIdQuery(productId);
  const [quantity, setQuantity] = useState(initialQuantity);
  const dispatch = useDispatch();

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
    dispatch(
      updateProductQuantity({
        productId,
        quantity: newQuantity,
        price: product?.price,
      })
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading product</div>;

  return (
    <div
      data-testid={`cart-item-${productId}`}
      className="flex justify-start items-start gap-2 pb-5 border-b border-gray-300 mb-5 text-black max-w-full overflow-hidden"
    >
      <Image
        width={100}
        height={100}
        src={product?.image!}
        alt={product?.title!}
        className="h-[100px] w-[100px] object-contain flex-shrink-0"
        data-testid={`product-image-${productId}`}
      />
      <div className="flex flex-col w-full gap-2">
        <p className="text-[18px]" data-testid={`product-title-${productId}`}>
          {product?.title}
        </p>
        <div>
          <p
            className="text-[14px]"
            data-testid={`product-category-${productId}`}
          >
            <b>Category:</b> {product?.category}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <QuantitySelector
            initialQuantity={quantity}
            disabled={disableQuantityChange}
            onQuantityChange={handleQuantityChange}
          />
          <p
            className="text-[18px] font-bold"
            data-testid={`product-price-${productId}`}
          >
            Rs. {product?.price! * quantity}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
