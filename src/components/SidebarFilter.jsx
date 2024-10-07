import React from "react";

const SidebarFilter = () => {
  return (
    <section className="pt-14">
      <div className="p-3 bg-gray-100">
        <h1 className="text-3xl font-medium">Our Products</h1>
        <div className="flex flex-col gap-5">
          {/* CHECKBOXES */}
          <div className="pb-2 border-b-2">
            <h2 className="mb-3 text-3xl font-semibold">Filter</h2>
            <h3 className="mb-1 text-2xl font-medium">Categorty</h3>
            <div className="flex items-center gap-1">
              <input type="checkbox" />
              <label className="mb-1 text-xl">Urinary Health</label>
            </div>
            <div className="flex items-center gap-1">
              <input type="checkbox" />
              <label className="mb-1 text-xl">Weight Management</label>
            </div>
            <div className="flex items-center gap-1">
              <input type="checkbox" />
              <label className="mb-1 text-xl">Liver Health</label>
            </div>
          </div>

          {/* rANGE sLIDER */}
          <div className="pb-2 border-b-2">
            <h2 className="text-2xl font-medium">Price Range</h2>
            <input type="range" className="mt-2" />
            <div className="flex gap-16">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>

          {/* RATING */}
          <div>
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default SidebarFilter;
