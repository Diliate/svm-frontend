"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaRegHeart, FaRegUser, FaBars, FaTimes } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { navLinks } from "../data/navLinks";
import { HiOutlineShoppingCart } from "react-icons/hi";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [position, setPosition] = useState("bottom");
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleProfileOpenChange = (open) => setProfileDropdownOpen(open);

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
                width={75}
                height={75}
                className="w-auto h-auto"
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
                <HiOutlineShoppingCart size={20} />
              </Link>
              {user ? (
                <Link
                  href="/profile"
                  className="p-2 rounded-full hover:bg-[#004A06] hover:text-white transition duration-150"
                >
                  <FaRegUser size={20} />
                </Link>
              ) : (
                <div className="mt-1">
                  <Link
                    href={"/login"}
                    className="p-2 rounded-full bg-[#004A06]  transition duration-150 text-white hover:opacity-85 mr-2"
                  >
                    Login
                  </Link>
                  <Link
                    href={"/signup"}
                    className="p-2 rounded-full hover:bg-[#004A06] hover:text-white transition duration-150  hover:opacity-85 border-2"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Profile Dropdown for Mobile */}
            <div className="block md:hidden">
              <DropdownMenu
                open={profileDropdownOpen}
                onOpenChange={handleProfileOpenChange}
              >
                <DropdownMenuTrigger asChild>
                  <button className="p-2 rounded-full focus:outline-none">
                    <FaRegUser size={20} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Profile</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={position}>
                    <DropdownMenuRadioItem
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <Link href="/profile">Your Account</Link>
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <Link href="/profile/orders">Your Orders</Link>
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <Link href="/profile/address">Your Address</Link>
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                  <button
                    onClick={() => setProfileDropdownOpen(false)}
                    className="px-4 py-1 my-2 text-left text-white bg-red-600 rounded-full "
                  >
                    Logout
                  </button>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#004A06] md:hidden block"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="bg-white shadow-md md:hidden">
          <ul className="flex flex-col px-4 py-2 space-y-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="flex items-center px-3 py-2 font-medium text-lg hover:bg-[#004A06] hover:text-white transition rounded-full"
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
