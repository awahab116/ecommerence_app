import React from "react";
import Image from "next/image";
import QuantitySelector from "../quantitySelector";
import { useGetProductByIdQuery } from "@/provider/redux/query/product";

interface CartItemProps {
  productId: number;
  quantity: number;
}

const CartItem: React.FC<CartItemProps> = ({ productId, quantity }) => {
  const { data: product, error, isLoading } = useGetProductByIdQuery(productId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading product</div>;

  return (
    <div className="flex justify-start items-start gap-2 pb-5 border-b border-gray-300 mb-5 text-black max-w-full overflow-hidden">
      <Image
        width={100}
        height={100}
        src={product?.image || "/cart-product.webp"}
        alt={product?.title || "Product Image"}
        className="h-[100px] w-[100px] object-contain flex-shrink-0"
      />
      <div className="flex flex-col w-full gap-2">
        <p className="text-[18px]">{product?.title || "Product Name"}</p>
        <div>
          <p className="text-[14px]">
            <b>Category:</b> {product?.category || "Product Category"}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <QuantitySelector
            productId={productId}
            initialQuantity={quantity}
            price={product?.price ? product.price : 0}
          />
          <p className="text-[18px] font-bold">
            Rs. {product?.price ? product.price * quantity : 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
