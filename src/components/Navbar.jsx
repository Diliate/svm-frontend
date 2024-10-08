"use client";

import Image from "next/image";
import React, { useState } from "react";
import { FaRegHeart, FaRegUser, FaBars, FaTimes } from "react-icons/fa";
import { IoCartOutline, IoLocationOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import Link from "next/link";
import { navLinks } from "../data/navLinks";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="fixed z-50 w-full bg-white shadow-md">
      <div className="px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Primary Navigation */}
          <div className="flex items-center">
            <Link href="/" className="cursor-pointer">
              <Image
                src="/svm-logo.png"
                alt="Logo"
                width={100}
                height={100}
                className="object-contain"
              />
            </Link>
            <ul className="hidden ml-6 space-x-4 md:flex">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="px-3 py-2 text-lg font-medium rounded-full cursor-pointer hover:bg-[#004A06] hover:text-white transition duration-150"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Search and Location */}
          <div className="items-center hidden space-x-4 md:flex">
            <div className="flex items-center px-4 py-2 bg-gray-100 rounded-full">
              <IoIosSearch size={20} className="text-gray-600" />
              <input
                type="text"
                placeholder="Search your medicines..."
                className="w-64 ml-2 bg-transparent border-none focus:outline-none"
              />
            </div>
            <div className="flex items-center px-3 py-2 space-x-1 rounded-full cursor-pointer hover:bg-gray-100">
              <IoLocationOutline size={20} className="text-gray-600" />
              <span className="text-lg font-medium">Update Location</span>
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-3">
            <div className="hidden space-x-3 md:flex">
              <Link
                href="/wishlist"
                className="p-2 rounded-full hover:bg-[#004A06] hover:text-white transition duration-150"
              >
                <FaRegHeart size={20} />
              </Link>
              <Link
                href="/cart"
                className="p-2 rounded-full hover:bg-[#004A06] hover:text-white transition duration-150"
              >
                <IoCartOutline size={20} />
              </Link>
              <Link
                href="/profile"
                className="p-2 rounded-full hover:bg-[#004A06] hover:text-white transition duration-150"
              >
                <FaRegUser size={20} />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#004A06]"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="bg-white shadow-md md:hidden">
          <ul className="flex flex-col px-4 py-2 space-y-2">
            {navLinks.map((link) => (
              <li key={link.name} className="cursor-pointer">
                <Link
                  href={link.href}
                  className="flex items-center hover:bg-[#004A06] hover:text-white transition duration-150 rounded-full px-3 py-2 font-medium text-lg"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
