"use client";

import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import BlogCard from "./BlogCard";

const AnimatedBlogCard = ({ blog, index }) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
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
      className="w-full p-4 md:w-1/3"
    >
      <BlogCard blog={blog} />
    </motion.div>
  );
};

export default AnimatedBlogCard;
