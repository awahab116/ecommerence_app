import React from "react";
import Image from "next/image";
import QuantitySelector from "../quantitySelector";
import { useGetProductByIdQuery } from "@/provider/redux/query/product";

interface CartItemProps {
  productId: number;
}

const CartItem: React.FC<CartItemProps> = ({ productId }) => {
  const { data: product, error, isLoading } = useGetProductByIdQuery(productId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading product</div>;

  return (
    <div className="flex justify-start items-start gap-2 pb-5 border-b border-gray-300 mb-5 text-black">
      <Image
        width={100}
        height={100}
        src={product?.image || "/cart-product.webp"}
        alt={product?.title || "Product Image"}
        className="h-[100px] w-[100px] object-contain"
      />
      <div className="flex flex-col w-full">
        <p className="text-[18px] overflow-hidden whitespace-nowrap text-ellipsis">
          {product?.title || "Product Name"}
        </p>
        <div>
          <p className="text-[14px]">
            {" "}
            <b>Category:</b> {product?.category || "Product Category"}
          </p>
        </div>
        <div className="flex justify-between">
          <QuantitySelector />
          <p className="text-[18px] font-bold ">
            Rs. {product?.price || "Product Price"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
