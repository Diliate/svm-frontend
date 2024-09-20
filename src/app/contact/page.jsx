import React from "react";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";

function page() {
  return (
    <section className="p-10">
      <div className="flex flex-col items-center justify-center">
        <div className="flex gap-10">
          <div className="flex flex-col gap-5 w-[430px] border-2 pl-10 py-5 rounded-2xl">
            <h2 className="text-4xl font-semibold">Contact Us</h2>
            <p className="flex items-baseline gap-2 text-xl">
              <FaLocationDot /> 205, Faridabad south complex New Delhi, India
            </p>
            <p className="flex items-center gap-2 text-xl">
              <FaPhone /> Phone: 123-456-789
            </p>
            <p className="flex items-center gap-2 text-xl">
              <IoMail /> Email: contact@svm.com
            </p>
            <div className="flex items-center">
              <button className="flex items-center gap-2 px-4 py-2 text-lg font-medium text-white duration-200 bg-black shadow-xl rounded-xl hover:opacity-85">
                <IoLocationOutline size={22} /> View Map
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-[430px]">
            <h2 className="text-4xl font-semibold">Get in touch with us</h2>
            <h3 className="text-lg font-medium uppercase">
              and we will get back to you
            </h3>
            <div className="w-32 h-1 bg-black"></div>

            <div>
              <div className="flex gap-5">
                <div className="flex flex-col">
                  <label>Name</label>
                  <input
                    placeholder="Jane Smith"
                    className="bg-[#F2F2F2] p-2 w-[205px] outline-none rounded-md mt-1"
                    type="text"
                  />
                </div>
                <div className="flex flex-col">
                  <label>Email</label>
                  <input
                    placeholder="svm@gmail.com"
                    className="bg-[#F2F2F2] p-2 w-[205px] outline-none rounded-md mt-1"
                    type="email"
                  />
                </div>
              </div>
              <div className="flex flex-col mt-2">
                <label>Message</label>
                <textarea
                  placeholder="Jane Smith"
                  className="bg-[#F2F2F2] p-2 w-[430px] h-[100px] outline-none rounded-md mt-1 resize-none"
                />
              </div>
              <button className="w-full py-2 mt-3 text-white duration-200 bg-black rounded-md shadow-xl hover:opacity-85">
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* MAP */}
        <div className="mt-10">
          <iframe
            title="Clinic Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2244.373793245254!2d77.3299264760197!3d28.407050165845362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1fa7e6317e43%3A0x8f48d8d8a1a20d65!2s123%20Health%20Street%2C%20Greater%20Faridabad!5e0!3m2!1sen!2sin!4v1693914721141!5m2!1sen!2sin"
            width="1000" // Adjusted width
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export default page;
