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
    name: "Fem C",
    category: "Syrup",
    inStock: "true",
    price: 200,
  },
  {
    id: "2",
    name: "Cuff C",
    category: "Syrup",
    inStock: "true",
    price: 400,
  },
  {
    id: "3",
    name: "Fem C",
    category: "Syrup",
    inStock: "false",
    price: 200,
  },
  {
    id: "4",
    name: "Fem C",
    category: "Syrup",
    inStock: "false",
    price: 200,
  },
  {
    id: "5",
    name: "Nerv C",
    category: "Capsule",
    inStock: "true",
    price: 300,
  },
  {
    id: "6",
    name: "Medliliv - DS",
    category: "Syrup",
    inStock: "true",
    price: 500,
  },
  {
    id: "7",
    name: "Orthonova",
    category: "Oil",
    inStock: "false",
    price: 300,
  },
];

function page() {
  return (
    <section className="p-5">
      <div className="flex items-center w-[990px] gap-5 p-2 border-2 rounded-xl">
        <div className="p-2 bg-white rounded-lg ">
          <input
            placeholder="Enter Product Name"
            className="border-none outline-none w-[240px]"
          />
        </div>
        <div className="p-2 bg-white rounded-lg ">
          <input
            placeholder="Enter Product Price"
            className="border-none outline-none w-[240px]"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <span>Select Category</span>
              <FaAngleDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[170px]">
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup>
              <DropdownMenuRadioItem value="top">
                Category One
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="bottom">
                Category two
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="right">
                Category Three
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="right">
                Category Four
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <span>In Stock</span>
              <FaAngleDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[100px]">
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup>
              <DropdownMenuRadioItem value="top">True</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="bottom">
                False
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button className="bg-[#046C42] hover:bg-[#046C42] hover:opacity-85 duration-300">
          Add Product
        </Button>
      </div>
      <div className="flex gap-10 pb-1 mt-10 mb-2 text-lg border-b-2">
        <span className="font-medium cursor-pointer">All (1200)</span>
        <span className="cursor-pointer">Published (1120)</span>
        <span className="cursor-pointer">On Discount (542)</span>
        <span className="cursor-pointer">Draft (30)</span>
      </div>
      <Table className="mt-5 text-lg">
        <TableHeader className="border-b-8 border-[#E6EFF5]">
          <TableRow>
            <TableHead className="uppercase text-[#718EBF]">Sl. No.</TableHead>
            <TableHead className="uppercase text-[#718EBF]">
              Product Title
            </TableHead>
            <TableHead className="uppercase text-[#718EBF]">category</TableHead>
            <TableHead className="uppercase text-[#718EBF]">in stock</TableHead>
            <TableHead className="uppercase text-[#718EBF]">price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((medicine) => (
            <TableRow key={medicine.id}>
              <TableCell className="font-medium">{medicine.id}</TableCell>
              <TableCell>{medicine.name}</TableCell>
              <TableCell>{medicine.category}</TableCell>
              <TableCell>{medicine.inStock}</TableCell>
              <TableCell>Rs. {medicine.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}

export default page;
