// app/success/page.js

import React from 'react';
import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="text-center p-8 rounded-xl shadow-2xl bg-gray-800 max-w-md mx-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-20 w-20 mx-auto text-green-500 mb-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        <h1 className="text-4xl font-bold text-red-400 mb-4">Order Confirmed!</h1>
        <p className="text-lg text-gray-400 mb-6">
          Thank you for your order. We have received your information and will prepare it shortly.
        </p>
        <Link href="/">
          <button className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-6 rounded-full text-lg transition-colors duration-300 shadow-md">
            Return to Home
          </button>
        </Link>
      </div>
    </div>
  );
}