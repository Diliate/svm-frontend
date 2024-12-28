"use client";

import ProductCard from "@/components/ProductCard";
import SidebarFilter from "@/components/SidebarFilter";
import React, { useEffect, useState, useRef } from "react";
import {
  fetchFilteredProducts,
  fetchAllProducts,
} from "@/services/productService";
import { fetchAllCategories } from "@/services/categoryServices";
import ResponsiveFilter from "@/components/ResponsiveFilter";

function Page() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [maxPrice, setMaxPrice] = useState(0);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Current page
  const [hasMore, setHasMore] = useState(true); // Whether more products are available
  const loader = useRef(null); // Ref for the Intersection Observer

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const categories = await fetchAllCategories();
        setCategories(categories);

        const productsData = await fetchAllProducts(1, 6); // Fetch first page
        setProducts(productsData.products);

        // Set hasMore based on total products and limit
        setHasMore(productsData.page < productsData.pages); // True if more pages are available

        setMaxPrice(
          Math.max(...productsData.products.map((product) => product.price))
        );
        setError(null);
      } catch (error) {
        console.error("Error fetching initial data:", error);
        setError("Failed to fetch data.");
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreProducts();
        }
      },
      { threshold: 1.0 }
    );

    if (loader.current) observer.observe(loader.current);

    return () => {
      if (loader.current) observer.disconnect(); // Disconnect when unmounting or no more products
    };
  }, [loader, hasMore]);

  const loadMoreProducts = async () => {
    if (!hasMore) return; // Stop fetching if no more products

    try {
      const nextPage = page + 1; // Calculate next page
      console.log(`Fetching page ${nextPage}`);
      const productsData = await fetchAllProducts(nextPage, 6); // Fetch products

      if (productsData.products.length === 0 || nextPage > productsData.pages) {
        console.log("All products have been loaded.");
        setHasMore(false); // Stop further API calls
      } else {
        setProducts((prev) => [...prev, ...productsData.products]); // Add new products
        setPage(nextPage); // Update current page
      }
    } catch (error) {
      console.error("Error loading more products:", error);
      setError("Failed to load more products.");
    }
  };

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
      setPage(1); // Reset to the first page after filtering
      setHasMore(true);
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

  const resetFilters = async () => {
    setSelectedCategories([]);
    setPriceRange({ min: 0, max: maxPrice });
    setError(null);
    setPage(1); // Reset page to 1
    setHasMore(true); // Reset infinite scrolling

    try {
      const productsData = await fetchAllProducts(1, 10); // Fetch first page
      setProducts(productsData.products);
    } catch (error) {
      console.error("Failed to reset filters:", error);
      setError("Failed to reset filters.");
    }
  };

  return (
    <div className="flex h-screen px-4 pb-10 pt-14 lg:px-8">
      {/* Sidebar for larger screens */}
      <aside className="hidden w-1/4 p-4 md:block">
        <SidebarFilter
          categories={categories}
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange}
          priceRange={priceRange}
          maxPrice={maxPrice}
          onPriceChange={handlePriceChange}
          handleFilter={handleFilter}
          resetFilters={resetFilters}
        />
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 mt-5 md:mt-0">
        {/* Drawer for mobile screens */}
        <ResponsiveFilter
          categories={categories}
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange}
          priceRange={priceRange}
          maxPrice={maxPrice}
          onPriceChange={(range) => setPriceRange(range)}
          onApplyFilters={handleFilter}
          resetFilters={resetFilters}
        />

        {/* Product Grid Wrapper - Scrollable */}
        <div className="flex-1 p-5 overflow-y-auto">
          {error ? ( // Display error message if it exists
            <div className="text-xl font-medium text-center text-gray-600">
              {error}
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-10 mt-5 md:gap-5 md:mt-10 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              {hasMore && (
                <div ref={loader} className="flex justify-center mt-5">
                  <div
                    className="w-8 h-8 border-4 border-gray-200 rounded-full border-t-blue-500 animate-spin"
                    role="status"
                  ></div>
                </div>
              )}
            </>
          ) : (
            <div className="text-xl font-medium text-center text-gray-600">
              No products found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
