import React from 'react';
import { useRouter } from 'next/router';

const BlogPost = ({ blog }) => {
  const router = useRouter();

  // If page is not yet generated, show loading
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">{blog.title}</h1>
        <div className="bg-white shadow-lg rounded-lg p-6 md:p-12 mb-8">
          <img 
            src={blog.image} 
            alt={blog.title} 
            className="w-full h-auto rounded-lg mb-8 object-cover"
          />
          <p className="text-lg text-gray-700 leading-relaxed mb-6">{blog.content}</p>
        </div>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  // Replace this with your data source
  const blogs = [
    { slug: 'protect-skin-sunlight' },
    { slug: 'dealing-with-blemish' },
    { slug: 'herbal-tea-weight-loss' },
  ];

  // Generate paths based on the slugs
  const paths = blogs.map((blog) => ({
    params: { slug: blog.slug },
  }));

  return { paths, fallback: true }; // Set fallback to true for dynamic paths
}

export async function getStaticProps({ params }) {
  // Replace with your data fetching logic
  const blogs = [
    {
      slug: 'protect-skin-sunlight',
      title: 'How to Protect Your Skin in Sunlight',
      image: '/images/blog1.jpg',
      content:
        'In this article, we will discuss the best practices for protecting your skin from harmful UV rays...',
    },
    {
      slug: 'dealing-with-blemish',
      title: 'Method for Dealing with Your Blemish',
      image: '/images/blog2.jpg',
      content:
        'Dealing with blemishes can be frustrating. Here are some effective methods...',
    },
    {
      slug: 'herbal-tea-weight-loss',
      title: 'Best Herbal Tea for Weight Loss',
      image: '/images/blog3.jpg',
      content:
        'Discover the benefits of herbal tea for weight loss and overall health...',
    },
  ];

  // Find the blog post based on the slug
  const blog = blogs.find((post) => post.slug === params.slug);

  // If no blog post is found, return 404 page
  if (!blog) {
    return {
      notFound: true,
    };
  }

  return { props: { blog } };
}

export default BlogPost;
