import { useState, useEffect } from "react";
import { fetchAllProducts } from "@/services/productService";
import { fetchAllCategories } from "@/services/categoryServices";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const categoriesData = await fetchAllCategories();

        setCategories(categoriesData);
        const productsData = await fetchAllProducts();
        setProducts(productsData.products);
        console.log("Fetched products:", productsData.products);
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
