import React, { useState, useEffect, useRef } from "react";
import { IoIosSearch } from "react-icons/io";
import { searchProducts } from "@/services/productService";
import Link from "next/link";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchBarRef = useRef(null);

  // Debounce Effect: Updates debouncedTerm after 700ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 700);

    return () => {
      clearTimeout(handler); // Cleanup the timeout
    };
  }, [searchTerm]);

  // Fetch search suggestions whenever debouncedTerm changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debouncedTerm) {
        setSuggestions([]); // Clear suggestions if input is empty
        setShowSuggestions(false);
        return;
      }

      try {
        const results = await searchProducts(debouncedTerm);
        setSuggestions(results);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Error fetching search suggestions:", error);
      }
    };

    fetchSuggestions();
  }, [debouncedTerm]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle suggestion click
  const handleSuggestionClick = (product) => {
    setSearchTerm(product.name); // Set the search term to the clicked suggestion
    setShowSuggestions(false); // Hide the suggestions
  };

  return (
    <div ref={searchBarRef} className="relative">
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

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 ? (
        <ul className="absolute left-0 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg max-h-[200px] overflow-y-auto">
          {suggestions.map((product) => (
            <li
              key={product.id}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSuggestionClick(product)}
            >
              <Link
                href={`/product/${product.id}`}
                className="block w-full h-full"
              >
                {product.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        searchTerm &&
        showSuggestions && (
          <div className="absolute left-0 w-full p-2 mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
            No Products found....
          </div>
        )
      )}
    </div>
  );
};

export default SearchBar;
