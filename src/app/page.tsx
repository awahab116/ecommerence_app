import PageHeading from "@/components/pageHeading";
import Product from "@/components/product";
import GridIconList from "@/components/gridIconList";
import { ProductFilterSelect } from "@/components/productSelect";
import ProductCard from "@/components/productCard";
import ProductGrid from "@/components/productGrid";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="w-full">
        <Image
          src="/home-image1.webp"
          alt="Home Image"
          layout="responsive"
          width={1920} // assuming your image has a width of 1920px
          height={1080} // assuming your image has a height of 1080px
        />
      </div>
      <PageHeading />
      <div className="pt-[25px] mt-[35px] px-10">
        <div className="grid grid-cols-[1fr_5fr] ">
          <div>Sidebar</div>
          <Product />
        </div>
        <div className="flex flex-col w-full my-[60px]">
          <h1 className="font-bold text-2xl">Recently reviewed</h1>
          <div className={`grid md:grid-cols-5 sm:grid-cols-2 gap-3 mt-3`}>
            <ProductCard imageHeight={"250px"} />
            <ProductCard imageHeight={"250px"} />
            <ProductCard imageHeight={"250px"} />
            <ProductCard imageHeight={"250px"} />
            <ProductCard imageHeight={"250px"} />
          </div>
        </div>
      </div>
    </main>
  );
}
