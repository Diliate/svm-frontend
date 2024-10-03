import ProductCard from "@/components/ProductCard";
import React from "react";

function Page() {
  return (
    <section className="px-10 pt-20 pb-10">
      <h1 className="text-4xl font-semibold">Products Wishlist</h1>
      <div className="grid grid-cols-1 gap-10 mt-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 10 }, (_, index) => (
          <div className="relative" key={index}>
            <div className={index === 1 || index === 6 ? "opacity-60" : ""}>
              <ProductCard />
            </div>
            {(index === 1 || index === 6) && (
              <div className="absolute p-2 transform -translate-x-[60%] bg-opacity-75 rounded -translate-y-[80%] top-1/2 left-1/2 bg-white">
                <p className="text-2xl font-semibold text-center text-red-600">
                  Out of Stock
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Page;
