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
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      // If login is successful, process the response
      const { token, user } = response.data;

      // Save user data and token to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);
      toast.success("Logged in successfully!");
      router.push("/profile");
    } catch (error) {
      // Handle login errors
      if (error.response) {
        console.error("Login error:", error.response.data.message);
        toast.error(error.response.data.message || "Failed to log in.");
      } else {
        console.error("Login error:", error.message);
        toast.error("Network error or server is down.");
      }
    }
  };

  // Signup function
  const signup = async (name, email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);
      router.push("/profile"); // redirect after signup
    } catch (error) {
      console.error("Signup error", error);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login"); // redirect to login page after logout
    toast.success("Logout successfully");
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
