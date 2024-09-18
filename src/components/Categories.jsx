import Image from "next/image";
import React from "react";

const Categories = () => {
  return (
    <section className="px-10 py-10">
      <div className="flex items-center justify-center gap-5">
        <div className="h-[550px] w-[450px] relative overflow-hidden">
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
          <div className="flex gap-5">
            <div className="w-[430px] h-[265px] relative overflow-hidden">
              <Image
                src="/category2.png"
                alt="category"
                fill
                objectFit="cover"
                className="absolute"
              />
              <button className="bg-white border-[1px] text-black uppercase font-medium rounded-md shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] text-lg px-4 py-2 absolute bottom-10 left-[40%] hover:opacity-85 duration-200">
                c l e a n s e
              </button>
            </div>
            <div className="w-[430px] h-[265px] relative overflow-hidden">
              <Image
                src="/category2.png"
                alt="category"
                fill
                objectFit="cover"
                className="absolute"
              />
              <button className="bg-white border-[1px] text-black uppercase font-medium rounded-md shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] text-lg px-4 py-2 absolute bottom-10 left-[40%] hover:opacity-85 duration-200">
                d e t o x
              </button>
            </div>
          </div>

          <div className="flex gap-5 mt-5">
            <div className="w-[430px] h-[265px] relative overflow-hidden">
              <Image
                src="/category3.png"
                alt="category"
                fill
                objectFit="cover"
                className="absolute"
              />
              <button className="bg-white border-[1px] text-black uppercase font-medium rounded-md shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] text-lg px-4 py-2 absolute bottom-10 left-[40%] hover:opacity-85 duration-200">
                n a t u r a l
              </button>
            </div>
            <div className="w-[430px] h-[265px] relative overflow-hidden">
              <Image
                src="/category4.png"
                alt="category"
                fill
                objectFit="cover"
                className="absolute"
              />
              <button className="bg-white border-[1px] text-black uppercase font-medium rounded-md shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] text-lg px-4 py-2 absolute bottom-10 left-[40%] hover:opacity-85 duration-200">
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
