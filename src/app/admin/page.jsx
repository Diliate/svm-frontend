import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { FaSearch } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";

const data = [
  {
    id: "1",
    name: "Victoria Perez",
    userId: "LA-0234",
    lorem: "Lorem Ispum",
    date: "30 April 2024",
  },
  {
    id: "2",
    name: "Victoria Perez",
    userId: "LA-0234",
    lorem: "Lorem Ispum",
    date: "30 April 2024",
  },
  {
    id: "3",
    name: "Victoria Perez",
    userId: "LA-0234",
    lorem: "Lorem Ispum",
    date: "30 April 2024",
  },
  {
    id: "4",
    name: "Victoria Perez",
    userId: "LA-0234",
    lorem: "Lorem Ispum",
    date: "30 April 2024",
  },
  {
    id: "5",
    name: "Victoria Perez",
    userId: "LA-0234",
    lorem: "Lorem Ispum",
    date: "30 April 2024",
  },
  {
    id: "6",
    name: "Victoria Perez",
    userId: "LA-0234",
    lorem: "Lorem Ispum",
    date: "30 April 2024",
  },
  {
    id: "7",
    name: "Victoria Perez",
    userId: "LA-0234",
    lorem: "Lorem Ispum",
    date: "30 April 2024",
  },
];

function page() {
  return (
    <section className="p-5">
      <div className="flex items-center gap-3 mb-5 md:gap-5">
        <div className="flex items-center gap-2 p-2 bg-white rounded-lg">
          <FaSearch />
          <input
            placeholder="Search"
            className="border-none outline-none md:w-[340px] w-[110px]"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <span>Sort By</span>
              <FaAngleDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-20">
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup>
              <DropdownMenuRadioItem value="top">One</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="bottom">two</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="right">Three</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Table className="text-lg md:w-full w-[180px]">
        <TableHeader className="bg-[#EFF4FA] text-[#8F9BB3] uppercase">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>User ID</TableHead>
            <TableHead className="hidden md:block">Lorem Ispum</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead className="hidden md:block">Lorem Ispum</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.userId}</TableCell>
              <TableCell>{user.lorem}</TableCell>
              <TableCell>{user.date}</TableCell>
              <TableCell>{user.lorem}</TableCell>
              <TableCell className="flex items-center gap-3">
                <IoMdCheckmarkCircleOutline
                  size={22}
                  className="cursor-pointer"
                  color="#046C42"
                />{" "}
                <RiDeleteBin6Line
                  size={22}
                  className="cursor-pointer"
                  color="red"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}

export default page;
