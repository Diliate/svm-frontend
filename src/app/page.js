import Banner from "@/components/Banner";
import Blogs from "@/components/Blogs";
import Featured from "@/components/Featured";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import ProductList from "@/components/ProductList";
import SaleBanner from "@/components/SaleBanner";

export default function Home() {
  return (
    <div>
      <Hero />
      <ProductList />
      <Banner />
      <Features />
      <SaleBanner />
      <Blogs />
      <Featured />
    </div>
  );
}
