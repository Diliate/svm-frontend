"use client";

import React, { useState } from "react";
import OfferProductCard from "@/components/OfferProductCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const page = () => {
  const products = Array.from({ length: 8 });
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = products.length;
  const slidesToShow = 4.2;

  function SampleNextArrow(props) {
    const { onClick, isVisible } = props;
    return (
      isVisible && (
        <button
          className="absolute z-20 flex items-center justify-center w-16 h-16 text-white duration-200 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full -right-4 top-1/2 hover:bg-opacity-75"
          onClick={onClick}
        >
          <FaChevronRight size={40} />
        </button>
      )
    );
  }

  function SamplePrevArrow(props) {
    const { onClick, isVisible } = props;
    return (
      isVisible && (
        <button
          className="absolute z-20 flex items-center justify-center w-16 h-16 text-white duration-200 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full -left-4 top-1/2 hover:bg-opacity-75"
          onClick={onClick}
        >
          <FaChevronLeft size={40} />
        </button>
      )
    );
  }

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 3,
    nextArrow: (
      <SampleNextArrow isVisible={currentSlide < totalSlides - slidesToShow} />
    ),
    prevArrow: <SamplePrevArrow isVisible={currentSlide > 0} />,
    beforeChange: (current, next) => setCurrentSlide(next),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="pt-16">
      <div className="h-[320px] w-full relative overflow-hidden">
        <video
          preload="none"
          autoPlay
          loop
          muted
          className="absolute top-0 object-cover w-full h-full transform -translate-x-1/2 left-1/2"
        >
          <source src="/latest.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="p-10">
        <h3 className="mb-2 text-2xl font-light uppercase ">
          our popular products
        </h3>
        <h1 className="text-5xl font-medium w-[560px]">
          Get 50% off Latest Herbal Collections
        </h1>

        <div className="grid grid-cols-4 gap-16 mt-10">
          {products.map((_, index) => (
            <div key={index} className="mb-10">
              <OfferProductCard />
            </div>
          ))}
        </div>

        <div className="mt-10">
          <h3 className="mb-2 text-2xl font-light uppercase">new arrivals</h3>
          <h2 className="mb-10 text-4xl font-medium">Recent View Product</h2>
          <Slider {...settings}>
            {products.map((_, index) => (
              <OfferProductCard key={index} />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default page;
