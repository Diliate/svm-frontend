import Image from "next/image";
import React from "react";
import { FaLocationDot } from "react-icons/fa6";

const page = () => {
  return (
    <section className="flex flex-col gap-10 px-5 pb-10 md:px-10 md:flex-row pt-28">
      <div className="flex flex-col w-full gap-10 md:w-1/2">
        <div className="flex flex-col justify-between gap-10 p-3 border-2 md:p-5 md:gap-0 md:flex-row rounded-xl">
          <div className="flex flex-col gap-5">
            <div className="flex items-baseline gap-1">
              <FaLocationDot size={20} />
              <div>
                <h2 className="text-2xl font-medium">Delivery Address</h2>
                <p className="text-lg">
                  We will deliver your order to this address
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 py-3 border-dashed md:border-y-0 border-y-2 border-zinc-600 md:py-0">
              <h2 className="text-3xl font-medium">SVM (Name of customer)</h2>
              <p className="text-xl">Address (Address of Customer)</p>
              <p className="text-xl">Phone No. - (+91) 123456789</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-2xl">Qnty: 1</h2>
            <Image
              src={"/product.png"}
              alt="product"
              height={250}
              width={250}
            />
            <h2 className="text-2xl font-medium">Cuff C Syrup</h2>
          </div>
        </div>

        {/* Payment Details */}
        <div className="border-2 rounded-xl">
          <h2 className="text-2xl font-medium text-white bg-[#005431] w-full text-left rounded-t-xl py-2 px-5">
            Payment Option
          </h2>

          <div className="flex flex-col gap-5 p-3 md:p-5 md:flex-row">
            {/* PAYMENT METHODS */}
            <div className="md:w-1/2 w-full bg-[#F7F7F7] md:text-2xl text-xl font-medium md:p-5 p-3">
              <h2 className="flex items-center justify-between pb-2 mb-4 border-b-2 cursor-pointer border-zinc-600">
                Credit/ Debit Card
                <span className="h-2 w-2 rounded-full bg-[#005431]"></span>
              </h2>
              <h2 className="pb-2 mb-4 border-b-2 cursor-pointer border-zinc-600">
                NetBanking
              </h2>
              <h2 className="pb-2 mb-4 border-b-2 cursor-pointer border-zinc-600">
                Wallet
              </h2>
              <h2 className="pb-2 mb-4 border-b-2 cursor-pointer border-zinc-600">
                UPI
              </h2>
            </div>

            {/* CARD DETAILS */}
            <div className="w-full md:w-1/2">
              <h2 className="mb-5 text-2xl font-medium">Add New Card</h2>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col">
                  <label className="mb-2 text-xl font-medium">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your card number"
                    className="px-3 py-2 border-2 outline-none bg-[#F7F7F7]"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-2 text-xl font-medium">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your card name"
                    className="px-3 py-2 border-2 outline-none bg-[#F7F7F7]"
                  />
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-col">
                    <label className="mb-2 text-xl font-medium">
                      Expiration Date
                    </label>
                    <div className="flex justify-between gap-3">
                      <input
                        type="text"
                        placeholder="Month"
                        className="px-3 py-2 border-2 outline-none bg-[#F7F7F7] w-1/2"
                      />
                      <input
                        type="text"
                        placeholder="Year"
                        className="px-3 py-2 border-2 outline-none bg-[#F7F7F7] w-1/2"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2 text-xl font-medium">CVV</label>
                    <input
                      type="text"
                      placeholder="Enter CVV"
                      className="px-3 py-2 border-2 outline-none bg-[#F7F7F7] w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 my-3">
                <input type="checkbox" />
                <p>Save this card securely</p>
              </div>

              <button className="bg-[#005431] px-5 py-2 text-xl font-medium rounded-lg text-white hover:opacity-85 duration-200">
                Payment Securely
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Order Details */}
      <div className="bg-[#F7F7F7] md:p-5 p-3 md:w-1/2 w-full md:h-[330px] h-auto">
        <div className="flex flex-col gap-5">
          <h2 className="text-3xl font-medium">Order Details</h2>
          <div className="flex justify-between text-xl">
            <span>Bag Total</span>
            <span>Rs. 2380.00</span>
          </div>
          <div className="flex justify-between text-xl">
            <span>Bag Discount</span>
            <span className="text-[#866528]">Rs. 1639.00</span>
          </div>
          <div className="flex justify-between text-xl">
            <span className="text-gray-500">Delivery Fee</span>
            <span>Rs. 99.00</span>
          </div>
          <div className="flex justify-between text-xl">
            <span className="text-gray-500">Platform Fee</span>
            <span>Rs. 28.00</span>
          </div>
          <div className="flex justify-between pt-2 text-xl font-bold border-t-2 border-black border-dashed">
            <span>Order Total</span>
            <span>Rs. 886.00</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
