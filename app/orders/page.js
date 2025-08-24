"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";
import { useCart } from "../CartContext";

const OrdersPage = () => {
  const { cartItems } = useCart(); // kept in case cart is needed later

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchOrders = async (userId) => {
      if (!userId) {
        setOrders([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
      } else {
        setOrders(data);
      }
      setLoading(false);
    };

    // Listen for auth state changes
    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      fetchOrders(session?.user?.id);
    });

    // Initial check for a session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      fetchOrders(session?.user?.id);
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  // Show loading spinner/text
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p>Loading orders...</p>
      </div>
    );
  }

  // If not logged in → show LoginPage component inline
  if (!user) {
    const LoginPage = require("../Login/page.js").default;
    return <LoginPage />;
  }

  // If logged in and orders available
  return (
    <div className="bg-gray-900 text-gray-300 min-h-screen py-16 px-4 font-sans">
      <div className="container mx-auto max-w-4xl p-8 rounded-xl shadow-2xl bg-gray-800">
        <div className="flex justify-between items-center mb-8">
          <Link href="/">
            <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
              Back to Home
            </button>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-center text-red-400 font-heading">
            Previous Orders
          </h1>
          <div></div> {/* Spacer for alignment */}
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-2xl text-gray-400 mb-4">
              You have no previous orders.
            </p>
            <Link href="/Menu" passHref>
              <button className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-6 rounded-full text-lg transition-colors duration-300 shadow-md">
                Order Now
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-gray-700 p-6 rounded-lg shadow-md"
              >
                <div className="flex justify-between items-center mb-4 border-b border-gray-600 pb-4">
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      Order ID: {order.id}
                    </h2>
                    <p className="text-sm text-gray-400">
                      Date:{" "}
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`text-sm font-semibold px-3 py-1 rounded-full ${
                      order.status === "Delivered"
                        ? "bg-green-600 text-white"
                        : "bg-yellow-500 text-gray-900"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <ul className="space-y-2">
                  {order.items.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between text-gray-300"
                    >
                      <span>
                        {item.name} x{item.quantity}
                      </span>
                      <span>${item.price.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex justify-end">
                  <span className="text-lg font-bold text-red-400">
                    Total: ${order.total_amount.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
