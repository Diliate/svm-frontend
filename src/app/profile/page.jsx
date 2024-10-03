import Link from "next/link";
import React from "react";
import {
  FaUser,
  FaRegFileAlt,
  FaGavel,
  FaMapMarkerAlt,
  FaBoxOpen,
  FaHeadset,
  FaUndo,
} from "react-icons/fa";
import { FaFileContract } from "react-icons/fa6";

const page = () => {
  const profileData = [
    {
      heading: "Account",
      desc: "Edit Login name and Mobile Number",
      icon: <FaUser size={100} />,
      href: "/profile",
    },
    {
      heading: "Return and Refund Policy",
      desc: "Read about return and refund policy",
      icon: <FaUndo size={100} />,
      href: "/profile/return",
    },
    {
      heading: "Terms and Conditions",
      desc: "Read about terms and conditions",
      icon: <FaFileContract size={100} />,
      href: "/profile/termsandconditions",
    },
    {
      heading: "Your Address",
      desc: "Edit Address for order and gifts",
      icon: <FaMapMarkerAlt size={100} />,
      href: "/profile",
    },
    {
      heading: "Your Orders",
      desc: "Track, Return or buy things",
      icon: <FaBoxOpen size={100} />,
      href: "/profile",
    },
    {
      heading: "Customer Care",
      desc: "Availability for customers and services",
      icon: <FaHeadset size={100} />,
      href: "/profile/customercare",
    },
  ];

  return (
    <section className="bg-[#F7F7F7] p-10 pt-20">
      <h1 className="mb-10 text-5xl font-semibold">Profile</h1>
      <div className="grid grid-cols-3 gap-10">
        {profileData.map((data, index) => (
          <Link href={data.href} key={index}>
            <div className="border-2 w-[450px] h-[200px] rounded-3xl p-5 bg-[#F9FAEE] flex items-center justify-center gap-5 hover:scale-105 duration-300">
              <div>{data.icon}</div>
              <div>
                <h2 className="text-3xl font-semibold">{data.heading}</h2>
                <p className="mt-5 text-xl">{data.desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default page;
