// components/BlogCard.jsx
import React from 'react';
import Link from 'next/link';

const BlogCard = ({ blog }) => {
  return (
    <div className="max-w-sm bg-white rounded-lg overflow-hidden shadow-md m-4 transform hover:scale-105 transition-transform duration-300">
      <img className="w-full h-48 object-cover" src={blog.image} alt={blog.title} />
      <div className="p-6">
        <h2 className="font-bold text-xl mb-2">{blog.title}</h2>
        <p className="text-gray-600 mb-4">{blog.excerpt}</p>
        <Link href={`/blog/${blog.slug}`} className="inline-block bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
