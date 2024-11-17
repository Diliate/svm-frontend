"use client";

import React, { useState, useEffect } from "react";
import { BsPlusSquare } from "react-icons/bs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

function Page() {
  const { user, updateUserInContext } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [open, setOpen] = useState(false); // State to manage dialog visibility

  // Fetch all addresses for the user
  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/addresses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAddresses(response.data); // API returns an array of addresses
    } catch (error) {
      console.error("Error fetching addresses:", error);
      // toast.error("Failed to fetch addresses.");
    }
  };

  const handleAddAddress = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/addresses",
        { area, city, state, zipCode },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Fetch the updated user data
      const response = await axios.get("http://localhost:5000/api/auth/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update user in context
      updateUserInContext(response.data);

      toast.success("Address added successfully!");
      setArea("");
      setCity("");
      setState("");
      setZipCode("");
      setOpen(false); // Close the dialog
    } catch (error) {
      console.error("Error adding address:", error);
      toast.error("Failed to add address.");
    }
  };

  const handleRemoveAddress = async (addressId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/addresses/${addressId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Fetch the updated user data
      const response = await axios.get("http://localhost:5000/api/auth/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update user in context
      updateUserInContext(response.data);

      toast.success("Address removed successfully!");
    } catch (error) {
      console.error("Error removing address:", error);
      toast.error("Failed to remove address.");
    }
  };

  // Fetch addresses on component mount
  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <section className="p-5">
      <div>
        <div className="flex justify-between">
          <h2 className="text-3xl font-medium">Your Address</h2>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 mt-5 place-items-center md:place-content-start md:grid-cols-3">
        {/* Add Address Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <div className="bg-[#F7F7F7] rounded-xl h-60 w-60 flex flex-col justify-center gap-10 items-center border-2 cursor-pointer">
              <BsPlusSquare size={50} />
              <h2 className="text-3xl font-medium">Add Address</h2>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Address</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <Input
                placeholder="Area"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full"
              />
              <Input
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full"
              />
              <Input
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full"
              />
              <Input
                placeholder="Zip Code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="w-full"
              />
            </div>
            <DialogFooter>
              <Button onClick={handleAddAddress}>Save Address</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Render Existing Addresses */}
        {addresses.map((address) => (
          <div
            key={address.id}
            className="bg-[#F7F7F7] rounded-xl h-60 w-60 gap-10 border-2"
          >
            <h2 className="w-full pb-1 text-3xl font-medium text-center bg-white border-b-2 rounded-t-xl">
              Address
            </h2>
            <div className="flex flex-col items-start justify-start p-2">
              <h2 className="text-2xl font-medium">{address.area}</h2>
              <p className="text-lg">
                {address.city}, {address.state}, {address.zipCode}
              </p>
            </div>
            <div className="flex items-center justify-start w-full gap-3 p-2">
              <button
                className="px-5 py-1 text-white duration-200 bg-red-600 rounded-full hover:opacity-85"
                onClick={() => handleRemoveAddress(address.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Page;
