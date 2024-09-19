import Image from "next/image";
import React from "react";

const page = () => {
  const aboutData = [
    {
      image: "/about1.png",
      heading: "Natural Ingredients",
      desc: "We use only the best natural ingredients in our products, ensuring that you get",
    },
    {
      image: "/about2.png",
      heading: "Sustainability",
      desc: "We use only the best natural ingredients in our products, ensuring that you get",
    },
    {
      image: "/about3.png",
      heading: "Customer Satisfaction",
      desc: "We use only the best natural ingredients in our products, ensuring that you get",
    },
  ];
  return (
    <section className="p-10">
      <div className="flex flex-col items-center justify-center gap-20">
        <div className="flex gap-10">
          <div className="h-[420px] w-[325px] relative overflow-hidden">
            <video
              preload="none"
              autoPlay
              loop
              muted
              className="absolute top-0 object-cover w-full h-full transform -translate-x-1/2 left-1/2"
            >
              <source src="/category1.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="w-[800px] flex flex-col gap-5">
            <h1 className="text-5xl font-semibold">About SVM</h1>
            <p className="text-[21px] text-justify text-gray-600">
              At SVM, we believe in nature's power to heal, nurture, and
              restore. Our journey began with a simple idea: to bring the purest
              and most effective herbal products to everyone. We arepassionate
              about harnessing the naturalgoodness of herbs, plants, and
              botanicals to create products that support your well-being and
              connect you with the ancient wisdom of nature.
            </p>
            <p className="text-[21px] text-justify text-gray-600">
              Our mission is to provide high-quality, natural and sustainable
              herbal products that enhance lives. Each product is carefully
              crafted using the finest herbs, sourced from trusted suppliers who
              share our commitment to quality and sustainability.
            </p>
          </div>
        </div>

        <div className="flex gap-10">
          <div className="w-[800px] flex flex-col gap-5 -mt-5">
            <h2 className="text-5xl font-semibold">Our history</h2>
            <p className="text-[21px] text-justify text-gray-600">
              SVM was founded in 2000 with a simple vision: to bring the healing
              power of nature to everyone. Our journey began when our founder,
              David, discovered the incredible benefits of herbs and natural
              remedies while growing up surrounded by nature. With a deep
              respect for the environment and a passion for holistic wellness,
              [he/she/they] set out to create a brand that offers pure, natural,
              and effective products
            </p>
            <p className="text-[21px] text-justify text-gray-600">
              At , we believe in the SVM wisdom of nature and strive it by
              crafting products that are free from synthetic chemicals and
              harmful additives. Each product is carefully formulated using the
              finest herbs and botanicals, ensuring that our customers receive
              only the best. We are dedicated to promoting a healthier, more
              sustainable way of living, and we invite you to join us on this
              journey toward natural wellness
            </p>
          </div>
          <div className="h-[420px] w-[325px] relative">
            <Image
              src="/banner.png"
              alt="about-banner"
              fill
              objectFit="cover"
            />
          </div>
        </div>

        <div>
          <h2 className="mb-10 text-5xl font-semibold text-center">
            Why Choose Us
          </h2>

          <div className="flex justify-center gap-12">
            {aboutData.map((data, index) => (
              <div
                key={index}
                className="w-[370px] border-2 rounded-3xl px-10 py-4 flex items-center justify-center flex-col gap-3"
              >
                <Image
                  src={data.image}
                  alt={data.heading}
                  height={90}
                  width={90}
                />
                <h2 className="text-2xl font-semibold">{data.heading}</h2>
                <p className="text-xl text-center">{data.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
