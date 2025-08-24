'use client'

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) setMessage(error.message);
    else setMessage('Logged in ✅, refresh profile page');
  };

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) setMessage(error.message);
    else setMessage('Signed up ✅, check your email to confirm');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
      <div className="w-full max-w-sm mx-auto p-8 rounded-2xl shadow-2xl backdrop-blur-lg bg-white/10 border border-white/20">
        <h1 className="text-3xl font-extrabold text-white text-center mb-8">
          Welcome to <span className="text-red-500">Firewook</span>
        </h1>

        <div className="space-y-6">
          {/* Email Input */}
          <div className="relative">
            <input
              type="email"
              id="email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="peer w-full h-12 px-4 pt-5 text-white bg-white/20 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
            />
            <label
              htmlFor="email-input"
              className="absolute left-4 top-2 text-gray-400 text-sm transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm"
            >
              Email
            </label>
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type="password"
              id="password-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="peer w-full h-12 px-4 pt-5 text-white bg-white/20 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
            />
            <label
              htmlFor="password-input"
              className="absolute left-4 top-2 text-gray-400 text-sm transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm"
            >
              Password
            </label>
          </div>
        </div>

        <div className="flex flex-col space-y-4 mt-8">
          <button
            onClick={handleLogin}
            className="w-full h-12 py-2 px-4 rounded-xl text-white font-semibold transition-all duration-300 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
          >
            Login
          </button>
          <button
            onClick={handleSignup}
            className="w-full h-12 py-2 px-4 rounded-xl text-white font-semibold transition-all duration-300 bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900"
          >
            Signup
          </button>
        </div>

        {message && <p className="text-center text-sm text-gray-300 mt-6">{message}</p>}
      </div>
    </div>
  );
}
