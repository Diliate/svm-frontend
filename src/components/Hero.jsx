"use client";

import Image from "next/image";
import Link from "next/link"; // Import Link from next/link
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const Hero = () => {
  // Update the images array to include links
  const banners = [
    { src: "/banner1.jpg", link: "/shop", alt: "Shop Now" },
    { src: "/banner2.jpg", link: "/offer", alt: "Special Offers" },
    { src: "/banner3.png", link: "/limitedoffer", alt: "Limited Offers" },
  ];

  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute z-10 flex items-center justify-center w-8 h-8 text-white transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full md:w-12 md:h-12 left-2 md:left-4 top-1/2 hover:bg-opacity-75 focus:outline-none"
      aria-label="Previous Slide"
    >
      <FaChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
    </button>
  );

  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute z-10 flex items-center justify-center w-8 h-8 text-white transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full md:w-12 md:h-12 right-2 md:right-4 top-1/2 hover:bg-opacity-75 focus:outline-none"
      aria-label="Next Slide"
    >
      <FaChevronRight className="w-4 h-4 md:w-6 md:h-6" />
    </button>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <section className="my-10">
      <div className="relative">
        <Slider {...settings}>
          {banners.map((banner, index) => (
            <div
              key={index}
              className="relative w-full h-[30vh] sm:h-[50vh] md:h-[70vh] lg:h-[90vh]"
            >
              <Link href={banner.link} passHref>
                <Image
                  src={banner.src}
                  alt={banner.alt}
                  layout="fill"
                  priority
                />
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Hero;
