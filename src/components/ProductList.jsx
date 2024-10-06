"use client";

import React, { useState } from "react";
import Slider from "react-slick";
import ProductCard from "./ProductCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import Link from "next/link";

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

const ProductList = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const products = Array.from({ length: 12 });
  const totalSlides = products.length;
  const slidesToShow = 4.5;

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
    <div className="p-5 py-10 md:px-10">
      <div className="flex flex-col items-start justify-between gap-5 mb-6 md:gap-0 md:items-center md:flex-row">
        <div>
          <h3 className="font-light uppercase md:text-lg">
            our popular products
          </h3>
          <h1 className="text-3xl font-medium md:text-4xl">
            Latest Herbal <br /> Collections
          </h1>
        </div>
        <Link href={"/shop"}>
          <button className="flex items-center gap-2 md:py-3 py-2 md:px-10 px-5 uppercase border-[1px] border-black rounded-full hover:bg-black hover:text-white duration-200">
            view all products <FaChevronRight />
          </button>
        </Link>
      </div>
      <Slider {...settings}>
        {products.map((_, index) => (
          <div className="p-5 ">
            <ProductCard key={index} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductList;
