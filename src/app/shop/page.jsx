import Pagination from '@/components/Pagination';
import ProductList from '@/components/ProductList';
import SidebarFilter from '@/components/SidebarFilter';
import React from 'react';

function Page() {
  return (
    <div className="container mx-auto p-4 lg:p-8">
      <div className="lg:flex lg:space-x-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-1/4 bg-gray-100 rounded-lg p-6 mb-8 lg:mb-0">
          <SidebarFilter />
        </aside>

        {/* Product List and Pagination */}
        <main className="w-full lg:w-3/4">
          <ProductList />
          <div className="mt-8">
            <Pagination />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Page;
