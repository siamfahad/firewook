// app/Cart/page.js
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../CartContext";

const CartPage = () => {
  const {
    cartItems,
    handleQuantityChange,
    handleRemoveItem,
    handleClearCart,
  } = useCart();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.13;
  const total = subtotal + tax;

  return (
    <div className="bg-gray-900 text-gray-300 min-h-screen py-16 px-4 font-sans">
      <div className="container mx-auto max-w-4xl p-8 rounded-xl shadow-2xl bg-gray-800">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-red-400 mb-8 font-heading">
          Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-2xl text-gray-400 mb-4">Your cart is empty.</p>
            <Link href="/Menu" passHref>
              <button className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-6 rounded-full text-lg transition-colors duration-300 shadow-md">
                Start Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div>
            <ul className="space-y-6 mb-8">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center space-x-4 bg-gray-700 p-4 rounded-lg shadow-md"
                >
                  <div className="w-24 h-24 relative rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-red-400">
                      {item.name}
                    </h3>
                    <p className="text-gray-400">
                      Price: ${item.price.toFixed(2)}
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="text-gray-400 mr-2">Quantity:</span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                          className="bg-red-600 hover:bg-red-500 text-white p-1 rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold transition-colors duration-300"
                        >
                          -
                        </button>
                        <span className="text-lg font-bold w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                          className="bg-red-600 hover:bg-red-500 text-white p-1 rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold transition-colors duration-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-white mb-2">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-sm text-gray-400 hover:text-red-400 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="bg-gray-700 p-6 rounded-lg shadow-inner">
              <div className="flex justify-between text-lg mb-2">
                <span className="text-gray-400">Subtotal:</span>
                <span className="text-white font-semibold">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-lg mb-4">
                <span className="text-gray-400">Tax (13%):</span>
                <span className="text-white font-semibold">
                  ${tax.toFixed(2)}
                </span>
              </div>
              <div className="border-t border-gray-600 pt-4 flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span className="text-red-400">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-8">
              <Link href="/Menu" passHref>
                <button className="flex-1 text-center bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-full text-lg transition-colors duration-300">
                  Continue Shopping
                </button>
              </Link>
              <Link href="/checkout" passHref>
                <button className="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-6 rounded-full text-lg transition-colors duration-300 shadow-lg">
                  Proceed to Checkout
                </button>
              </Link>
            </div>

            <div className="text-center mt-4">
              <button
                onClick={handleClearCart}
                className="text-sm text-gray-500 hover:text-red-400 transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-4">
          <Link href="/orders" passHref>
            <button className="flex-1 text-center bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-full text-lg transition-colors duration-300">
              View Previous Orders
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
