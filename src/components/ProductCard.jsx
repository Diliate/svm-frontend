import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { GoBell } from "react-icons/go";

const ProductCard = ({ product }) => {
  return (
    <div className="relative border-2 rounded-3xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-[275px] hover:scale-105 duration-200 p-4">
      {product.inStock === false && (
        <div>
          <div className="absolute inset-0 z-10 flex items-center justify-center text-xl text-white bg-black bg-opacity-20 rounded-2xl">
            <span className="px-2 py-1 -mt-40 text-[60px] leading-[52px] font-bold text-center rounded-sm">
              Out of <br />
              Stock
            </span>
          </div>
          <button className="absolute z-20 flex items-center gap-2 px-3 text-xl text-white bg-red-500 border-2 border-red-500 rounded-md top-[62%] right-2">
            <span>Notify</span> <GoBell />
          </button>
        </div>
      )}
      <div className="border-2 rounded-2xl bg-[#F9F9EB] relative w-[240px] h-[200px] py-2 overflow-hidden">
        <img
          src={product?.imageUrls?.[0] || "/not-found.png"}
          alt={product?.name || "product image"}
          className="absolute object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col justify-between h-[210px]">
        <div className="flex justify-between my-2">
          <h1 className="text-2xl font-semibold">{product?.name}</h1>
        </div>
        <p className="text-sm line-clamp-3">{product?.description}</p>
        <div className="flex items-center justify-between mt-5">
          <p className="text-xl font-semibold">Rs. {product?.price}</p>
          <Link
            href={`/shop/product/${product?.id}`}
            className="bg-[#166534] text-white rounded-full p-3 flex items-center justify-center group relative overflow-hidden w-12 h-12 z-30"
            aria-label={`View details for ${product?.name}`}
          >
            {/* Arrow Moving Out */}
            <FaArrowRight
              className="absolute duration-300 transform -translate-x-1/2 left-1/2 group-hover:translate-x-full"
              size={24}
            />

            {/* Arrow Coming In */}
            <FaArrowRight
              className="absolute left-[-50%] transform translate-x-0 duration-300 group-hover:left-1/2 group-hover:translate-x-[-60%]"
              size={24}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
