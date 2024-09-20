import Image from "next/image";
import React from "react";
import { FaFacebookSquare, FaPhone, FaPinterestSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaLocationDot, FaSquareXTwitter } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";

const Footer = () => {
  return (
    <footer>
      {/* Main Footer Container */}
      <div className="flex flex-col lg:flex-row justify-between px-5 lg:px-10 pt-10 pb-3 bg-[#F9F9EB]">
        
        {/* Logo and Contact Information */}
        <div className="flex-1 flex flex-col gap-4 mb-8 lg:mb-0">
          <div className="flex items-center">
            <Image src="/svm-logo.png" alt="logo" height={100} width={100} />
          </div>

          {/* Text Container with Limited Width */}
          <div className="max-w-md">
            <p className="text-base sm:text-lg text-justify">
              We're currently crafting the website; it appears spectacular, hip, and commendable. We're currently crafting the website; it appears spectacular, hip, and commendable.
            </p>
          </div>

          <div className="flex flex-col gap-2 text-base sm:text-lg font-medium">
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

        {/* Links Sections */}
        <div className="flex flex-col sm:flex-row gap-8 lg:gap-14 flex-1 mb-8 lg:mb-0">
          {/* Menu */}
          <div>
            <h2 className="mb-3 text-xl font-bold">Menu</h2>
            <ul className="flex flex-col gap-3 text-base sm:text-lg">
              <li className="cursor-pointer hover:text-[#004A06]">Home</li>
              <li className="cursor-pointer hover:text-[#004A06]">About</li>
              <li className="cursor-pointer hover:text-[#004A06]">Shop</li>
              <li className="cursor-pointer hover:text-[#004A06]">Blog</li>
              <li className="cursor-pointer hover:text-[#004A06]">Contact</li>
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h2 className="mb-3 text-xl font-bold">Shop</h2>
            <ul className="flex flex-col gap-3 text-base sm:text-lg">
              <li className="cursor-pointer hover:text-[#004A06]">Wishlist</li>
              <li className="cursor-pointer hover:text-[#004A06]">Add to Cart</li>
              <li className="cursor-pointer hover:text-[#004A06]">Track Order</li>
              <li className="cursor-pointer hover:text-[#004A06]">Privacy Policy</li>
              <li className="cursor-pointer hover:text-[#004A06]">Return &amp; Refund</li>
            </ul>
          </div>

          {/* Offers */}
          <div>
            <h2 className="mb-3 text-xl font-bold">Offers</h2>
            <ul className="flex flex-col gap-3 text-base sm:text-lg">
              <li className="cursor-pointer hover:text-[#004A06]">Discount</li>
              <li className="cursor-pointer hover:text-[#004A06]">New</li>
              <li className="cursor-pointer hover:text-[#004A06]">Hurry Up</li>
            </ul>
          </div>
        </div>

        {/* Newsletter and Social Media */}
        <div className="flex-1 flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Get Active Updates</h2>
          <p className="text-base sm:text-lg">
            The ideal way to stay in contact and learn about our exclusive offers.
          </p>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-0 px-5 py-1 border-2 border-black rounded-full">
            <input
              type="email"
              placeholder="Enter your Email"
              className="w-full sm:w-auto flex-1 border-none outline-none px-3"
            />
            <button className="rounded-full bg-[#004A06] text-white px-5 py-2 mt-2 sm:mt-0 sm:ml-2">
              Submit
            </button>
          </div>
          <p className="mt-4 text-base sm:text-lg">Our Social Media handles</p>
          <div className="flex gap-5">
            <FaSquareInstagram size={28} className="cursor-pointer hover:text-[#004A06]" />
            <FaFacebookSquare size={28} className="cursor-pointer hover:text-[#004A06]" />
            <FaSquareXTwitter size={28} className="cursor-pointer hover:text-[#004A06]" />
            <FaPinterestSquare size={28} className="cursor-pointer hover:text-[#004A06]" />
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-[#004A06] text-center py-2 text-white font-medium text-base sm:text-lg">
        <h1>&copy; Copyright, SVM, 2024</h1>
      </div>
    </footer>
  );
};

export default Footer;
