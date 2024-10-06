import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaStar } from "react-icons/fa6";

const ProductCard = () => {
  return (
    <div className="border-2 rounded-3xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-[275px] bg-[#F9F9EB] hover:scale-105 duration-200">
      <Link href={"/product/1"}>
        <Image src="/product.png" alt="product" height={290} width={290} />
      </Link>
      <div className="px-4 pb-5">
        <p className="text-lg">Syrup</p>
        <div className="flex justify-between my-2">
          <h1 className="text-2xl font-semibold">Cuff-C</h1>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, index) => (
              <FaStar key={index} />
            ))}
          </div>
        </div>
        <p className="text-lg">Rs 1200</p>
      </div>
      <div className="">
        <Link href={"/cart"}>
          <button className="text-white bg-[#004A06] rounded-bl-3xl w-1/2 py-2 hover:opacity-85 duration-200">
            Add to Cart
          </button>
        </Link>
        <Link href={"/payment"}>
          <button className="w-1/2 py-2 text-white duration-200 bg-black rounded-br-3xl hover:opacity-85">
            Buy Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
