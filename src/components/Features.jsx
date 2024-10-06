import Image from "next/image";
import React from "react";

const Features = () => {
  const featureData = [
    {
      logo: "/shipping.png",
      heading: "Free Shipping",
      desc: "Free Shipping across world",
    },
    {
      logo: "/return.png",
      heading: "Easy Returns",
      desc: "Returns up to 15 days",
    },
    {
      logo: "/customer-support.png",
      heading: "Online Support",
      desc: "24 hours onlie support",
    },
    {
      logo: "/payment.png",
      heading: "Secure Payment",
      desc: "Pay with Multiple safe option",
    },
  ];
  return (
    <section className="px-5 py-10 md:px-10">
      <div className="flex flex-col items-center justify-center gap-5 md:items-start md:justify-between md:gap-0 md:flex-row ">
        {featureData.map((feature, index) => (
          <div
            key={index}
            className="rounded-[30px] bg-[#F9F9EB] flex flex-col items-center justify-center p-5 w-[300px]"
          >
            <Image
              src={feature.logo}
              alt={feature.heading}
              height={90}
              width={90}
            />
            <h1 className="text-2xl font-bold">{feature.heading}</h1>
            <p className="mt-2 text-lg">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
