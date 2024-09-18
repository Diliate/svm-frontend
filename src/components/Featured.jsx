import React from "react";

const Featured = () => {
  return (
    <section>
      <div className="flex justify-center gap-10 px-10 py-10">
        <video className="w-[340px]" preload="none" autoPlay loop muted>
          <source src="/featured1.mp4" type="video/mp4" />
        </video>
        <video className="w-[340px] " preload="none" autoPlay loop muted>
          <source src="/featured2.mp4" type="video/mp4" />
        </video>
        <video className="w-[325px]" preload="none" autoPlay loop muted>
          <source src="/featured3.mp4" type="video/mp4" />
        </video>
        <video className="w-[325px]" preload="none" autoPlay loop muted>
          <source src="/featured4.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
};

export default Featured;
