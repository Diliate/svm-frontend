import React from "react";
import Link from "next/link";

const BlogCard = ({ blog }) => {
  return (
    <div className="max-w-sm m-4 overflow-hidden transition-transform duration-300 transform bg-white rounded-lg shadow-md hover:scale-105">
      <img
        className="object-cover w-full h-48"
        src={blog.image}
        alt={blog.title}
      />
      <div className="p-6">
        <h2 className="mb-2 text-2xl font-bold">{blog.title}</h2>
        <p className="mb-4 text-gray-600">{blog.excerpt}</p>
        <Link
          href={`/blog/${blog.slug}`}
          className="inline-block px-4 py-2 text-white transition-colors duration-300 bg-green-500 rounded-lg hover:bg-green-700"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
