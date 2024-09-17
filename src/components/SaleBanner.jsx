import React from "react";

const SaleBanner = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <video className="w-full" preload="none" autoPlay loop muted>
        <source src="/sale-banner.mp4" type="video/mp4" />
      </video>
      <div className="absolute transform left-44 bottom-48">
        <button className="py-3 text-xl font-bold text-white transition duration-200 bg-black rounded-lg shadow-md px-7 hover:opacity-90">
          Shop Now
        </button>
      </div>
    </section>
  );
};

export default SaleBanner;
