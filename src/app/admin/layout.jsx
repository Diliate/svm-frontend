"use client";

import React, { useEffect, useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

function AdminLayout({ children }) {
  const { user } = useAuth();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else if (user.name === "admin" && user.email === "admin@gmail.com") {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
    setIsChecking(false);
  }, [user]);

  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span>Loading...</span>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-3">
        <h1 className="text-2xl font-semibold text-red-600">Not Authorized</h1>
        <Link
          href={"/"}
          className="px-5 py-2 text-white transition-all bg-black rounded-full hover:opacity-85"
        >
          Go Back
        </Link>
      </div>
    );
  }

  return (
    <div className="flex bg-[#F7F7F7]">
      <div className="relative md:w-[300px] w-auto">
        <div className="sticky top-0 h-(screen-20) overflow-y-auto">
          <AdminSidebar />
        </div>
      </div>
      <main className="flex-1 pt-20 pb-16 overflow-hidden md:pt-28 rounded-2xl">
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;
