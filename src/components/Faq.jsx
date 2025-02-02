"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";

const faqs = [
  {
    question: "How to track my order?",
    answer:
      "You can track the status of your order by logging into your account and visiting the 'Orders' section.",
  },
  {
    question: "What are the payment options?",
    answer:
      "We accept all major credit cards, PayPal, and sometimes Cash on Delivery, depending on the location.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship internationally. Shipping costs will vary based on your location and the size of your order.",
  },
];

const faqs2 = [
  {
    question: "How to track my order?",
    answer:
      "You can track the status of your order by logging into your account and visiting the 'Orders' section.",
  },
  {
    question: "What are the payment options?",
    answer:
      "We accept all major credit cards, PayPal, and sometimes Cash on Delivery, depending on the location.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship internationally. Shipping costs will vary based on your location and the size of your order.",
  },
];

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeIndex2, setActiveIndex2] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const toggleFAQ2 = (index) => {
    setActiveIndex2(activeIndex2 === index ? null : index);
  };

  return (
    <div className="flex flex-col justify-between gap-5 px-5 py-10 md:gap-0 md:flex-row md:px-14">
      <div>
        <h1 className="text-3xl font-bold md:text-5xl">
          Any questions? <br />
          We got answers.
        </h1>
        <p className="py-5 md:w-[440px] w-auto text-lg text-justify">
          Not sure how to proceed? Check our FAQs for answers to common
          questions regarding our products and services.
        </p>
        {/* <button className="flex items-center gap-2 text-blue-500 hover:text-blue-600">
          <span>View All FAQs</span> <FaArrowRightLong />
        </button> */}
      </div>
      <div className="flex flex-col gap-5 md:flex-row">
        <div className="md:w-[450px] w-auto flex flex-col gap-5">
          {faqs.map((faq, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <h2
                className="flex items-center justify-between font-bold cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <span>
                  <FaChevronDown
                    className={`${
                      activeIndex === index ? "rotate-180" : "rotate-0"
                    } transition-transform`}
                  />
                </span>
              </h2>
              <div
                className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
                  activeIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <p className="mt-2">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="md:w-[450px] w-auto flex flex-col gap-5">
          {faqs2.map((faq, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <h2
                className="flex items-center justify-between font-bold cursor-pointer"
                onClick={() => toggleFAQ2(index)}
              >
                <span>{faq.question}</span>
                <span>
                  <FaChevronDown
                    className={`${
                      activeIndex2 === index ? "rotate-180" : "rotate-0"
                    } transition-transform`}
                  />
                </span>
              </h2>
              <div
                className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
                  activeIndex2 === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <p className="mt-2">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
