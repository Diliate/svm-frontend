// src/components/SearchBar.jsx
import React, { useState, useEffect, useRef } from "react";
import { IoIosSearch } from "react-icons/io";
import Link from "next/link";
import { searchCategory } from "@/services/categoryServices";
import { getProductsByCategory } from "@/services/productService";
import Image from "next/image";
import axios from "axios"; // Ensure axios is imported

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // States for hovered category and related products
  const [hoveredCategoryId, setHoveredCategoryId] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(false);

  const searchBarRef = useRef(null);

  // Cache to store fetched products by category
  const cacheRef = useRef({});

  // Debounce Effect: Updates debouncedTerm after 700ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 700);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Fetch search suggestions whenever debouncedTerm changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debouncedTerm) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      try {
        const results = await searchCategory(debouncedTerm);
        setSuggestions(results);
        setShowSuggestions(true);
      } catch (error) {
        console.error(
          "Error fetching suggestions:",
          error.response?.data || error.message
        );
      }
    };

    fetchSuggestions();
  }, [debouncedTerm]);

  // Fetch related products when hoveredCategoryId changes
  useEffect(() => {
    const fetchRelated = async () => {
      if (!hoveredCategoryId) {
        setRelatedProducts([]);
        return;
      }

      // Check if products for this category are already cached
      if (cacheRef.current[hoveredCategoryId]) {
        setRelatedProducts(cacheRef.current[hoveredCategoryId]);
        return;
      }

      setLoadingRelated(true);
      try {
        const products = await getProductsByCategory(hoveredCategoryId);
        setRelatedProducts(products);
        cacheRef.current[hoveredCategoryId] = products; // Cache the results
      } catch (error) {
        console.error(
          "Error fetching related products:",
          error.response?.data || error.message
        );
        setRelatedProducts([]);
      } finally {
        setLoadingRelated(false);
      }
    };

    fetchRelated();
  }, [hoveredCategoryId]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
        setHoveredCategoryId(null); // Reset hovered category
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle suggestion click
  const handleSuggestionClick = (category) => {
    setSearchTerm(category.name); // Set the search term to the clicked suggestion
    setShowSuggestions(false); // Hide the suggestions
    setHoveredCategoryId(null); // Reset hovered category
  };

  // Handle mouse leave with delay to prevent flickering
  const hideTimeoutRef = useRef(null);

  const handleMouseLeave = () => {
    hideTimeoutRef.current = setTimeout(() => {
      setHoveredCategoryId(null);
    }, 200); // 200ms delay
  };

  const handleMouseEnter = (categoryId) => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    setHoveredCategoryId(categoryId);
  };

  return (
    <div ref={searchBarRef} className="relative">
      {/* Search Bar */}
      <div className="flex items-center px-4 py-2 bg-gray-100 rounded-full">
        <IoIosSearch size={20} className="text-gray-600" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search your medicines..."
          className="w-64 ml-2 bg-transparent border-none focus:outline-none"
          onFocus={() => setShowSuggestions(true)} // Show suggestions on focus
        />
      </div>

      {/* Suggestions and Related Products Dropdown */}
      {showSuggestions && (
        <div className="absolute left-0 z-20 flex mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
          {/* Category Suggestions */}
          {suggestions.length > 0 ? (
            <ul className="max-h-[300px] overflow-y-auto w-64">
              {suggestions.map((category) => (
                <li
                  key={category.id}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onMouseEnter={() => handleMouseEnter(category.id)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleSuggestionClick(category)}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          ) : (
            searchTerm &&
            showSuggestions && (
              <div className="w-64 p-2 text-gray-500">
                No Categories found....
              </div>
            )
          )}

          {/* Related Products Box */}
          {hoveredCategoryId && (
            <div
              className="z-30 w-64 p-2 ml-2 bg-white border border-gray-300 rounded-md shadow-lg"
              onMouseEnter={() => {
                if (hideTimeoutRef.current) {
                  clearTimeout(hideTimeoutRef.current);
                  hideTimeoutRef.current = null;
                }
              }}
              onMouseLeave={handleMouseLeave}
            >
              {loadingRelated ? (
                <div className="flex items-center justify-center h-full">
                  <svg
                    className="w-5 h-5 text-gray-500 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                </div>
              ) : relatedProducts.length > 0 ? (
                <ul>
                  {relatedProducts.slice(0, 5).map((product) => (
                    <li key={product.id} className="mb-2">
                      <Link
                        href={`/shop/product/${product.id}`}
                        className="flex items-center p-2 space-x-2 rounded hover:bg-gray-100"
                      >
                        <span className="text-sm">{product.name}</span>
                      </Link>
                    </li>
                  ))}
                  {relatedProducts.length > 5 && (
                    <li>
                      <Link
                        href={`/category/${hoveredCategoryId}`}
                        className="text-sm text-blue-500"
                      >
                        View All
                      </Link>
                    </li>
                  )}
                </ul>
              ) : (
                <p className="text-gray-500">No products found.</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
