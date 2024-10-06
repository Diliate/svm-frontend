import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebookSquare, FaPhone, FaPinterestSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaLocationDot, FaSquareXTwitter } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";

const Footer = () => {
  return (
    <footer>
      {/* Main Footer Container */}
      <div className="flex flex-col lg:flex-row justify-between px-5 md:px-10 pt-10 pb-3 bg-[#F9F9EB]">
        {/* Logo and Contact Information */}
        <div className="flex flex-col flex-1 gap-4 mb-8 lg:mb-0">
          <div className="flex items-center">
            <Image src="/svm-logo.png" alt="logo" height={100} width={100} />
          </div>

          {/* Text Container with Limited Width */}
          <div className="max-w-md">
            <p className="text-base text-justify sm:text-lg">
              We're currently crafting the website; it appears spectacular, hip,
              and commendable. We're currently crafting the website; it appears
              spectacular, hip, and commendable.
            </p>
          </div>

          <div className="flex flex-col gap-2 text-base font-medium sm:text-lg">
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
        <div className="flex flex-col flex-1 gap-8 mb-8 ml-0 md:ml-20 sm:flex-row lg:gap-14 lg:mb-0">
          {/* Menu */}
          <div>
            <h2 className="mb-3 text-xl font-bold">Menu</h2>
            <ul className="flex flex-col gap-3 text-base sm:text-lg">
              <Link href={"/"}>
                <li className="cursor-pointer hover:text-[#004A06]">Home</li>
              </Link>
              <Link href={"/about"}>
                <li className="cursor-pointer hover:text-[#004A06]">About</li>
              </Link>
              <Link href={"/shop"}>
                <li className="cursor-pointer hover:text-[#004A06]">Shop</li>
              </Link>
              <Link href={"/blog"}>
                <li className="cursor-pointer hover:text-[#004A06]">Blog</li>
              </Link>
              <Link href={"/contact"}>
                <li className="cursor-pointer hover:text-[#004A06]">Contact</li>
              </Link>
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h2 className="mb-3 text-xl font-bold">Shop</h2>
            <ul className="flex flex-col gap-3 text-base sm:text-lg">
              <Link href={"/wishlist"}>
                <li className="cursor-pointer hover:text-[#004A06]">
                  Wishlist
                </li>
              </Link>
              <Link href={"/cart"}>
                <li className="cursor-pointer hover:text-[#004A06]">
                  Add to Cart
                </li>
              </Link>
              {/* <Link href={"/order"}>
              <li className="cursor-pointer hover:text-[#004A06]">
                Track Order
              </li>
              </Link> */}
              <Link href={"/profile/termsandconditions"}>
                <li className="cursor-pointer hover:text-[#004A06]">
                  Terms and Conditions
                </li>
              </Link>
              <Link href={"/profile/return"}>
                <li className="cursor-pointer hover:text-[#004A06]">
                  Return &amp; Refund
                </li>
              </Link>
            </ul>
          </div>

          {/* Offers */}
          <div>
            <h2 className="mb-3 text-xl font-bold">Offers</h2>
            <ul className="flex flex-col gap-3 text-base sm:text-lg">
              <Link href={"/offer"}>
                <li className="cursor-pointer hover:text-[#004A06]">
                  Discount
                </li>
              </Link>
              {/* <Link href={"/new"}>
              <li className="cursor-pointer hover:text-[#004A06]">New</li>
              </Link> */}
              <Link href={"/limitedoffer"}>
                <li className="cursor-pointer hover:text-[#004A06]">
                  Hurry Up
                </li>
              </Link>
            </ul>
          </div>
        </div>

        {/* Newsletter and Social Media */}
        <div className="flex flex-col flex-1 gap-4 md:ml-20 ml-">
          <h2 className="text-2xl font-bold">Get Active Updates</h2>
          <p className="text-base sm:text-lg">
            The ideal way to stay in contact and learn about our exclusive
            offers.
          </p>
          <div className="flex items-center justify-center py-1 pl-3 pr-2 border-2 border-black rounded-full md:w-[350px]">
            <input
              type="email"
              placeholder="Enter your Email"
              className="w-full px-3 bg-transparent border-none outline-none"
            />
            <button className="rounded-full bg-[#004A06] text-white px-5 py-2 hover:opacity-85 duration-200">
              Submit
            </button>
          </div>
          <p className="mt-4 text-base sm:text-lg">Our Social Media handles</p>
          <div className="flex gap-5">
            <FaSquareInstagram
              size={28}
              className="cursor-pointer hover:text-[#004A06]"
            />
            <FaFacebookSquare
              size={28}
              className="cursor-pointer hover:text-[#004A06]"
            />
            <FaSquareXTwitter
              size={28}
              className="cursor-pointer hover:text-[#004A06]"
            />
            <FaPinterestSquare
              size={28}
              className="cursor-pointer hover:text-[#004A06]"
            />
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
