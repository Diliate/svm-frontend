// pages/shipment-tracking/[shipmentId].js

"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { trackShipment } from "@/services/shiprocketService";
import toast from "react-hot-toast";

function ShipmentTrackingPage() {
  const { shipmentId } = useParams();
  const router = useRouter();
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noActivities, setNoActivities] = useState(false);

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
    return <p>Loading tracking information...</p>;
  }

  if (error) {
    return (
      <div className="error-message">
        <p>
          There was an error loading your tracking information:{" "}
          {error.response?.data?.message || error.message}
        </p>
        <button
          onClick={() => router.back()}
          className="px-5 py-2 text-lg font-medium text-white bg-green-600 rounded-full hover:opacity-85"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (noActivities) {
    return (
      <div className="p-5 bg-yellow-100 rounded-xl">
        <h2 className="text-2xl font-medium">Shipment ID: {shipmentId}</h2>
        <p className="mt-2 text-lg text-yellow-700">
          Your shipment is being processed. Please check back later for updates.
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
    );
  }

  if (!trackingInfo) {
    return <p>No tracking information available.</p>;
  }

  // Extract relevant tracking data
  const trackingData = trackingInfo[shipmentId]?.tracking_data;

  return (
    <section className="p-5">
      <div className="container mx-auto">
        <h1 className="text-3xl font-medium md:text-4xl">Shipment Tracking</h1>
        <div className="mt-10">
          <div className="p-5 bg-[#F7F7F7] rounded-xl">
            <h2 className="text-2xl font-medium">Shipment ID: {shipmentId}</h2>
            <p className="mt-2 text-lg">
              Current Status:{" "}
              <strong>
                {trackingData?.shipment_status === 0
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
      </div>
    </section>
  );
}

export default ShipmentTrackingPage;
