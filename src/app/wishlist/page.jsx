// Page.jsx
import React from "react";
import ProductItem from "@/components/ProductItem";

function Page() {
  return (
    <section className="px-10 pt-20 pb-10">
      <h1 className="text-4xl font-semibold">Products Wishlist</h1>
      <div className="grid grid-cols-1 gap-10 mt-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 10 }, (_, index) => (
          <ProductItem key={index} index={index} />
        ))}
      </div>
    </section>
  );
}

export default Page;
