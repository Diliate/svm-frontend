import Banner from "@/components/Banner";
import Blogs from "@/components/Blogs";
import Featured from "@/components/Featured";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import ProductList from "@/components/ProductList";
import ProductList2 from "@/components/ProductList2";
import SaleBanner from "@/components/SaleBanner";

export default function Home() {
  return (
    <div>
      <Hero />
      <ProductList />
      <Banner />
      <Features />
      <ProductList2 />
      <SaleBanner />
      <Blogs />
      <Featured />
    </div>
  );
}
