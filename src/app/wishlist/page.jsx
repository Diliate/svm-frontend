"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { fetchWishlist, clearWishlist } from "@/services/wishlistService";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

function WishlistPage() {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");

    if (!user || !token) {
      localStorage.removeItem("token");
      router.push("/login");
    } else {
      setIsChecking(false);
    }
  }, [user, router, token]);

  useEffect(() => {
    const loadWishlist = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const data = await fetchWishlist(user.id);
        setWishlist(data.items.map((item) => item.product)); // Extract products from wishlist items
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setLoading(false);
      }
    };

    loadWishlist();
  }, [user]);

  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-[#3A5B22] rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleWishlistUpdate = (action, product) => {
    setWishlist((prevWishlist) => {
      if (action === "add") {
        return [...prevWishlist, product];
      } else if (action === "remove") {
        return prevWishlist.filter((item) => item.id !== product.id);
      }
      return prevWishlist;
    });
  };

  const handleClearWishlist = async () => {
    if (!user) {
      toast.error("Please log in to clear your wishlist.");
      return;
    }

    try {
      await clearWishlist(user.id); // Call the clearWishlist service
      setWishlist([]); // Clear the wishlist state
      toast.success("Wishlist cleared successfully.");
    } catch (error) {
      console.error("Error clearing wishlist:", error);
      toast.error("Failed to clear wishlist.");
    }
  };

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
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-semibold">Products Wishlist</h1>
        <button
          onClick={handleClearWishlist}
          className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
        >
          Clear Wishlist
        </button>
      </div>
      <div className="grid grid-cols-1 gap-10 mt-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {wishlist.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default WishlistPage;
