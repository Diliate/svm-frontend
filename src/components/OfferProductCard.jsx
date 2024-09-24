import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa6";

const ProductCard = () => {
  return (
    <div className="border-2 rounded-3xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-[275px] bg-[#F9F9EB]">
      <div className="bg-black text-white font-medium text-lg flex items-center justify-center w-[150px] h-[40px] rounded-tl-3xl rounded-br-3xl">
        50&#37; off
      </div>
      <div>
        <Image src="/product.png" alt="product" height={290} width={290} />
      </div>
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
        <button className="text-white bg-[#004A06] rounded-bl-3xl w-1/2 py-2 hover:opacity-85 duration-200">
          Add to Cart
        </button>
        <button className="w-1/2 py-2 text-white duration-200 bg-black rounded-br-3xl hover:opacity-85">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
