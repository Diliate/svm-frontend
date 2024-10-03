import React from "react";
import { notFound } from "next/navigation"; // Next.js function to handle 404s

// Mock data: You would replace this with your actual data fetching logic (e.g., from an API or database)
const blogs = [
  {
    slug: "protect-skin-sunlight",
    title: "How to Protect Your Skin in Sunlight",
    image: "/images/blog1.jpg",
    content:
      "In this article, we will discuss the best practices for protecting your skin from harmful UV rays...",
  },
  {
    slug: "dealing-with-blemish",
    title: "Method for Dealing with Your Blemish",
    image: "/images/blog2.jpg",
    content:
      "Dealing with blemishes can be frustrating. Here are some effective methods...",
  },
  {
    slug: "herbal-tea-weight-loss",
    title: "Best Herbal Tea for Weight Loss",
    image: "/images/blog3.jpg",
    content:
      "Discover the benefits of herbal tea for weight loss and overall health...",
  },
];

// This function gets executed for each dynamic route
export async function generateStaticParams() {
  // Return all possible slugs for dynamic paths
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

// This is the server component fetching data for a specific slug
const BlogPost = ({ params }) => {
  const { slug } = params;

  // Find the blog based on the slug
  const blog = blogs.find((post) => post.slug === slug);

  // If no blog post is found, return a 404 page
  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-20 pb-10 bg-gray-100">
      <div className="container px-4 mx-auto md:px-8 lg:px-16">
        <h1 className="mb-8 text-4xl font-bold text-center text-gray-800">
          {blog.title}
        </h1>
        <div className="p-6 mb-8 bg-white rounded-lg shadow-lg md:p-12">
          <img
            src={blog.image}
            alt={blog.title}
            className="object-cover w-full h-auto mb-8 rounded-lg"
          />
          <p className="mb-6 text-lg leading-relaxed text-gray-700">
            {blog.content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
