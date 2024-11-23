import React, { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { searchProducts } from "@/services/productService";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Debounce Effect: Updates debouncedTerm after 300ms
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
        return;
      }

      try {
        const results = await searchProducts(debouncedTerm);
        setSuggestions(results);
      } catch (error) {
        console.error("Error fetching search suggestions:", error);
      }
    };

    fetchSuggestions();
  }, [debouncedTerm]);

  return (
    <div className="relative">
      <div className="flex items-center px-4 py-2 bg-gray-100 rounded-full">
        <IoIosSearch size={20} className="text-gray-600" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search your medicines..."
          className="w-64 ml-2 bg-transparent border-none focus:outline-none"
        />
      </div>

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 ? (
        <ul className="absolute left-0 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
          {suggestions.map((product) => (
            <li
              key={product.id}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {product.name}
            </li>
          ))}
        </ul>
      ) : (
        <div className="absolute left-0 w-full p-2 mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
          No Products found....
        </div>
      )}
    </div>
  );
};

export default SearchBar;
