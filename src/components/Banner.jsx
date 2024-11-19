import Image from "next/image";
import Link from "next/link";
import React from "react";

const Banner = () => {
  return (
    <section className="px-5 py-10 md:px-10">
      <div className="flex flex-col justify-center gap-10 md:flex-row">
        <Image
          src="/banner.png"
          alt="banner"
          width={350}
          height={400}
          className="rounded-lg"
        />

        <div className="flex flex-col w-auto">
          <p className="mb-2 font-light uppercase md:text-lg">
            simple and best
          </p>
          <h1 className="mb-5 text-3xl font-semibold md:text-4xl">
            Deep nourishment of Hair and <br className="hidden md:block" />{" "}
            Enhancing our skin for a Luminous glow
          </h1>
          <p className="mb-5 text-xl text-justify text-gray-500 md:text-2xl">
            In a world where modern medicine often takes the spotlight, the
            ancient wisdom of Ayurveda continues to thrive, offering a holistic
            and natural approach to health and well-being. Rooted in
            India&apos;s rich heritage, Ayurveda is more than just a system of
            medicine—it&apos;s a way of life that promotes balance, harmony, and
            alignment with nature.
          </p>
          <p className="mb-5 text-xl text-justify text-gray-500 md:text-2xl">
            Focused on personalized care, Ayurveda emphasizes prevention, using
            natural remedies, dietary guidance, and lifestyle practices to
            maintain health and vitality. Its time-tested principles remind us
            of the importance of reconnecting with nature and achieving harmony
            between the mind, body, and spirit in today&apos;s fast-paced world.
            achieving harmony between the mind, body, and spirit in today&apos;s
            fast-paced world.
          </p>
          <Link href={"/about"}>
            <button className="px-4 py-2 text-xl text-white duration-200 bg-black rounded-md shadow-lg hover:opacity-85">
              Know More
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;
