'use client'

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({ full_name: '', phone: '', address: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUser(user);
      setLoading(false);
    };

    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // Fetch profile data
  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, phone, address')
        .eq('id', user.id)
        .single();

      if (data) setProfile(data);
      setLoading(false);
    };

    fetchProfile();
  }, [user]);

  const saveProfile = async () => {
    if (!user) return setMessage("No user logged in");
    setSaving(true);

    const { error } = await supabase
      .from('profiles')
      .upsert({ id: user.id, ...profile });

    if (error) setMessage(error.message);
    else setMessage("Profile saved successfully ✅");

    setSaving(false);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  // Skeleton loader while fetching
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-950">
        <motion.div 
          className="w-80 h-96 bg-gray-800 rounded-2xl animate-pulse"
        />
      </div>
    );
  }

  if (!user) return <div className="min-h-screen flex justify-center items-center text-xl font-semibold text-gray-400">You are not logged in.</div>;

  return (
    <div className="min-h-screen flex justify-center items-start pt-24 bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-950">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="bg-gray-900/60 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-2xl p-10 w-full max-w-lg flex flex-col items-center space-y-6"
      >
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
          className="w-32 h-32 rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center text-4xl font-bold text-white shadow-xl"
        >
          {profile.full_name ? profile.full_name[0].toUpperCase() : "U"}
        </motion.div>

        {/* Greeting */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-white text-center"
        >
          Welcome, {profile.full_name || "User"}!
        </motion.h1>

        {/* Inputs with floating labels */}
        <div className="w-full space-y-6">
          {[
            { label: "Full Name", key: "full_name" },
            { label: "Phone", key: "phone" },
            { label: "Address", key: "address" }
          ].map(({ label, key }, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * idx + 0.4 }}
              className="relative w-full"
            >
              <input
                type="text"
                value={profile[key]}
                onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
                placeholder=" "
                className="peer w-full px-4 py-3 rounded-xl bg-gray-800/50 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-transparent transition-all duration-300"
              />
              <label className="absolute left-4 top-3 text-gray-400 text-sm transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-red-400 peer-focus:text-sm">
                {label}
              </label>
            </motion.div>
          ))}
        </div>

        {/* Save Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={saveProfile}
          className={`w-full py-3 rounded-xl font-semibold text-white shadow-lg transition-colors ${
            saving ? "bg-gray-500 cursor-not-allowed" : "bg-gradient-to-r from-red-500 to-pink-500 hover:from-pink-500 hover:to-red-500"
          }`}
        >
          {saving ? "Saving..." : "Save Profile"}
        </motion.button>

        {/* Logout */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={logout}
          className="w-full py-3 rounded-xl font-semibold text-white shadow-lg bg-gray-700 hover:bg-gray-600 transition-colors"
        >
          Logout
        </motion.button>

        {/* Message */}
        <AnimatePresence>
          {message && (
            <motion.p
              key="msg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-green-400 font-medium mt-2 text-center"
            >
              {message}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
