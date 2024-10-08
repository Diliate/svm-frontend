"use client";

import Link from "next/link";
import React, { useState } from "react";
import {
  FaUser,
  FaMapMarkerAlt,
  FaBoxOpen,
  FaHeadset,
  FaUndo,
} from "react-icons/fa";
import { FaFileContract } from "react-icons/fa6";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("1"); // Default active tab is "Your Account"

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

  return (
    <section className="p-10 pt-28">
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
              className={`px-[3px] duration-200 border-b-2 flex justify-between items-center pb-1 group `}
              onClick={() => setActiveTab(item.id)}
            >
              <h2 className="flex items-center gap-2 mt-5 text-xl">
                <item.icon />
                {item.name}
              </h2>
              {activeTab === item.id && (
                <div className="h-3 w-3 rounded-full bg-[#004A06] mt-6 duration-300"></div>
              )}
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
