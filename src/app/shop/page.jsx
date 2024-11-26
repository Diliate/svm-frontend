"use client";

import PaginationComp from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import SidebarFilter from "@/components/SidebarFilter";
import React, { useEffect, useState } from "react";
import {
  fetchFilteredProducts,
  fetchAllProducts,
} from "@/services/productService";
import { fetchAllCategories } from "@/services/categoryServices";

function Page() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [maxPrice, setMaxPrice] = useState(0);
  const [error, setError] = useState(null); // State for error handling
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [itemsPerPage, setItemsPerPage] = useState(9); // Items per page

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await fetchAllProducts();
        setProducts(products);
        setError(null); // Reset error

        // Calculate the maximum price for the slider
        const maxPrice = Math.max(...products.map((product) => product.price));
        setPriceRange({ min: 0, max: maxPrice });
        setMaxPrice(maxPrice);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setError("Failed to fetch products."); // Set error if fetch fails
      }
    };

    const fetchCategories = async () => {
      try {
        const categories = await fetchAllCategories();
        setCategories(categories);
        setError(null); // Reset error
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setError("Failed to fetch categories."); // Set error if fetch fails
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const handleFilter = async () => {
    try {
      const filters = {
        categoryId: selectedCategories.join(","),
        minPrice: priceRange.min,
        maxPrice: priceRange.max,
      };

      const filteredProducts = await fetchFilteredProducts(filters);
      setProducts(filteredProducts);
      setError(null); // Reset error when products are successfully fetched
      setCurrentPage(1); // Reset to the first page after filtering
    } catch (error) {
      console.error("Error applying filters:", error);
      setProducts([]); // Clear the products state
      setError("No products found for the selected filters."); // Set error message
    }
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handlePriceChange = (e) => {
    const value = Number(e.target.value);
    setPriceRange((prev) => ({
      ...prev,
      max: value,
    }));
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex h-screen px-4 pt-14 lg:px-8">
      {/* Sidebar for larger screens */}
      <aside className="hidden w-1/4 p-4 md:block">
        <SidebarFilter
          categories={categories}
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange}
          priceRange={priceRange}
          maxPrice={maxPrice}
          onPriceChange={handlePriceChange}
        />
        <button
          onClick={handleFilter}
          className="px-4 py-2 mt-4 text-white bg-green-600 rounded"
        >
          Apply Filters
        </button>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 mt-5 md:mt-0">
        {/* Product Grid Wrapper - Scrollable */}
        <div className="flex-1 p-5 overflow-y-auto">
          {error ? ( // Display error message if it exists
            <div className="text-xl font-medium text-center text-gray-600">
              {error}
            </div>
          ) : currentProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-10 mt-5 md:gap-5 md:mt-10 sm:grid-cols-2 lg:grid-cols-3">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-xl font-medium text-center text-gray-600">
              No products found.
            </div>
          )}
        </div>

        {/* Pagination Control */}
        <div className="flex justify-center py-3">
          <PaginationComp />
        </div>
      </div>
    </div>
  );
}

export default Page;
