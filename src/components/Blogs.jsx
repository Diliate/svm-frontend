import Image from "next/image";
import React from "react";

const Blogs = () => {
  const blogData = [
    {
      image: "/blog1.png",
      heading: "How to protect your skin in sunlight",
      name: "David",
      date: "20 July",
    },
    {
      image: "/blog2.png",
      heading: "Method for dealing with your blemish ",
      name: "Juliya",
      date: "20 July",
    },
    {
      image: "/blog3.png",
      heading: "Best Herbal Tea for Weight loss ",
      name: "David",
      date: "20 July",
    },
  ];
  return (
    <section className="px-10 py-10">
      <h1 className="mb-10 text-5xl font-semibold text-center">
        From Our Blogs
      </h1>
      <div className="flex justify-center gap-20">
        {blogData.map((blog, index) => (
          <div
            key={index}
            className=" shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-2xl w-[300px] group overflow-hidden"
          >
            <div className="overflow-hidden">
              <Image
                src={blog.image}
                alt="blog"
                height={100}
                width={300}
                objectFit="cover"
                className="duration-300 rounded-t-2xl group-hover:scale-110"
              />
            </div>
            <div className="p-5">
              <h2 className="text-xl font-semibold">{blog.heading}</h2>
              <p className="my-5">
                {blog.name} | {blog.date}
              </p>
              <button className="px-4 py-2 text-white duration-200 bg-black rounded-md shadow-lg text-md hover:opacity-85">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-5">
        <button className="px-14 py-2 uppercase border-[1px] border-black rounded-full mt-5 hover:bg-black hover:text-white duration-200">
          view all post
        </button>
      </div>
    </section>
  );
};

export default Blogs;