"use client";

import { useAuth } from "@/context/AuthContext";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import ChangePasswordModal from "@/components/ChangePasswordModal";

// Utility functions to mask email and mobile number
const maskEmail = (email) => {
  if (!email) return "";
  const [username, domain] = email.split("@");
  if (!domain) return email; // Invalid email format
  const visibleLength = 3;
  if (username.length <= visibleLength) {
    return `${username}***@${domain}`;
  }
  const visiblePart = username.slice(0, visibleLength);
  const maskedPart = "*".repeat(username.length - visibleLength);
  return `${visiblePart}${maskedPart}@${domain}`;
};

const maskMobile = (mobile) => {
  if (!mobile) return "";
  const visibleStart = 3;
  const visibleEnd = 2;
  if (mobile.length <= visibleStart + visibleEnd) {
    return "*".repeat(mobile.length);
  }
  const start = mobile.slice(0, visibleStart);
  const end = mobile.slice(-visibleEnd);
  const maskedMiddle = "*".repeat(mobile.length - visibleStart - visibleEnd);
  return `${start}${maskedMiddle}${end}`;
};

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// Request interceptor to attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const Page = () => {
  const { user, updateUserInContext } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // State to track which input field is focused
  const [focusedField, setFocusedField] = useState(null);

  // Pre-fill form data from the user object
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        mobile: user.mobile || "",
      });
    }
  }, [user]);

  // Fetch addresses and determine the default address
  useEffect(() => {
    const fetchDefaultAddress = async () => {
      setLoading(true);
      setError(null);
      try {
        const defaultAddressId = localStorage.getItem("defaultAddressId");

        if (defaultAddressId) {
          // Fetch the user's addresses
          const response = await api.get("/addresses");

          const addresses = response.data.addresses || response.data;

          // Find the default address from the list of addresses
          const address = addresses.find(
            (addr) => addr.id === parseInt(defaultAddressId, 10)
          );

          if (address) {
            setDefaultAddress(address); // Set default address in state
          } else {
            console.warn("Default address not found in fetched addresses.");
          }
        }
      } catch (error) {
        console.error("Error fetching default address:", error);
        setError("Failed to fetch default address.");
        toast.error("Failed to fetch default address.");
      } finally {
        setLoading(false);
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
          // Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update user");
      }

      const data = await response.json();
      toast.success("User details updated successfully!");

      // Update the user in context
      updateUserInContext(data.user);
    } catch (error) {
      toast.error(error.message || "Failed to update user details");
      console.error("Update error:", error);
    }
  };

  return (
    <section className="w-full bg-white rounded-2xl min-h-[500px]">
      <div className="p-5">
        <h2 className="text-4xl font-medium md:text-5xl">Your Account</h2>
        <p className="my-3 text-2xl md:my-5">Edit your details</p>

        <div className="w-full p-5 bg-[#F7F7F7] flex flex-col gap-5">
          {/* Username Field */}
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

          {/* Email Field with Masking */}
          <div className="flex flex-col gap-5 md:gap-10 md:flex-row">
            <h2 className="w-[200px] text-2xl font-medium">Email Id</h2>
            <div className="relative">
              <input
                type="text"
                name="email"
                placeholder="Your Email"
                value={
                  focusedField === "email"
                    ? formData.email
                    : maskEmail(formData.email)
                }
                onChange={handleChange}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                className="w-full text-xl bg-transparent border-b-2 outline-none md:text-2xl"
              />
              {/* Optional: Toggle Button to Show/Hide Email */}
              {/* Uncomment the following block if you want a manual toggle */}
              {/* 
              <button
                type="button"
                onClick={() =>
                  setFocusedField((prev) =>
                    prev === "email" ? null : "email"
                  )
                }
                className="absolute top-0 right-0 mt-2 mr-2 text-sm text-blue-500"
              >
                {focusedField === "email" ? "Hide" : "Show"}
              </button>
              */}
            </div>
          </div>

          {/* Address Field */}
          <div className="flex flex-col gap-5 md:gap-10 md:flex-row">
            <h2 className="w-[200px] text-2xl font-medium">Address</h2>
            {loading ? (
              <div className="text-xl bg-transparent outline-none md:text-2xl">
                Loading...
              </div>
            ) : defaultAddress ? (
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

          {/* Mobile Number Field with Masking */}
          <div className="flex flex-col gap-5 md:gap-10 md:flex-row">
            <h2 className="w-[200px] text-2xl font-medium">Mobile No.</h2>
            <div className="relative">
              <input
                type="text"
                name="mobile"
                placeholder="Your Number"
                value={
                  focusedField === "mobile"
                    ? formData.mobile
                    : maskMobile(formData.mobile)
                }
                onChange={handleChange}
                onFocus={() => setFocusedField("mobile")}
                onBlur={() => setFocusedField(null)}
                className="w-full text-xl bg-transparent border-b-2 outline-none md:text-2xl"
              />
              {/* Optional: Toggle Button to Show/Hide Mobile */}
              {/* Uncomment the following block if you want a manual toggle */}
              {/* 
              <button
                type="button"
                onClick={() =>
                  setFocusedField((prev) =>
                    prev === "mobile" ? null : "mobile"
                  )
                }
                className="absolute top-0 right-0 mt-2 mr-2 text-sm text-blue-500"
              >
                {focusedField === "mobile" ? "Hide" : "Show"}
              </button>
              */}
            </div>
          </div>

          {/* Save Button */}
          <div className="flex md:justify-end">
            <button
              onClick={handleSave}
              className="px-10 py-1 mt-5 text-xl font-medium text-white duration-200 bg-green-600 rounded-lg hover:opacity-85"
            >
              Save
            </button>
          </div>
        </div>

        {/* Security Section */}
        <div className="mt-10">
          <h2 className="mb-3 text-3xl font-medium">Security</h2>
          <div className="flex flex-col justify-between gap-5 md:flex-row">
            {/* Masked Email Display */}
            <div className="flex flex-col items-center justify-center h-20 text-center bg-[#F7F7F7] border-[1px] border-black w-52 rounded-xl">
              <h2 className="text-xl font-medium">Email Id</h2>
              <p className="px-2 text-sm break-all">
                {maskEmail(formData.email)}
              </p>
            </div>

            {/* Password Display */}
            <div className="flex flex-col items-center justify-center h-20 text-center bg-[#F7F7F7] border-[1px] border-black w-52 rounded-xl">
              <h2 className="text-xl font-medium">Password</h2>
              <p>*********</p>
            </div>

            {/* Masked Mobile Display */}
            <div className="flex flex-col items-center justify-center h-20 text-center bg-[#F7F7F7] border-[1px] border-black w-52 rounded-xl">
              <h2 className="text-xl font-medium">Mobile No.</h2>
              <p>+91 {maskMobile(formData.mobile)}</p>
            </div>
          </div>
          <div className="py-[7px] mt-5 text-xl font-medium">
            <ChangePasswordModal />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
