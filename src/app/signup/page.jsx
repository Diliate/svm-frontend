"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";

function Page() {
  const { signup, loading } = useAuth();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    // Basic Validation
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    setError(null); // Reset error before the request

    try {
      await signup(name, email, password);
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <section className="flex flex-col items-center justify-center px-5 pb-10 pt-28 md:px-10">
      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="text-5xl font-medium">Welcome to SVM</h1>
        <form onSubmit={handleRegister} className="w-full mt-5">
          <div className="flex flex-col">
            <label className="mb-2 text-xl font-medium">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-3 py-2 border-2 outline-none rounded-xl"
            />
          </div>
          <div className="flex flex-col mt-4">
            <label className="mb-2 text-xl font-medium">Phone No.</label>
            <input
              type="number"
              placeholder="Enter your phone no."
              // value={phone}
              // onChange={(e) => setPhone(e.target.value)}
              className="px-3 py-2 border-2 outline-none rounded-xl"
            />
          </div>
          <div className="flex flex-col mt-5">
            <label className="mb-2 text-xl font-medium">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-3 py-2 border-2 outline-none rounded-xl"
            />
          </div>
          <div className="flex flex-col mt-5">
            <label className="mb-2 text-xl font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-3 py-2 border-2 outline-none rounded-xl"
            />
          </div>
          {error && <p className="mt-3 text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#3A5B22] text-white py-2 mt-5 text-xl font-medium rounded-xl hover:opacity-85 duration-200"
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>

        <div className="flex items-center justify-center mt-10 text-xl">
          <h2>
            Already have an account?{" "}
            <Link href={"/login"} className="font-medium underline">
              Sign In
            </Link>
          </h2>
        </div>
      </div>
    </section>
  );
}

export default Page;
