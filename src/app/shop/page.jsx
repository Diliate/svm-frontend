"use client";

import React, { useEffect, useState, useRef } from "react";
import ProductCard from "@/components/ProductCard";
import SidebarFilter from "@/components/SidebarFilter";
import ResponsiveFilter from "@/components/ResponsiveFilter";
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
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const categoriesData = await fetchAllCategories();
        setCategories(categoriesData);

        const productsData = await fetchAllProducts();
        setProducts(productsData.products);
        setMaxPrice(
          Math.max(...productsData.products.map((product) => product.price))
        );
      } catch (error) {
        console.error("Error fetching initial data:", error);
        setError("Failed to fetch data.");
      }
    };

    fetchInitialData();
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
    } catch (error) {
      console.error("Error applying filters:", error);
      setError("No products found for the selected filters.");
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

    try {
      const productsData = await fetchAllProducts(); // Fetch all products at once
      setProducts(productsData.products);
    } catch (error) {
      console.error("Failed to reset filters:", error);
      setError("Failed to reset filters.");
    }
  };

  return (
    <div className="flex h-[120vh] px-4 pb-10 pt-14 lg:px-8">
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
      <div className="flex flex-col flex-1 mt-5 md:mt-0">
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
        <div className="flex-1 p-5 overflow-y-auto">
          {error ? (
            <div className="text-xl font-medium text-center text-gray-600">
              {error}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-10 mt-5 md:gap-5 md:mt-10 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
