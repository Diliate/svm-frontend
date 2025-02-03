// pages/shipment-tracking/[shipmentId].js

"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { trackShipment } from "@/services/shiprocketService";
import toast from "react-hot-toast";
import Image from "next/image";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";

function ShipmentTrackingPage() {
  const { shipmentId } = useParams();
  const router = useRouter();
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noActivities, setNoActivities] = useState(false);

  console.log("SHIPMENT ID: ", shipmentId);

  useEffect(() => {
    if (shipmentId) {
      setLoading(true);
      trackShipment(shipmentId)
        .then((res) => {
          if (
            res &&
            res[shipmentId] &&
            res[shipmentId].tracking_data &&
            res[shipmentId].tracking_data.error
          ) {
            if (
              res[shipmentId].tracking_data.error.includes(
                "no activities found"
              )
            ) {
              setNoActivities(true);
            } else {
              setError({
                message: res[shipmentId].tracking_data.error,
              });
            }
          } else {
            setTrackingInfo(res);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching tracking info:", err);
          toast.error("Unable to fetch tracking information.");
          setError(err);
          setLoading(false);
        });
    }
  }, [shipmentId]);

  if (loading) {
    return (
      <section className="p-5">
        <div className="container mx-auto">
          <p>Loading tracking information...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="p-5">
        <div className="container mx-auto">
          <div className="error-message">
            <p>
              There was an error loading your tracking information:{" "}
              {error.response?.data?.message || error.message}
            </p>
            <button
              onClick={() => router.back()}
              className="px-5 py-2 mt-4 text-lg font-medium text-white bg-green-600 rounded-full hover:opacity-85"
            >
              Go Back
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (noActivities) {
    return (
      <section className="p-5">
        <div className="container mx-auto">
          <div className="p-5 bg-yellow-100 rounded-xl">
            <h2 className="text-2xl font-medium">Shipment ID: {shipmentId}</h2>
            <p className="mt-2 text-lg text-yellow-700">
              Your shipment is being processed. Please check back later for
              updates.
            </p>
            <div className="mt-5">
              <button
                onClick={() => router.back()}
                className="px-5 py-2 text-lg font-medium text-white bg-green-600 rounded-full hover:opacity-85"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!trackingInfo) {
    return (
      <section className="p-5">
        <div className="container mx-auto">
          <p>No tracking information available.</p>
        </div>
      </section>
    );
  }

  // Extract relevant tracking data
  const trackingData = trackingInfo[shipmentId]?.tracking_data;

  // Determine the status steps based on trackingData
  const statusSteps = [
    { label: "Order Received", completed: trackingData?.shipment_status >= 1 },
    { label: "Shipped", completed: trackingData?.shipment_status >= 2 },
    { label: "In Transit", completed: trackingData?.shipment_status >= 3 },
    { label: "Delivered", completed: trackingData?.shipment_status >= 4 },
  ];

  return (
    <section className="p-5">
      {/* Order Details */}
      <div className="container mx-auto">
        {/* Shipment Tracking Section */}
        <div className="flex flex-col gap-5">
          {/* Order and Product Info */}
          <div className="flex flex-row justify-between gap-5">
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-medium md:text-3xl">
                Order Id: {trackingData?.order_id || "N/A"}
              </h2>
              <p className="text-lg md:text-xl text-zinc-600">
                Order placed on {trackingData?.order_date || "N/A"} <br />
                Paid by {trackingData?.payment_method || "N/A"}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src={trackingData?.product_image || "/product.png"}
                alt="product"
                width={100}
                height={100}
                className="border-2 rounded-xl"
              />
              <p className="mt-2 text-lg font-medium md:text-xl">
                {trackingData?.product_name || "Product Name"}
              </p>
            </div>
          </div>

          {/* Order Status Section */}
          <div className="mt-10">
            <div className="flex flex-col items-start space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
              {statusSteps.map((step, index) => (
                <React.Fragment key={index}>
                  <div className="flex items-center">
                    {step.completed ? (
                      <FaCheckCircle size={20} className="text-green-500" />
                    ) : (
                      <FaRegCircle size={20} className="text-gray-500" />
                    )}
                    <span
                      className={`ml-2 text-lg ${
                        step.completed ? "text-green-500" : "text-gray-500"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {index < statusSteps.length - 1 && (
                    <div
                      className={`flex-1 border-t-2 ${
                        statusSteps[index + 1].completed
                          ? "border-green-500"
                          : "border-gray-300"
                      }`}
                    ></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Payment and Delivery Information */}
          <div className="flex flex-col gap-5 mt-10 lg:flex-row">
            {/* Payment Details */}
            <div className="bg-[#F7F7F7] p-5 flex-1 rounded-xl">
              <div className="flex flex-col gap-5">
                <h2 className="text-2xl font-medium md:text-3xl">
                  Order Payment Details
                </h2>
                <div className="flex justify-between text-lg md:text-xl">
                  <span>Order Savings</span>
                  <span className="text-[#866528]">
                    Rs. {trackingData?.order_savings || "0.00"}
                  </span>
                </div>
                <div className="flex justify-between text-lg md:text-xl">
                  <span className="text-gray-500">Coupon Savings</span>
                  <span>Rs. {trackingData?.coupon_savings || "0.00"}</span>
                </div>
                <div className="flex justify-between text-lg md:text-xl">
                  <span className="text-gray-500">
                    Convenience Fee <br />
                    (Non-refundable)
                  </span>
                  <span>Rs. {trackingData?.convenience_fee || "0.00"}</span>
                </div>
                <div className="flex justify-between pt-2 text-lg font-bold border-t-2 border-black border-dashed md:text-xl">
                  <span>Order Total</span>
                  <span>Rs. {trackingData?.order_total || "0.00"}</span>
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="bg-[#F7F7F7] p-5 flex-1 h-auto rounded-xl">
              <div className="flex flex-col gap-5">
                <h2 className="text-2xl font-medium md:text-3xl">Deliver To</h2>
                <div className="flex flex-col text-lg md:text-xl">
                  <span className="font-bold">
                    {trackingData?.recipient_name || "Recipient Name"}
                  </span>
                  <span>
                    {trackingData?.delivery_address ||
                      "Delivery Address Not Available"}
                  </span>
                </div>
                <div className="flex justify-between pt-2 text-lg font-bold md:text-xl">
                  <span>Phone: {trackingData?.recipient_phone || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Tracking Details */}
      <div className="container mx-auto mt-10">
        <div className="p-5 bg-[#F7F7F7] rounded-xl">
          <h2 className="text-2xl font-medium">Shipment ID: {shipmentId}</h2>
          <p className="mt-2 text-lg">
            Current Status:{" "}
            <strong>
              {trackingData?.shipment_status === 0
                ? "Order Received"
                : trackingData?.shipment_status === 1
                ? "Shipped"
                : trackingData?.shipment_status === 2
                ? "In Transit"
                : "Delivered"}
            </strong>
          </p>
          <p className="mt-2 text-lg">
            Expected Delivery Date:{" "}
            <strong>{trackingData?.expected_delivery_date || "N/A"}</strong>
          </p>
          {trackingData?.track_url && (
            <p className="mt-2 text-lg">
              Track via Carrier:{" "}
              <a
                href={trackingData.track_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Click Here
              </a>
            </p>
          )}
          {/* Add more tracking details as needed */}
          <div className="mt-5">
            <button
              onClick={() => router.back()}
              className="px-5 py-2 text-lg font-medium text-white bg-green-600 rounded-full hover:opacity-85"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShipmentTrackingPage;
