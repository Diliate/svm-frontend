"use client";

import React, { useState } from "react";
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
import toast from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import { FaPlus } from "react-icons/fa";
import { useProducts } from "@/hooks/useProduct";
import ProductForm from "@/components/ProductForm";
import {
  deleteProduct,
  fetchAllProducts,
  saveProduct,
} from "@/services/productService";

function Page() {
  const { products, setProducts, categories, loading } = useProducts();
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  console.log("Categories in Page Component:", categories);

  const handleSaveProduct = async (formState, images) => {
    console.log("Saving Product:", formState); // Log the save attempt

    const formData = new FormData();
    Object.keys(formState).forEach((key) =>
      formData.append(key, formState[key])
    );
    images.forEach((image) => formData.append("images", image));

    try {
      await saveProduct(formData, isEditing, currentProduct?.id);
      toast.success(`Product ${isEditing ? "updated" : "added"} successfully!`);
      setProducts(await fetchAllProducts());
      setModalOpen(false);
      setCurrentProduct(null);
    } catch (error) {
      toast.error(`Failed to ${isEditing ? "update" : "add"} product`);
      console.error("Save Product Error:", error.message);
    }
  };

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setIsEditing(true);
    setModalOpen(true);
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      toast.success("Product deleted successfully!");
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <section className="p-5">
      <Button onClick={() => setModalOpen(true)}>
        <FaPlus /> Add Product
      </Button>

      <Table className="text-lg">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category?.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>
                <TbEdit
                  onClick={() => handleEditProduct(product)}
                  className="cursor-pointer"
                  color="green"
                />
                <RiDeleteBin6Line
                  onClick={() => handleDeleteProduct(product.id)}
                  className="cursor-pointer"
                  color="red"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={modalOpen} onOpenChange={(isOpen) => setModalOpen(isOpen)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Product" : "Add Product"}
            </DialogTitle>
          </DialogHeader>
          <ProductForm
            categories={categories}
            onSave={handleSaveProduct}
            onClose={() => setModalOpen(false)}
            initialData={currentProduct}
            isEditing={isEditing}
          />
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default Page;
