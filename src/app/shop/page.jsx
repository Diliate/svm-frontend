"use client";
import { NextSeo } from "next-seo";
import React, { useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleFilter = async () => {
    if (
      !selectedCategories.length &&
      priceRange.min === 0 &&
      priceRange.max === maxPrice
    )
      return;

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

  const resetFilters = async () => {
    setSelectedCategories([]);
    setPriceRange({ min: 0, max: maxPrice });

    try {
      const { products } = await fetchAllProducts();
      setProducts(products);
    } catch (error) {
      console.error("Failed to reset filters:", error);
      setError("Failed to reset filters.");
    }
  };

  return (
    <div className="flex h-[120vh] px-4 pb-10 pt-14 lg:px-8">
      <NextSeo
        title="Buy High-Quality Pharmaceutical Products | SVM Pharmaceutical"
        description="Discover our wide range of pharmaceutical products. Trusted, certified, and high-quality medicines available online."
        canonical="https://www.svmpharmaceutical.com/products"
        openGraph={{
          url: "https://www.svmpharmaceutical.com/products",
          title:
            "Buy High-Quality Pharmaceutical Products | SVM Pharmaceutical",
          description:
            "Explore our extensive collection of reliable and certified pharmaceutical products. Shop now at SVM Pharmaceutical.",
          images: [
            {
              url: "https://www.svmpharmaceutical.com/images/products-og-image.jpg",
              width: 1200,
              height: 630,
              alt: "Pharmaceutical Products",
            },
          ],
        }}
        twitter={{
          cardType: "summary_large_image",
          site: "@svmpharma",
          handle: "@svmpharma",
        }}
      />
      <aside className="hidden w-1/4 p-4 md:block">
        <SidebarFilter
          categories={categories}
          selectedCategories={selectedCategories}
          onCategoryChange={(id) =>
            setSelectedCategories((prev) => [...prev, id])
          }
          priceRange={priceRange}
          maxPrice={maxPrice}
          onPriceChange={(e) =>
            setPriceRange({ ...priceRange, max: Number(e.target.value) })
          }
          handleFilter={handleFilter}
          resetFilters={resetFilters}
        />
      </aside>
      <div className="flex flex-col flex-1 mt-5 md:mt-0">
        <ResponsiveFilter
          categories={categories}
          selectedCategories={selectedCategories}
          onCategoryChange={(id) =>
            setSelectedCategories((prev) => [...prev, id])
          }
          priceRange={priceRange}
          maxPrice={maxPrice}
          onPriceChange={(range) => setPriceRange(range)}
          onApplyFilters={handleFilter}
          resetFilters={resetFilters}
        />
        <div className="flex-1 p-5 overflow-y-auto">
          {loading ? (
            <div className="text-xl font-medium text-center text-gray-600">
              Loading...
            </div>
          ) : error ? (
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
