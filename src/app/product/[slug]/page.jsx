"use client";

import Features from "@/components/Features";
import TestimonialCard from "@/components/TestimonialCard";
import Image from "next/image";
import React, { useState } from "react";
import {
  FaMinus,
  FaPlus,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ProductCard from "@/components/ProductCard";
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

const Page = () => {
  const [quantity, setQuantity] = useState(1);
  const rating = 4.1;
  const starCount = Math.floor(rating);
  const [currentSlide, setCurrentSlide] = useState(0);
  const testimonials = Array.from({ length: 8 });
  const products = Array.from({ length: 12 });
  const totalSlides = testimonials.length;
  const slidesToShow = 3.5;

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
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="px-5 pt-20 pb-20 md:pt-32 md:px-10">
      <div className="w-full">
        <div className="flex flex-col items-start justify-center gap-5 md:gap-0 md:flex-row">
          {/* IMAGES */}
          <div className="flex flex-col-reverse items-center justify-center w-full gap-5 md:flex-row md:w-1/2">
            <div className="flex flex-row gap-2 md:flex-col">
              {Array.from({ length: 4 }, (_, index) => (
                <div
                  key={index}
                  className="border-2 bg-[#F9F9EB] rounded-xl h-[80px] w-[80px] cursor-pointer flex items-center justify-center"
                >
                  <Image
                    src="/product.png"
                    alt="product"
                    height={100}
                    width={100}
                  />
                </div>
              ))}
            </div>
            <div className="border-2 rounded-xl bg-[#F9F9EB] md:w-[300px] w-[345px] md:h-[340px] h-[250px] flex items-center justify-center">
              <Image
                src="/product.png"
                alt="product"
                height={300}
                width={300}
              />
            </div>
          </div>

          {/* DESC */}
          <div className="flex flex-col md:w-[45%] w-full gap-5">
            <h1 className="text-3xl font-medium">
              SKIN : PILE - C - Capsules - for Bleeding and Healing
            </h1>
            <div className="flex items-end gap-2">
              <h2 className="flex text-4xl">{rating}</h2>
              <span>
                <FaStar color="#FFB345" size={30} />
              </span>

              <span className="text-lg">(400+ Trusted Customers)</span>
            </div>
            <p className="text-xl">
              Each tablet contains a carefully selected combination of
              echinacea, turmeric, ashwagandha, and elderberry, known for their
              immune-boosting and anti-inflammatory properties.
            </p>
            <div className="flex items-start">
              <button className="flex items-center gap-2 px-2 text-white bg-black rounded-full">
                <FaMinus
                  onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                />
                <span className="text-2xl">{quantity}</span>
                <FaPlus onClick={() => setQuantity((prev) => prev + 1)} />
              </button>
            </div>
            <h3 className="text-2xl font-medium">Rs 1490</h3>
            <div className="flex gap-3">
              <Link href={"/cart"}>
                <button className="px-4 py-1 text-lg font-medium text-white duration-200 bg-black rounded-full hover:opacity-85">
                  Add to Cart
                </button>
              </Link>
              <Link href={"/payment"}>
                <button className="px-4 py-1 text-lg font-medium text-white duration-200 bg-green-800 rounded-full hover:opacity-85">
                  Buy Now
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="flex flex-col items-center justify-center mt-10 mb-10 md:mt-20">
          <div className="md:w-[85%] w-full">
            <h2 className="mb-3 text-4xl font-medium text-left md:text-center">
              Description
            </h2>
            <div className="flex flex-col gap-2">
              <p className="text-xl md:text-2xl">
                Each tablet contains a carefully selected combination of
                echinacea, turmeric, ashwagandha, and elderberry, known for
                their immune-boosting and anti-inflammatory properties.
              </p>
              <p className="text-xl md:text-2xl">
                This powerful blend has been formulated to support your overall
                health and well-being, helping you to stay active and energized.
              </p>
            </div>
          </div>
        </div>

        {/* FEATURES */}
        <div>
          <Features />
        </div>

        {/* REVIEW */}
        <div className="flex flex-col gap-4 my-5">
          <h2 className="text-2xl font-medium text-left md:text-center">
            User Review
          </h2>
          <div className="flex items-center justify-center">
            <div className="md:w-[85%] w-full">
              <div className="flex items-end gap-2">
                <h2 className="text-4xl">{rating}</h2>
                <span className="flex">
                  {Array.from({ length: starCount }, (_, index) => (
                    <FaStar key={index} color="#FFB345" size={24} />
                  ))}
                </span>
              </div>
              <p className="mt-3 text-xl">(400+ Trusted Customers)</p>
            </div>
          </div>

          {/* TESTIMONIALS */}
          <div className="flex items-center justify-center">
            <Slider {...settings} className="md:w-[90%] w-full">
              {testimonials.map((_, index) => (
                <div key={index} className="p-2">
                  <TestimonialCard />
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        <div className="flex justify-center mt-20">
          <div className="w-[90%] flex flex-col">
            <div>
              <h2 className="text-xl font-light uppercase">
                our popular products
              </h2>
              <h2 className="mt-5 text-5xl italic font-semibold">
                Related <br />
                Products
              </h2>
            </div>

            <div className="mt-5">
              <Slider {...settings}>
                {products.map((_, index) => (
                  <div key={index} className="p-2">
                    <ProductCard />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
