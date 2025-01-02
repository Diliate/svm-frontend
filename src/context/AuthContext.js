// context/AuthContext.js
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Load user from localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        // If login is successful, process the response
        const { user } = response.data;

        // Save user data and token to localStorage
        localStorage.setItem("user", JSON.stringify(user));

        setUser(user);
        toast.success("Logged in successfully!");
        router.push("/profile");
      }
    } catch (error) {
      toast.error("Error Logging User");
      console.log("Error Logging User: ", error);
    }
  };

  // Signup function
  const signup = async (name, email, password, mobile) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`,
        {
          name,
          email,
          password,
          mobile,
        }
      );

      const { user } = response.data;

      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);
      router.push("/profile");
    } catch (error) {
      console.error("Signup error", error);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        // router.push("/login");
        window.location.href = "/login";
        localStorage.removeItem("user");
        toast.success("Logout successfully");
      }
    } catch (error) {
      console.log("Error Loggin out user: ", error);
    }
  };

  // Update user in context and localStorage
  const updateUserInContext = (updatedUser) => {
    setUser(updatedUser); // Update state
    localStorage.setItem("user", JSON.stringify(updatedUser)); // Update localStorage
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, updateUserInContext, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook for using Auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
