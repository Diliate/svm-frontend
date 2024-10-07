import Image from "next/image";
import React from "react";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";

function page() {
  return (
    <section className="p-5">
      <div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl font-medium">Order Id: FN725401185</h2>
            <p className="text-xl text-zinc-600">
              Order placed on 5th December 2024 <br /> Paid by UPI, RelianceOne
              Points
            </p>
          </div>
          <div>
            <Image
              src={"/product.png"}
              alt="product"
              width={100}
              height={100}
              className="border-2 rounded-xl"
            />
            <p className="mt-2 text-xl font-medium">Cuff C Syrup</p>
          </div>
        </div>
        <div>
          <div className="flex items-center p-4 space-x-4">
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
              <FaRegCircle />
              <span className="ml-2 text-lg">Arriving 11-Sept 24</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-5">
        <div className="bg-[#F7F7F7] p-5 mt-10">
          <div className="flex flex-col gap-5">
            <h2 className="text-3xl font-medium">Order Payment Details</h2>
            <div className="flex justify-between text-xl">
              <span>Order Savings</span>
              <span className="text-[#866528]">Rs. 1639.00</span>
            </div>
            <div className="flex justify-between text-xl">
              <span className="text-gray-500">Coupon Savings</span>
              <span>Rs. 91.00</span>
            </div>
            <div className="flex justify-between text-xl">
              <span className="text-gray-500">
                Convenience Fee <br />
                (Non-refundable)
              </span>
              <span>Rs. 28.00</span>
            </div>
            <div className="flex justify-between pt-2 text-xl font-bold border-t-2 border-black border-dashed">
              <span>Order Total</span>
              <span>Rs. 886.00</span>
            </div>
          </div>
        </div>

        <div className="bg-[#F7F7F7] p-5 mt-10 h-[235px]">
          <div className="flex flex-col gap-5">
            <h2 className="text-3xl font-medium">Deliver To</h2>
            <div className="flex flex-col text-xl">
              <span className="text-xl font-bold">Adrial</span>
              <span>
                Road No. 7, Faridabad , gali No. 3 New Delhi, India - 83297
              </span>
            </div>
            <div className="flex justify-between pt-2 text-xl font-bold ">
              <span>Phone: 79321682190</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default page;
