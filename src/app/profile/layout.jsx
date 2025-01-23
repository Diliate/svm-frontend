"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

function ProfileLayout({ children }) {
  const { user } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      setIsChecking(false);
    }
  }, [user, router]);

  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-[#3A5B22] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section className="flex bg-[#F7F7F7] md:px-10 px-5 pb-10 min-h-[500px]">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="w-full h-auto mt-24 bg-white border-2 md:mt-28 rounded-2xl min-h-[500px]">
        {children}
      </div>
    </section>
  );
}

export default ProfileLayout;
