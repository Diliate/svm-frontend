import Image from "next/image";
import React from "react";

const Categories = () => {
  return (
    <section className="p-5 py-10 md:px-10">
      <div className="flex items-center justify-center gap-5">
        {/* Videa */}
        <div className="h-[550px] w-[450px] relative overflow-hidden hidden md:block">
          <video
            preload="none"
            autoPlay
            loop
            muted
            className="absolute top-0 object-cover w-full h-full transform -translate-x-1/2 left-1/2"
          >
            <source src="/category1.mp4" type="video/mp4" />
          </video>
          <button className="bg-white border-[1px] text-black uppercase font-medium rounded-md shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] text-lg px-4 py-2 absolute bottom-10 left-[40%] hover:opacity-85 duration-200 ">
            c l e a n s e
          </button>
        </div>

        <div className="flex flex-col">
          {/* top both container */}
          <div className="flex flex-col items-center justify-center gap-5 md:flex-row">
            {/* top left container */}
            <div className="w-[333px] md:w-[430px] h-[265px] relative overflow-hidden group">
              <Image
                src="/category2.png"
                alt="category"
                fill
                objectFit="cover"
                className="absolute duration-300 group-hover:scale-110"
              />
              <button className="bg-white border-[1px] text-black uppercase font-medium rounded-md shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] text-lg px-4 py-2 absolute bottom-10 left-[30%] md:left-[40%] hover:opacity-85 duration-200">
                c l e a n s e
              </button>
            </div>

            {/* top right container */}
            <div className="w-[333px] md:w-[430px] h-[265px] relative overflow-hidden group">
              <Image
                src="/category2.png"
                alt="category"
                fill
                objectFit="cover"
                className="absolute duration-300 group-hover:scale-110"
              />
              <button className="bg-white border-[1px] text-black uppercase font-medium rounded-md shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] text-lg px-4 py-2 absolute bottom-10 left-[30%] md:left-[40%] hover:opacity-85 duration-200">
                d e t o x
              </button>
            </div>
          </div>

          {/* bottom both container */}
          <div className="flex flex-col items-center justify-center gap-5 mt-5 md:flex-row">
            {/* bottom left Container */}
            <div className="w-[333px] md:w-[430px] h-[265px] relative overflow-hidden group">
              <Image
                src="/category3.png"
                alt="category"
                fill
                objectFit="cover"
                className="absolute duration-300 group-hover:scale-110"
              />
              <button className="bg-white border-[1px] text-black uppercase font-medium rounded-md shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] text-lg px-4 py-2 absolute bottom-10 left-[30%] md:left-[40%] hover:opacity-85 duration-200">
                n a t u r a l
              </button>
            </div>

            {/* bottom right container */}
            <div className="w-[333px] md:w-[430px] h-[265px] relative overflow-hidden group">
              <Image
                src="/category4.png"
                alt="category"
                fill
                objectFit="cover"
                className="absolute duration-300 group-hover:scale-110"
              />
              <button className="bg-white border-[1px] text-black uppercase font-medium rounded-md shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] text-lg px-4 py-2 absolute bottom-10 left-[30%] md:left-[40%] hover:opacity-85 duration-200">
                h e r b a l
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
