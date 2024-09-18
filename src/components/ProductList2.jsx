"use client";

import React, { useState } from "react";
import Slider from "react-slick";
import ProductCard from "./ProductCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
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
          slidesToShow: 1.5,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="px-10 py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-light uppercase">new arrivals</h3>
          <h1 className="text-4xl font-medium">Distinct Plant Items</h1>
        </div>
        <div>
          <button className="flex items-center gap-2 py-3 px-10 uppercase border-[1px] border-black rounded-full hover:bg-black hover:text-white duration-200">
            view all products <FaChevronRight />
          </button>
        </div>
      </div>
      <Slider {...settings}>
        {products.map((_, index) => (
          <ProductCard key={index} />
        ))}
      </Slider>
    </div>
  );
};

export default ProductList;
