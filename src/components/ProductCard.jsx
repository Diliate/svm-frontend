import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";

const ProductCard = ({ product }) => {
  return (
    <div className="border-2 rounded-3xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-[275px] hover:scale-105 duration-200 p-4">
      <div className="border-2 rounded-2xl bg-[#F9F9EB]">
        <Image
          src={product?.imageUrls[0] || "/not-found.png"}
          alt={product?.name || "product image"}
          height={300}
          width={300}
          loading="lazy"
        />
      </div>
      <div className="flex justify-between my-2">
        <h1 className="text-2xl font-semibold">{product?.name}</h1>
      </div>

      <p className="text-lg">{product?.description}</p>
      <div className="flex items-center justify-between mt-5">
        <p className="text-xl font-semibold">Rs. {product?.price}</p>
        <Link
          href={`/product/${product?.id}`}
          className="bg-[#166534] text-white rounded-full p-3 flex items-center justify-center group relative overflow-hidden w-12 h-12"
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
  );
};

export default ProductCard;
