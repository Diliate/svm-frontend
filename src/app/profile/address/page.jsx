"use client";

import React, { useState, useEffect, useCallback } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Frontend Axios Configuration
const api = axios.create({
  baseURL: process.env.process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

function Page() {
  const { user, updateUserInContext } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [type, setType] = useState("HOME");
  const [defaultAddressId, setDefaultAddressId] = useState(null);
  const [open, setOpen] = useState(false); // State to manage dialog visibility
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all addresses for the user
  const fetchAddresses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/addresses");
      setAddresses(response.data.addresses || []);

      // Load default address ID from local storage
      const savedDefault = localStorage.getItem("defaultAddressId");
      if (savedDefault) {
        setDefaultAddressId(parseInt(savedDefault, 10));
      }
    } catch (err) {
      console.error("Error fetching addresses:", err);
      setError("Failed to fetch addresses.");
      toast.error("Failed to fetch addresses.");
    } finally {
      setLoading(false);
    }
  }, [api]);

  // Add a new address
  const handleAddAddress = useCallback(async () => {
    if (!area || !city || !state || !zipCode || !type) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await api.post("/addresses", { area, city, state, zipCode, type });

      // Optionally, fetch updated user data if necessary
      // const userResponse = await api.get("/auth/user");
      // updateUserInContext(userResponse.data);

      toast.success("Address added successfully!");
      // Reset form fields
      setArea("");
      setCity("");
      setState("");
      setZipCode("");
      setType("HOME");
      setOpen(false);
      fetchAddresses(); // Refresh addresses
    } catch (err) {
      console.error("Error adding address:", err);
      setError("Failed to add address.");
      toast.error("Failed to add address.");
    } finally {
      setLoading(false);
    }
  }, [area, city, state, zipCode, type, fetchAddresses, api]);

  // Remove an address
  const handleRemoveAddress = useCallback(
    async (addressId) => {
      const confirmDelete = window.confirm(
        "Are you sure you want to remove this address?"
      );
      if (!confirmDelete) return;

      setLoading(true);
      setError(null);
      try {
        await api.delete(`/addresses/${addressId}`);

        // Optionally, fetch updated user data if necessary
        // const userResponse = await api.get("/auth/user");
        // updateUserInContext(userResponse.data);

        toast.success("Address removed successfully!");

        // Clear default address if it was removed
        if (defaultAddressId === addressId) {
          setDefaultAddressId(null);
          localStorage.removeItem("defaultAddressId");
        }

        fetchAddresses(); // Refresh addresses
      } catch (err) {
        console.error("Error removing address:", err);
        setError("Failed to remove address.");
        toast.error("Failed to remove address.");
      } finally {
        setLoading(false);
      }
    },
    [defaultAddressId, fetchAddresses, api]
  );

  // Set default address
  const handleSetDefault = useCallback((addressId) => {
    setDefaultAddressId(addressId);
    localStorage.setItem("defaultAddressId", addressId);
    toast.success("Default address updated!");
  }, []);

  // Fetch addresses on component mount
  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  return (
    <section className="p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-medium">Your Addresses</h2>
        <Button
          variant="primary"
          onClick={() => setOpen(true)}
          className="flex items-center gap-2"
        >
          <BsPlusSquare size={20} />
          Add Address
        </Button>
      </div>

      {loading && (
        <div className="flex justify-center mt-5">
          <p>Loading...</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 mt-5 place-items-center md:place-content-start md:grid-cols-3">
        {/* Add Address Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Address</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 mt-4">
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
                type="number"
              />

              <Select value={type} onValueChange={setType} className="">
                <SelectTrigger>
                  <SelectValue placeholder="Select address type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HOME">Home</SelectItem>
                  <SelectItem value="OFFICE">Office</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter className="mt-4">
              <Button
                onClick={handleAddAddress}
                disabled={loading}
                className="w-full"
              >
                {loading ? "Saving..." : "Save Address"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Render Existing Addresses */}
        {addresses.length === 0 && !loading && (
          <p className="text-center col-span-full">No addresses found.</p>
        )}

        {addresses.map((address) => (
          <div
            key={address.id}
            className={`bg-[#F7F7F7] rounded-xl h-60 w-60 gap-10 border-2 ${
              defaultAddressId === address.id
                ? "border-green-600"
                : "border-gray-300"
            } flex flex-col justify-between p-4`}
          >
            <div>
              <h3 className="mb-2 text-xl font-semibold text-center">
                {defaultAddressId === address.id
                  ? "Default Address"
                  : "Address"}
              </h3>
              <div className="flex flex-col items-start justify-start">
                <p className="text-lg font-medium">{address.area}</p>
                <p className="text-md">
                  {address.city}, {address.state}, {address.zipCode}
                </p>
                <p className="px-2 py-1 mt-5 text-white bg-black rounded-full">
                  {address.type}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 -mt-5">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleSetDefault(address.id)}
                disabled={defaultAddressId === address.id}
              >
                {defaultAddressId === address.id ? "Default" : "Set Default"}
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleRemoveAddress(address.id)}
                disabled={loading}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Page;
