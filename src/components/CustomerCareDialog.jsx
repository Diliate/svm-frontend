import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "./ui/dialog";

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

function CustomerCareDialog({
  isCustomerCareModalOpen,
  setCustomerCareModalOpen,
}) {
  return (
    <Dialog
      open={isCustomerCareModalOpen}
      onOpenChange={setCustomerCareModalOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogDescription className="overflow-y-auto h-[500px] w-[104%]">
            <section className="mt-2">
              <div className="flex flex-col items-center justify-center">
                <div>
                  <h1 className="text-4xl font-semibold">
                    Need Help with Orders?
                  </h1>
                  <p className="mt-2 mb-5 text-xl leading-10">
                    Welcome to SVM&apos;s Customer Care page! We are committed
                    to providing you with the best service and support as you
                    embark on your journey to natural health and wellness.
                  </p>
                </div>
                <div>
                  <h2 className="text-3xl font-semibold">
                    How Can We Help You?
                  </h2>
                  <p className="text-xl leading-10">
                    Whether you have a question about our products, need help
                    with an order, or want to learn more about Ayurveda, our
                    dedicated customer care team is here to assist you. Below
                    are some of the ways we can support you:
                  </p>
                  <div>
                    <ul className="list-decimal list-inside">
                      {data.map((item, index) => (
                        <li key={index} className="my-3 text-xl leading-10">
                          <span className="text-2xl font-semibold">
                            {item.title}:
                          </span>{" "}
                          <br />
                          <p className="ml-5"> • {item.content}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-10">
                    <h2 className="text-3xl font-semibold">Contact Us</h2>
                    <p className="text-xl leading-10">
                      We are dedicated to ensuring your satisfaction and
                      well-being. If you need to reach out to us, you can do so
                      through any of the following methods:
                    </p>

                    <ul className="list-disc list-inside">
                      {contactData.map((item, index) => (
                        <li key={index} className="my-3 text-xl leading-10 ">
                          <span className="text-2xl font-semibold">
                            {item.title}:
                          </span>{" "}
                          <span className="ml-1">{item.desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col gap-3 mt-10">
                    <h2 className="text-3xl font-semibold">
                      Frequently Asked Questions (FAQs)
                    </h2>
                    <p className="text-xl leading-10">
                      Looking for quick answers? Visit our FAQs page, where we
                      have compiled answers to common questions about our
                      products, orders, and more.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 mt-10">
                    <h2 className="text-3xl font-semibold">
                      Our Commitment to You
                    </h2>
                    <p className="text-xl leading-10">
                      At [Your Ayurvedic Medicine Website], we believe in the
                      power of Ayurveda to transform lives. Our goal is to
                      support your wellness journey with top-quality products
                      and exceptional customer service. Your satisfaction is our
                      priority, and we are here to ensure you have a positive
                      experience every time you shop with us.
                    </p>
                    <p className="mt-5 text-2xl font-medium leading-10">
                      Thank you for choosing us as your trusted partner in
                      Ayurvedic health and wellness!
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default CustomerCareDialog;
