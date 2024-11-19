import React from "react";

const data = [
  {
    title: "Product Inquiries",
    content:
      "Need help choosing the right Ayurvedic product for your needs? Our team is here to guide you. Whether it’s finding the right herbal supplement, understanding the benefits of specific ingredients, or selecting the perfect skincare solution, we’ve got you covered.",
  },
  {
    title: "Order Assistance",
    content:
      "Have questions about your order? Whether you’re tracking your shipment, need to update your delivery address, or have concerns about a product you received, our customer care team is ready to assist. We aim to ensure that your shopping experience is smooth and hassle-free.",
  },
  {
    title: "Returns and Exchanges",
    content:
      "We want you to be completely satisfied with your purchase. If, for any reason, you are not happy with a product, our returns and exchanges policy is designed to make the process as simple as possible. Visit our Returns & Exchanges page for detailed instructions.",
  },
  {
    title: "Ayurvedic Guidance",
    content:
      "New to Ayurveda? We’re here to help you understand how our products can fit into your lifestyle. Our knowledgeable team can provide insights into the principles of Ayurveda and help you choose products that align with your unique dosha and wellness goals.",
  },
  {
    title: "Account Support",
    content:
      "If you need assistance with your account, such as resetting your password, updating personal information, or managing your subscriptions, we’re here to help. Log into your account or contact our support team for personalized assistance.",
  },
];

const contactData = [
  {
    title: "Email",
    desc: "support@yourayurvedicwebsite.com",
  },
  {
    title: "Phone",
    desc: "+[Your Phone Number] (Available Mon-Fri, 9 AM - 6 PM IST)",
  },
  {
    title: "Live Chat",
    desc: "Connect with us through our live chat feature for real-time assistance during business hours.",
  },
  {
    title: "Contact Form",
    desc: "Fill out our Contact Us form, and we will get back to you within 24 hours.",
  },
];

const Page = () => {
  return (
    <section className="p-5">
      {/* Header Section */}
      <div className="text-center ">
        <h1 className="text-4xl font-bold text-gray-800">
          Need Help with Orders?
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Welcome to SVM&apos;s Customer Care page! We are committed to
          providing you with the best service and support as you embark on your
          journey to natural health and wellness.
        </p>
      </div>

      {/* Main Content */}
      <div className="p-8 space-y-12 bg-white rounded-lg md:p-10">
        {/* How Can We Help You Section */}
        <div>
          <h2 className="mb-6 text-3xl font-semibold text-gray-800">
            How Can We Help You?
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-gray-600">
            Whether you have a question about our products, need help with an
            order, or want to learn more about Ayurveda, our dedicated customer
            care team is here to assist you. Below are some of the ways we can
            support you:
          </p>
          <ul className="space-y-6">
            {data.map((item, index) => (
              <li
                key={index}
                className="p-5 border-l-4 border-green-500 rounded-lg bg-gray-50"
              >
                <h3 className="mb-2 text-2xl font-semibold text-gray-800">
                  {item.title}
                </h3>
                <p className="text-lg text-gray-600">{item.content}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Us Section */}
        <div>
          <h2 className="mb-6 text-3xl font-semibold text-gray-800">
            Contact Us
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-gray-600">
            We are dedicated to ensuring your satisfaction and well-being. If
            you need to reach out to us, you can do so through any of the
            following methods:
          </p>
          <ul className="space-y-6">
            {contactData.map((item, index) => (
              <li
                key={index}
                className="flex flex-col items-start gap-4 md:flex-row md:items-center"
              >
                <h3 className="text-2xl font-semibold text-gray-800">
                  {item.title}:
                </h3>
                <p className="text-lg text-gray-600">{item.desc}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* FAQs Section */}
        <div>
          <h2 className="mb-6 text-3xl font-semibold text-gray-800">
            Frequently Asked Questions (FAQs)
          </h2>
          <p className="text-lg leading-relaxed text-gray-600">
            Looking for quick answers? Visit our FAQs page, where we have
            compiled answers to common questions about our products, orders, and
            more.
          </p>
        </div>

        {/* Our Commitment Section */}
        <div>
          <h2 className="mb-6 text-3xl font-semibold text-gray-800">
            Our Commitment to You
          </h2>
          <p className="text-lg leading-relaxed text-gray-600">
            At SVM, we believe in the power of Ayurveda to transform lives. Our
            goal is to support your wellness journey with top-quality products
            and exceptional customer service. Your satisfaction is our priority,
            and we are here to ensure you have a positive experience every time
            you shop with us.
          </p>
          <p className="mt-5 text-2xl font-medium text-gray-800">
            Thank you for choosing us as your trusted partner in Ayurvedic
            health and wellness!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Page;
