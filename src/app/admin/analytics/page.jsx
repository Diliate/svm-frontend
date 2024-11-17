import React from "react";
import { IoIosTrendingUp, IoIosTrendingDown } from "react-icons/io";
import { FaHandHoldingDollar } from "react-icons/fa6";
import AnalyticsGraph from "./_components/Analytics";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data = [
  {
    id: 1,
    title: "Revenue",
    trend: 11.01,
    increase: true,
    total: 0,
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

const tableData = [
  {
    id: "1",
    name: "Medicine Cream",
    sold: 80,
    price: 200,
  },
  {
    id: "2",
    name: "Medicine Cream",
    sold: 80,
    price: 200,
  },
  {
    id: "3",
    name: "Medicine Cream",
    sold: 80,
    price: 200,
  },
  {
    id: "4",
    name: "Medicine Cream",
    sold: 80,
    price: 200,
  },
  {
    id: "5",
    name: "Medicine Cream",
    sold: 80,
    price: 200,
  },
];

function Page() {
  return (
    <section className="p-5">
      <div className="flex flex-wrap justify-between gap-5 md:gap-0">
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

      <div className="mt-5 border-2 w-full h-[370px] bg-white rounded-xl pt-10">
        <AnalyticsGraph />
      </div>

      <div className="w-full p-5 mt-5 bg-white border-2 rounded-xl">
        <h2 className="text-4xl font-medium">Top Selling Products</h2>

        <Table className="mt-5 text-lg">
          <TableHeader className="border-b-8 border-[#E6EFF5]">
            <TableRow>
              <TableHead className="uppercase text-[#718EBF]">
                Product Name
              </TableHead>
              <TableHead className="uppercase text-[#718EBF]">Price</TableHead>
              <TableHead className="uppercase text-[#718EBF]">Sold</TableHead>
              <TableHead className="uppercase text-[#718EBF]">Sold</TableHead>
              <TableHead className="uppercase text-[#718EBF]">Sales</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((medicine) => (
              <TableRow key={medicine.id}>
                <TableCell className="font-medium">{medicine.id}</TableCell>
                <TableCell>{medicine.name}</TableCell>
                <TableCell>Rs. {medicine.price}</TableCell>
                <TableCell>{medicine.sold}</TableCell>
                <TableCell>Rs. {medicine.price * medicine.sold}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}

export default Page;
