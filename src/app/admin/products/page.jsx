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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaAngleDown } from "react-icons/fa6";
import axios from "axios";
import toast from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";

function Page() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [inStock, setInStock] = useState(false);
  const [description, setDescription] = useState("");
  const [indications, setIndications] = useState("");
  const [precautions, setPrecautions] = useState("");
  const [punchline, setPunchline] = useState("");
  const [quantity, setQuantity] = useState("");
  const [dosage, setDosage] = useState("");
  const [image, setImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.log("Error fetching categories: ", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.log("Error fetching products: ", error);
    }
  };

  const handleAddProduct = async () => {
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
    if (image) formData.append("image", image);

    try {
      const endpoint = isEditing
        ? `http://localhost:5000/api/products/${editProductId}`
        : "http://localhost:5000/api/products";

      const method = isEditing ? "put" : "post";
      await axios[method](endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(`Product ${isEditing ? "updated" : "added"} successfully!`);

      // Refetch products to update table with full category details
      fetchProducts();
      clearForm();
    } catch (error) {
      toast.error(`Failed to ${isEditing ? "update" : "add"} product`);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
      toast.success("Product deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

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
  };

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
    setImage(null);
    setIsEditing(false);
    setEditProductId(null);
  };

  return (
    <section className="p-5">
      {/* Product Form */}
      <div className="flex flex-col md:flex-row md:items-center items-start md:w-[990px] w-auto gap-5 p-2 border-2 rounded-xl">
        {/* Form Fields */}
        <div className="flex flex-col gap-2">
          <div className="p-2 bg-white rounded-lg">
            <input
              placeholder="Enter Product Name"
              className="border-none outline-none w-[240px]"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div className="p-2 bg-white rounded-lg">
            <input
              type="number"
              placeholder="Enter Product Price"
              className="border-none outline-none w-[240px]"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
            />
          </div>

          <div className="p-2 bg-white rounded-lg">
            <input
              placeholder="Enter Description"
              className="border-none outline-none w-[240px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="p-2 bg-white rounded-lg">
            <input
              placeholder="Enter Indications"
              className="border-none outline-none w-[240px]"
              value={indications}
              onChange={(e) => setIndications(e.target.value)}
            />
          </div>

          <div className="p-2 bg-white rounded-lg">
            <input
              placeholder="Enter Precautions (comma-separated)"
              className="border-none outline-none w-[240px]"
              value={precautions}
              onChange={(e) => setPrecautions(e.target.value)}
            />
          </div>

          <div className="p-2 bg-white rounded-lg">
            <input
              placeholder="Enter Punchline"
              className="border-none outline-none w-[240px]"
              value={punchline}
              onChange={(e) => setPunchline(e.target.value)}
            />
          </div>

          <div className="p-2 bg-white rounded-lg">
            <input
              placeholder="Enter Quantity"
              className="border-none outline-none w-[240px]"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <div className="p-2 bg-white rounded-lg">
            <input
              placeholder="Enter Dosage"
              className="border-none outline-none w-[240px]"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
            />
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <span>{selectedCategory || "Select Category"}</span>
              <FaAngleDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[170px]">
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={selectedCategory}
              onValueChange={(value) => setSelectedCategory(value)}
            >
              {categories.map((category) => (
                <DropdownMenuRadioItem key={category.id} value={category.id}>
                  {category.name}
                </DropdownMenuRadioItem>
              ))}
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
            <DropdownMenuRadioGroup
              value={inStock.toString()}
              onValueChange={(value) => setInStock(value === "true")}
            >
              <DropdownMenuRadioItem value="true">True</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="false">False</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="p-2 bg-white rounded-lg ">
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="border-none outline-none w-[240px]"
          />
        </div>
        {/* Form fields as per your original form inputs */}

        {/* Buttons */}
        <Button
          onClick={handleAddProduct}
          className="bg-[#046C42] hover:bg-[#046C42] hover:opacity-85 duration-300"
        >
          {isEditing ? "Update Product" : "Add Product"}
        </Button>
        {isEditing && (
          <Button
            onClick={clearForm}
            className="duration-300 bg-gray-400 hover:bg-gray-500"
          >
            Cancel Edit
          </Button>
        )}
      </div>

      {/* Products Table */}
      <Table className="mt-5 text-lg">
        <TableHeader className="border-b-8 border-[#E6EFF5]">
          <TableRow>
            <TableHead>Sl. No.</TableHead>
            <TableHead>Product Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>In Stock</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={product.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category?.name}</TableCell>
              <TableCell>{product.inStock ? "Yes" : "No"}</TableCell>
              <TableCell>Rs. {product.price}</TableCell>
              <TableCell className="flex gap-3">
                <TbEdit
                  size={22}
                  onClick={() => handleEditProduct(product)}
                  className="cursor-pointer"
                  color="#046C42"
                />
                <RiDeleteBin6Line
                  size={22}
                  onClick={() => handleDeleteProduct(product.id)}
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

export default Page;
