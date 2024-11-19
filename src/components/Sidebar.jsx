"use client";

import React from "react";
import Link from "next/link";
import {
  FaUser,
  FaMapMarkerAlt,
  FaBoxOpen,
  FaHeadset,
  FaFileContract,
} from "react-icons/fa";
import { RiRefund2Line } from "react-icons/ri";
import { useAuth } from "@/context/AuthContext";

const Sidebar = () => {
  const { logout, user } = useAuth();

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
      name: "Customer Care",
      icon: <FaHeadset />,
      path: "/profile/customer-care",
    },
    {
      id: "5",
      name: "Terms and Conditions",
      icon: <FaFileContract />,
      path: "/t-c",
      newTab: true, // Open this in a new tab
    },
    {
      id: "6",
      name: "Return and Refund Policy",
      icon: <RiRefund2Line />,
      path: "/return-refund-policy",
      newTab: true, // Open this in a new tab
    },
  ];

  return (
    <section className="p-10 pt-28">
      <div className="w-[350px] p-5 border-2 rounded-3xl bg-white shadow-lg">
        {/* Profile Section */}
        <div className="flex flex-col items-center justify-center gap-3 mb-8">
          <div className="flex items-center justify-center w-[100px] h-[100px] border-2 rounded-full">
            <h2 className="text-3xl font-medium">
              <FaUser size={50} />
            </h2>
          </div>
          <h2 className="text-3xl font-semibold capitalize">
            {user && user.name}
          </h2>
        </div>

        {/* Menu Items */}
        <div className="space-y-4">
          {menuList.map((item) => (
            <Link
              href={item.path}
              key={item.id}
              className="flex items-center gap-3 pb-1 text-xl font-medium text-gray-700 border-b-2 cursor-pointer hover:text-gray-900"
              target={item.newTab ? "_blank" : "_self"} // Open in new tab if specified
              rel={item.newTab ? "noopener noreferrer" : undefined} // Add rel for security
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </div>

        {/* Logout Button */}
        <button
          className="w-full px-5 py-2 mt-8 text-xl font-medium text-white transition-colors bg-red-600 rounded-full hover:bg-red-700"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </section>
  );
};

export default Sidebar;
