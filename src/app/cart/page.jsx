"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useCallback } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "@/lib/slices/cartSlice";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

import {
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "@/services/razorpayService";
import { trackShipment, cancelShipment } from "@/services/shiprocketService"; // If needed
import { useRouter } from "next/navigation";
import api from "@/services/api";
import Cookies from "js-cookie";

function CheckoutPage() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.cart);
  const { user } = useAuth();

  const userId = user?.id;
  const [isPaying, setIsPaying] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isChecking, setIsChecking] = useState(true);
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setToken(Cookies.get("token"));

    if (!user && !token) {
      localStorage.removeItem("user");
      router.push("/login");
    } else {
      setIsChecking(false);
    }
  }, [user, router, token]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchCart(userId));
      fetchAddresses();
    }
  }, [dispatch, userId]);

  // Function to fetch saved addresses using the preconfigured Axios instance
  const fetchAddresses = useCallback(async () => {
    try {
      const response = await api.get("/addresses");
      setAddresses(response.data.addresses || []);

      // Optionally, set the first address as default if none is selected
      if (response.data.addresses && response.data.addresses.length > 0) {
        setSelectedAddressId(response.data.addresses[0].id);
        setSelectedAddress(response.data.addresses[0]);
      }
    } catch (err) {
      console.error("Error fetching addresses:", err);
      toast.error("Failed to fetch addresses.");
    }
  }, []);

  // Handler for selecting an address
  const handleSelectAddress = (addressId) => {
    const address = addresses.find((addr) => addr.id === addressId);
    setSelectedAddressId(addressId);
    setSelectedAddress(address);
  };

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
    if (!user && !token) {
      toast.error("Please login to continue.");
      return;
    }

    if (!items || items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    if (!selectedAddress) {
      toast.error("Please select a shipping address.");
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

      // 3) Generate a unique receipt ID
      const receipt = `receipt_${userId}_${Date.now()}`;

      // 4) Create order on your Express backend
      const { order, newOrder } = await createRazorpayOrder(
        amountInPaise,
        "INR",
        receipt,
        userId
      );

      // 5) Initialize Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // from .env.local
        amount: order.amount,
        currency: order.currency,
        name: "SVM Store",
        description: "Order Payment",
        order_id: order.id, // Razorpay order ID
        handler: async function (response) {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            response;

          try {
            // 6) Prepare cartItems array from your cart state
            const cartItemsArray = items.map((cartItem) => ({
              productId: cartItem.product.id, // Ensure productId is correct
              quantity: cartItem.quantity,
              price: cartItem.product.price, // Ensure price is correct
              productName: cartItem.product.name, // Ensure productName is provided
            }));

            // 7) Verify payment on the server
            const verifyRes = await verifyRazorpayPayment({
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
              userId: user.id,
              cartItems: cartItemsArray,
              amount: amountInPaise,
              currency: "INR",
              receipt,
              billing_customer_name: user.name || "Customer", // Use user's name
              billing_last_name: user.name.split(" ").slice(1).join(" ") || "",
              billing_address: selectedAddress.area,
              billing_city: selectedAddress.city,
              billing_pincode: selectedAddress.zipCode,
              billing_state: selectedAddress.state,
              billing_country: "India",
              billing_email: user.email || "",
              billing_phone: user.mobile || "",
              length: 30, // Example fixed value or fetch from product data
              breadth: 20,
              height: 15,
              weight: 2,
              addressId: selectedAddressId,
            });

            if (verifyRes.status === "success") {
              toast.success("Payment verified successfully!");
              // Redirect to order confirmation page
              router.push(`/order-confirmation/${verifyRes.order.orderId}`);
              // Optionally, clear the cart
              dispatch(clearCart(userId));
            } else if (verifyRes.status === "partial_success") {
              toast.warn(verifyRes.message);
              router.push(`/order-confirmation/${verifyRes.order.orderId}`);
            } else {
              toast.error("Payment verification failed.");
            }
          } catch (verifyError) {
            console.error("Payment verification error:", verifyError);
            // toast.error("Payment verification failed. Please contact support.");
          }
        },

        prefill: {
          name: user.name || "",
          email: user.email || "",
          contact: user.mobile || "", // Ensure it's in the correct format
        },
        theme: {
          color: "#3399cc",
        },
      };

      // 8) Open the Razorpay popup
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

  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-[#3A5B22] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section className="px-3 pt-24 pb-24 md:px-20 min-h-[140vh] h-auto ">
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
                className="flex items-center justify-between py-2 border-b-2 border-dashed"
              >
                {/* Product Image */}
                <div className=" relative w-[100px] h-[80px]">
                  <Image
                    src={item?.product?.imageUrls[0] || "/product.png"}
                    alt={item.product?.name || "product"}
                    fill
                    objectFit="cover"
                    className="absolute rounded-[10px]"
                  />
                </div>
                {/* Quantity Controls */}
                <div className="flex items-center gap-2 px-2 md:-ml-10 -ml-5 bg-[#EBEBEB] rounded-full">
                  <FaMinus
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                    className="cursor-pointer"
                  />
                  <span className="text-lg md:text-2xl">{item.quantity}</span>
                  <FaPlus
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                    className="cursor-pointer"
                  />
                </div>
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
          {/* Shipping Address Selection */}
          <div className="bg-[#F7F7F7] p-5 mt-10">
            <h2 className="text-2xl font-medium">Shipping Address</h2>
            <div className="mt-3">
              {addresses.length === 0 ? (
                <p>No saved addresses. Please add an address first.</p>
              ) : (
                <div className="flex flex-col gap-2">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className={`p-3 border rounded-lg ${
                        selectedAddressId === address.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-300"
                      } cursor-pointer`}
                      onClick={() => handleSelectAddress(address.id)}
                    >
                      <p className="font-semibold">{address.area}</p>
                      <p>
                        {address.city}, {address.state}, {address.zipCode}
                      </p>
                      <input
                        type="radio"
                        name="selectedAddress"
                        checked={selectedAddressId === address.id}
                        onChange={() => handleSelectAddress(address.id)}
                        className="mt-2"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Order Details */}
          <div className="bg-[#F7F7F7] p-5 mt-5">
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
                disabled={!user || isPaying || !selectedAddress}
                className={`py-2 mt-5 text-xl font-medium text-white duration-200 bg-black hover:opacity-85 ${
                  (!user || isPaying || !selectedAddress) &&
                  "cursor-not-allowed opacity-70"
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

export default CheckoutPage;
