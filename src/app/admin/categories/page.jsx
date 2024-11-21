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

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/categories");
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Add a new category
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

  // Start editing a category
  const startEditing = (id, name) => {
    setEditingId(id);
    setEditName(name);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingId(null);
    setEditName("");
  };

  // Update an existing category
  const updateCategory = async () => {
    if (!editName.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }
    try {
      await axios.put(`http://localhost:5000/api/categories/${editingId}`, {
        name: editName,
      });
      fetchCategories(); // Refresh categories
      setEditingId(null);
      setEditName("");
      toast.success("Category updated successfully!");
    } catch (error) {
      toast.error("Failed to update category");
    }
  };

  // Delete a category
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
      {/* Add Category Section */}
      <div className="flex items-center gap-3 mb-5">
        <input
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Enter Category Name"
          className="p-2 border rounded w-full max-w-[300px] focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <Button
          onClick={addCategory}
          className="text-white bg-green-800 hover:bg-green-700"
        >
          Add Category
        </Button>
      </div>

      {/* Categories Table */}
      <Table className="mt-5 text-lg">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Category Name</TableHead>
            <TableHead>Actions</TableHead>
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
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="text-sm text-white bg-blue-500 hover:bg-blue-600"
                    >
                      Save
                    </Button>
                    <Button
                      onClick={cancelEditing}
                      className="text-sm text-white bg-red-500 hover:bg-red-600"
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <TbEdit
                      size={20}
                      onClick={() => startEditing(category.id, category.name)}
                      className="text-blue-500 cursor-pointer"
                    />
                    <RiDeleteBin6Line
                      size={20}
                      onClick={() => deleteCategory(category.id)}
                      className="text-red-500 cursor-pointer"
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
