import React from "react";

const Featured = () => {
  return (
    <section>
      <div className="flex flex-col items-center justify-center gap-10 px-5 py-10 md:flex-row md:px-10 md:items-start">
        <video className="w-[340px]" preload="none" autoPlay loop muted>
          <source src="/featured1.mp4" type="video/mp4" />
        </video>
        <video className="w-[340px] " preload="none" autoPlay loop muted>
          <source src="/featured2.mp4" type="video/mp4" />
        </video>
        <video
          className="w-[335px] md:w-[320px]"
          preload="none"
          autoPlay
          loop
          muted
        >
          <source src="/featured3.mp4" type="video/mp4" />
        </video>
        <video
          className="md:w-[320px] w-[335px]"
          preload="none"
          autoPlay
          loop
          muted
        >
          <source src="/featured4.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
};

export default Featured;
