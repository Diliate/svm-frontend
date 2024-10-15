"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// Ensure correct imports based on your UI library
import {
  FaUser,
  FaMapMarkerAlt,
  FaBoxOpen,
  FaHeadset,
  FaUndo,
  FaFileContract,
} from "react-icons/fa";
import CustomerCareDialog from "./CustomerCareDialog";
import ReturnDialog from "./ReturnDialog";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [isCustomerCareModalOpen, setCustomerCareModalOpen] = useState(false);
  const [isReturnModalOpen, setReturnModalOpen] = useState(false);

  const menuList = [
    { id: "1", name: "Your Account", icon: FaUser, path: "/profile/account" },
    { id: "2", name: "Your Order", icon: FaBoxOpen, path: "/profile/orders" },
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
      action: () => setReturnModalOpen(true),
    },
    {
      id: "6",
      name: "Customer Care",
      icon: FaHeadset,
      action: () => setCustomerCareModalOpen(true),
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
        {menuList.map((item) =>
          item.action ? (
            <div
              key={item.id}
              onClick={item.action}
              className="flex items-center justify-between pb-1 mt-5 border-b-2 cursor-pointer group"
            >
              <h2 className="flex items-center gap-2 text-xl">
                <item.icon />
                {item.name}
              </h2>
            </div>
          ) : (
            <Link
              href={item.path}
              key={item.id}
              className="flex items-center justify-between pb-1 mt-5 border-b-2 cursor-pointer group"
            >
              <h2 className="flex items-center gap-2 text-xl">
                <item.icon />
                {item.name}
              </h2>
            </Link>
          )
        )}

        <CustomerCareDialog
          isCustomerCareModalOpen={isCustomerCareModalOpen}
          setCustomerCareModalOpen={setCustomerCareModalOpen}
        />

        <ReturnDialog
          isReturnModalOpen={isReturnModalOpen}
          setReturnModalOpen={setReturnModalOpen}
        />

        <button className="px-5 py-2 mt-5 text-xl font-medium text-white duration-200 bg-red-600 rounded-full hover:opacity-85">
          Logout
        </button>
      </div>
    </section>
  );
};

export default Sidebar;
