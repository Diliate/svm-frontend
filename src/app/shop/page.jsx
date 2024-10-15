import PaginationComp from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import SidebarFilter from "@/components/SidebarFilter";
import React from "react";

function Page() {
  return (
    <div className="flex h-screen px-4 pt-14 lg:px-8">
      {/* Sidebar */}
      <aside className="w-1/4 p-4 ">
        <SidebarFilter />
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 ">
        {/* Product Grid Wrapper - Scrollable */}
        <div className="flex-1 p-5 overflow-y-auto">
          {/* Product Grid */}
          <div className="grid grid-cols-1 gap-5 mt-10 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }, (_, index) => (
              <div className="relative " key={index}>
                <ProductCard />
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Control */}
        <div className="py-3 ">
          <PaginationComp />
        </div>
      </div>
    </div>
  );
}

export default Page;
