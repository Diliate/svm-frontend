import React from "react";

const page = () => {
  return (
    <section className="w-full bg-white rounded-2xl">
      <div className="p-5">
        <h2 className="text-5xl font-medium">Your Account</h2>
        <p className="my-5 text-2xl">Edit your details</p>

        <div className="w-full p-5 bg-[#F7F7F7] flex flex-col gap-5">
          <div className="flex gap-10">
            <h2 className="w-[200px] text-2xl font-medium">Username</h2>
            <input
              type="text"
              placeholder="Your Name"
              value={"SVM"}
              className="text-2xl bg-transparent border-b-2 outline-none"
            />
          </div>
          <div className="flex gap-10">
            <h2 className="w-[200px] text-2xl font-medium">Email Id</h2>
            <input
              type="email"
              placeholder="Your Email"
              value={"svm@gmail.com"}
              className="text-2xl bg-transparent border-b-2 outline-none"
            />
          </div>
          <div className="flex gap-10">
            <h2 className="w-[200px] text-2xl font-medium">Address</h2>
            <input
              type="text"
              placeholder="Your address"
              value={"New Delhi, India"}
              className="text-2xl bg-transparent border-b-2 outline-none"
            />
          </div>
          <div className="flex items-start gap-10">
            <h2 className="w-[200px] text-2xl font-medium">Mobile No.</h2>
            <input
              type="number"
              placeholder="Your Number"
              value=""
              className="text-2xl bg-transparent border-b-2 outline-none"
            />
          </div>
          <div className="flex justify-end">
            <button className="px-10 py-1 mt-5 text-xl font-medium text-white duration-200 bg-green-600 rounded-lg hover:opacity-85">
              Save
            </button>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="mb-3 text-3xl font-medium">Security</h2>
          <div className="flex justify-between gap-5">
            <div className="flex flex-col items-center justify-center h-20 text-center bg-[#F7F7F7] border-[1px] border-black w-52 rounded-xl">
              <h2 className="text-xl font-medium">Email Id</h2>
              <p>svm@gmail.com</p>
            </div>
            <div className="flex flex-col items-center justify-center h-20 text-center bg-[#F7F7F7] border-[1px] border-black w-52 rounded-xl">
              <h2 className="text-xl font-medium">Password</h2>
              <p>123456789</p>
            </div>
            <div className="flex flex-col items-center justify-center h-20 text-center bg-[#F7F7F7] border-[1px] border-black w-52 rounded-xl">
              <h2 className="text-xl font-medium">Mobile No.</h2>
              <p>+91 7832959801</p>
            </div>
          </div>
          <button className="px-10 py-[7px] mt-5 text-xl font-medium text-white duration-200 bg-black hover:opacity-85 rounded-lg">
            Change Password
          </button>
        </div>
      </div>
    </section>
  );
};

export default page;
