import Pagination from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import SidebarFilter from "@/components/SidebarFilter";
import React from "react";

function Page() {
  return (
    <div className="px-10 pt-32 lg:p-8">
      <div className="flex gap-20">
        {/* Sidebar */}
        <aside className="w-1/4 p-6 mb-8 rounded-lg">
          <SidebarFilter />
        </aside>

        {/* Main Content Area */}
        <div className="flex flex-col w-3/4 pt-10">
          {" "}
          {/* Corrected to ensure proper layout */}
          {/* Product Grid */}
          <div className="grid grid-cols-1 gap-10 mt-10 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }, (_, index) => (
              <div className="relative" key={index}>
                <ProductCard />
              </div>
            ))}
          </div>
          {/* Pagination Control */}
          <div className="mt-8">
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
