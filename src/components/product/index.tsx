import React, { useState } from "react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import QuantitySelector from "../quantitySelector";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/provider/redux/store";
import { addProduct } from "@/provider/redux/cartSlice";
import { useGetProductByIdQuery } from "@/provider/redux/query";
import ProductTabs from "@/components/productTabs";

export default function Product({ productId }: { productId: number }) {
  const [quantity, setQuantity] = useState<number>(1);
  const dispatch: AppDispatch = useDispatch();
  const { data: product, error, isLoading } = useGetProductByIdQuery(productId);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading product data.</p>;

  const handleAddToCart = () => {
    if (product) {
      dispatch(
        addProduct({ productId: product.id, quantity, price: product.price })
      );
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <div className="grid grid-cols-2 gap-5 px-10">
      {product && (
        <>
          <div className="flex gap-3 mt-[10px] w-calc-width">
            <div>
              <div
                className={`relative h-[120px] w-[80px] overflow-hidden border ${
                  selectedImage === product.image
                    ? "border-gray-500"
                    : "border-gray-300"
                } mb-[15px] cursor-pointer`}
                onClick={() => handleImageClick(product.image)}
              >
                <Image
                  src={product.image}
                  alt={product.description}
                  objectFit="fill"
                  layout="fill"
                />
              </div>
              <div
                className={`relative h-[120px] w-[80px] overflow-hidden border-[2px] ${
                  selectedImage === "/card-image.webp"
                    ? "border-black"
                    : "border-transparent"
                } mb-[15px] cursor-pointer`}
                onClick={() => handleImageClick("/card-image.webp")}
              >
                <Image
                  src="/card-image.webp"
                  alt={product.description}
                  objectFit="fill"
                  layout="fill"
                />
              </div>
            </div>
            <Image
              src={selectedImage || product.image}
              alt={product.description}
              width={800}
              height={1200}
              layout="responsive"
            />
          </div>
          <div className="flex flex-col gap-5 pt-[65px] pl-[45px]">
            <h1 className="font-bold text-3xl">{product.title}</h1>
            <div>
              <div className="flex gap-2">
                <div className="flex gap-1">
                  {Array(5)
                    .fill("")
                    .map((_, index) => (
                      <Image
                        key={index}
                        src="/review-star.svg"
                        width={20}
                        height={20}
                        alt="Star Icon"
                      />
                    ))}
                </div>
                <div>62 reviews</div>
              </div>
              <p>Our Best Oud Fragrance</p>
            </div>
            <div>
              <p>Format</p>
              <Select defaultValue="100ml" value="100ml">
                <SelectTrigger className="w-auto border-[2px] border-black p-2">
                  <SelectValue placeholder="Product Variants" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Format</SelectLabel>
                    <SelectItem value="100ml">100ml</SelectItem>
                    <SelectItem value="200ml">200ml</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <p>Price</p>
              <h2 className="text-2xl text-red-500">${product.price}</h2>
            </div>
            <div>
              <p>Quantity</p>
              <QuantitySelector
                onQuantityChange={handleQuantityChange}
                initialQuantity={quantity}
                disabled={false}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Image
                  src="/review-star.svg"
                  width={20}
                  height={20}
                  alt="Star Icon"
                />
                <p>15 Days Easy Returns</p>
              </div>
              <div className="flex gap-2">
                <Image
                  src="/review-star.svg"
                  width={20}
                  height={20}
                  alt="Star Icon"
                />
                <p>Surprise in Every Order</p>
              </div>
              <div className="flex gap-2">
                <Image
                  src="/review-star.svg"
                  width={20}
                  height={20}
                  alt="Star Icon"
                />
                <p>Award Winning Fragrance Brand</p>
              </div>
            </div>
            <div>
              <p className="font-bold">Is it a gift?</p>
            </div>
            <Button
              className="font-bold rounded-[25px] bg-[#C21010] hover:bg-[#C21010]"
              onClick={handleAddToCart}
            >
              Add To Cart
            </Button>
            <ProductTabs />
          </div>
        </>
      )}
    </div>
  );
}
