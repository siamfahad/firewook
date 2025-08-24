// app/components/ContactButton.js

"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactButton() {
  const [showModal, setShowModal] = useState(false);

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50 group">
        <button
          onClick={handleModalToggle}
          className="bg-red-600 text-white p-3 rounded-full shadow-lg transition-transform transform hover:scale-110 focus:outline-none"
          aria-label="Contact Us"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </button>
        <span className="absolute right-full mr-4 top-1/2 transform -translate-y-1/2 w-36 px-2 py-1 bg-gray-700 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          Have a concern?
        </span>
      </div>

      {/* Pop-up Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-[60] flex justify-center items-center p-4"
            onClick={handleModalToggle}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-gray-800 text-gray-300 p-8 rounded-lg shadow-xl max-w-sm w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleModalToggle}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-200 transition-colors"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <h3 className="text-2xl font-bold text-red-400 mb-4">
                Contact Us
              </h3>
              <p className="mb-4">
                For any concerns, please reach out to us:
              </p>
              <ul className="space-y-2 text-sm">
                <li>
                  <span className="font-semibold">Phone:</span> (780) 364-0343
                </li>
                <li>
                  <span className="font-semibold">Email:</span>
                  <a href="mailto:siamfahad58@gmail.com" className="text-red-400 hover:underline ml-1">
                    siamfahad58@gmail.com
                  </a>
                </li>
                <li>
                  <span className="font-semibold">Address:</span> 123 Cyber St, Toronto, ON
                </li>
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
