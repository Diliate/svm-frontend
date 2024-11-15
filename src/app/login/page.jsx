"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

function Page() {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      await login(email, password);
      toast.success("Logged in successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <section className="flex flex-col items-center justify-center p-5 md:px-10 pt-28">
      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="text-5xl font-medium">Welcome back!</h1>
        <form onSubmit={handleLogin} className="w-full mt-5">
          <div className="flex flex-col">
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
            className="w-full bg-[#3A5B22] text-white py-2 text-xl font-medium rounded-xl hover:opacity-85 duration-200 mt-5"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex items-center justify-center gap-3 my-3 ">
          <div className="bg-gray-500 md:w-[200px] w-full h-[1px]"></div>
          <span className="text-2xl">or</span>
          <div className="bg-gray-500 md:w-[200px] w-full h-[1px]"></div>
        </div>

        <div className="flex flex-col justify-center gap-10 md:flex-row">
          <div className="flex items-center justify-center w-full gap-3 py-2 text-2xl font-medium duration-200 border-2 border-black rounded-lg cursor-pointer md:w-1/2 hover:bg-gray-200">
            <Image
              src="/fb.png"
              alt="fb"
              height={40}
              width={40}
              className="rounded-xl"
            />
            Facebook
          </div>
          <div className="flex items-center justify-center w-full gap-3 py-2 text-2xl font-medium duration-200 border-2 border-black rounded-lg cursor-pointer md:w-1/2 hover:bg-gray-200">
            <Image src="/google.png" alt="google" height={40} width={40} />
            Google
          </div>
        </div>

        <div className="flex items-center justify-center mt-10 text-xl">
          <h2>
            Don&rsquo;t have an account?{" "}
            <Link href={"/signup"} className="font-medium underline">
              Sign Up
            </Link>
          </h2>
        </div>
      </div>
    </section>
  );
}

export default Page;
