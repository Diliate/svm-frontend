import { useState, useEffect } from "react";
import { fetchAllProducts } from "@/services/productService";
import { fetchAllCategories } from "@/services/categoryServices";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log("useProducts hook initialized"); // Log initialization

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const categoriesData = await fetchAllCategories();
        console.log("Categories before setCategories:", categoriesData); // Log fetched data

        setCategories(categoriesData); // Update categories state
        console.log("Categories after setCategories:", categoriesData); // Log after state update
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { products, categories, loading, setProducts };
};
