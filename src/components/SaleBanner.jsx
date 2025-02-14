import Link from "next/link";
import React from "react";

const SaleBanner = () => {
  return (
    <section className="relative hidden w-full overflow-hidden md:block">
      <video className="w-full" preload="none" autoPlay loop muted playsInline>
        <source src="/sale-banner.mp4" type="video/mp4" />
      </video>
      <div className="absolute transform left-44 bottom-14">
        <Link
          href={"/offer"}
          className="py-3 text-xl font-bold text-white transition duration-200 bg-black rounded-lg shadow-md px-7 hover:opacity-85"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
};

export default SaleBanner;
