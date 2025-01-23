"use client";

import React, { useEffect, useState } from "react";
import { getOrderDetails } from "@/services/orderService";
import { trackShipment } from "@/services/shiprocketService";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

// Utility function to format dates
function formatDate(dateString) {
  if (!dateString) return "";
  const d = new Date(dateString);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function OrderConfirmationPage() {
  const { user } = useAuth();
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (orderId) {
      setLoading(true);
      getOrderDetails(orderId)
        .then((res) => {
          setOrder(res);
          // Fetch tracking info if we have a shiprocketShipmentId
          if (res.shiprocketShipmentId) {
            trackShipment(res.shiprocketShipmentId)
              .then((tracking) => setTrackingInfo(tracking))
              .catch((err) => console.error("Error tracking shipment:", err));
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching order details:", err);
          toast.error("Unable to fetch order details.");
          setError(err);
          setLoading(false);
        });
    }
  }, [orderId]);

  if (loading) {
    return <p className="p-5">Loading order details...</p>;
  }

  if (error) {
    return (
      <div className="p-5 text-red-600">
        <p>
          There was an error loading your order:{" "}
          {error.response?.data?.message || error.message}
        </p>
        <Link href="/shop">
          <button className="px-5 py-2 mt-4 text-lg font-medium text-white bg-green-600 rounded-full hover:opacity-85">
            Return to Shop
          </button>
        </Link>
      </div>
    );
  }

  if (!order) {
    return <p className="p-5">No order details found.</p>;
  }

  // For demo, we’ll treat order.createdAt as the “Ordered on” date
  // and check if there's any “deliveredAt” or “updatedAt” to display “Delivered on …”
  const orderedOn = formatDate(order.createdAt);
  const deliveredOn = formatDate(order.deliveredAt || order.updatedAt);

  return (
    <section className="min-h-screen p-5">
      <div className="container max-w-5xl mx-auto mt-16">
        {/* Breadcrumbs */}
        <nav className="mb-3 text-sm text-gray-500">
          <Link href={"/profile"} className="cursor-pointer hover:underline">
            Your Account
          </Link>
          <span> &gt; </span>
          <Link
            href={"/profile/orders"}
            className="cursor-pointer hover:underline"
          >
            Your Orders
          </Link>
          <span> &gt; </span>
          <span>Order Details</span>
        </nav>

        {/* Heading */}
        <h1 className="mb-5 text-2xl font-semibold md:text-3xl">
          Order Details
        </h1>

        {/* Order Info Row */}
        <div className="flex flex-col gap-2 pb-4 mb-5 border-b md:flex-row md:justify-between md:items-center">
          <div>
            <p className="text-sm text-gray-700 md:text-base">
              <strong>Ordered on:</strong> {orderedOn}
            </p>
            <p className="text-sm text-gray-700 md:text-base">
              <strong>Order Id:</strong> {order.orderId}
            </p>
          </div>
        </div>

        {/* Main content row with Shipping/Payment/Order Summary */}
        <div className="grid grid-cols-1 gap-5 mb-8 md:grid-cols-3 md:gap-8">
          {/* Shipping Address */}
          <div className="p-4 border rounded shadow-sm">
            <h2 className="mb-2 text-lg font-semibold">Shipping Address</h2>
            <p>{user?.name}</p>
            <p className="-mt-5 text-sm text-gray-700">
              {order.shippingAddress?.name} <br />
              {order.shippingAddress?.lastName &&
                `${order.shippingAddress.lastName}`}{" "}
              <br />
              {order.shippingAddress?.area}, {order.shippingAddress?.city}{" "}
              {order.shippingAddress?.zipCode}
              <br />
              {order.shippingAddress?.state}, {order.shippingAddress?.country}
            </p>
          </div>

          {/* Payment Method */}
          <div className="p-4 border rounded shadow-sm">
            <h2 className="mb-2 text-lg font-semibold">Payment Method</h2>
            <p className="text-sm text-gray-700">
              {order.paymentMethod || "N/A"}
            </p>
          </div>

          {/* Order Summary */}
          <div className="p-4 border rounded shadow-sm">
            <h2 className="mb-2 text-lg font-semibold">Order Summary</h2>
            <p className="text-sm text-gray-700">
              Item(s) Subtotal:{" "}
              <strong>
                ₹{(order.amount / 100 - (order.shippingFee || 0)).toFixed(2)}
              </strong>
            </p>
            <p className="text-sm text-gray-700">
              Shipping: <strong>₹{order.shippingFee || 0}</strong>
            </p>
            <p className="text-sm text-gray-700">
              Cash/Pay on Delivery fee: <strong>₹0</strong>
            </p>
            <p className="text-sm text-gray-700">
              <strong>Total: ₹{(order.amount / 100).toFixed(2)}</strong>
            </p>
            <p className="text-sm text-gray-700">
              <strong>Grand Total: ₹{(order.amount / 100).toFixed(2)}</strong>
            </p>
          </div>
        </div>

        {/* Delivery Status / Items */}
        <div className="pb-4 mb-5 border-b">
          <h2 className="mb-2 text-lg font-semibold">
            {deliveredOn ? `Delivered ${deliveredOn}` : "Shipment in progress"}
          </h2>
          {deliveredOn && (
            <p className="text-sm text-gray-700">
              Package was handed to resident
            </p>
          )}
        </div>

        {/* List of Items */}
        {order.items?.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-start gap-3 mb-5 md:flex-row md:items-center"
          >
            <div className="relative w-24 h-24 border rounded">
              <Image
                src={item.product?.imageUrls?.[0] || "/product.png"}
                alt={item.product?.name || "Product Image"}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <div>
              <p className="text-base font-medium md:text-lg">
                {item.product?.name || "Unnamed Product"}
              </p>
              <p className="text-sm text-gray-700 md:text-base">
                Quantity: {item.quantity}
              </p>
              <p className="text-sm text-gray-700 md:text-base">
                Price: ₹{(item.price * item.quantity).toFixed(2)} + delivery
                &amp; platform fee
              </p>
            </div>
          </div>
        ))}

        {/* (Optional) Shipment Tracking Info */}
        {/* {order.shiprocketShipmentId && (
          <div className="p-4 mb-8 rounded bg-gray-50">
            <h2 className="mb-2 text-lg font-semibold">Shipment Tracking</h2>
            {trackingInfo ? (
              <>
                <p className="text-sm text-gray-700 md:text-base">
                  <strong>Current Status:</strong> {trackingInfo.status}
                </p>
                <p className="text-sm text-gray-700 md:text-base">
                  <strong>Expected Delivery Date:</strong>{" "}
                  {trackingInfo.expected_delivery_date || "N/A"}
                </p>
              </>
            ) : (
              <p>Loading tracking information...</p>
            )}
          </div>
        )} */}

        {/* Continue Shopping */}
        <div className="mt-8">
          <Link href="/shop">
            <button className="px-5 py-2 text-sm font-medium text-white bg-green-600 rounded-full md:text-base hover:opacity-85">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default OrderConfirmationPage;
