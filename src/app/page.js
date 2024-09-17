import Banner from "@/components/Banner";
import Blogs from "@/components/Blogs";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import SaleBanner from "@/components/SaleBanner";

export default function Home() {
  return (
    <div>
      <Hero />
      <Banner />
      <Features />
      <SaleBanner />
      <Blogs />
    </div>
  );
}
