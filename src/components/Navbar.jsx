"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import {
  FaRegHeart,
  FaRegUser,
  FaSortDown,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { IoCartOutline, IoLocationOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import Link from "next/link";
import { navLinks } from "../data/navLinks";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // Track active dropdown
  const dropdownRef = useRef(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Close any open dropdown when toggling mobile menu
    setActiveDropdown(null);
  };

  const handleDropdown = (name) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <nav className="fixed z-50 w-full bg-white shadow-md" ref={dropdownRef}>
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
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
                <li
                  key={link.name}
                  className="relative flex items-center px-3 py-2 text-lg font-medium transition duration-150 rounded-full cursor-pointer group"
                >
                  {link.subLinks ? (
                    <>
                      <button
                        onClick={() => handleDropdown(link.name)}
                        className="flex items-center focus:outline-none"
                        aria-haspopup="true"
                        aria-expanded={activeDropdown === link.name}
                      >
                        {link.name}
                        <FaSortDown className="ml-1" />
                      </button>
                      {/* Dropdown Menu */}
                      <ul
                        className={`absolute left-0 top-full mt-1 w-40 bg-white shadow-lg rounded-md transition-opacity duration-150 ${
                          activeDropdown === link.name
                            ? "opacity-100 visible"
                            : "opacity-0 invisible group-hover:opacity-100 group-hover:visible"
                        }`}
                      >
                        {link.subLinks.map((subLink) => (
                          <li
                            key={subLink.name}
                            className="px-4 py-2 hover:bg-gray-100"
                          >
                            <Link href={subLink.href} className="block">
                              {subLink.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className="flex items-center hover:bg-[#004A06] hover:text-white transition duration-150 rounded-full px-3 py-2"
                    >
                      {link.name}
                    </Link>
                  )}
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
              <FaSortDown size={12} />
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-3">
            <div className="hidden space-x-3 md:flex">
              <Link
                href={"/wishlist"}
                className="p-2 rounded-full hover:bg-[#004A06] hover:text-white transition duration-150"
              >
                <FaRegHeart size={20} />
              </Link>
              <Link
                href={"/cart"}
                className="p-2 rounded-full hover:bg-[#004A06] hover:text-white transition duration-150"
              >
                <IoCartOutline size={20} />
              </Link>
              <Link
                href={"/profile"}
                className="p-2 rounded-full hover:bg-[#004A06] hover:text-white transition duration-150"
              >
                <FaRegUser size={20} />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
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
                {link.subLinks ? (
                  <>
                    <button
                      onClick={() => handleDropdown(link.name)}
                      className="flex justify-between items-center w-full text-left hover:bg-[#004A06] hover:text-white transition duration-150 rounded-full px-3 py-2 font-medium text-lg"
                      aria-haspopup="true"
                      aria-expanded={activeDropdown === link.name}
                    >
                      {link.name}
                      <FaSortDown
                        className={`transform transition-transform duration-150 ${
                          activeDropdown === link.name
                            ? "rotate-180"
                            : "rotate-0"
                        }`}
                      />
                    </button>
                    {/* Mobile Dropdown Menu */}
                    {activeDropdown === link.name && (
                      <ul className="pl-4 mt-2 space-y-2">
                        {link.subLinks.map((subLink) => (
                          <li
                            key={subLink.name}
                            className="hover:bg-[#004A06] hover:text-white rounded-full px-3 py-2"
                          >
                            <Link href={subLink.href} className="block">
                              {subLink.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className="flex items-center hover:bg-[#004A06] hover:text-white transition duration-150 rounded-full px-3 py-2 font-medium text-lg"
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
            {/* Additional Mobile Menu Items (e.g., Location, Icons) */}
            <li className="flex items-center px-3 py-2 space-x-1 rounded-full cursor-pointer hover:bg-gray-100">
              <IoLocationOutline size={20} className="text-gray-600" />
              <span className="text-lg font-medium">Update Location</span>
              <FaSortDown size={12} />
            </li>
            <li className="flex space-x-3">
              <Link
                href={"/wishlist"}
                className="p-2 rounded-full hover:bg-[#004A06] hover:text-white transition duration-150"
              >
                <FaRegHeart size={20} />
              </Link>
              <Link
                href={"/cart"}
                className="p-2 rounded-full hover:bg-[#004A06] hover:text-white transition duration-150"
              >
                <IoCartOutline size={20} />
              </Link>
              <Link
                href={"/profile"}
                className="p-2 rounded-full hover:bg-[#004A06] hover:text-white transition duration-150"
              >
                <FaRegUser size={20} />
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
