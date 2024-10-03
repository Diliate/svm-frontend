import React from 'react';

const SidebarFilter = () => {
  return (
    <div className="w-1/4 p-4">
      <h2 className="text-xl font-semibold mb-4">Filter</h2>
      
      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-medium">Category</h3>
        <div>
          <label>
            <input type="checkbox" className="mr-2" />
            Urinary Health
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" className="mr-2" />
            Weight Management
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" className="mr-2" />
            Liver Health
          </label>
        </div>
      </div>
      
      {/* Price Range */}
      <div className="mb-6">
        <h3 className="text-lg font-medium">Price Range</h3>
        <input type="range" min="0" max="1000" className="w-full mt-2" />
      </div>

      {/* Rating Filter */}
      <div>
        <h3 className="text-lg font-medium">Rating</h3>
        <div className="space-y-2">
          <label>
            <input type="radio" className="mr-2" />
            ★★★★★
          </label>
          <label>
            <input type="radio" className="mr-2" />
            ★★★★☆
          </label>
          <label>
            <input type="radio" className="mr-2" />
            ★★★☆☆
          </label>
          <label>
            <input type="radio" className="mr-2" />
            ★★☆☆☆
          </label>
          <label>
            <input type="radio" className="mr-2" />
            ★☆☆☆☆
          </label>
        </div>
      </div>
    </div>
  );
};

export default SidebarFilter;
