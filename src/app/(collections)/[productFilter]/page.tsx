import PageHeading from "@/components/pageHeading";
import Product from "@/components/productView";

export default function Home() {
  //Will pass the props regards the sidebar filter to show that products
  return (
    <div>
      <PageHeading title="Filter Search Products" />
      <Product />
    </div>
  );
}
