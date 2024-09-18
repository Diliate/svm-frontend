"use client";

import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const Hero = () => {
  const images = ["/banner1.png", "/banner2.png", "/banner3.png"];

  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute z-10 flex items-center justify-center w-16 h-16 text-white duration-200 -translate-y-1/2 bg-black bg-opacity-50 rounded-full left-6 hover:bg-opacity-75 top-1/2"
    >
      <FaChevronLeft size={40} />
    </button>
  );

  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute z-10 flex items-center justify-center w-16 h-16 text-white duration-200 -translate-y-1/2 bg-black bg-opacity-50 rounded-full right-6 hover:bg-opacity-75 top-1/2"
    >
      <FaChevronRight size={40} />
    </button>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <section className="mb-10">
      <div>
        <Slider {...settings}>
          {images.map((img, index) => (
            <div key={index} className="relative w-full h-[80vh]">
              <Image
                src={img}
                alt={`Banner ${index}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Hero;
