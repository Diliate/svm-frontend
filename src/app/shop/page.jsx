"use client";

import PaginationComp from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import SidebarFilter from "@/components/SidebarFilter";
import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

function Page() {
  return (
    <div className="flex h-screen px-4 pt-14 lg:px-8">
      {/* Sidebar for larger screens */}
      <aside className="hidden w-1/4 p-4 md:block">
        <SidebarFilter />
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 mt-5 md:mt-0">
        {/* Drawer for mobile screens */}
        <div className="flex items-center justify-end md:hidden">
          <Drawer>
            <DrawerTrigger className="px-5 py-1 text-xl font-medium text-white duration-200 bg-green-600 border-2 rounded-full hover:opacity-85">
              Add Filters
            </DrawerTrigger>
            <DrawerContent className="h-1/2">
              <DrawerHeader>
                <DrawerTitle>Filter</DrawerTitle>
                <DrawerDescription>
                  <div className="overflow-y-auto h-[200px] text-left">
                    {/* CATEGORIES FILTER */}
                    <h2 className="text-xl">Categories</h2>
                    <div className="mt-2 text-lg text-black">
                      <div className="flex items-center gap-1">
                        <input type="checkbox" />
                        <label className="mb-1">Urinary Health</label>
                      </div>
                      <div className="flex items-center gap-1">
                        <input type="checkbox" />
                        <label className="mb-1">Weight Management</label>
                      </div>
                      <div className="flex items-center gap-1">
                        <input type="checkbox" />
                        <label className="mb-1">Liver Health</label>
                      </div>
                    </div>

                    {/* PRICE RANGE SLIDER */}
                    <div className="pb-2 mt-3 border-b-2">
                      <h2 className="text-xl font-medium">Price Range</h2>
                      <input type="range" className="mt-2" />
                      <div className="flex gap-16">
                        <span>Low</span>
                        <span>High</span>
                      </div>
                    </div>

                    {/* RATING FILTER */}
                    <div className="mt-3">
                      <h2 className="text-2xl font-medium">Rating</h2>
                      <div className="flex items-center gap-1">
                        <input type="checkbox" />
                        <div className="text-xl">★★★★★</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <input type="checkbox" />
                        <div className="text-xl">★★★★☆</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <input type="checkbox" />
                        <div className="text-xl">★★★☆☆</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <input type="checkbox" />
                        <div className="text-xl">★★☆☆☆</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <input type="checkbox" />
                        <div className="text-xl">★☆☆☆☆</div>
                      </div>
                    </div>
                  </div>
                </DrawerDescription>
              </DrawerHeader>

              <DrawerFooter>
                <DrawerClose className="flex justify-end gap-5">
                  <span className="px-5 py-1 text-white bg-green-600 border-2 rounded-full">
                    Apply
                  </span>
                  <span className="px-5 py-1 border-2 rounded-full">Reset</span>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>

        {/* Product Grid Wrapper - Scrollable */}
        <div className="flex-1 p-5 overflow-y-auto">
          {/* Product Grid */}
          <div className="grid grid-cols-1 gap-10 mt-5 md:gap-5 md:mt-10 sm:grid-cols-2 lg:grid-cols-3">
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
