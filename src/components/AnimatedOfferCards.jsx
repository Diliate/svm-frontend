// OfferProductCard.jsx
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import LimitedOfferProductCard from "@/components/LimitedOfferProductCard";

const AnimatedOfferCards = ({ index }) => {
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
      ref={ref}
      initial={{ opacity: 0, translateY: 20 }}
      animate={controls}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="offer-product-card"
    >
      {/* Replace the content below with your actual product card content */}
      <LimitedOfferProductCard />
    </motion.div>
  );
};

export default AnimatedOfferCards;
