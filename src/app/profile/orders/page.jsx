"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { FaX } from "react-icons/fa6";

function Page() {
  const [selected, setSelected] = useState(0);
  const tabs = ["Order", "Cancelled Order", "Track Order"];
  const [tabWidth, setTabWidth] = useState(0);
  const tabRefs = useRef([]);
  const [fade, setFade] = useState(true); // State for fade animation

  const handleSelectTab = (index) => {
    setFade(false); // Start fading out
    setTimeout(() => {
      setSelected(index);
      setFade(true); // Start fading in after a short delay
    }, 300); // Match the duration of your transition
  };

  useEffect(() => {
    if (tabRefs.current[selected]) {
      setTabWidth(tabRefs.current[selected].offsetWidth);
    }
  }, [selected]);

  return (
    <section className="p-5">
      <h1 className="text-4xl font-medium">Your Order</h1>
      <div className="relative">
        <div
          className={`absolute top-0 left-0 h-12 bg-green-600 transition-transform duration-300 ease-in-out rounded-full`}
          style={{
            width: `${tabWidth}px`,
            transform: `translateX(${tabRefs.current[selected]?.offsetLeft}px)`,
          }}
        />
        <div className="flex gap-10 pb-1 my-5 border-b-2">
          {tabs.map((data, index) => (
            <button
              key={index}
              ref={(el) => (tabRefs.current[index] = el)}
              onClick={() => handleSelectTab(index)}
              className={`relative py-2 px-5 rounded-full text-xl duration-200 h-12 ${
                selected === index ? "text-white" : "text-black"
              }`}
            >
              {data}
            </button>
          ))}
        </div>

        {/* ORDERS */}
        <div
          className={`flex flex-col gap-5 transition-all duration-300 ${
            fade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          {selected === 0 && (
            <>
              {/* Order Items for Tab 0 */}
              <div className="overflow-hidden border-2 border-zinc-500 rounded-2xl">
                <div className="flex items-center justify-between w-full text-lg font-medium bg-[#F7F7F7] p-4">
                  <span>Order</span>
                  <span className="text-blue-500 cursor-pointer">
                    Order Details
                  </span>
                  <span>Order D01-546-56KId</span>
                </div>
                <div className="flex items-center justify-between px-4 py-2 text-xl border-y-2 border-zinc-500">
                  <Image
                    src="/product.png"
                    alt="product"
                    height={150}
                    width={150}
                    className="-ml-10"
                  />
                  <span className="-ml-32">Cuff - C Syrup</span>
                  <Link
                    href={"/product/1"}
                    className="px-5 py-1 text-white duration-200 rounded-full bg-zinc-600 hover:opacity-85"
                  >
                    View
                  </Link>
                </div>
                <h2 className="px-4 my-2 text-2xl font-medium">
                  Total Rs. 1200
                </h2>
              </div>

              {/* Repeat similar blocks for more orders */}
              <div className="overflow-hidden border-2 border-zinc-500 rounded-2xl">
                <div className="flex items-center justify-between w-full text-lg font-medium bg-[#F7F7F7] p-4">
                  <span>Order</span>
                  <span className="text-blue-500 cursor-pointer">
                    Order Details
                  </span>
                  <span>Order D01-546-56KId</span>
                </div>
                <div className="flex items-center justify-between px-4 py-2 text-xl border-y-2 border-zinc-500">
                  <Image
                    src="/product.png"
                    alt="product"
                    height={150}
                    width={150}
                    className="-ml-10"
                  />
                  <span className="-ml-32">Cuff - C Syrup</span>
                  <Link
                    href={"/product/1"}
                    className="px-5 py-1 text-white duration-200 rounded-full bg-zinc-600 hover:opacity-85"
                  >
                    View
                  </Link>
                </div>
                <h2 className="px-4 my-2 text-2xl font-medium">
                  Total Rs. 1200
                </h2>
              </div>
            </>
          )}

          {selected === 1 && (
            <>
              {/* Cancelled Orders Items for Tab 1 */}
              <div className="overflow-hidden border-2 border-zinc-500 rounded-2xl">
                <div className="flex items-center justify-between w-full text-lg font-medium bg-[#F7F7F7] p-4">
                  <span>Order</span>
                  <span className="text-blue-500 cursor-pointer">
                    Order Details
                  </span>
                  <span>Order D01-546-56KId</span>
                </div>
                <div className="flex items-center justify-between px-4 py-2 text-xl border-y-2 border-zinc-500">
                  <Image
                    src="/product.png"
                    alt="product"
                    height={150}
                    width={150}
                    className="-ml-10"
                  />
                  <span className="-ml-20">Cuff - C Syrup</span>
                  <button className="flex items-center gap-1 px-5 py-1 text-red-600 duration-200 rounded-full hover:opacity-85">
                    Cancelled <FaX />
                  </button>
                </div>
                <h2 className="px-4 my-2 text-2xl font-medium">
                  Total Rs. 1200
                </h2>
              </div>

              {/* Repeat similar blocks for more cancelled orders */}
              <div className="overflow-hidden border-2 border-zinc-500 rounded-2xl">
                <div className="flex items-center justify-between w-full text-lg font-medium bg-[#F7F7F7] p-4">
                  <span>Order</span>
                  <span className="text-blue-500 cursor-pointer">
                    Order Details
                  </span>
                  <span>Order D01-546-56KId</span>
                </div>
                <div className="flex items-center justify-between px-4 py-2 text-xl border-y-2 border-zinc-500">
                  <Image
                    src="/product.png"
                    alt="product"
                    height={150}
                    width={150}
                    className="-ml-10"
                  />
                  <span className="-ml-20">Cuff - C Syrup</span>
                  <button className="flex items-center gap-1 px-5 py-1 text-red-600 duration-200 rounded-full hover:opacity-85">
                    Cancelled <FaX />
                  </button>
                </div>
                <h2 className="px-4 my-2 text-2xl font-medium">
                  Total Rs. 1200
                </h2>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default Page;
