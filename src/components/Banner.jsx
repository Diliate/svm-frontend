import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <section className="px-10 py-10">
      <div className="flex justify-center gap-10">
        <Image
          src="/banner.png"
          alt="banner"
          width={300}
          height={400}
          className="rounded-lg"
        />

        <div className="w-[800px] flex flex-col">
          <p className="mb-2 text-lg font-light uppercase">simple and best</p>
          <h1 className="mb-5 text-4xl font-semibold">
            Deep nourishment of Hair and <br /> Enhancing our skin for a
            Luminous glow
          </h1>
          <p className="mb-5 text-2xl text-justify text-gray-500">
            In a world where modern medicine often takes the spotlight, the
            ancient wisdom of Ayurveda continues to thrive, offering a holistic
            approach to health and well-being. Rooted in India's rich heritage,
            Ayurveda is more than just a system of medicine&mdash;it's a way of
            life that emphasizes balance, harmony, and connection with nature.
          </p>
          <div>
            <button className="px-4 py-2 text-xl text-white duration-200 bg-black rounded-md shadow-lg hover:opacity-85">
              Know More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
