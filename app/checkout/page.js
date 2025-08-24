"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../CartContext";
import { supabase } from "../../lib/supabaseClient";

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cartItems,
    handleClearCart,
    user: userFromCart,
    loading: cartLoading,
  } = useCart();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null); // Local state for user
  const [userLoading, setUserLoading] = useState(true); // Track auth loading

  // Effect to handle user session fetching
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setUserLoading(false);
    };

    fetchUser();

    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
        setUserLoading(false);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Subtotal & totals
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.13;
  const total = subtotal + tax;

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmOrder = async (e) => {
    e.preventDefault();

    if (!user) {
      setMessage("User not logged in. Please refresh or try again.");
      return;
    }

    setLoading(true);

    try {
      // Save order in DB
      const { error } = await supabase.from("orders").insert([
        {
          user_id: user.id,
          total_amount: total,
          status: "pending",
          items: cartItems, // Save cart JSON
        },
      ]);

      if (error) {
        console.error("Error saving order:", error);
        setMessage("There was an error saving your order. Please try again.");
        setLoading(false);
        return;
      }

      // Clear cart
      await handleClearCart();

      // Redirect to success page
      router.push("/success");
    } catch (err) {
      console.error("Unexpected error:", err);
      setMessage("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  // Loading state
  if (cartLoading || userLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p>Loading your cart and user data...</p>
      </div>
    );
  }

  // If NOT logged in → show LoginPage
  if (!user) {
    const LoginPage = require("../Login/page.js").default;
    return <LoginPage />;
  }

  // If cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
        <h1 className="text-3xl font-bold mb-4 text-red-400">Cart is Empty</h1>
        <p className="text-gray-400 mb-6">
          Please add items to your cart before checking out.
        </p>
        <button
          onClick={() => router.push("/Menu")}
          className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-6 rounded-full text-lg transition-colors duration-300"
        >
          Go to Menu
        </button>
      </div>
    );
  }

  // If order is being processed
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p>Processing your order...</p>
      </div>
    );
  }

  // Checkout form
  return (
    <div className="bg-gray-900 text-gray-300 min-h-screen py-16 px-4 font-sans">
      <div className="container mx-auto max-w-lg p-8 rounded-xl shadow-2xl bg-gray-800">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-red-400 mb-8 font-heading">
          Confirm Your Order
        </h1>

        {message && (
          <div className="bg-red-500 text-white text-center p-3 rounded-md mb-4">
            {message}
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Order Summary
          </h2>
          <ul className="space-y-2 mb-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between text-lg border-b border-gray-700 pb-2"
              >
                <span>
                  {item.name} x{item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between text-xl font-bold text-white pt-2 border-t border-gray-600">
            <span>Total:</span>
            <span className="text-red-400">${(total || 0).toFixed(2)}</span>
          </div>
        </div>

        <form onSubmit={handleConfirmOrder} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-gray-400 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-gray-400 mb-1"
            >
              Delivery Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              rows="3"
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-gray-400 mb-1"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-full text-lg transition-colors duration-300 shadow-lg mt-6"
          >
            Confirm Order
          </button>
        </form>
      </div>
    </div>
  );
}
