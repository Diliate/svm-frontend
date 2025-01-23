"use client";

import React, { useEffect, useState } from "react";
import { getOrderDetails } from "@/services/orderService";
import { trackShipment } from "@/services/shiprocketService";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";

function OrderConfirmationPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("TRACKING INFO: ", trackingInfo);

  useEffect(() => {
    if (orderId) {
      setLoading(true);
      getOrderDetails(orderId)
        .then((res) => {
          setOrder(res);
          // Optionally, fetch tracking info
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
    return <p>Loading order details...</p>;
  }

  if (error) {
    return (
      <div className="error-message">
        <p>
          There was an error loading your order:{" "}
          {error.response?.data?.message || error.message}
        </p>
        <Link href="/shop">
          <button className="px-5 py-2 text-lg font-medium text-white bg-green-600 rounded-full hover:opacity-85">
            Return to Shop
          </button>
        </Link>
      </div>
    );
  }

  if (!order) {
    return <p>No order details found.</p>;
  }

  return (
    <section className="p-5 min-h-[500px]">
      <div className="container mx-auto min-h-[500px] flex flex-col items-center justify-center">
        <h1 className="mt-20 text-3xl font-medium md:text-4xl">
          Order Confirmation
        </h1>
        <div className="mt-10 w-[500px] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-5">
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-medium md:text-3xl">
              Thank you for your purchase!
            </h2>
            <div className="pt-2 pb-3 mt-3 border-y-2">
              <p className="text-lg md:text-xl">
                Your order <strong>{order.orderId}</strong> has been
                successfully placed.
              </p>
              <p className="text-lg md:text-xl">
                Order Total: <strong>Rs. {order.amount / 100}</strong>
              </p>
            </div>
          </div>

          {/* Order Details */}
          <div className="flex flex-col gap-5 mt-5">
            <h2 className="text-2xl font-medium md:text-3xl">Order Details</h2>
            <div className="flex flex-col gap-3">
              {order.items?.length > 0 ? (
                order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-5">
                    <Image
                      src={item.product?.imageUrls?.[0] || "/product.png"}
                      alt={item.product?.name || "Product Image"}
                      width={100}
                      height={200}
                      className="border-2 rounded-xl"
                    />
                    <div>
                      <h3 className="text-xl font-medium">
                        {item.product?.name || "Unnamed Product"}
                      </h3>
                      <p className="text-lg">Quantity: {item.quantity}</p>
                      <p className="text-lg">
                        Price: Rs. {item.price * item.quantity} {"("}+ delivery
                        &amp; platform fee charges{")"}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No items found in this order.</p>
              )}
            </div>
          </div>

          {/* Shipment Tracking */}
          {order.shiprocketShipmentId && (
            <div className="flex flex-col gap-5 mt-10">
              <h2 className="text-2xl font-medium md:text-3xl">
                Shipment Tracking
              </h2>
              {trackingInfo ? (
                <div className="p-5 bg-[#F7F7F7] rounded-xl">
                  <h3 className="text-xl font-medium">
                    Current Status: {trackingInfo.status}
                  </h3>
                  <p className="text-lg">
                    Expected Delivery Date:{" "}
                    {trackingInfo.expected_delivery_date || "N/A"}
                  </p>
                  {/* Add more tracking details as needed */}
                </div>
              ) : (
                <p>Loading tracking information...</p>
              )}
            </div>
          )}
        </div>
        {/* Continue Shopping */}
        <div className="mt-10">
          <Link href="/shop">
            <button className="px-5 py-2 text-lg font-medium text-white bg-green-600 rounded-full hover:opacity-85">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default OrderConfirmationPage;
