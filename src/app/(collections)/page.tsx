import PageHeading from "@/components/pageHeading";
import Product from "@/components/productView";

export default function Home() {
  return (
    <div className="pl-[22px]">
      <PageHeading title="Home Products" />
      <Product />
    </div>
  );
}
