import Banner from "@/components/Banner";
import Blogs from "@/components/Blogs";
import Categories from "@/components/Categories";
import Featured from "@/components/Featured";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import ProductList from "@/components/ProductList";
import ProductList2 from "@/components/ProductList2";
import SaleBanner from "@/components/SaleBanner";

export default function Home() {
  return (
    <div className="overflow-hidden min-h-[500px]">
      <Hero />
      <Categories />
      <ProductList headline={"Our Popular Products"} />
      <Banner />
      <Features />
      <ProductList2 />
      <SaleBanner />
      <Blogs />
      <Featured />
    </div>
  );
}
