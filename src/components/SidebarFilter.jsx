import React from "react";

const SidebarFilter = ({
  categories,
  selectedCategories,
  onCategoryChange,
  priceRange,
  maxPrice,
  onPriceChange,
  handleFilter,
  resetFilters,
}) => {
  return (
    <section className="pt-5 mb-10">
      <div className="p-3 bg-gray-100">
        <h1 className="text-3xl font-medium">Our Products</h1>
        <div className="flex flex-col gap-5">
          {/* Category Checkboxes */}
          <div className="pb-2 border-b-2">
            <h2 className="mb-3 text-3xl font-semibold">Filter</h2>
            <h3 className="mb-1 text-2xl font-medium">Category</h3>
            {categories.map((category) => (
              <div className="flex items-center gap-1" key={category.id}>
                <input
                  type="checkbox"
                  id={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => onCategoryChange(category.id)}
                />
                <label htmlFor={category.id} className="mb-1">
                  {category.name}
                </label>
              </div>
            ))}
          </div>

          {/* Price Range Slider */}
          <div className="pb-2 border-b-2">
            <h2 className="text-2xl font-medium">Price Range</h2>
            <input
              type="range"
              min={0}
              max={maxPrice}
              value={priceRange.max}
              onChange={onPriceChange}
              className="mt-2"
            />
            <div className="flex justify-between">
              <span>{`₹${priceRange.min}`}</span>
              <span>{`₹${priceRange.max}`}</span>
            </div>
          </div>

          {/* Rating */}
          {/* <div>
            <h2 className="text-3xl font-medium">Rating</h2>
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
          </div> */}

          {/* Filter buttons */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleFilter}
              className="px-4 py-2 text-white bg-green-600 rounded"
            >
              Apply Filters
            </button>
            <button
              onClick={resetFilters}
              className="px-4 py-2 text-white bg-red-600 rounded"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SidebarFilter;
