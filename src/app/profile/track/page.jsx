import Image from "next/image";
import React from "react";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";

function page() {
  return (
    <section className="p-5">
      {/* Order Details */}
      <div className="container mx-auto">
        <div className="flex flex-row justify-between gap-5">
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-medium md:text-3xl">
              Order Id: FN725401185
            </h2>
            <p className="text-lg md:text-xl text-zinc-600">
              Order placed on 5th December 2024 <br />
              Paid by UPI, RelianceOne Points
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src={"/product.png"}
              alt="product"
              width={100}
              height={100}
              className="border-2 rounded-xl"
            />
            <p className="mt-2 text-lg font-medium md:text-xl">Cuff C Syrup</p>
          </div>
        </div>

        {/* Order Status Section */}
        <div className="mt-10">
          <div className="flex flex-col items-start space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
            <div className="flex items-center text-green-500">
              <FaCheckCircle size={20} />
              <span className="ml-2 text-lg">Order Received</span>
            </div>
            <div className="flex-1 border-t-2 border-gray-300"></div>
            <div className="flex items-center text-green-500">
              <FaCheckCircle size={20} />
              <span className="ml-2 text-lg">Shipped</span>
            </div>
            <div className="flex-1 border-t-2 border-gray-300"></div>
            <div className="flex items-center text-gray-500">
              <FaRegCircle size={20} />
              <span className="ml-2 text-lg">Arriving 11-Sept 24</span>
            </div>
          </div>
        </div>

        {/* Payment and Delivery Information */}
        <div className="flex flex-col gap-5 mt-10 lg:flex-row">
          {/* Payment Details */}
          <div className="bg-[#F7F7F7] p-5 flex-1">
            <div className="flex flex-col gap-5">
              <h2 className="text-2xl font-medium md:text-3xl">
                Order Payment Details
              </h2>
              <div className="flex justify-between text-lg md:text-xl">
                <span>Order Savings</span>
                <span className="text-[#866528]">Rs. 1639.00</span>
              </div>
              <div className="flex justify-between text-lg md:text-xl">
                <span className="text-gray-500">Coupon Savings</span>
                <span>Rs. 91.00</span>
              </div>
              <div className="flex justify-between text-lg md:text-xl">
                <span className="text-gray-500">
                  Convenience Fee <br />
                  (Non-refundable)
                </span>
                <span>Rs. 28.00</span>
              </div>
              <div className="flex justify-between pt-2 text-lg font-bold border-t-2 border-black border-dashed md:text-xl">
                <span>Order Total</span>
                <span>Rs. 886.00</span>
              </div>
            </div>
          </div>

          {/* Delivery Information */}
          <div className="bg-[#F7F7F7] p-5 flex-1 h-auto">
            <div className="flex flex-col gap-5">
              <h2 className="text-2xl font-medium md:text-3xl">Deliver To</h2>
              <div className="flex flex-col text-lg md:text-xl">
                <span className="font-bold">Adrial</span>
                <span>
                  Road No. 7, Faridabad , gali No. 3 New Delhi, India - 83297
                </span>
              </div>
              <div className="flex justify-between pt-2 text-lg font-bold md:text-xl">
                <span>Phone: 79321682190</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default page;
