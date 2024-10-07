"use client";

import React, { useState } from "react";
import OfferProductCard from "@/components/OfferProductCard";
import LimitedOfferProductCard from "@/components/LimitedOfferProductCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const Page = () => {
  const products = Array.from({ length: 8 });
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = products.length;
  const slidesToShow = 4.2;

  function SampleNextArrow(props) {
    const { onClick, isVisible } = props;
    return (
      isVisible && (
        <button
          onClick={onClick}
          className="absolute z-20 flex items-center justify-center w-10 h-10 text-white duration-200 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full md:w-16 md:h-16 -right-4 top-1/2 hover:bg-opacity-75"
        >
          <FaChevronRight className="w-5 h-5 md:w-10 md:h-10" />
        </button>
      )
    );
  }

  function SamplePrevArrow(props) {
    const { onClick, isVisible } = props;
    return (
      isVisible && (
        <button
          onClick={onClick}
          className="absolute z-20 flex items-center justify-center w-10 h-10 text-white duration-200 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full md:w-16 md:h-16 -left-4 top-1/2 hover:bg-opacity-75"
        >
          <FaChevronLeft className="w-5 h-5 md:w-10 md:h-10" />
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
          slidesToShow: 1.1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="pt-16">
      <div className="md:h-[430px] h-auto w-full relative overflow-hidden">
        <img src="/limited-offer.png" alt="offer" className="w-full" />
      </div>

      <div className="p-5 md:p-10">
        <h3 className="mb-2 text-lg font-light uppercase md:text-2xl ">
          our popular products
        </h3>
        <h1 className="md:text-5xl text-3xl font-medium md:w-[550px] w-auto">
          Get 50% off on Ayurvedic Product
        </h1>

        <div className="grid grid-cols-1 gap-16 mt-10 md:grid-cols-4 place-items-center">
          {products.map((_, index) => (
            <div key={index} className="mb-10">
              <LimitedOfferProductCard />
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

export default Page;
