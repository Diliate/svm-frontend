import Image from "next/image";
import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";

const TestimonialCard = () => {
  const rating = 5;

  return (
    <div className="p-5 rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] md:w-[350px] w-auto">
      <div className="flex gap-5">
        <div className="w-16 h-16 rounded-full border-[1px] relative overflow-hidden">
          <Image src="/testimonialpfp.png" alt="pfp" fill objectFit="cover" />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-medium">Kayla Ray</h2>
          <div className="flex">
            {Array.from({ length: rating }, (_, index) => (
              <FaStar key={index} color="#FFB345" />
            ))}
            <FaRegStar color="#FFB345" />
          </div>
        </div>
      </div>
      <div>
        <p className="my-3 text-lg text-justify">
          "Outstanding herbal products that truly deliver results; the natural
          ingredients and careful formulation have made a noticeable difference
          in my well-being."
        </p>
        <span className="text-lg text-gray-600">@kayray</span>
      </div>
    </div>
  );
};

export default TestimonialCard;
