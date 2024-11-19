"use client";

import { useAuth } from "@/context/AuthContext";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const Page = () => {
  const { user, updateUserInContext } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [defaultAddress, setDefaultAddress] = useState(null);

  console.log("User Details: ", user);

  // Pre-fill form data from the user object
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  // Fetch addresses and determine the default address
  useEffect(() => {
    const fetchDefaultAddress = async () => {
      try {
        const token = localStorage.getItem("token");
        const defaultAddressId = localStorage.getItem("defaultAddressId");

        if (defaultAddressId) {
          // Fetch the user's addresses
          const response = await axios.get(
            "http://localhost:5000/api/addresses",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          // Find the default address from the list of addresses
          const address = response.data.find(
            (addr) => addr.id === parseInt(defaultAddressId, 10)
          );

          if (address) {
            setDefaultAddress(address); // Set default address in state
          }
        }
      } catch (error) {
        console.error("Error fetching default address:", error);
      }
    };

    fetchDefaultAddress();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const data = await response.json();
      toast.success("User details updated successfully!");

      // Update the user in context
      updateUserInContext(data.user);
    } catch (error) {
      toast.error("Failed to update user details");
      console.error("Update error:", error);
    }
  };

  return (
    <section className="w-full bg-white rounded-2xl min-h-[500px]">
      <div className="p-5">
        <h2 className="text-4xl font-medium md:text-5xl">Your Account</h2>
        <p className="my-3 text-2xl md:my-5">Edit your details</p>

        <div className="w-full p-5 bg-[#F7F7F7] flex flex-col gap-5">
          <div className="flex flex-col gap-5 md:gap-10 md:flex-row">
            <h2 className="w-[200px] text-2xl font-medium">Username</h2>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="text-xl bg-transparent border-b-2 outline-none md:text-2xl"
            />
          </div>
          <div className="flex flex-col gap-5 md:gap-10 md:flex-row">
            <h2 className="w-[200px] text-2xl font-medium">Email Id</h2>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="text-xl bg-transparent border-b-2 outline-none md:text-2xl"
            />
          </div>
          <div className="flex flex-col gap-5 md:gap-10 md:flex-row">
            <h2 className="w-[200px] text-2xl font-medium">Address</h2>
            {defaultAddress ? (
              <div className="text-xl bg-transparent outline-none md:text-2xl">
                {defaultAddress.area}, {defaultAddress.city},{" "}
                {defaultAddress.state} - {defaultAddress.zipCode}
              </div>
            ) : (
              <div className="text-xl bg-transparent border-b-2 outline-none md:text-2xl">
                No default address selected
              </div>
            )}
          </div>
          <div className="flex flex-col gap-5 md:gap-10 md:flex-row">
            <h2 className="w-[200px] text-2xl font-medium">Mobile No.</h2>
            <input
              type="number"
              placeholder="Your Number"
              value={user?.mobile || ""}
              readOnly
              className="text-xl bg-transparent border-b-2 outline-none md:text-2xl"
            />
          </div>
          <div className="flex md:justify-end">
            <button
              onClick={handleSave}
              className="px-10 py-1 mt-5 text-xl font-medium text-white duration-200 bg-green-600 rounded-lg hover:opacity-85"
            >
              Save
            </button>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="mb-3 text-3xl font-medium">Security</h2>
          <div className="flex flex-col justify-between gap-5 md:flex-row">
            <div className="flex flex-col items-center justify-center h-20 text-center bg-[#F7F7F7] border-[1px] border-black w-52 rounded-xl">
              <h2 className="text-xl font-medium">Email Id</h2>
              <p>{formData.email}</p>
            </div>
            <div className="flex flex-col items-center justify-center h-20 text-center bg-[#F7F7F7] border-[1px] border-black w-52 rounded-xl">
              <h2 className="text-xl font-medium">Password</h2>
              <p>*********</p>
            </div>
            <div className="flex flex-col items-center justify-center h-20 text-center bg-[#F7F7F7] border-[1px] border-black w-52 rounded-xl">
              <h2 className="text-xl font-medium">Mobile No.</h2>
              <p>+91 12345678</p>
            </div>
          </div>
          <button className="px-10 py-[7px] mt-5 text-xl font-medium text-white duration-200 bg-black hover:opacity-85 rounded-lg">
            Change Password
          </button>
        </div>
      </div>
    </section>
  );
};

export default Page;
