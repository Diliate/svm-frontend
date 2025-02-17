"use client";

import Link from "next/link";
import React, { useState } from "react";
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
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <aside className="relative block h-16 pt-40 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              className="absolute inset-0 object-cover w-full h-full"
            />
          </aside>

          <main className="flex items-center justify-center px-5 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <section className="flex flex-col items-center justify-center p-5 md:px-10">
                <div className="flex flex-col items-center justify-center gap-5">
                  <h1 className="text-5xl font-medium">Welcome back!</h1>
                  <form onSubmit={handleLogin} className="w-full mt-3 lg:mt-5">
                    <div className="flex flex-col">
                      <label className="mb-2 text-xl font-medium">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="px-3 py-2 border-2 outline-none rounded-xl"
                        required
                      />
                    </div>
                    <div className="flex flex-col mt-5">
                      <label className="mb-2 text-xl font-medium">
                        Password
                      </label>
                      <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="px-3 py-2 border-2 outline-none rounded-xl"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#3A5B22] text-white py-2 text-xl font-medium rounded-xl hover:opacity-85 duration-200 mt-5"
                    >
                      {loading ? "Logging in..." : "Login"}
                    </button>
                  </form>

                  <div className="flex items-center justify-center mt-5 text-xl lg:mt-10">
                    <h2>
                      Don&rsquo;t have an account?{" "}
                      <Link href={"/signup"} className="font-medium underline">
                        Sign Up
                      </Link>
                    </h2>
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      </section>
    </>
  );
}

export default Page;
