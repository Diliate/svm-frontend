"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  updateCartItem,
  removeFromCart,
} from "@/lib/slices/cartSlice";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

import {
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "@/services/razorpayService";

function Page() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.cart); // Access cart state
  const { user } = useAuth();

  const userId = user?.id;
  const [isPaying, setIsPaying] = useState(false);

  useEffect(() => {
    // Fetch cart data on mount or when userId changes
    if (userId) {
      dispatch(fetchCart(userId));
    }
  }, [dispatch, userId]);

  const handleQuantityChange = (cartItemId, quantity) => {
    if (quantity > 0) {
      dispatch(updateCartItem({ cartItemId, quantity }));
    }
  };

  const handleRemoveItem = (cartItemId) => {
    dispatch(removeFromCart(cartItemId));
    toast.success(`Product removed from cart`);
  };

  const calculateTotalPrice = () => {
    return items.reduce(
      (total, item) => total + item.product?.price * item.quantity,
      0
    );
  };

  // ---- RAZORPAY INTEGRATION ----
  const handleRazorpayPayment = async () => {
    if (!user) {
      toast.error("Please login to continue.");
      return;
    }

    if (!items || items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    try {
      setIsPaying(true);

      // 1) Calculate final total in rupees
      const totalPrice = calculateTotalPrice();
      const deliveryFee = 99;
      const platformFee = 28;
      const finalAmount = totalPrice + deliveryFee + platformFee; // in Rupees

      // 2) Convert to paise
      const amountInPaise = finalAmount * 100;

      // 3) Create order on your Express backend
      const { order } = await createRazorpayOrder(
        amountInPaise,
        "INR",
        `receipt_${userId}_${Date.now()}`,
        userId
      );

      // 4) Initialize Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // from .env.local
        amount: order.amount,
        currency: order.currency,
        name: "My E-commerce Store",
        description: "Order Payment",
        order_id: order.id, // Razorpay order ID
        handler: async function (response) {
          // Called when payment is successful
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            response;

          // 5) Verify payment on the server
          const verifyRes = await verifyRazorpayPayment({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
          });

          if (verifyRes.status === "success") {
            toast.success("Payment verified successfully!");
            // Optionally clear cart, navigate to success page, etc.
          } else {
            toast.error("Payment verification failed.");
          }
        },
        prefill: {
          name: user.name || "",
          email: user.email || "",
          contact: user.mobile || "", // if you store user's phone
        },
        theme: {
          color: "#3399cc",
        },
      };

      // 6) Open the Razorpay popup
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
      setIsPaying(false);
    } catch (error) {
      console.error("Error in handleRazorpayPayment:", error);
      toast.error("Unable to process payment, please try again.");
      setIsPaying(false);
    }
  };
  // ---- END RAZORPAY INTEGRATION ----

  return (
    <section className="px-3 pt-24 pb-10 md:px-20">
      <div className="flex flex-col items-center justify-center gap-0 md:gap-10 md:flex-row">
        {/* Cart Items Section */}
        <div className="w-full h-auto md:h-screen md:w-1/2">
          <div className="flex justify-between px-2 mb-5">
            <h1 className="text-lg font-medium md:text-2xl">
              Shopping Cart <br className="block md:hidden" />({items?.length}{" "}
              items)
            </h1>
            <Link href={"/shop"}>
              <button className="flex items-center gap-1 text-[#6BA2C2] md:text-xl text-base">
                <FaPlus /> Add More Products
              </button>
            </Link>
          </div>
          <div className="p-3 border-2 rounded-2xl">
            <div className="flex justify-between pb-3 text-lg font-medium border-b-2 border-dashed md:text-xl">
              <span>Product</span>
              <span>Quantity</span>
              <span>Price</span>
              <span>Action</span>
            </div>
            {loading && <p>Loading cart items...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b-2 border-dashed"
              >
                {/* Product Image */}
                <div className="-ml-[55px] md:-ml-10">
                  <Image
                    src={item?.product?.imageUrls[0] || "/product.png"}
                    alt={item.product?.name}
                    width={150}
                    height={150}
                  />
                </div>
                {/* Quantity Controls */}
                <button className="flex items-center gap-2 px-2 md:-ml-10 -ml-5 bg-[#EBEBEB] rounded-full">
                  <FaMinus
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                  />
                  <span className="text-lg md:text-2xl">{item.quantity}</span>
                  <FaPlus
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                  />
                </button>
                {/* Price */}
                <span className="text-lg font-medium md:text-xl">
                  Rs. {item.product?.price * item.quantity}
                </span>
                {/* Remove Item */}
                <button
                  className="mr-0 md:mr-4"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <MdDelete color="red" size={32} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="md:w-[40%] w-full md:h-screen h-auto">
          <div className="bg-[#F7F7F7] p-5 mt-10">
            <div className="flex flex-col gap-5">
              <h2 className="text-3xl font-medium">Order Details</h2>
              <div className="flex justify-between text-xl">
                <span>Bag Total</span>
                <span>Rs. {calculateTotalPrice()}</span>
              </div>
              <div className="flex justify-between text-xl">
                <span>Bag Discount</span>
                <span className="text-[#866528]">Rs. 0.00</span>
              </div>
              <div className="flex justify-between text-xl">
                <span className="text-gray-500">Delivery Fee</span>
                <span>Rs. 99.00</span>
              </div>
              <div className="flex justify-between text-xl">
                <span className="text-gray-500">Platform Fee</span>
                <span>Rs. 28.00</span>
              </div>
              <div className="flex justify-between pt-2 text-xl font-bold border-t-2 border-black border-dashed">
                <span>Order Total</span>
                <span>Rs. {calculateTotalPrice() + 99 + 28}</span>
              </div>

              {/* Payment Button */}
              <button
                onClick={handleRazorpayPayment}
                disabled={!user || isPaying}
                className={`py-2 mt-5 text-xl font-medium text-white duration-200 bg-black hover:opacity-85 ${
                  (!user || isPaying) && "cursor-not-allowed opacity-70"
                }`}
              >
                {isPaying ? "Processing..." : "Pay Now"}
              </button>
            </div>
          </div>

          {/* Return/Refund Policy */}
          <div className="bg-[#F7F7F7] p-4 md:p-5 mt-10 flex flex-col gap-4">
            <h2 className="text-3xl font-medium">Return/Refund Policy</h2>
            <p>
              In case of return, we ensure quick refunds. Full amount will be
              refunded excluding Convenience Fee
            </p>
            <Link
              href={"/return-refund-policy"}
              target="_blank"
              className="flex justify-start"
            >
              <button className="text-[#6BA2C2] text-2xl font-medium">
                Read Policy
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;
