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
} from "./ui/drawer";

const ResponsiveFilter = ({
  categories,
  selectedCategories,
  onCategoryChange,
  priceRange,
  maxPrice,
  onPriceChange,
  onApplyFilters,
  resetFilters,
}) => {
  return (
    <div className="flex items-center justify-end md:hidden">
      <Drawer>
        {/* Trigger Button */}
        <DrawerTrigger className="px-5 py-1 text-xl font-medium text-white duration-200 bg-green-600 border-2 rounded-full hover:opacity-85">
          Add Filters
        </DrawerTrigger>

        {/* Drawer Content */}
        <DrawerContent className="h-[70%]">
          <DrawerHeader>
            <DrawerTitle>Filter</DrawerTitle>
            <DrawerDescription>
              <div className="overflow-y-auto h-[300px] text-left">
                {/* CATEGORIES FILTER */}
                <h2 className="text-xl font-semibold">Categories</h2>
                <div className="mt-2 text-lg text-black">
                  {categories.map((category) => (
                    <div className="flex items-center gap-2" key={category.id}>
                      <input
                        type="checkbox"
                        id={`category-${category.id}`}
                        checked={selectedCategories.includes(category.id)}
                        onChange={() => onCategoryChange(category.id)}
                      />
                      <label
                        htmlFor={`category-${category.id}`}
                        className="mb-1 cursor-pointer"
                      >
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>

                {/* PRICE RANGE SLIDER */}
                <div className="pb-2 mt-5 border-b-2">
                  <h2 className="text-xl font-semibold">Price Range</h2>
                  <input
                    type="range"
                    min={0}
                    max={maxPrice}
                    value={priceRange.max}
                    onChange={(e) =>
                      onPriceChange({
                        ...priceRange,
                        max: Number(e.target.value),
                      })
                    }
                    className="w-full mt-2"
                  />
                  <div className="flex justify-between">
                    <span>{`₹${priceRange.min}`}</span>
                    <span>{`₹${priceRange.max}`}</span>
                  </div>
                </div>
              </div>
            </DrawerDescription>
          </DrawerHeader>

          {/* Drawer Footer */}
          <DrawerFooter>
            <div className="flex items-center justify-end">
              <DrawerClose>
                <button
                  onClick={onApplyFilters}
                  className="px-5 py-1 text-white bg-green-600 border-2 rounded-full"
                >
                  Apply
                </button>
              </DrawerClose>

              <DrawerClose>
                <button
                  onClick={resetFilters}
                  className="px-5 py-1 text-black bg-transparent border-2 rounded-full"
                >
                  Reset
                </button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default ResponsiveFilter;
