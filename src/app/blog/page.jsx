// Blog Page component
import React from "react";
import AnimatedBlogCard from "@/components/AnimatedBlogCard";

const Page = () => {
  const blogs = [
    {
      title: "How to Protect Your Skin in Sunlight",
      image: "/blog/blog7.png",
      excerpt:
        "Learn the best practices for protecting your skin from harmful UV rays...",
      slug: "protect-skin-sunlight",
    },
    {
      title: "Method for Dealing with Your Blemish",
      image: "/blog/blog8.png",
      excerpt:
        "Dealing with blemishes can be frustrating. Here are some effective methods...",
      slug: "dealing-with-blemish",
    },
    {
      title: "Best Herbal Tea for Weight Loss",
      image: "/blog/blog9.png",
      excerpt:
        "Discover the benefits of herbal tea for weight loss and overall health...",
      slug: "herbal-tea-weight-loss",
    },
    {
      title: "How to Protect Your Skin in Sunlight",
      image: "/blog/blog4.png",
      excerpt:
        "Learn the best practices for protecting your skin from harmful UV rays...",
      slug: "protect-skin-sunlight",
    },
    {
      title: "Method for Dealing with Your Blemish",
      image: "/blog/blog5.png",
      excerpt:
        "Dealing with blemishes can be frustrating. Here are some effective methods...",
      slug: "dealing-with-blemish",
    },
    {
      title: "Best Herbal Tea for Weight Loss",
      image: "/blog/blog6.png",
      excerpt:
        "Discover the benefits of herbal tea for weight loss and overall health...",
      slug: "herbal-tea-weight-loss",
    },
    {
      title: "How to Protect Your Skin in Sunlight",
      image: "/blog/blog1.png",
      excerpt:
        "Learn the best practices for protecting your skin from harmful UV rays...",
      slug: "protect-skin-sunlight",
    },
    {
      title: "Method for Dealing with Your Blemish",
      image: "/blog/blog2.png",
      excerpt:
        "Dealing with blemishes can be frustrating. Here are some effective methods...",
      slug: "dealing-with-blemish",
    },
    {
      title: "Best Herbal Tea for Weight Loss",
      image: "/blog/blog3.png",
      excerpt:
        "Discover the benefits of herbal tea for weight loss and overall health...",
      slug: "herbal-tea-weight-loss",
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-8 bg-gray-100">
      <div className="container px-4 mx-auto">
        <h1 className="mb-6 text-4xl font-bold text-center text-gray-800">
          Our Blog
        </h1>
        <div className="flex flex-wrap justify-center">
          {blogs.map((blog, index) => (
            <AnimatedBlogCard key={index} blog={blog} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
