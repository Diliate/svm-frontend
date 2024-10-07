"use client";

// ProductItem.jsx
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ProductCard from "@/components/ProductCard";

function ProductItem({ index }) {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, translateY: 0 });
    } else {
      controls.start({ opacity: 0, translateY: 20 });
    }
  }, [controls, inView]);

  return (
    <motion.div
      className="relative"
      ref={ref}
      initial={{ opacity: 0, translateY: 20 }}
      animate={controls}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <ProductCard />
      {index === 1 || index === 6 ? (
        <div className="absolute p-2 transform -translate-x-[60%] bg-opacity-75 rounded -translate-y-[80%] top-1/2 left-1/2 bg-white">
          <p className="text-2xl font-semibold text-center text-red-600">
            Out of Stock
          </p>
        </div>
      ) : null}
    </motion.div>
  );
}

export default ProductItem;
