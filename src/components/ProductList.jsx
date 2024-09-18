"use client";

import React, { useState } from "react";
import Slider from "react-slick";
import ProductCard from "./ProductCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaAngleRight } from "react-icons/fa6";

function SampleNextArrow(props) {
  const { className, style, onClick, isVisible } = props;
  return (
    isVisible && (
      <div
        className={`${className} custom-arrow next-arrow`}
        style={{
          ...style,
          display: "block",
          background: "#CCCCCC",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          right: "20px",
          zIndex: 25,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "50px",
        }}
        onClick={onClick}
      />
    )
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick, isVisible } = props;
  return (
    isVisible && (
      <div
        className={`${className} custom-arrow prev-arrow`}
        style={{
          ...style,
          display: "block",
          background: "#CCCCCC",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          left: "20px",
          zIndex: 25,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "50px",
        }}
        onClick={onClick}
      />
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
          <h3 className="text-lg font-light uppercase">our popular products</h3>
          <h1 className="text-4xl font-medium">
            Latest Herbal <br /> Collections
          </h1>
        </div>
        <div>
          <button className="flex items-center gap-2 py-3 px-10 uppercase border-[1px] border-black rounded-full hover:bg-black hover:text-white duration-200">
            view all product <FaAngleRight />
          </button>
        </div>
      </div>
      <div>
        <Slider {...settings}>
          {products.map((_, index) => (
            <ProductCard key={index} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductList;
