// Page.jsx
"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { fetchWishlist } from "@/services/wishlistService";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

function Page() {
  const { user } = useAuth(); // Get user info from Auth context
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWishlist = async () => {
      if (!user) {
        toast.error("Please log in to view your wishlist.");
        setLoading(false);
        return;
      }

      try {
        const data = await fetchWishlist(user.id); // Fetch wishlist items for the user
        setWishlist(data.items.map((item) => item.product)); // Extract products from wishlist items
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        toast.error("Failed to load wishlist.");
      } finally {
        setLoading(false);
      }
    };

    loadWishlist();
  }, [user]);

  if (loading) {
    return (
      <section className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold">Loading wishlist...</p>
      </section>
    );
  }

  if (!wishlist.length) {
    return (
      <section className="flex flex-col items-center justify-center h-screen">
        <p className="text-xl font-semibold">Your wishlist is empty!</p>
      </section>
    );
  }

  return (
    <section className="px-10 pt-20 pb-10">
      <h1 className="text-4xl font-semibold">Products Wishlist</h1>
      <div className="grid grid-cols-1 gap-10 mt-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {wishlist.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default Page;
