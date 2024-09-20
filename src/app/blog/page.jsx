import React from 'react';
import BlogCard from '../../components/BlogCard'; // Adjust the path as per your structure

const Page = () => {
  const blogs = [
    {
      title: 'How to Protect Your Skin in Sunlight',
      image: '/images/blog1.jpg',
      excerpt: 'Learn the best practices for protecting your skin from harmful UV rays...',
      slug: 'protect-skin-sunlight',
    },
    {
      title: 'Method for Dealing with Your Blemish',
      image: '/images/blog2.jpg',
      excerpt: 'Dealing with blemishes can be frustrating. Here are some effective methods...',
      slug: 'dealing-with-blemish',
    },
    {
      title: 'Best Herbal Tea for Weight Loss',
      image: '/images/blog3.jpg',
      excerpt: 'Discover the benefits of herbal tea for weight loss and overall health...',
      slug: 'herbal-tea-weight-loss',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Our Blog</h1>
        <div className="flex flex-wrap justify-center">
          {blogs.map((blog, index) => (
            <BlogCard key={index} blog={blog} />
          ))}
        </div>
        <div className="flex flex-wrap justify-center">
          {blogs.map((blog, index) => (
            <BlogCard key={index} blog={blog} />
          ))}
        </div>
        <div className="flex flex-wrap justify-center">
          {blogs.map((blog, index) => (
            <BlogCard key={index} blog={blog} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
