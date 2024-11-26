"use client";

import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import ProductCard from "./ProductCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { fetchFeaturedProducts } from "@/services/productService";
import { useInView } from "react-intersection-observer";

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

const ProductList = ({ headline }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState([]);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.8,
  });

  console.log("PRODUCTS: ", products);

  // Fetch featured products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const featuredProducts = await fetchFeaturedProducts();
        setProducts(featuredProducts);
      } catch (error) {
        console.error("Failed to fetch featured products:", error);
      }
    };

    fetchProducts();
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4.5,
    slidesToScroll: 3,
    nextArrow: (
      <SampleNextArrow isVisible={currentSlide < products.length - 4.5} />
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
        <p>Loading featured products...</p>
      )}
    </div>
  );
};

export default ProductList;
