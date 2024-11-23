import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const ProductForm = ({
  categories,
  onSave,
  onClose,
  initialData = {}, // Default to an empty object
  isEditing = false,
}) => {
  const [formState, setFormState] = useState({
    name: "",
    price: "",
    indications: "",
    description: "",
    inStock: false,
    categoryId: "",
    precautions: "",
    punchline: "",
    quantity: "",
    dosage: "",
    featured: false,
    limitedOffer: false,
    discount: "",
    discountExpiry: "",
    ...initialData, // Override defaults with provided initialData
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    console.log("Form Field Change:", { [e.target.name]: e.target.value });
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    setFormState((prev) => ({ ...prev, [name]: fieldValue }));
  };

  const handleFileChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form's default submission behavior

    // Convert precautions to an array if provided as a comma-separated string
    const finalFormState = {
      ...formState,
      precautions: formState.precautions
        ? formState.precautions.split(",").map((item) => item.trim())
        : [],
    };

    onSave(finalFormState, images); // Call parent save handler
  };

  return (
    <form onSubmit={handleSubmit} className="h-[500px] overflow-y-auto">
      <input
        type="text"
        name="name"
        value={formState.name || ""}
        onChange={handleChange}
        placeholder="Name"
        className="w-full p-2 mb-3 border rounded"
      />
      <input
        type="number"
        name="price"
        value={formState.price || ""}
        onChange={handleChange}
        placeholder="Price"
        className="w-full p-2 mb-3 border rounded"
      />
      <textarea
        name="indications"
        value={formState.indications || ""}
        onChange={handleChange}
        placeholder="Indications"
        className="w-full p-2 mb-3 border rounded"
      />
      <textarea
        name="description"
        value={formState.description || ""}
        onChange={handleChange}
        placeholder="Description"
        className="w-full p-2 mb-3 border rounded"
      />
      <select
        name="categoryId"
        value={formState.categoryId || ""}
        onChange={handleChange}
        className="w-full p-2 mb-3 border rounded"
      >
        {categories.length === 0 ? (
          <option value="">No categories available</option>
        ) : (
          categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))
        )}
      </select>
      <textarea
        name="precautions"
        value={formState.precautions || ""}
        onChange={handleChange}
        placeholder="Precautions (comma-separated)"
        className="w-full p-2 mb-3 border rounded"
      />
      <input
        type="text"
        name="punchline"
        value={formState.punchline || ""}
        onChange={handleChange}
        placeholder="Punchline"
        className="w-full p-2 mb-3 border rounded"
      />
      <input
        type="text"
        name="quantity"
        value={formState.quantity || ""}
        onChange={handleChange}
        placeholder="Quantity"
        className="w-full p-2 mb-3 border rounded"
      />
      <input
        type="text"
        name="dosage"
        value={formState.dosage || ""}
        onChange={handleChange}
        placeholder="Dosage"
        className="w-full p-2 mb-3 border rounded"
      />
      <input
        type="checkbox"
        name="inStock"
        checked={formState.inStock || false}
        onChange={handleChange}
        className="mr-2"
      />
      In Stock
      <br />
      <input
        type="checkbox"
        name="featured"
        checked={formState.featured || false}
        onChange={handleChange}
        className="mr-2"
      />
      Featured
      <br />
      <input
        type="checkbox"
        name="limitedOffer"
        checked={formState.limitedOffer || false}
        onChange={handleChange}
        className="mr-2"
      />
      Limited Offer
      <br />
      <input
        type="number"
        name="discount"
        value={formState.discount || ""}
        onChange={handleChange}
        placeholder="Discount (%)"
        className="w-full p-2 mb-3 border rounded"
      />
      <input
        type="date"
        name="discountExpiry"
        value={formState.discountExpiry || ""}
        onChange={handleChange}
        className="w-full p-2 mb-3 border rounded"
      />
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="w-full p-2 mb-3 border rounded"
      />
      <Button type="submit" className="mt-3">
        {isEditing ? "Update Product" : "Add Product"}
      </Button>
      <Button onClick={onClose} className="mt-3" variant="outline">
        Cancel
      </Button>
    </form>
  );
};

export default ProductForm;
