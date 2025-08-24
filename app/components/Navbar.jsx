// app/components/Navbar.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from '../CartContext';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [authMessage, setAuthMessage] = useState("");
  const { cartItems } = useCart();
  
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      if (listener.subscription) {
        listener.subscription.unsubscribe();
      }
    };
  }, []);

  const handleLogin = async () => {
    setAuthMessage("");
    if (!email || !password) return setAuthMessage("Enter both email and password!");
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) setAuthMessage(error.message);
    else {
      setUser(data.user);
      setEmail("");
      setPassword("");
      setProfileDropdown(false);
    }
  };

  const handleSignup = async () => {
    setAuthMessage("");
    if (!email || !password) return setAuthMessage("Enter both email and password!");
    const { error, data } = await supabase.auth.signUp({
      email,
      password
    });
    if (error) setAuthMessage(error.message);
    else {
      setUser(data.user);
      setEmail("");
      setPassword("");
      setProfileDropdown(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfileDropdown(false);
  };

  const getInitial = (email) => {
    return email ? email[0].toUpperCase() : "";
  };

  const links = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/Menu" },
    { name: "About", href: "/About" },
  ];

  return (
    <header className="fixed w-full z-50">
      <nav className="flex justify-between items-center px-6 py-4 backdrop-blur-md bg-gray-950/50 border-b border-red-600 shadow-lg">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-red-400 animate-pulse">
          Firewook 🍜
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-300 font-mono tracking-wide relative group"
            >
              {link.name}
              <span className="absolute left-0 bottom-0 h-0.5 w-full bg-red-400 scale-x-0 transform transition-transform duration-300 group-hover:scale-x-100"></span>
            </Link>
          ))}

          {/* Cart */}
          <Link href="/Cart" className="relative flex items-center text-gray-300 hover:text-red-400 transition-colors">
            Cart
            {cartCount > 0 && (
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
              >
                {cartCount}
              </motion.span>
            )}
          </Link>

          {/* Profile/Login Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdown(!profileDropdown)}
              className="flex items-center text-gray-300 hover:text-red-400 transition-colors font-mono tracking-wide"
            >
              {user ? (
                <div className="flex items-center">
                  <span className="bg-red-600 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold mr-2">
                    {getInitial(user.email)}
                  </span>
                  Profile
                </div>
              ) : (
                "Login"
              )}
              <svg
                className="ml-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <AnimatePresence>
              {profileDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-64 bg-gray-900/80 backdrop-blur-lg border border-gray-700 rounded-lg shadow-lg py-4 z-50"
                >
                  {user ? (
                    <>
                      <Link href="/Profile" className="block px-4 py-2 text-gray-300 hover:bg-red-600 hover:text-white rounded-lg">
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-gray-300 hover:bg-red-600 hover:text-white rounded-lg"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <div className="px-4 space-y-2">
                      <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                      <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                      {authMessage && <p className="text-red-500 text-sm">{authMessage}</p>}
                      <button
                        onClick={handleLogin}
                        className="w-full py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold"
                      >
                        Login
                      </button>
                      <button
                        onClick={handleSignup}
                        className="w-full py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-semibold"
                      >
                        Signup
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col justify-center items-center h-8 w-8 text-red-400"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          <span className={`h-[2px] w-6 bg-red-400 mb-1 transition-transform ${mobileMenu ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`h-[2px] w-6 bg-red-400 mb-1 transition-opacity ${mobileMenu ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`h-[2px] w-6 bg-red-400 transition-transform ${mobileMenu ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>
      </nav>

      {/* Mobile Menu Slide-up */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed bottom-0 left-0 w-full h-screen bg-gray-950/90 backdrop-blur-md z-40 flex flex-col items-center justify-center space-y-6"
          >
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenu(false)}
                className="text-red-400 text-3xl font-bold hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}

            <Link href="/Cart" onClick={() => setMobileMenu(false)} className="text-red-400 text-3xl font-bold hover:text-white relative">
              Cart
              {cartCount > 0 && (
                <motion.span
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>

            {user ? (
              <>
                <Link href="/Profile" onClick={() => setMobileMenu(false)} className="text-red-400 text-3xl font-bold hover:text-white">
                  Dashboard
                </Link>
                <button
                  onClick={() => { handleLogout(); setMobileMenu(false); }}
                  className="text-red-400 text-3xl font-bold hover:text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center space-y-2">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button
                  onClick={() => { handleLogin(); setMobileMenu(false); }}
                  className="w-48 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold"
                >
                  Login
                </button>
                <button
                  onClick={() => { handleSignup(); setMobileMenu(false); }}
                  className="w-48 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-semibold"
                >
                  Signup
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}