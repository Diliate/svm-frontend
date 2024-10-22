import AdminSidebar from "@/components/AdminSidebar";
import React from "react";

function AdminLayout({ children }) {
  return (
    <section className="flex bg-[#F7F7F7] pb-10">
      <div className="bg-[#F7F7F7]">
        <AdminSidebar />
      </div>
      <div className="w-full h-auto mt-28 rounded-2xl">{children}</div>
    </section>
  );
}

export default AdminLayout;
