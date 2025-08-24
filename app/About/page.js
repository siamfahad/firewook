"use client";

import { useState, useEffect } from "react";
import { ChefHat, Flame, Sparkles, MapPin, Phone, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedin, FaGithub, FaWhatsapp } from "react-icons/fa";

const AboutPage = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  // staggered slide-out for social icons
  const iconList = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };
  const iconItem = {
    hidden: { x: -24, opacity: 0 },
    show: { x: 0, opacity: 1, transition: { duration: 0.45, ease: "easeOut" } },
  };

  return (
    <div className="bg-gray-950 text-gray-200 min-h-screen py-20 px-4 md:px-8 font-body">
      <AnimatePresence>
        {isMounted && (
          <div className="container mx-auto max-w-7xl">
            {/* Hero Section */}
            <motion.section
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              transition={{ duration: 0.8 }}
              className="text-center py-16 md:py-24 bg-gray-900 rounded-3xl shadow-2xl overflow-hidden relative mb-16"
            >
              <div
                className="absolute inset-0 z-0 opacity-20 backdrop-blur-sm"
                style={{
                  backgroundImage:
                    'url("/featured-dishes/ourjourney.jpg")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <div className="relative z-10 p-6 md:p-12">
                <motion.h1
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-5xl md:text-7xl font-bold text-white mb-4 font-heading drop-shadow-lg"
                >
                  Our Journey
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto drop-shadow"
                >
                  From a single, sizzling wok to your neighborhoods favorite
                  takeout spot. This is the journey of Firewook.
                </motion.p>
              </div>
            </motion.section>

            {/* Philosophy Section */}
            <section className="flex flex-col items-center mb-16">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={textVariants}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-center max-w-3xl"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-red-400 mb-4 font-heading">
                  <Flame className="inline-block h-8 w-8 mr-2 text-yellow-400 animate-pulse" />
                  Our Culinary Philosophy
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  At Firewook, our philosophy is simple: authentic flavors, fresh
                  ingredients, and the fiery art of the wok. We believe that great
                  food starts with a deep respect for tradition, but is perfected
                  with a modern touch. Every dish is a tribute to the vibrant street
                  food culture of Asia, meticulously crafted to bring an explosion
                  of taste and aroma to your home.
                </p>
                <p className="text-gray-400 text-base leading-relaxed">
                  We meticulously source our ingredients to ensure peak freshness
                  and quality, from the crisp vegetables to the succulent meats. Our
                  chefs are masters of their craft, each one trained in the
                  lightning-fast, high-heat cooking techniques that define true wok
                  cuisine. This is more than just food-its an experience.
                </p>
              </motion.div>
            </section>

            {/* Mission Section */}
            <motion.section
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              transition={{ duration: 0.8, delay: 1 }}
              className="bg-gray-800 rounded-3xl p-8 md:p-12 mb-16 shadow-2xl"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center font-heading">
                <Sparkles className="inline-block h-8 w-8 mr-2 text-cyan-400" />
                Our Mission & Promise
              </h2>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="p-4 bg-gray-700 rounded-xl shadow-inner transform transition-transform duration-300 hover:scale-105">
                  <ChefHat className="h-12 w-12 text-red-400 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold mb-2 text-red-200 font-heading">
                    Unmatched Quality
                  </h4>
                  <p className="text-sm text-gray-400">
                    We commit to using only the finest, freshest ingredients to
                    craft every meal. Your satisfaction is our top priority.
                  </p>
                </div>
                <div className="p-4 bg-gray-700 rounded-xl shadow-inner transform transition-transform duration-300 hover:scale-105">
                  <Flame className="h-12 w-12 text-red-400 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold mb-2 text-red-200 font-heading">
                    Authentic Flavors
                  </h4>
                  <p className="text-sm text-gray-400">
                    Our recipes are passed down through generations, ensuring you
                    get a true taste of traditional Chinese cuisine.
                  </p>
                </div>
                <div className="p-4 bg-gray-700 rounded-xl shadow-inner transform transition-transform duration-300 hover:scale-105">
                  <Sparkles className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold mb-2 text-red-200 font-heading">
                    Customer First
                  </h4>
                  <p className="text-sm text-gray-400">
                    From our kitchen to your door, we promise a seamless and
                    delightful experience every single time.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Founder Section */}
            <motion.section
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-red-400 mb-6 font-heading">
                Meet the Co-Founder
              </h2>

              {/* Keep your layout; convert icons to slide out of the same card */}
              <div className="relative flex items-center justify-center">
                {/* Founder Card */}
                <div className="w-full max-w-sm bg-gray-800 rounded-2xl p-6 shadow-xl transform transition-transform duration-300 hover:scale-105 relative">
                  <h3 className="text-xl font-semibold text-white mb-1 font-heading">
                    Fahad Hasan Siam
                  </h3>
                  <p className="text-sm text-red-300 mb-4">Co-Founder</p>
                  <p className="text-gray-400 text-sm italic">
                    Fahad Hasan Siam co-founded Firewook with a vision to bring
                    authentic, high-quality Chinese food to the community. His
                    dedication to culinary excellence and customer satisfaction is
                    at the core of our brand.
                  </p>

                  {/* Mobile-friendly icons (below card) */}
                  <motion.div
                    variants={iconList}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.4 }}
                    className="md:hidden flex justify-center gap-4 mt-5"
                  >
                    <motion.a
                      variants={iconItem}
                      href="https://www.linkedin.com/in/siam-fahad-hasan"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="p-3 rounded-xl bg-gray-700 text-gray-300 hover:text-cyan-400 hover:bg-gray-600 transition"
                    >
                      <FaLinkedin className="h-6 w-6" />
                    </motion.a>
                    <motion.a
                      variants={iconItem}
                      href="https://github.com/siamfahad"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className="p-3 rounded-xl bg-gray-700 text-gray-300 hover:text-cyan-400 hover:bg-gray-600 transition"
                    >
                      <FaGithub className="h-6 w-6" />
                    </motion.a>
                    <motion.a
                      variants={iconItem}
                      href="https://wa.me/7803640343"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp"
                      className="p-3 rounded-xl bg-gray-700 text-gray-300 hover:text-green-400 hover:bg-gray-600 transition"
                    >
                      <FaWhatsapp className="h-6 w-6" />
                    </motion.a>
                  </motion.div>

                  {/* Desktop: slide OUT from card edge */}
                  <motion.div
                    variants={iconList}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.4 }}
                    className="hidden md:flex flex-col gap-4 absolute top-1/2 right-[-72px] -translate-y-1/2"
                  >
                    <motion.a
                      variants={iconItem}
                      href="https://www.linkedin.com/in/fahadsiam"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="p-3 rounded-xl bg-gray-700 text-gray-300 hover:text-cyan-400 hover:bg-gray-600 transition shadow-md"
                    >
                      <FaLinkedin className="h-8 w-8" />
                    </motion.a>
                    <motion.a
                      variants={iconItem}
                      href="https://github.com/siamfahad"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className="p-3 rounded-xl bg-gray-700 text-gray-300 hover:text-cyan-400 hover:bg-gray-600 transition shadow-md"
                    >
                      <FaGithub className="h-8 w-8" />
                    </motion.a>
                    <motion.a
                      variants={iconItem}
                      href="https://wa.me/7803640343"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp"
                      className="p-3 rounded-xl bg-gray-700 text-gray-300 hover:text-green-400 hover:bg-gray-600 transition shadow-md"
                    >
                      <FaWhatsapp className="h-8 w-8" />
                    </motion.a>
                  </motion.div>
                </div>
              </div>
            </motion.section>

            {/* Contact Section */}
            <motion.section
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="bg-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-red-400 mb-6 font-heading">
                Visit Us or Say Hello
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center">
                  <MapPin className="h-10 w-10 text-red-400 mb-2" />
                  <p className="text-gray-300">
                    123 Cyber Street, Toronto, Ontario, Canada
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <Phone className="h-10 w-10 text-red-400 mb-2" />
                  <a
                    href="tel:7803640343"
                    className="text-gray-300 hover:text-red-300 transition-colors"
                  >
                    (780) 364-0343
                  </a>
                </div>
                <div className="flex flex-col items-center">
                  <Mail className="h-10 w-10 text-red-400 mb-2" />
                  <a
                    href="mailto:siamfahad58@gmail.com"
                    className="text-gray-300 hover:text-red-300 transition-colors"
                  >
                    siamfahad58@gmail.com
                  </a>
                </div>
              </div>
            </motion.section>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AboutPage;