import Image from "next/image";
import Link from "next/link";
import { ProductInfo } from "@/interfaces/product.interface";

export default function ProductListCard({ product }: { product: ProductInfo }) {
  return (
    <Link href={`/product-detail/${product.id}`}>
      <div className="flex bg-gray-200">
        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={300}
          className="min-w-[200px] min-h-[300px] object-fill"
        />
        <div className="flex justify-between items-center w-full p-5 gap-3">
          <div className="flex-grow min-w-0">
            <h2 className="text-[16px] font-normal leading-5">
              {product.title}
            </h2>
            <p className="text-[16px] font-normal text-gray-400 leading-10">
              {product.category}
            </p>
          </div>
          <div className="flex-shrink-0">
            <p className="text-[18px] font-semibold text-[#C21010]">
              Rs {product.price}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
