import React from "react";
import { notFound } from "next/navigation"; // Next.js function to handle 404s
import Image from "next/image";

// Mock data: You would replace this with your actual data fetching logic (e.g., from an API or database)
const blogs = [
  {
    slug: "protect-skin-sunlight",
    title: "How to Protect Your Skin in Sunlight",
    image: "/blog/blog7.png",
    content:
      "In a world where modern medicine often takes the spotlight, the ancient wisdom of Ayurveda continues to thrive, offering a holistic approach to health and well-being. Rooted in India's rich heritage, Ayurveda is more than just a system of medicine—it's a way of life that emphasizes balance, harmony, and connection with nature.Rooted in India's rich heritage, Ayurveda is more than just a system of medicine Ayurveda is more than just a system of medicine",
    title2: "What is Ayurveda?",
    content2:
      "Ayurveda, which translates to the science of life, is one of the world's oldest healing systems, dating back over 5,000 years. Unlike conventional medicine, which often focuses on treating symptoms, Ayurveda seeks to address the root cause of ailments by restoring balance within the body, mind, and spirit. It is based on the belief that each individual is unique, and therefore, treatment should be personalized to meet their specific needs.",
    title3: "The Three Doshas: Vata, Pitta, and Kapha",
    para: "Central to Ayurvedic philosophy is the concept of the three doshas—Vata, Pitta, and Kapha. These doshas are energies that govern our physiological and psychological functions.",
    points: [
      {
        title: "Vata:",
        desc: "Composed of air and space, Vata controls movement in the body, including circulation, breathing, and the flow of thoughts. When balanced, Vata promotes creativity and flexibility. When imbalanced, it can lead to anxiety, dry skin, and digestive issues.",
      },
      {
        title: "Pitta:",
        desc: "Made up of fire and water, Pitta is responsible for metabolism, digestion, and body temperature regulation. A balanced Pitta leads to a sharp intellect and healthy digestion, while an imbalance can result in irritability, inflammation, and ulcers.",
      },
      {
        title: "Kapah:",
        desc: "Formed from earth and water, Kapha provides structure and stability. It governs the immune system, lubrication of joints, and emotional resilience. Balanced Kapha is linked to calmness and strength, but an imbalance can cause weight gain, lethargy, and respiratory problems.",
      },
    ],
  },
  {
    slug: "dealing-with-blemish",
    title: "Method for Dealing with Your Blemish",
    image: "/blog/blog8.png",
    content:
      "In a world where modern medicine often takes the spotlight, the ancient wisdom of Ayurveda continues to thrive, offering a holistic approach to health and well-being. Rooted in India's rich heritage, Ayurveda is more than just a system of medicine—it's a way of life that emphasizes balance, harmony, and connection with nature.Rooted in India's rich heritage, Ayurveda is more than just a system of medicine Ayurveda is more than just a system of medicine",
    title2: "What is Ayurveda?",
    content2:
      "Ayurveda, which translates to the science of life, is one of the world's oldest healing systems, dating back over 5,000 years. Unlike conventional medicine, which often focuses on treating symptoms, Ayurveda seeks to address the root cause of ailments by restoring balance within the body, mind, and spirit. It is based on the belief that each individual is unique, and therefore, treatment should be personalized to meet their specific needs.",
    title3: "The Three Doshas: Vata, Pitta, and Kapha",
    para: "Central to Ayurvedic philosophy is the concept of the three doshas—Vata, Pitta, and Kapha. These doshas are energies that govern our physiological and psychological functions.",
    points: [
      {
        title: "Vata:",
        desc: "Composed of air and space, Vata controls movement in the body, including circulation, breathing, and the flow of thoughts. When balanced, Vata promotes creativity and flexibility. When imbalanced, it can lead to anxiety, dry skin, and digestive issues.",
      },
      {
        title: "Pitta:",
        desc: "Made up of fire and water, Pitta is responsible for metabolism, digestion, and body temperature regulation. A balanced Pitta leads to a sharp intellect and healthy digestion, while an imbalance can result in irritability, inflammation, and ulcers.",
      },
      {
        title: "Kapah:",
        desc: "Formed from earth and water, Kapha provides structure and stability. It governs the immune system, lubrication of joints, and emotional resilience. Balanced Kapha is linked to calmness and strength, but an imbalance can cause weight gain, lethargy, and respiratory problems.",
      },
    ],
  },
  {
    slug: "herbal-tea-weight-loss",
    title: "Best Herbal Tea for Weight Loss",
    image: "/blog/blog9.png",
    content:
      "In a world where modern medicine often takes the spotlight, the ancient wisdom of Ayurveda continues to thrive, offering a holistic approach to health and well-being. Rooted in India's rich heritage, Ayurveda is more than just a system of medicine—it's a way of life that emphasizes balance, harmony, and connection with nature.Rooted in India's rich heritage, Ayurveda is more than just a system of medicine Ayurveda is more than just a system of medicine",
    title2: "What is Ayurveda?",
    content2:
      "Ayurveda, which translates to the science of life, is one of the world's oldest healing systems, dating back over 5,000 years. Unlike conventional medicine, which often focuses on treating symptoms, Ayurveda seeks to address the root cause of ailments by restoring balance within the body, mind, and spirit. It is based on the belief that each individual is unique, and therefore, treatment should be personalized to meet their specific needs.",
    title3: "The Three Doshas: Vata, Pitta, and Kapha",
    para: "Central to Ayurvedic philosophy is the concept of the three doshas—Vata, Pitta, and Kapha. These doshas are energies that govern our physiological and psychological functions.",
    points: [
      {
        title: "Vata:",
        desc: "Composed of air and space, Vata controls movement in the body, including circulation, breathing, and the flow of thoughts. When balanced, Vata promotes creativity and flexibility. When imbalanced, it can lead to anxiety, dry skin, and digestive issues.",
      },
      {
        title: "Pitta:",
        desc: "Made up of fire and water, Pitta is responsible for metabolism, digestion, and body temperature regulation. A balanced Pitta leads to a sharp intellect and healthy digestion, while an imbalance can result in irritability, inflammation, and ulcers.",
      },
      {
        title: "Kapah:",
        desc: "Formed from earth and water, Kapha provides structure and stability. It governs the immune system, lubrication of joints, and emotional resilience. Balanced Kapha is linked to calmness and strength, but an imbalance can cause weight gain, lethargy, and respiratory problems.",
      },
    ],
  },
  {
    slug: "protect-skin-sunlight",
    title: "How to Protect Your Skin in Sunlight",
    image: "/blog/blog4.png",
    content:
      "In a world where modern medicine often takes the spotlight, the ancient wisdom of Ayurveda continues to thrive, offering a holistic approach to health and well-being. Rooted in India's rich heritage, Ayurveda is more than just a system of medicine—it's a way of life that emphasizes balance, harmony, and connection with nature.Rooted in India's rich heritage, Ayurveda is more than just a system of medicine Ayurveda is more than just a system of medicine",
    title2: "What is Ayurveda?",
    content2:
      "Ayurveda, which translates to the science of life, is one of the world's oldest healing systems, dating back over 5,000 years. Unlike conventional medicine, which often focuses on treating symptoms, Ayurveda seeks to address the root cause of ailments by restoring balance within the body, mind, and spirit. It is based on the belief that each individual is unique, and therefore, treatment should be personalized to meet their specific needs.",
    title3: "The Three Doshas: Vata, Pitta, and Kapha",
    para: "Central to Ayurvedic philosophy is the concept of the three doshas—Vata, Pitta, and Kapha. These doshas are energies that govern our physiological and psychological functions.",
    points: [
      {
        title: "Vata:",
        desc: "Composed of air and space, Vata controls movement in the body, including circulation, breathing, and the flow of thoughts. When balanced, Vata promotes creativity and flexibility. When imbalanced, it can lead to anxiety, dry skin, and digestive issues.",
      },
      {
        title: "Pitta:",
        desc: "Made up of fire and water, Pitta is responsible for metabolism, digestion, and body temperature regulation. A balanced Pitta leads to a sharp intellect and healthy digestion, while an imbalance can result in irritability, inflammation, and ulcers.",
      },
      {
        title: "Kapah:",
        desc: "Formed from earth and water, Kapha provides structure and stability. It governs the immune system, lubrication of joints, and emotional resilience. Balanced Kapha is linked to calmness and strength, but an imbalance can cause weight gain, lethargy, and respiratory problems.",
      },
    ],
  },
  {
    slug: "dealing-with-blemish",
    title: "Method for Dealing with Your Blemish",
    image: "/blog/blog5.png",
    content:
      "In a world where modern medicine often takes the spotlight, the ancient wisdom of Ayurveda continues to thrive, offering a holistic approach to health and well-being. Rooted in India's rich heritage, Ayurveda is more than just a system of medicine—it's a way of life that emphasizes balance, harmony, and connection with nature.Rooted in India's rich heritage, Ayurveda is more than just a system of medicine Ayurveda is more than just a system of medicine",
    title2: "What is Ayurveda?",
    content2:
      "Ayurveda, which translates to the science of life, is one of the world's oldest healing systems, dating back over 5,000 years. Unlike conventional medicine, which often focuses on treating symptoms, Ayurveda seeks to address the root cause of ailments by restoring balance within the body, mind, and spirit. It is based on the belief that each individual is unique, and therefore, treatment should be personalized to meet their specific needs.",
    title3: "The Three Doshas: Vata, Pitta, and Kapha",
    para: "Central to Ayurvedic philosophy is the concept of the three doshas—Vata, Pitta, and Kapha. These doshas are energies that govern our physiological and psychological functions.",
    points: [
      {
        title: "Vata:",
        desc: "Composed of air and space, Vata controls movement in the body, including circulation, breathing, and the flow of thoughts. When balanced, Vata promotes creativity and flexibility. When imbalanced, it can lead to anxiety, dry skin, and digestive issues.",
      },
      {
        title: "Pitta:",
        desc: "Made up of fire and water, Pitta is responsible for metabolism, digestion, and body temperature regulation. A balanced Pitta leads to a sharp intellect and healthy digestion, while an imbalance can result in irritability, inflammation, and ulcers.",
      },
      {
        title: "Kapah:",
        desc: "Formed from earth and water, Kapha provides structure and stability. It governs the immune system, lubrication of joints, and emotional resilience. Balanced Kapha is linked to calmness and strength, but an imbalance can cause weight gain, lethargy, and respiratory problems.",
      },
    ],
  },
  {
    slug: "herbal-tea-weight-loss",
    title: "Best Herbal Tea for Weight Loss",
    image: "/blog/blog6.png",
    content:
      "In a world where modern medicine often takes the spotlight, the ancient wisdom of Ayurveda continues to thrive, offering a holistic approach to health and well-being. Rooted in India's rich heritage, Ayurveda is more than just a system of medicine—it's a way of life that emphasizes balance, harmony, and connection with nature.Rooted in India's rich heritage, Ayurveda is more than just a system of medicine Ayurveda is more than just a system of medicine",
    title2: "What is Ayurveda?",
    content2:
      "Ayurveda, which translates to the science of life, is one of the world's oldest healing systems, dating back over 5,000 years. Unlike conventional medicine, which often focuses on treating symptoms, Ayurveda seeks to address the root cause of ailments by restoring balance within the body, mind, and spirit. It is based on the belief that each individual is unique, and therefore, treatment should be personalized to meet their specific needs.",
    title3: "The Three Doshas: Vata, Pitta, and Kapha",
    para: "Central to Ayurvedic philosophy is the concept of the three doshas—Vata, Pitta, and Kapha. These doshas are energies that govern our physiological and psychological functions.",
    points: [
      {
        title: "Vata:",
        desc: "Composed of air and space, Vata controls movement in the body, including circulation, breathing, and the flow of thoughts. When balanced, Vata promotes creativity and flexibility. When imbalanced, it can lead to anxiety, dry skin, and digestive issues.",
      },
      {
        title: "Pitta:",
        desc: "Made up of fire and water, Pitta is responsible for metabolism, digestion, and body temperature regulation. A balanced Pitta leads to a sharp intellect and healthy digestion, while an imbalance can result in irritability, inflammation, and ulcers.",
      },
      {
        title: "Kapah:",
        desc: "Formed from earth and water, Kapha provides structure and stability. It governs the immune system, lubrication of joints, and emotional resilience. Balanced Kapha is linked to calmness and strength, but an imbalance can cause weight gain, lethargy, and respiratory problems.",
      },
    ],
  },
  {
    slug: "protect-skin-sunlight",
    title: "How to Protect Your Skin in Sunlight",
    image: "/blog/blog1.png",
    content:
      "In a world where modern medicine often takes the spotlight, the ancient wisdom of Ayurveda continues to thrive, offering a holistic approach to health and well-being. Rooted in India's rich heritage, Ayurveda is more than just a system of medicine—it's a way of life that emphasizes balance, harmony, and connection with nature.Rooted in India's rich heritage, Ayurveda is more than just a system of medicine Ayurveda is more than just a system of medicine",
    title2: "What is Ayurveda?",
    content2:
      "Ayurveda, which translates to the science of life, is one of the world's oldest healing systems, dating back over 5,000 years. Unlike conventional medicine, which often focuses on treating symptoms, Ayurveda seeks to address the root cause of ailments by restoring balance within the body, mind, and spirit. It is based on the belief that each individual is unique, and therefore, treatment should be personalized to meet their specific needs.",
    title3: "The Three Doshas: Vata, Pitta, and Kapha",
    para: "Central to Ayurvedic philosophy is the concept of the three doshas—Vata, Pitta, and Kapha. These doshas are energies that govern our physiological and psychological functions.",
    points: [
      {
        title: "Vata:",
        desc: "Composed of air and space, Vata controls movement in the body, including circulation, breathing, and the flow of thoughts. When balanced, Vata promotes creativity and flexibility. When imbalanced, it can lead to anxiety, dry skin, and digestive issues.",
      },
      {
        title: "Pitta:",
        desc: "Made up of fire and water, Pitta is responsible for metabolism, digestion, and body temperature regulation. A balanced Pitta leads to a sharp intellect and healthy digestion, while an imbalance can result in irritability, inflammation, and ulcers.",
      },
      {
        title: "Kapah:",
        desc: "Formed from earth and water, Kapha provides structure and stability. It governs the immune system, lubrication of joints, and emotional resilience. Balanced Kapha is linked to calmness and strength, but an imbalance can cause weight gain, lethargy, and respiratory problems.",
      },
    ],
  },
  {
    slug: "dealing-with-blemish",
    title: "Method for Dealing with Your Blemish",
    image: "/blog/blog2.png",
    content:
      "In a world where modern medicine often takes the spotlight, the ancient wisdom of Ayurveda continues to thrive, offering a holistic approach to health and well-being. Rooted in India's rich heritage, Ayurveda is more than just a system of medicine—it's a way of life that emphasizes balance, harmony, and connection with nature.Rooted in India's rich heritage, Ayurveda is more than just a system of medicine Ayurveda is more than just a system of medicine",
    title2: "What is Ayurveda?",
    content2:
      "Ayurveda, which translates to the science of life, is one of the world's oldest healing systems, dating back over 5,000 years. Unlike conventional medicine, which often focuses on treating symptoms, Ayurveda seeks to address the root cause of ailments by restoring balance within the body, mind, and spirit. It is based on the belief that each individual is unique, and therefore, treatment should be personalized to meet their specific needs.",
    title3: "The Three Doshas: Vata, Pitta, and Kapha",
    para: "Central to Ayurvedic philosophy is the concept of the three doshas—Vata, Pitta, and Kapha. These doshas are energies that govern our physiological and psychological functions.",
    points: [
      {
        title: "Vata:",
        desc: "Composed of air and space, Vata controls movement in the body, including circulation, breathing, and the flow of thoughts. When balanced, Vata promotes creativity and flexibility. When imbalanced, it can lead to anxiety, dry skin, and digestive issues.",
      },
      {
        title: "Pitta:",
        desc: "Made up of fire and water, Pitta is responsible for metabolism, digestion, and body temperature regulation. A balanced Pitta leads to a sharp intellect and healthy digestion, while an imbalance can result in irritability, inflammation, and ulcers.",
      },
      {
        title: "Kapah:",
        desc: "Formed from earth and water, Kapha provides structure and stability. It governs the immune system, lubrication of joints, and emotional resilience. Balanced Kapha is linked to calmness and strength, but an imbalance can cause weight gain, lethargy, and respiratory problems.",
      },
    ],
  },
  {
    slug: "herbal-tea-weight-loss",
    title: "Best Herbal Tea for Weight Loss",
    image: "/blog/blog3.png",
    content:
      "In a world where modern medicine often takes the spotlight, the ancient wisdom of Ayurveda continues to thrive, offering a holistic approach to health and well-being. Rooted in India's rich heritage, Ayurveda is more than just a system of medicine—it's a way of life that emphasizes balance, harmony, and connection with nature.Rooted in India's rich heritage, Ayurveda is more than just a system of medicine Ayurveda is more than just a system of medicine",
    title2: "What is Ayurveda?",
    content2:
      "Ayurveda, which translates to the science of life, is one of the world's oldest healing systems, dating back over 5,000 years. Unlike conventional medicine, which often focuses on treating symptoms, Ayurveda seeks to address the root cause of ailments by restoring balance within the body, mind, and spirit. It is based on the belief that each individual is unique, and therefore, treatment should be personalized to meet their specific needs.",
    title3: "The Three Doshas: Vata, Pitta, and Kapha",
    para: "Central to Ayurvedic philosophy is the concept of the three doshas—Vata, Pitta, and Kapha. These doshas are energies that govern our physiological and psychological functions.",
    points: [
      {
        title: "Vata:",
        desc: "Composed of air and space, Vata controls movement in the body, including circulation, breathing, and the flow of thoughts. When balanced, Vata promotes creativity and flexibility. When imbalanced, it can lead to anxiety, dry skin, and digestive issues.",
      },
      {
        title: "Pitta:",
        desc: "Made up of fire and water, Pitta is responsible for metabolism, digestion, and body temperature regulation. A balanced Pitta leads to a sharp intellect and healthy digestion, while an imbalance can result in irritability, inflammation, and ulcers.",
      },
      {
        title: "Kapah:",
        desc: "Formed from earth and water, Kapha provides structure and stability. It governs the immune system, lubrication of joints, and emotional resilience. Balanced Kapha is linked to calmness and strength, but an imbalance can cause weight gain, lethargy, and respiratory problems.",
      },
    ],
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
    <section className="px-5 pt-32 pb-10 md:px-10">
      {/* FIRST  */}
      <div className="flex flex-col gap-5 md:gap-10 md:flex-row">
        <div className="relative md:h-[400px] h-[200px] w-full md:w-[600px]">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            objectFit="cover"
            className="rounded-xl"
          />
        </div>
        <div className="md:w-[900px] w-full">
          <h2 className="text-3xl font-medium md:text-5xl">{blog.title}</h2>
          <p className="mt-3 text-xl leading-8 text-justify md:leading-10 md:mt-5 md:text-2xl text-zinc-800">
            {blog.content}
          </p>
        </div>
      </div>

      {/* SECOND */}
      <div className="flex flex-col gap-10 mt-10 md:flex-row">
        <div className="md:w-[900px] w-full">
          <h2 className="text-3xl font-medium md:text-5xl">{blog.title2}</h2>
          <p className="mt-3 text-xl leading-8 text-justify md:leading-10 md:mt-5 md:text-2xl text-zinc-800">
            {blog.content2}
          </p>
        </div>
        <div className="flex items-center justify-center gap-5 md:gap-10">
          <div className="relative md:h-[400px] h-[300px] md:w-[250px] w-[165px]">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              objectFit="cover"
              className="rounded-xl"
            />
          </div>
          <div className="relative md:h-[300px] h-[230px] md:w-[200px] w-[125px]">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              objectFit="cover"
              className="rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* THIRD */}
      <div className="flex flex-col gap-3 mt-10">
        <div>
          <h2 className="text-3xl font-medium md:text-5xl">{blog.title3}</h2>
          <p className="mt-5 text-xl leading-8 text-justify md:leading-10 md:text-2xl text-zinc-800">
            {blog.para}
          </p>
        </div>

        <div>
          {blog.points.map((item, index) => (
            <ul key={index} className="mb-5 text-zinc-800">
              <li className="ml-5 text-xl leading-8 list-disc md:text-2xl">
                <span className="font-semibold">{item.title} </span>
                {item.desc}
              </li>
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPost;
