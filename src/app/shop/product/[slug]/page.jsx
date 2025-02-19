"use client";

import Features from "@/components/Features";
import TestimonialCard from "@/components/TestimonialCard";
import ProductList from "@/components/ProductList";
import Image from "next/image";
import React, { useEffect, useState } from "react";
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
import { useParams } from "next/navigation";
import { fetchProductById } from "@/services/productService";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/slices/cartSlice";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { addToWishlist, removeFromWishlist } from "@/services/wishlistService";
import RatingModal from "@/components/RatingModal";
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

const Page = () => {
  const { user } = useAuth();
  const { slug: id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product?.imageUrls?.[0]);
  const rating = 4.1;
  const starCount = Math.floor(rating);
  const [currentSlide, setCurrentSlide] = useState(0);
  const testimonials = Array.from({ length: 8 });
  const totalSlides = testimonials.length;
  const slidesToShow = 4;

  const [favourite, setFavourite] = useState(false);
  const [feedbackList, setFeedbackList] = useState([]);

  const { ref: testimonialsRef, inView: testimonialsInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

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

  useEffect(() => {
    if (id) {
      const fetchProductData = async () => {
        try {
          const productData = await fetchProductById(id, user?.id); // Include userId in the request
          setProduct(productData);
          setFavourite(productData.favourite); // Set favourite state based on backend response
          setFeedbackList(productData.ratings || []);
          setSelectedImage(productData.imageUrls?.[0]);
        } catch (error) {
          console.error("Error Fetching Product Data in Product(slug)", error);
        }
      };

      fetchProductData();
    }
  }, [id, user]);

  const handleAddToCart = () => {
    if (!user || !product || quantity <= 0) {
      toast.error("Please login to add product to cart");
      return;
    }

    dispatch(addToCart({ userId: user.id, productId: product.id, quantity }));
    toast.success("Product Added to Cart");
  };

  const handleAddFavourite = async () => {
    if (!user) {
      toast.error("Please login to add items to your wishlist.");
      return;
    }

    try {
      if (favourite) {
        await removeFromWishlist(user.id, product.id);
        toast.success("Product removed from wishlist.");
      } else {
        await addToWishlist(user.id, product.id);
        toast.success("Product added to wishlist.");
      }
      setFavourite(!favourite);
    } catch (error) {
      console.error("Error updating wishlist:", error);
      toast.error("Failed to update wishlist.");
    }
  };

  const handleFeedbackAdded = (newFeedback) => {
    setFeedbackList((prev) => [...prev, newFeedback]);
  };

  const handleThumbnailClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  // const zoomProps = useMemo(() => {
  //   return selectedImage
  //     ? {
  //         width: 300,
  //         height: 340,
  //         zoomWidth: 800,
  //         img: selectedImage,
  //         zoomStyle: "z-index: 999",
  //         className: "relative",
  //         // imgClass: "opacity-0 absolute",
  //         style: { display: "none" },
  //       }
  //     : null;
  // }, [selectedImage]);

  return (
    <section className="px-5 pt-20 pb-20 md:pt-32 md:px-10">
      <div className="w-full">
        <div className="flex flex-col items-start justify-center gap-5 md:gap-0 md:flex-row">
          {/* IMAGES */}
          <div className="flex flex-col-reverse items-center justify-center w-full gap-5 md:flex-row md:w-1/2">
            <div className="flex flex-row gap-2 md:flex-col">
              {product?.imageUrls?.length > 0 ? (
                product.imageUrls.map((url, index) => (
                  <div
                    key={index}
                    className={`border-2 ${
                      selectedImage === url
                        ? "border-black border-[3px]"
                        : "border-gray-300"
                    } bg-[#F9F9EB] rounded-xl h-[80px] w-[80px] cursor-pointer flex items-center justify-center relative overflow-hidden`}
                    onClick={() => handleThumbnailClick(url)}
                  >
                    <Image
                      src={url}
                      alt={`product-image-${index}`}
                      objectFit="cover"
                      width={100}
                      height={100}
                      className="absolute object-cover"
                    />
                  </div>
                ))
              ) : (
                <div className="border-2 bg-[#F9F9EB] rounded-xl h-[80px] w-[80px] cursor-pointer flex items-center justify-center">
                  <Image
                    src="/not-found.png"
                    alt="Fallback product"
                    height={100}
                    width={100}
                  />
                </div>
              )}
            </div>

            {/* Main Image */}
            <div className="justify-center hidden lg:block">
              <div className="border-2 rounded-xl bg-[#F9F9EB] w-[345px] h-[250px] md:w-[300px] md:h-[340px] flex items-center justify-center relative overflow-hidden">
                {/* Main Image */}
                <Image
                  src={selectedImage || "/not-found.png"}
                  alt={product?.name}
                  objectFit="cover"
                  width={100}
                  height={100}
                  className="absolute"
                />
              </div>
            </div>

            {/* mobile devices */}
            <div className="lg:hidden border-2 rounded-xl bg-[#F9F9EB] w-[345px] h-[250px] md:w-[300px] md:h-[340px] flex items-center justify-center relative overflow-hidden">
              <Image
                src={selectedImage || "/not-found.png"}
                width={100}
                height={100}
                objectFit="cover"
                className="absolute"
              />
            </div>
          </div>

          {/* DESC */}
          <div className="flex flex-col md:w-[45%] w-full gap-5">
            <div className="flex justify-between">
              <h1 className="text-3xl font-medium">{product?.name}</h1>
              <button
                onClick={handleAddFavourite}
                className="p-2 border-2 rounded-full w-fit h-fit"
              >
                {favourite ? (
                  <FaHeart size={24} color="red" />
                ) : (
                  <FaRegHeart size={24} color="red" />
                )}
              </button>
            </div>

            <div className="flex items-end gap-2">
              {/* Dynamically calculate the average rating */}
              <h2 className="text-4xl">
                {feedbackList.length > 0
                  ? (
                      feedbackList.reduce(
                        (sum, feedback) => sum + feedback.rating,
                        0
                      ) / feedbackList.length
                    ).toFixed(1)
                  : "0.0"}
              </h2>

              {/* Dynamically display the stars based on the average rating */}
              <span className="flex">
                {Array.from(
                  {
                    length:
                      Math.floor(
                        feedbackList.reduce(
                          (sum, feedback) => sum + feedback.rating,
                          0
                        ) / feedbackList.length
                      ) || 0,
                  },
                  (_, index) => (
                    <FaStar key={index} color="#FFB345" size={30} />
                  )
                )}
              </span>

              {/* Dynamically display the number of trusted customers */}
              <span className="text-lg">
                {feedbackList.length > 0
                  ? `(${feedbackList.length} Trusted Customers)`
                  : "(No ratings yet)"}
              </span>
            </div>

            <p className="text-xl">{product?.description}</p>
            <div className="flex items-start">
              <button className="flex items-center gap-2 px-2 text-white bg-[#050B0F] rounded-full">
                <FaMinus
                  onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                />
                <span className="text-2xl">{quantity}</span>
                <FaPlus onClick={() => setQuantity((prev) => prev + 1)} />
              </button>
            </div>
            <h3 className="text-2xl font-medium">Rs {product?.price}</h3>
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="px-4 py-1 text-lg font-medium text-white duration-200 bg-[#050B0F] rounded-full hover:opacity-85"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="flex flex-col items-center justify-center mt-10 mb-10 md:mt-20">
          <div className="md:w-[85%] w-full">
            <h2 className="mb-3 text-4xl font-medium text-left md:text-center">
              Product Details
            </h2>
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl">
                <span className="font-semibold">Quantity:</span>{" "}
                {product?.quantity}
              </h3>
              <h3 className="text-2xl">
                <span className="font-semibold">Indications:</span>{" "}
                {product?.indications}
              </h3>
              <h3 className="text-2xl">
                <span className="font-semibold">Dosage:</span> {product?.dosage}
              </h3>
              <h3 className="text-2xl">
                <span className="font-semibold">Precautions:</span>
                <ul>
                  {product?.precautions.map((precaution, index) => (
                    <li key={index} className="ml-6 list-disc">
                      {precaution}
                    </li>
                  ))}
                </ul>
              </h3>
            </div>
          </div>
        </div>

        {/* FEATURES */}
        <div>
          <Features />
        </div>

        {/* TESTIMONIALS */}
        <div className="flex flex-col gap-4 my-5" ref={testimonialsRef}>
          <h2 className="text-2xl font-medium text-left md:text-center">
            User Review
          </h2>
          {testimonialsInView && (
            <>
              <div className="flex flex-col items-center justify-center md:flex-row">
                <div className="md:w-[85%] w-full">
                  <div className="flex items-end gap-2">
                    {/* Calculate the average rating */}
                    <h2 className="text-4xl">
                      {feedbackList.length > 0
                        ? (
                            feedbackList.reduce(
                              (sum, feedback) => sum + feedback.rating,
                              0
                            ) / feedbackList.length
                          ).toFixed(1)
                        : "0.0"}
                    </h2>

                    {/* Display stars based on the average rating */}
                    <span className="flex">
                      {Array.from(
                        {
                          length:
                            Math.floor(
                              feedbackList.reduce(
                                (sum, feedback) => sum + feedback.rating,
                                0
                              ) / feedbackList.length
                            ) || 0,
                        },
                        (_, index) => (
                          <FaStar key={index} color="#FFB345" size={24} />
                        )
                      )}
                    </span>
                  </div>

                  {/* Dynamically show the number of customers */}
                  <p className="mt-3 text-xl">
                    {feedbackList.length > 0
                      ? `(${feedbackList.length} Trusted Customers)`
                      : "(No ratings yet)"}
                  </p>
                </div>
                <div className="w-full mt-5 md:w-auto md:mt-0">
                  <RatingModal
                    productId={product?.id}
                    userId={user?.id}
                    onFeedbackAdded={handleFeedbackAdded}
                  />
                </div>
              </div>
              {feedbackList.length > 0 ? (
                <div className="flex items-center justify-center">
                  <Slider {...settings} className="md:w-[95%] w-full">
                    {feedbackList.map((feedback, index) => (
                      <div key={index} className="p-2">
                        <TestimonialCard key={index} feedback={feedback} />
                      </div>
                    ))}
                  </Slider>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <div className="flex items-center justify-center h-20 text-2xl border-2 rounded-md w-[95%]">
                    <p>No reviews yet. Be the first to review.</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* RELATED PRODUCTS */}
        <div className="flex justify-center mt-20">
          <div className="flex w-[100%] flex-col">
            <div className="mt-5">
              <ProductList headline="Related Products" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
