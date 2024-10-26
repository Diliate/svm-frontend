import React from "react";
import AdminSidebar from "@/components/AdminSidebar";

function AdminLayout({ children }) {
  return (
    <div className="flex bg-[#F7F7F7]">
      <div className="relative md:w-[300px] w-auto">
        {" "}
        <div className="sticky top-0 h-(screen-20) overflow-y-auto">
          {" "}
          <AdminSidebar />
        </div>
      </div>
      <main className="flex-1 pt-20 pb-16 overflow-hidden md:pt-28 rounded-2xl">
        {" "}
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;
