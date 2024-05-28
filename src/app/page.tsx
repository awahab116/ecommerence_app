import PageHeading from "@/components/pageHeading";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import GridIconList from "@/components/gridIconList";
import { ProductFilterSelect } from "@/components/ProductSelect";
import ProductCard from "@/components/productCard";

export default function Home() {
  return (
    <main>
      <PageHeading />
      <div className="pt-[25px] mt-[35px]">
        <div className="grid grid-cols-[1fr_5fr] px-10 ">
          <div>Sidebar</div>
          <div>
            <div className="flex justify-between items-center">
              <span>Number of Products</span>
              <div className="flex">
                <div className="pr-[15px] mr-[15px] border-r border-gray-300">
                  <ProductFilterSelect />
                </div>
                <GridIconList />
              </div>
            </div>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-3 mt-3">
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              {/* <div>Product 1</div>
              <div>Product 2</div>
              <div>Product 3</div>
              <div>Product 4</div> */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
