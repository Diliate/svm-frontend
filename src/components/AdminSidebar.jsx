"use client";

import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { DiGoogleAnalytics } from "react-icons/di";
import { AiFillProduct } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import Link from "next/link";
import { GrUserAdmin } from "react-icons/gr";

const AdminSidebar = () => {
  const [activeTab, setActiveTab] = useState("1");

  const menuList = [
    {
      id: "1",
      title: "Users",
      icon: FaUser,
      path: "/admin",
    },
    {
      id: "2",
      title: "Categories",
      icon: AiFillProduct,
      path: "/admin/categories",
    },
    {
      id: "3",
      title: "Products",
      icon: BsCart4,
      path: "/admin/products",
    },
    {
      id: "4",
      title: "Analytics",
      icon: DiGoogleAnalytics,
      path: "/admin/analytics",
    },
  ];

  return (
    <section className="bg-white">
      <div className="md:w-[300px] w-auto md:p-5 p-2 h-screen">
        <div className="flex flex-col items-center justify-center gap-3 mb-5">
          <div className="flex items-center justify-center p-3 mt-20 border-2 border-black rounded-full md:p-5 md:border-4">
            <GrUserAdmin className="md:text-[100px] text-2xl" />
          </div>
        </div>

        <div className="flex flex-col gap-0">
          {menuList.map((item) => (
            <Link key={item.id} href={item.path}>
              <div
                className={`flex items-center p-3 mb-2 duration-200 cursor-pointer hover:bg-[#046C42] hover:text-white ${
                  item.id === activeTab ? "bg-[#046C42] text-white" : ""
                } rounded-xl`}
                onClick={() => setActiveTab(item.id)}
              >
                <h2 className="flex items-center w-full gap-2 text-xl font-medium">
                  <item.icon />
                  <span className="hidden md:block">{item.title}</span>
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdminSidebar;
