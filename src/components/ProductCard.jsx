import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaStar } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

const ProductCard = () => {
  return (
    <div className="border-2 rounded-3xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-[275px] hover:scale-105 duration-200 p-4">
      <div className="border-2 rounded-2xl bg-[#F9F9EB]">
        <Image src="/product.png" alt="product" height={300} width={300} />
      </div>
      <div className="flex justify-between my-2">
        <h1 className="text-2xl font-semibold">Cuff-C Syrup</h1>
        {/* <div className="flex items-center gap-1">
                {Array.from({ length: 4 }, (_, index) => (
                  <FaStar key={index} color="#FFB345" />
                ))}
              </div> */}
      </div>

      <p className="text-lg">
        Its a syrup medicine which helps in reducing coungh.
      </p>
      <div className="flex items-center justify-between mt-5">
        <p className="text-xl font-semibold">Rs 1200</p>
        <Link
          href={"/product/1"}
          className="bg-[#166534] text-white rounded-full p-3 flex items-center justify-center group"
        >
          <FaArrowRight
            className="duration-300 transform group-hover:translate-x-2"
            size={24}
          />
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
