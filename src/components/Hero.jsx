import Image from "next/image";
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Hero = () => {
  const images = ["/banner1.png", "/banner2.png", "/banner3.png"];

  return (
    <section>
      <FaChevronLeft />

      <div>
        <div className="">
          {images.map((img, i) => (
            <Image
              src={img}
              key={i}
              alt=""
              objectFit="cover"
              width={100}
              height={100}
            />
          ))}
        </div>
      </div>

      <FaChevronRight />
    </section>
  );
};

export default Hero;
