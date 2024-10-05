import Sidebar from "@/components/Sidebar";
import React from "react";

function ProfileLayout({ children }) {
  return (
    <section className="flex bg-[#F7F7F7] px-10 pb-10">
      <div className="bg-[#F7F7F7]">
        <Sidebar />
      </div>
      <div className="w-full h-auto bg-white border-2 mt-28 rounded-2xl">
        {children}
      </div>
    </section>
  );
}

export default ProfileLayout;
