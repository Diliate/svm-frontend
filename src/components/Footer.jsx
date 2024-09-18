import Image from "next/image";
import React from "react";
import { FaFacebookSquare, FaPhone, FaPinterestSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaLocationDot, FaSquareXTwitter } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";

const Footer = () => {
  return (
    <footer>
      <div className="flex justify-between px-5 pt-10 pb-3 bg-[#F9F9EB]">
        <div className="w-[450px] flex flex-col gap-4">
          <Image src="/svm-logo.png" alt="logo" height={100} width={100} />

          <p className="text-lg text-justify">
            We're currently crafting the website now it appears spectacular,
            hip, and commendable. We're currently crafting the website now it
            appears spectacular, hip, and commendable.
          </p>

          <div className="flex flex-col gap-2 text-lg font-medium">
            <span className="flex items-center gap-1">
              <FaPhone /> +91 987654321
            </span>
            <span className="flex items-center gap-1">
              <FaLocationDot /> New Delhi, India
            </span>
            <span className="flex items-center gap-1">
              <IoMail /> svm@gmail.com
            </span>
          </div>
        </div>

        {/* LINKS */}
        <div className="flex gap-14">
          <div>
            <h2 className="mb-3 text-xl font-bold">Menu</h2>
            <ul className="flex flex-col gap-3 text-lg">
              <li className="inline cursor-pointer">Home</li>
              <li className="inline cursor-pointer">About</li>
              <li className="inline cursor-pointer">Shop</li>
              <li className="inline cursor-pointer">Blog</li>
              <li className="inline cursor-pointer">Contact</li>
            </ul>
          </div>
          <div>
            <h2 className="mb-3 text-xl font-bold">Shop</h2>
            <ul className="flex flex-col gap-3 text-lg">
              <li className="inline cursor-pointer">Whislist</li>
              <li className="inline cursor-pointer">Add to Cart</li>
              <li className="inline cursor-pointer">Track Order</li>
              <li className="inline cursor-pointer">Privacy Policy</li>
              <li className="inline cursor-pointer">Returen &amp; Refund</li>
            </ul>
          </div>
          <div>
            <h2 className="mb-3 text-xl font-bold">Offers</h2>
            <ul className="flex flex-col gap-3 text-lg">
              <li className="inline cursor-pointer">Discount</li>
              <li className="inline cursor-pointer">New</li>
              <li className="inline cursor-pointer">Hurry Up</li>
            </ul>
          </div>
        </div>

        {/* NEWSLETTER */}
        <div className="w-[300px] flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Get Active Updates</h2>
          <p>
            The ideal way to stay in contact and learn about our exclusive
            offers.
          </p>
          <div className="flex px-5 py-1 border-2 border-black rounded-full">
            <input
              placeholder="Enter your Email"
              className="border-none outline-none"
            />
            <button className="rounded-full bg-[#004A06] text-white px-5 py-2">
              Submit
            </button>
          </div>
          <p>Our Social Media handles</p>
          <div className="flex gap-5">
            <FaSquareInstagram size={28} className="cursor-pointer" />
            <FaFacebookSquare size={28} className="cursor-pointer" />
            <FaSquareXTwitter size={28} className="cursor-pointer" />
            <FaPinterestSquare size={28} className="cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="bg-[#004A06] text-center py-2 text-white font-medium text-lg">
        <h1>&copy;Copyright, SVM, 2024</h1>
      </div>
    </footer>
  );
};

export default Footer;
