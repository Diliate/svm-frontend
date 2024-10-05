import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <section className="">
      <div className="flex flex-col items-center justify-center h-[618px] gap-5">
        <h1 className="font-medium text-7xl">Create Your Account</h1>
        <p className="text-2xl">
          <Link href={"/login"} className="underline cursor-pointer">
            Login
          </Link>{" "}
          or{" "}
          <Link href={"/signup"} className="underline cursor-pointer">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default page;
