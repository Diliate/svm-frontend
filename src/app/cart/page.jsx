"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  updateCartItem,
  removeFromCart,
} from "@/lib/slices/cartSlice"; // Import Redux actions
import { useAuth } from "@/context/AuthContext";

function Page() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.cart); // Access cart state
  const { user } = useAuth();

  const userId = user?.id;

  console.log("USER ID IN CART: ", user.id);

  useEffect(() => {
    // Fetch cart data when the component is mounted
    dispatch(fetchCart(userId));
  }, [dispatch, userId]);

  const handleQuantityChange = (cartItemId, quantity) => {
    if (quantity > 0) {
      dispatch(updateCartItem({ cartItemId, quantity }));
    }
  };

  const handleRemoveItem = (cartItemId) => {
    dispatch(removeFromCart(cartItemId));
  };

  const calculateTotalPrice = () => {
    return items.reduce(
      (total, item) => total + item.product?.price * item.quantity,
      0
    );
  };

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
                <span className="text-[#866528]">Rs. 0.00</span>{" "}
                {/* Placeholder */}
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
              <button className="py-2 mt-5 text-xl font-medium text-white duration-200 bg-black hover:opacity-85">
                Proceed To Shipping
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
            <div className="flex justify-start">
              <button className="text-[#6BA2C2] text-2xl font-medium">
                Read Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;
