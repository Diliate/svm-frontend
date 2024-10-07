"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  FaUser,
  FaRegFileAlt,
  FaMapMarkerAlt,
  FaBoxOpen,
  FaHeadset,
  FaUndo,
} from "react-icons/fa";
import { FaFileContract } from "react-icons/fa6";

const Sidebar = () => {
  const menuList = [
    {
      id: "1",
      name: "Your Account",
      icon: FaUser,
      path: "/profile/account",
    },
    {
      id: "2",
      name: "Your Order",
      icon: FaBoxOpen,
      path: "/profile/orders",
    },
    {
      id: "3",
      name: "Your Address",
      icon: FaMapMarkerAlt,
      path: "/profile/address",
    },
    {
      id: "4",
      name: "Terms and Conditions",
      icon: FaFileContract,
      path: "/profile/termsandconditions",
    },
    {
      id: "5",
      name: "Return and Refund Policy",
      icon: FaUndo,
      path: "/profile/return",
    },
    {
      id: "6",
      name: "Customer Care",
      icon: FaHeadset,
      path: "/profile/customercare",
    },
  ];

  const path = usePathname();

  return (
    <section className="p-10 pt-28 ">
      <div className="w-[450px] p-5 border-2 rounded-3xl bg-white">
        <div className="flex flex-col items-center justify-center gap-3 mb-5">
          <div className="flex items-center justify-center w-[100px] h-[100px] border-2 rounded-full gap-3">
            <h2 className="text-3xl font-medium">SVM</h2>
          </div>
          <h2 className="text-3xl">SVM</h2>
        </div>
        {menuList.map((item) => (
          <Link href={item.path} className="" key={item.id}>
            <div
              className="px-[3px] duration-200 border-b-2  hover:bg-gray-300 pb-1"
              key={item.id}
            >
              <h2 className="flex items-center gap-2 mt-5 text-xl">
                <item.icon />
                {item.name}
              </h2>
            </div>
          </Link>
        ))}
        <div>
          <button className="p-2 px-5 mt-5 text-2xl font-medium text-white duration-200 bg-red-500 rounded-full hover:opacity-85">
            Logout
          </button>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
