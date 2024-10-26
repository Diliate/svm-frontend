import React from "react";
import { IoIosTrendingUp, IoIosTrendingDown } from "react-icons/io";
import { FaHandHoldingDollar } from "react-icons/fa6";

const data = [
  {
    id: 1,
    title: "Revenue",
    trend: 11.01,
    increase: true,
    total: 0, // Placeholder if you want to show a total value here
  },
  {
    id: 2,
    title: "Visits",
    trend: 9.15,
    total: 367,
    increase: true,
  },
  {
    id: 3,
    title: "Orders",
    trend: -0.56,
    total: 56,
    increase: false,
  },
  {
    id: 4,
    title: "Active Users",
    trend: -1.48,
    total: 23,
    increase: false,
  },
];

function page() {
  return (
    <section className="p-5">
      <div className="flex flex-wrap justify-between">
        {data.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border-2 bg-white h-[160px] w-[275px] p-5 flex flex-col justify-between"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-medium">{item.title}</h1>
              <FaHandHoldingDollar size={24} />
            </div>

            {/* Trend Section */}
            <div className="flex items-center justify-between mt-4">
              <h2 className="text-3xl font-semibold">
                {item.total ? item.total.toLocaleString() + "k" : ""}
              </h2>
              <div className="flex items-center gap-2">
                {item.increase ? (
                  <IoIosTrendingUp size={24} className="text-green-500" />
                ) : (
                  <IoIosTrendingDown size={24} className="text-red-500" />
                )}
                <p
                  className={`text-lg ${
                    item.increase ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {item.trend}&#37;
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 border-2 w-full h-[400px] bg-white rounded-xl"></div>
    </section>
  );
}

export default page;
