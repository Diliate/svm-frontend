"use client";

import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import ProductCard from "./ProductCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { fetchFeaturedProducts } from "@/services/productService";
import { useInView } from "react-intersection-observer";

function SampleNextArrow({ onClick, isVisible }) {
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

function SamplePrevArrow({ onClick, isVisible }) {
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

const ProductList = ({ headline }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState([]);
  const [slidesToShow, setSlidesToShow] = useState(4); // Default slidesToShow
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  // Fetch products only when the component enters the viewport
  useEffect(() => {
    if (inView && products.length === 0) {
      const fetchProducts = async () => {
        try {
          const featuredProducts = await fetchFeaturedProducts();
          setProducts(featuredProducts);
        } catch (error) {
          console.error("Failed to fetch featured products:", error);
        }
      };

      fetchProducts();
    }
  }, [inView, products.length]);

  // Update slidesToShow based on screen width
  useEffect(() => {
    const updateSlidesToShow = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setSlidesToShow(1);
      } else if (width < 600) {
        setSlidesToShow(2);
      } else if (width < 1024) {
        setSlidesToShow(3);
      } else {
        setSlidesToShow(4);
      }
    };

    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow,
    slidesToScroll: slidesToShow,
    nextArrow: (
      <SampleNextArrow
        isVisible={currentSlide < products.length - slidesToShow}
      />
    ),
    prevArrow: <SamplePrevArrow isVisible={currentSlide > 0} />,
    beforeChange: (current, next) => setCurrentSlide(next),
  };

  return (
    <div ref={ref} className="p-5 py-10 md:px-10">
      <h1 className="text-4xl font-semibold">{headline}</h1>
      {products.length > 0 ? (
        <Slider {...settings}>
          {products.map((product) => (
            <div key={product.id} className="p-5">
              <ProductCard product={product} />
            </div>
          ))}
        </Slider>
      ) : (
        <div className="flex items-center justify-center w-full">
          <div
            className="w-8 h-8 border-4 border-gray-200 rounded-full border-t-blue-500 animate-spin"
            role="status"
          ></div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
