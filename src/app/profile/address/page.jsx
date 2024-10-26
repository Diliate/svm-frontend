import React from "react";
import { BsPlusSquare } from "react-icons/bs";

function page() {
  return (
    <section className="p-5">
      <div>
        <div className="flex justify-between">
          <h2 className="text-3xl font-medium">Your Address</h2>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 mt-5 place-items-center md:place-content-start md:grid-cols-3">
        <div className="bg-[#F7F7F7] rounded-xl h-60 w-60 flex flex-col justify-center gap-10 items-center border-2 cursor-pointer">
          <BsPlusSquare size={50} />
          <h2 className="text-3xl font-medium">Add Address</h2>
        </div>

        <div className="bg-[#F7F7F7] rounded-xl h-60 w-60 gap-10 border-2">
          <h2 className="w-full pb-1 text-3xl font-medium text-center bg-white border-b-2 rounded-t-xl">
            Default
          </h2>
          <div className="flex flex-col items-start justify-start p-2">
            <h2 className="text-2xl font-medium ">Juliya</h2>
            <p className="text-lg">
              123, New Friends colony Road no.3, New Delhi, India
            </p>

            <p>Phone No. - +91 892754990</p>
          </div>
          <div className="flex items-center justify-start w-full gap-3 p-2">
            <button className="px-5 py-1 text-white duration-200 rounded-full bg-zinc-800 hover:opacity-85">
              Edit
            </button>
            <div className="w-[2px] h-6 bg-zinc-600"></div>
            <button className="px-5 py-1 text-white duration-200 bg-red-600 rounded-full hover:opacity-85">
              Remove
            </button>
          </div>
        </div>

        <div className="bg-[#F7F7F7] rounded-xl h-60 w-60 gap-10 border-2">
          <div className="flex flex-col items-start justify-start p-3">
            <h2 className="text-2xl font-medium ">Juliya</h2>
            <p className="text-lg">
              123, New Friends colony Road no.3, New Delhi, India
            </p>

            <p>Phone No. - +91 892754990</p>
          </div>
          <div className="flex items-center justify-start w-full gap-3 p-2">
            <button className="px-5 py-1 text-white duration-200 rounded-full bg-zinc-800 hover:opacity-85">
              Edit
            </button>
            <div className="w-[2px] h-6 bg-zinc-600"></div>
            <button className="px-5 py-1 text-white duration-200 bg-red-600 rounded-full hover:opacity-85">
              Remove
            </button>
          </div>
        </div>

        <div className="bg-[#F7F7F7] rounded-xl h-60 w-60 gap-10 border-2">
          <div className="flex flex-col items-start justify-start p-3">
            <h2 className="text-2xl font-medium ">Juliya</h2>
            <p className="text-lg">
              123, New Friends colony Road no.3, New Delhi, India
            </p>

            <p>Phone No. - +91 892754990</p>
          </div>
          <div className="flex items-center justify-start w-full gap-3 p-2">
            <button className="px-5 py-1 text-white duration-200 rounded-full bg-zinc-800 hover:opacity-85">
              Edit
            </button>
            <div className="w-[2px] h-6 bg-zinc-600"></div>
            <button className="px-5 py-1 text-white duration-200 bg-red-600 rounded-full hover:opacity-85">
              Remove
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default page;
