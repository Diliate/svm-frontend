"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaRegHeart,
  FaRegUser,
  FaBars,
  FaTimes,
  FaUser,
  FaBoxOpen,
  FaMapMarkerAlt,
  FaHeadset,
  FaFileContract,
} from "react-icons/fa";
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
import { RiRefund2Line } from "react-icons/ri";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [position, setPosition] = useState("bottom");
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleProfileOpenChange = (open) => setProfileDropdownOpen(open);

  const menuList = [
    {
      id: "1",
      name: "Your Account",
      icon: <FaUser />,
      path: "/profile/",
    },
    {
      id: "2",
      name: "Your Orders",
      icon: <FaBoxOpen />,
      path: "/profile/orders",
    },
    {
      id: "3",
      name: "Your Address",
      icon: <FaMapMarkerAlt />,
      path: "/profile/address",
    },
    {
      id: "4",
      name: "Your Cart",
      icon: <HiOutlineShoppingCart />,
      path: "/cart",
    },
    {
      id: "5",
      name: "Your Wishlist",
      icon: <FaRegHeart />,
      path: "/wishlist",
    },
    {
      id: "6",
      name: "Customer Care",
      icon: <FaHeadset />,
      path: "/profile/customer-care",
    },
    {
      id: "7",
      name: "Terms and Conditions",
      icon: <FaFileContract />,
      path: "/t-c",
      newTab: true,
    },
    {
      id: "8",
      name: "Return and Refund Policy",
      icon: <RiRefund2Line />,
      path: "/return-refund-policy",
      newTab: true,
    },
  ];

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

          {/* Search */}
          <div className="items-center hidden mr-28 md:flex">
            <SearchBar />
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-3">
            <div className="hidden space-x-3 md:flex">
              {user ? (
                <>
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
                  <Link
                    href="/profile"
                    className="p-2 rounded-full hover:bg-[#004A06] hover:text-white transition duration-150"
                  >
                    <FaRegUser size={20} />
                  </Link>
                </>
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
            {user && (
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
                  <DropdownMenuContent className="mr-5">
                    <DropdownMenuLabel>Profile</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={position}>
                      {menuList.map((item) => (
                        <DropdownMenuRadioItem
                          key={item.id}
                          onClick={() => setProfileDropdownOpen(false)}
                        >
                          {item.newTab ? (
                            <a
                              href={item.path}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center -ml-5"
                            >
                              {item.icon}
                              <span className="ml-2">{item.name}</span>
                            </a>
                          ) : (
                            <Link
                              href={item.path}
                              className="flex items-center -ml-5"
                            >
                              {item.icon}
                              <span className="ml-2">{item.name}</span>
                            </Link>
                          )}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        logout();
                      }}
                      className="w-full py-1 my-2 text-center text-white bg-red-600 rounded-full"
                    >
                      Logout
                    </button>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}

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
        <div className="pb-5 bg-white shadow-md md:hidden h-fit">
          <ul className="flex flex-col px-4 py-2 space-y-2">
            {navLinks.map((link) => (
              <li key={link.name} onClick={() => setMobileMenuOpen(false)}>
                <Link
                  href={link.href}
                  className="flex items-center px-3  py-2 font-medium text-lg hover:bg-[#004A06] hover:text-white transition rounded-full"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          {!user && (
            <div className="flex flex-col w-full gap-4 px-4 mt-1 text-center">
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
      )}
    </nav>
  );
};

export default Navbar;
