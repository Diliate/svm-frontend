import Sidebar from "@/components/Sidebar";
import React from "react";

function ProfileLayout({ children }) {
  return (
    <section className="flex bg-[#F7F7F7] md:px-10 px-5 pb-10">
      <div className="bg-[#F7F7F7] md:block hidden">
        <Sidebar />
      </div>
      <div className="w-full h-auto mt-24 bg-white border-2 md:mt-28 rounded-2xl">
        {children}
      </div>
    </section>
  );
}

export default ProfileLayout;
