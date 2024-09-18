import Image from "next/image";
import React from "react";
import { FaRegHeart, FaRegUser, FaSortDown } from "react-icons/fa";
import { IoCartOutline, IoLocationOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";

const Navbar = () => {
  return (
    <nav className="flex justify-between px-5 py-2">
      <div className="flex items-center gap-3">
        <Image
          src="/svm-logo.png"
          width={100}
          height={100}
          className="cursor-pointer"
        />
        <ul className="flex gap-3">
          <li className="cursor-pointer hover:bg-[#004A06] hover:text-white duration-150 rounded-full px-3 py-2 font-medium text-lg">
            Home
          </li>
          <li className="flex items-baseline gap-1 cursor-pointer hover:bg-[#004A06] hover:text-white duration-150 rounded-full px-3 py-2 font-medium text-lg">
            Shop <FaSortDown />
          </li>
          <li className="cursor-pointer hover:bg-[#004A06] hover:text-white duration-150 rounded-full px-3 py-2 font-medium text-lg">
            Blog
          </li>
          <li className="cursor-pointer hover:bg-[#004A06] hover:text-white duration-150 rounded-full px-3 py-2 font-medium text-lg">
            About
          </li>
        </ul>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-gray-100 rounded-full py-[10px] px-6">
          <IoIosSearch size={22} />
          <input
            placeholder="Search your medicines.."
            className=" border-none bg-transparent outline-none w-[300px]"
          />
        </div>
        <div className="flex items-center gap-1">
          <IoLocationOutline size={22} />
          <h1 className="cursor-pointer flex items-center gap-1 text-lg font-medium">
            Update Location
            <FaSortDown />
          </h1>
        </div>
      </div>

      <div className="flex items-center">
        <ul className="flex items-center gap-3">
          <li className="cursor-pointer hover:bg-[#004A06] hover:text-white duration-150 rounded-full px-3 py-2">
            <FaRegHeart size={22} />
          </li>
          <li className="cursor-pointer hover:bg-[#004A06] hover:text-white duration-150 rounded-full px-3 py-2">
            <IoCartOutline size={22} />
          </li>
          <li className="cursor-pointer hover:bg-[#004A06] hover:text-white duration-150 rounded-full px-3 py-2">
            <FaRegUser size={22} />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
