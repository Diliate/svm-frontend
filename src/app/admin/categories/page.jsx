"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast from "react-hot-toast";

function Page() {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/categories");
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories: ", error);
    }
  };

  const addCategory = async () => {
    if (!categoryName.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/categories",
        { name: categoryName }
      );
      setCategories([...categories, data]);
      setCategoryName("");
      toast.success("Category added successfully!");
    } catch (error) {
      toast.error("Failed to add category");
    }
  };

  const startEditing = (id, name) => {
    setEditingId(id);
    setEditName(name);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditName("");
  };

  const updateCategory = async () => {
    if (!editName.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }
    try {
      await axios.put(`http://localhost:5000/api/categories/${editingId}`, {
        name: editName,
      });
      fetchCategories();
      setEditingId(null);
      setEditName("");
      toast.success("Category updated successfully!");
    } catch (error) {
      toast.error("Failed to update category");
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      setCategories(categories.filter((category) => category.id !== id));
      toast.success("Category deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };

  return (
    <section className="p-5">
      <div className="flex md:flex-row flex-col md:items-center items-start md:w-[415px] w-auto gap-5 p-2 border-2 rounded-xl">
        <div className="p-2 bg-white rounded-lg ">
          <input
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter Category Name"
            className="border-none outline-none w-[240px]"
          />
        </div>
        <Button
          onClick={addCategory}
          className="bg-[#046C42] hover:bg-[#046C42] hover:opacity-85 duration-300"
        >
          Add Category
        </Button>
      </div>
      <Table className="mt-5 text-lg">
        <TableHeader className="bg-[#E6EFF5]">
          <TableRow>
            <TableHead className="uppercase text-[#718EBF]">ID</TableHead>
            <TableHead className="uppercase text-[#718EBF]">
              Category Name
            </TableHead>
            <TableHead className="uppercase text-[#718EBF]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.id}</TableCell>
              <TableCell>
                {editingId === category.id ? (
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="p-1 border-2 border-gray-300 rounded"
                  />
                ) : (
                  category.name
                )}
              </TableCell>
              <TableCell className="flex items-center gap-3">
                {editingId === category.id ? (
                  <>
                    <Button
                      onClick={updateCategory}
                      className="text-xs bg-[#046C42] hover:bg-[#046C42] hover:opacity-85 duration-300"
                    >
                      Save
                    </Button>
                    <Button
                      onClick={cancelEditing}
                      className="text-xs duration-300 bg-red-600 hover:opacity-85"
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <TbEdit
                      size={22}
                      onClick={() => startEditing(category.id, category.name)}
                      className="cursor-pointer"
                      color="#046C42"
                    />
                    <RiDeleteBin6Line
                      size={22}
                      onClick={() => deleteCategory(category.id)}
                      className="cursor-pointer"
                      color="red"
                    />
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}

export default Page;
