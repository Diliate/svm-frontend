import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

const data = [
  {
    id: "1",
    name: "General Health and Wellness",
    indication: "true",
  },
  {
    id: "2",
    name: "General Health and Wellness",
    indication: "true",
  },
  {
    id: "3",
    name: "Woman's Health",
    indication: "false",
  },
  {
    id: "4",
    name: "Digestive Health",
    indication: "false",
  },
  {
    id: "5",
    name: "Digestive Health",
    indication: "true",
  },
  {
    id: "6",
    name: "Respiratory Health",
    indication: "true",
  },
  {
    id: "7",
    name: "Liver Health",
    indication: "false",
  },
];

function page() {
  return (
    <section className="p-5">
      <div className="flex md:flex-row flex-col md:items-center items-start md:w-[415px] w-auto gap-5 p-2 border-2 rounded-xl">
        <div className="p-2 bg-white rounded-lg ">
          <input
            placeholder="Enter Category Name"
            className="border-none outline-none w-[240px]"
          />
        </div>

        <Button className="bg-[#046C42] hover:bg-[#046C42] hover:opacity-85 duration-300">
          Add Category
        </Button>
      </div>
      <Table className="mt-5 text-lg">
        <TableHeader className="bg-[#E6EFF5]">
          <TableRow>
            <TableHead className="uppercase text-[#718EBF]">
              Categories
            </TableHead>
            <TableHead className="uppercase text-[#718EBF]">
              Product Name
            </TableHead>
            <TableHead className="uppercase text-[#718EBF]">
              Indication
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((medicine) => (
            <TableRow key={medicine.id}>
              <TableCell className="font-medium">{medicine.id}</TableCell>
              <TableCell>{medicine.name}</TableCell>
              <TableCell>{medicine.category}</TableCell>
              <TableCell>{medicine.indication}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}

export default page;
