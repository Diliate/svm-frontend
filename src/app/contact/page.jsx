import React from "react";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";

function Page() {
  return (
    <section className="px-5 pt-32 pb-10 md:px-10">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col gap-10 md:flex-row">
          <div className="flex flex-col gap-5 md:w-[430px] w-full border-2 md:pl-10 pl-4 py-5 rounded-2xl">
            <h2 className="text-3xl font-semibold md:text-4xl">Contact Us</h2>
            <p className="flex items-baseline gap-2 text-lg md:text-xl">
              <FaLocationDot /> 205, Faridabad south complex New Delhi, India
            </p>
            <p className="flex items-center gap-2 text-lg md:text-xl">
              <FaPhone /> Phone: 123-456-789
            </p>
            <p className="flex items-center gap-2 text-lg md:text-xl">
              <IoMail /> Email: contact@svm.com
            </p>
            <div className="flex items-center">
              <button className="flex items-center gap-2 px-4 py-2 text-lg font-medium text-white duration-200 bg-black shadow-xl rounded-xl hover:opacity-85">
                <IoLocationOutline size={22} /> View Map
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2 md:w-[430px] w-full">
            <h2 className="text-3xl font-semibold md:text-4xl">
              Get in touch with us
            </h2>
            <h3 className="uppercase font-mediu md:text-lg">
              and we will get back to you
            </h3>
            <div className="w-32 h-1 bg-black"></div>

            <div>
              <div className="flex flex-col gap-5 md:flex-row">
                <div className="flex flex-col">
                  <label>Name</label>
                  <input
                    placeholder="Jane Smith"
                    className="bg-[#F2F2F2] p-2 md:w-[205px] w-auto outline-none rounded-md mt-1"
                    type="text"
                  />
                </div>
                <div className="flex flex-col">
                  <label>Email</label>
                  <input
                    placeholder="svm@gmail.com"
                    className="bg-[#F2F2F2] p-2 md:w-[205px] w-full outline-none rounded-md mt-1"
                    type="email"
                  />
                </div>
              </div>
              <div className="flex flex-col mt-2">
                <label>Message</label>
                <textarea
                  placeholder="Jane Smith"
                  className="bg-[#F2F2F2] p-2 md:w-[430px] w-full h-[100px] outline-none rounded-md mt-1 resize-none"
                />
              </div>
              <button className="w-full py-2 mt-3 text-white duration-200 bg-black rounded-md shadow-xl hover:opacity-85">
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* MAP */}
        <div className="relative md:w-[900px] w-full mt-10 overflow-hidden h-[400px]">
          <iframe
            title="SVM location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2244.373793245254!2d77.3299264760197!3d28.407050165845362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1fa7e6317e43%3A0x8f48d8d8a1a20d65!2s123%20Health%20Street%2C%20Greater%20Faridabad!5e0!3m2!1sen!2sin!4v1693914721141!5m2!1sen!2sin"
            className="absolute top-0 left-0 w-full h-full border-0"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export default Page;
