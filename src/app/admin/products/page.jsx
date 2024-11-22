"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";
import toast from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import { FaPlus } from "react-icons/fa";

function Page() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  // Product States
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [inStock, setInStock] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [description, setDescription] = useState("");
  const [indications, setIndications] = useState("");
  const [precautions, setPrecautions] = useState("");
  const [punchline, setPunchline] = useState("");
  const [quantity, setQuantity] = useState("");
  const [dosage, setDosage] = useState("");
  const [images, setImages] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

  // Fetch products and categories on load
  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Add or Update Product
  const handleSaveProduct = async () => {
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("price", price);
    formData.append("inStock", inStock);
    formData.append("categoryId", selectedCategory);
    formData.append("description", description);
    formData.append("indications", indications);
    formData.append("precautions", precautions.split(","));
    formData.append("punchline", punchline);
    formData.append("quantity", quantity);
    formData.append("dosage", dosage);

    // Append multiple images
    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const endpoint = isEditing
        ? `http://localhost:5000/api/products/${editProductId}`
        : "http://localhost:5000/api/products";

      const method = isEditing ? "put" : "post";
      await axios[method](endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(`Product ${isEditing ? "updated" : "added"} successfully!`);
      fetchProducts(); // Refresh products
      clearForm();
      setModalOpen(false);
    } catch (error) {
      toast.error(`Failed to ${isEditing ? "update" : "add"} product`);
    }
  };

  // Delete a product
  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
      toast.success("Product deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  // Edit a product
  const handleEditProduct = (product) => {
    setProductName(product.name);
    setPrice(product.price);
    setSelectedCategory(product.categoryId);
    setInStock(product.inStock);
    setDescription(product.description);
    setIndications(product.indications);
    setPrecautions(product.precautions.join(","));
    setPunchline(product.punchline);
    setQuantity(product.quantity);
    setDosage(product.dosage);
    setEditProductId(product.id);
    setIsEditing(true);
    setModalOpen(true);
  };

  // Clear the form
  const clearForm = () => {
    setProductName("");
    setPrice(0);
    setSelectedCategory("");
    setInStock(false);
    setDescription("");
    setIndications("");
    setPrecautions("");
    setPunchline("");
    setQuantity("");
    setDosage("");
    setImages([]);
    setIsEditing(false);
    setEditProductId(null);
  };

  return (
    <section className="p-5">
      {/* Add Product Button */}
      <Button
        onClick={() => {
          clearForm();
          setModalOpen(true);
        }}
        className="flex items-center gap-1 text-lg font-semibold text-white transition-all bg-green-800 hover:bg-green-700"
      >
        <FaPlus className="mt-[3px]" /> Add Product
      </Button>

      {/* Modal for Add/Edit Product */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="h-[500px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Product" : "Add Product"}
            </DialogTitle>
          </DialogHeader>

          {/* Input Fields */}
          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full p-2 my-2 border rounded focus:outline-none focus:ring-2"
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            className="w-full p-2 my-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-[43px] p-2 my-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2"
          />
          <textarea
            placeholder="Indications"
            value={indications}
            onChange={(e) => setIndications(e.target.value)}
            className="w-full p-2 h-[43px] my-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2"
          />
          <textarea
            placeholder="Precautions (comma-separated)"
            value={precautions}
            onChange={(e) => setPrecautions(e.target.value)}
            className="w-full p-2 my-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 h-[43px]"
          />
          <input
            type="text"
            placeholder="Punchline"
            value={punchline}
            onChange={(e) => setPunchline(e.target.value)}
            className="w-full p-2 my-2 border rounded focus:outline-none focus:ring-2"
          />
          <input
            type="text"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full p-2 my-2 border rounded focus:outline-none focus:ring-2"
          />
          <input
            type="text"
            placeholder="Dosage"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            className="w-full p-2 my-2 border rounded focus:outline-none focus:ring-2"
          />

          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 my-2 border rounded"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {/* File Input */}
          <input
            type="file"
            multiple
            onChange={(e) => setImages(Array.from(e.target.files))}
            className="w-full p-2 my-2 border rounded"
          />

          <select
            value={inStock.toString()}
            onChange={(e) => setInStock(e.target.value === "true")}
            className="w-full p-2 my-2 border rounded focus:outline-none focus:ring-2"
          >
            <option value="true">In Stock</option>
            <option value="false">Out of Stock</option>
          </select>

          {/* Buttons */}
          <Button onClick={handleSaveProduct} className="mt-4">
            {isEditing ? "Update Product" : "Add Product"}
          </Button>
          <Button
            onClick={() => setModalOpen(false)}
            variant="outline"
            className="mt-4"
          >
            Cancel
          </Button>
        </DialogContent>
      </Dialog>

      {/* Product Table */}
      <Table className="mt-5">
        <TableHeader>
          <TableRow className="text-lg">
            <TableHead>Sl. No.</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-lg">
          {products.map((product, index) => (
            <TableRow key={product.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category?.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell className="flex items-center gap-2">
                <TbEdit
                  className="cursor-pointer"
                  color="green"
                  size={22}
                  onClick={() => handleEditProduct(product)}
                />
                <RiDeleteBin6Line
                  className="cursor-pointer"
                  color="red"
                  size={22}
                  onClick={() => handleDeleteProduct(product.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}

export default Page;
