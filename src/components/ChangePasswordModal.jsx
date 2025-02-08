// components/ChangePasswordModal.js

"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"; // Adjust the import path based on your shadcn setup
import { Button } from "@/components/ui/button"; // Adjust the import path based on your shadcn setup
import { Input } from "@/components/ui/input"; // Adjust the import path based on your shadcn setup
import Spinner from "@/components/ui/spinner"; // A spinner component for loading state
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

const ChangePasswordModal = () => {
  const { logout, updateUserInContext } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1); // Steps: 1 - Choose method, 2 - Fill form
  const [method, setMethod] = useState(null); // "currentPassword" or "otp"

  // Form states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  // Loading states
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setStep(1);
    setMethod(null);
    // Reset form states
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setEmail("");
    setOtp("");
  };

  const handleClose = () => {
    setIsOpen(false);
    setStep(1);
    setMethod(null);
    // Reset form states
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setEmail("");
    setOtp("");
  };

  const handleMethodSelection = (selectedMethod) => {
    setMethod(selectedMethod);
    setStep(2);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    // Basic validation
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/change-password`,
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Include cookies
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        handleClose();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error changing password.");
      console.error("Change Password Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestOTP = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required.");
      return;
    }

    setOtpLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/request-reset-otp`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setStep(3); // Proceed to enter OTP and new password
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error requesting OTP.");
      console.error("Request OTP Error:", error);
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!otp || !newPassword || !confirmPassword) {
      toast.error("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    setResetLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/reset-password-with-otp`,
        {
          email,
          otp,
          newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        handleClose();
        // Optionally, log the user out if you want them to log in with the new password
        await logout();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error resetting password.");
      console.error("Reset Password Error:", error);
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={handleOpen}>Change Password</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Choose how you&apos;d like to update your password.
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="flex flex-col gap-4 mt-4">
            <Button
              variant="outline"
              onClick={() => handleMethodSelection("currentPassword")}
            >
              Change via Current Password
            </Button>
            <Button
              variant="outline"
              onClick={() => handleMethodSelection("otp")}
            >
              Reset via OTP
            </Button>
          </div>
        )}

        {step === 2 && method === "currentPassword" && (
          <form
            onSubmit={handleChangePassword}
            className="flex flex-col gap-4 mt-4"
          >
            <Input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <div className="flex justify-end gap-4">
              <Button type="button" variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? <Spinner /> : "Change Password"}
              </Button>
            </div>
          </form>
        )}

        {step === 2 && method === "otp" && (
          <form
            onSubmit={handleRequestOTP}
            className="flex flex-col gap-4 mt-4"
          >
            <Input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="flex justify-end gap-4">
              <Button type="button" variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={otpLoading}>
                {otpLoading ? <Spinner /> : "Request OTP"}
              </Button>
            </div>
          </form>
        )}

        {step === 3 && method === "otp" && (
          <form
            onSubmit={handleResetPassword}
            className="flex flex-col gap-4 mt-4"
          >
            <Input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <div className="flex justify-end gap-4">
              <Button type="button" variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={resetLoading}>
                {resetLoading ? <Spinner /> : "Reset Password"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordModal;
