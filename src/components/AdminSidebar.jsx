"use client";

import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { DiGoogleAnalytics } from "react-icons/di";
import { AiFillProduct } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";

const AdminSidebar = () => {
  const [activeTab, setActiveTab] = useState("1");

  const menuList = [
    {
      id: "1",
      title: "Users",
      icon: FaUser,
      path: "/admin/users",
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
      <div className="w-[300px] p-5 h-screen">
        <div className="flex flex-col items-center justify-center gap-3 mb-5">
          <div className="mt-20">
            <Image
              src={"/svm-logo.png"}
              alt="svm-logo"
              height={130}
              width={130}
              className="w-auto h-auto"
            />
          </div>
        </div>

        {menuList.map((item) => (
          <Link key={item.id} href={item.path}>
            <div
              className={`flex items-center justify-between p-3 mb-2 duration-200 cursor-pointer hover:bg-[#046C42] hover:text-white ${
                item.id === activeTab ? "bg-[#046C42] text-white" : ""
              } rounded-xl`}
              onClick={() => setActiveTab(item.id)}
            >
              <h2 className="flex items-center w-full gap-2 text-xl font-medium">
                <item.icon />
                {item.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default AdminSidebar;
