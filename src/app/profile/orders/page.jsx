"use client";

import React, { useEffect, useState, useRef } from "react";
import { getUserOrders } from "@/services/orderService";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { FaX } from "react-icons/fa6";
import { trackShipment, cancelShipment } from "@/services/shiprocketService"; // Import Shiprocket services
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"; // Import useRouter

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [tabIndex, setTabIndex] = useState(0); // 0 = Orders, 1 = Cancelled
  const [filter, setFilter] = useState("All"); // Default filter
  const tabRefs = useRef([]);
  const [tabWidth, setTabWidth] = useState(0);

  const router = useRouter();

  const tabs = ["Order", "Cancelled Order"];
  const filters = ["All", "Week", "Month", "Year"];

  useEffect(() => {
    if (user?.id) {
      // Determine the filter to send; exclude 'All'
      const appliedFilter = filter !== "All" ? filter.toLowerCase() : undefined;
      getUserOrders(user.id, appliedFilter)
        .then((res) => {
          // Assuming getUserOrders returns all orders based on filter
          setOrders(res);
        })
        .catch((err) => {
          console.error("Error fetching orders:", err);
          toast.error("Failed to fetch orders. Please try again later.");
        });
    }
  }, [user, filter]); // Re-fetch orders when user or filter changes

  // For the animated tab indicator
  useEffect(() => {
    if (tabRefs.current[tabIndex]) {
      setTabWidth(tabRefs.current[tabIndex].offsetWidth);
    }
  }, [tabIndex]);

  // Filter orders by status
  const paidOrders = orders.filter((o) => o.status === "PAID");
  const cancelledOrders = orders.filter((o) => o.status === "CANCELLED");

  /**
   * Handle Shipment Tracking
   * Redirects to the tracking page with shipmentId
   */
  const handleTrackShipment = (shipmentId) => {
    if (shipmentId) {
      router.push(`/profile/track/${shipmentId}`);
    } else {
      toast.error("No shipment ID available for tracking.");
    }
  };

  /**
   * Handle Shipment Cancellation
   */
  const handleCancelShipment = async (shipmentId) => {
    try {
      const cancellationResponse = await cancelShipment(shipmentId);
      // Update order status locally or refetch orders
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.shiprocketShipmentId === shipmentId
            ? { ...order, status: "CANCELLED" }
            : order
        )
      );
      toast.success("Shipment cancelled successfully.");
    } catch (error) {
      console.error("Error cancelling shipment:", error);
      toast.error("Unable to cancel shipment. Please try again later.");
    }
  };

  /**
   * Handle Filter Change
   * Resets to the first tab upon filter change for better UX
   */
  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
    setTabIndex(0); // Optionally reset to "Orders" tab
  };

  return (
    <section className="p-5">
      <h1 className="text-3xl font-medium md:text-4xl">Your Orders</h1>

      {/* Filter Controls */}
      <div className="flex items-center justify-end mt-4 space-x-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => handleFilterChange(f)}
            className={`px-4 py-2 rounded ${
              filter === f
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="relative mt-4">
        <div
          className={`absolute top-0 left-0 h-12 bg-green-600 transition-transform duration-300 ease-in-out rounded-full`}
          style={{
            width: `${tabWidth}px`,
            transform: `translateX(${
              tabRefs.current[tabIndex]?.offsetLeft ?? 0
            }px)`,
          }}
        />
        <div className="flex gap-2 pb-1 my-5 border-b-2">
          {tabs.map((label, index) => (
            <button
              key={index}
              ref={(el) => (tabRefs.current[index] = el)}
              onClick={() => setTabIndex(index)}
              className={`relative py-2 px-5 rounded-full text-xl duration-200 h-12 ${
                tabIndex === index ? "text-white" : "text-black"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {tabIndex === 0 && (
          <div className="flex flex-col gap-5">
            {paidOrders.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              paidOrders.map((order) => (
                <div
                  key={order.id}
                  className="overflow-hidden border-2 border-zinc-500 rounded-2xl"
                >
                  <div className="flex items-center justify-between w-full text-lg font-medium bg-[#F7F7F7] p-4">
                    <span>Order</span>
                    <span className="hidden text-blue-500 md:block">
                      Order Details
                    </span>
                    <span className="hidden md:block">Track</span>
                    <span className="hidden md:block">View Details</span>
                  </div>
                  <div className="flex items-center justify-between px-4 py-2 text-xl border-y-2 border-zinc-500">
                    {/* Display first item image or something */}
                    {order.items.length > 0 ? (
                      <div>
                        <div className="relative w-[100px] h-[100px]">
                          <Image
                            src={
                              order.items[0].product?.imageUrls?.[0] ||
                              "/product.png"
                            }
                            alt="product"
                            fill
                            objectFit="contain"
                            className="absolute"
                          />
                        </div>
                        <span className="block text-base md:hidden">
                          {order.items[0].product?.name}
                        </span>
                      </div>
                    ) : (
                      <p>No items</p>
                    )}
                    <span className="hidden md:block w-[135px]">
                      {order.items[0]?.product?.name}
                    </span>
                    <div className="">
                      <button
                        onClick={() =>
                          handleTrackShipment(order.shiprocketShipmentId)
                        }
                        className="hidden w-[150px] h-[35px] text-white duration-200 bg-green-600 rounded-full md:block hover:opacity-85"
                      >
                        Track Order
                      </button>
                    </div>
                    <div className="flex flex-col items-center justify-center md:hidden">
                      <button
                        onClick={() =>
                          handleTrackShipment(order.shiprocketShipmentId)
                        }
                        className="block px-5 py-1 mb-2 text-white duration-200 bg-green-600 border-2  rounded-full md:hidden hover:opacity-85 w-[150px]"
                      >
                        Track Order
                      </button>
                      <Link
                        href={`/order-confirmation/${order.orderId}`}
                        className="px-5 py-1 text-white duration-200 rounded-full bg-zinc-600 hover:opacity-85"
                      >
                        View
                      </Link>
                    </div>
                    <Link
                      href={`/order-confirmation/${order.orderId}`}
                      className="hidden px-5 py-1 text-white duration-200 rounded-full bg-zinc-600 hover:opacity-85 md:block"
                    >
                      View
                    </Link>
                  </div>
                  <h2 className="px-4 my-2 text-2xl font-medium">
                    Total Rs. {(order.amount / 100).toFixed(2)}
                  </h2>
                </div>
              ))
            )}
          </div>
        )}

        {tabIndex === 1 && (
          <div className="flex flex-col gap-5">
            {cancelledOrders.length === 0 ? (
              <p>No cancelled orders.</p>
            ) : (
              cancelledOrders.map((order) => (
                <div
                  key={order.id}
                  className="overflow-hidden border-2 border-zinc-500 rounded-2xl"
                >
                  <div className="flex items-center justify-between w-full text-lg font-medium bg-[#F7F7F7] p-4">
                    <span>Order</span>
                    <span className="hidden text-blue-500 md:block">
                      Order Details
                    </span>
                    <span>Order {order.orderId}</span>
                  </div>
                  <div className="flex items-center justify-between px-4 py-2 text-xl border-y-2 border-zinc-500">
                    {order.items.length > 0 ? (
                      <div>
                        <Image
                          src={
                            order.items[0].product?.imageUrls?.[0] ||
                            "/product.png"
                          }
                          alt="product"
                          height={150}
                          width={150}
                          className="-ml-10"
                        />
                        <span className="block text-base md:hidden">
                          {order.items[0].product?.name}
                        </span>
                      </div>
                    ) : (
                      <p>No items</p>
                    )}
                    <span className="hidden -ml-20 md:block">
                      {order.items[0]?.product?.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          handleCancelShipment(order.shiprocketShipmentId)
                        }
                        className="flex items-center gap-1 px-5 py-1 text-red-600 duration-200 rounded-full hover:opacity-85"
                      >
                        Cancelled <FaX />
                      </button>
                      {/* Optionally, allow re-ordering or viewing details */}
                      <Link
                        href={`/order-confirmation/${order.orderId}`}
                        className="px-5 py-1 text-white duration-200 rounded-full bg-zinc-600 hover:opacity-85"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                  <h2 className="px-4 my-2 text-2xl font-medium">
                    Total Rs. {(order.amount / 100).toFixed(2)}
                  </h2>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
}
