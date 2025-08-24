"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// Featured dishes for the slideshow
const featuredDishes = [
  { id: 1, name: "Spicy Dragon Noodles", image: "/featured-dishes/spicy-dragon-noodles.jpg" },
  { id: 2, name: "Kung Pao Chicken", image: "/featured-dishes/kung-pao-chicken.jpg" },
  { id: 3, name: "Beef with Broccoli", image: "/featured-dishes/beef-with-broccoli.jpg" },
  { id: 4, name: "Sweet and Sour Pork", image: "/featured-dishes/sweet-sour-pork.jpg" },
  { id: 5, name: "General Tso's Chicken", image: "/featured-dishes/general-tsos-chicken.jpg" },
  { id: 6, name: "Mongolian Beef", image: "/featured-dishes/mongolian-beef.jpg" },
  { id: 7, name: "Shrimp Lo Mein", image: "/featured-dishes/shrimp-lo-mein.jpg" },
  { id: 8, name: "Orange Chicken", image: "/featured-dishes/orange-chicken.jpg" },
  { id: 9, name: "Crab Rangoon", image: "/featured-dishes/crab-rangoon.jpg" },
  { id: 10, name: "Crispy Spring Rolls", image: "/featured-dishes/crispy-spring-rolls.jpg" },
];

// Data for the new Our Story cards
const ourStoryCards = [
  {
    id: 1,
    title: "Passion for Flavor",
    shortDescription:
      "Driven by a deep love for authentic Chinese cuisine and innovative culinary techniques.",
    longDescription:
      "Our journey began with a simple yet profound desire: to share the electrifying and nuanced flavors of modern Chinese cooking with the vibrant community of Toronto. Every dish we craft is a testament to our unwavering passion for culinary excellence.",
    color: "#181e28",
  },
  {
    id: 2,
    title: "Fresh Ingredients",
    shortDescription:
      "Committed to sourcing the highest quality, freshest ingredients from local and international markets.",
    longDescription:
      "We believe that exceptional cuisine starts with exceptional ingredients. That's why we meticulously select the freshest produce, premium meats, and authentic spices, ensuring that every bite is bursting with natural flavor and goodness.",
    color: "#181e28",
  },
  {
    id: 3,
    title: "Fast & Convenient",
    shortDescription:
      "Delivering delicious and satisfying meals to your doorstep with speed and convenience.",
    longDescription:
      "In today's fast-paced world, we understand the need for convenience without compromising on quality. Our efficient takeout and delivery services are designed to bring the Firewook experience right to your home, quickly and with a smile.",
    color: "#181e28",
  },
];

// Testimonial Data
const testimonials = [
  {
    id: 1,
    username: "Sarah M.",
    rating: 5,
    text:
      "The Spicy Dragon Noodles were incredible! Perfect balance of flavor and heat. Best takeout I've had in ages.",
  },
  {
    id: 2,
    username: "John B.",
    rating: 4,
    text:
      "Fast delivery and the food was so fresh. The Kung Pao Chicken was packed with flavor. Highly recommend Firewook!",
  },
  {
    id: 3,
    username: "Emily K.",
    rating: 5,
    text:
      "Amazing food and great service. The online ordering was easy, and the food arrived hot and on time. Will definitely be ordering again.",
  },
  {
    id: 4,
    username: "Mike L.",
    rating: 5,
    text:
      "The orange chicken is out of this world! Crispy, juicy, and the sauce is a perfect blend of sweet and tangy.",
  },
  {
    id: 5,
    username: "Jessica R.",
    rating: 4,
    text:
      "Great vegetarian options! The vegetable lo mein was a delicious and satisfying meal. I'll be back for sure.",
  },
  {
    id: 6,
    username: "David T.",
    rating: 5,
    text:
      "I love the Beef with Broccoli here. The beef is tender and the broccoli is crisp. A classic done perfectly.",
  },
  {
    id: 7,
    username: "Olivia W.",
    rating: 5,
    text:
      "My go-to spot for Chinese food in Toronto. The quality is always consistent, and the food is always a treat.",
  },
  {
    id: 8,
    username: "Chris P.",
    rating: 4,
    text:
      "Ordered for a family gathering, and everyone was impressed. The variety and flavors were outstanding!",
  },
  {
    id: 9,
    username: "Nancy S.",
    rating: 5,
    text:
      "The Crab Rangoon is a must-try. So light and crispy. It's the perfect appetizer.",
  },
];

function StarRating({ rating }) {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <span
      key={index}
      className={`text-yellow-500 ${index < rating ? "fill-current" : "text-gray-600"}`}
    >
      ⭐
    </span>
  ));
  return <div className="flex items-center">{stars}</div>;
}

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Slideshow for Hero Section
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredDishes.length);
    }, 1000); // 1s per slide; adjust if you want slower
    return () => clearInterval(timer);
  }, []);

  // Preload hero images
  useEffect(() => {
    const imagesToLoad = featuredDishes.map((dish) => {
      return new Promise((resolve) => {
        const img = new window.Image();
        img.src = dish.image;
        img.onload = resolve;
        img.onerror = resolve;
      });
    });

    Promise.all(imagesToLoad).then(() => {
      setIsLoading(false);
    });
  }, []);

  // Slideshow for Testimonials Section
  useEffect(() => {
    const reviewTimer = setInterval(() => {
      setCurrentReviewIndex((prev) => (prev + 3) % testimonials.length);
    }, 5000); // Change every 5 seconds
    return () => clearInterval(reviewTimer);
  }, []);

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <main className="bg-gray-900 text-gray-300 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
        {/* Slideshow Background */}
        <div className="absolute inset-0 w-full h-full bg-slideshow">
          {isLoading ? (
            <div className="flex items-center justify-center w-full h-full">
              <div className="w-16 h-16 border-4 border-red-500 border-dashed rounded-full animate-spin"></div>
            </div>
          ) : (
            <AnimatePresence>
              {featuredDishes.map((dish, index) => (
                index === currentSlide && (
                  <motion.div
                    key={dish.id}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    style={{ y }}
                  >
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      sizes="100vw"
                      className="object-cover"
                      priority={index === 0}
                    />
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Overlay for darkening and text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-red-900 to-black opacity-80 z-0"></div>

        {/* Hero content */}
        <div className="container mx-auto text-center relative z-10">
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-red-400 mb-6 font-heading"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Firewook 🍜 Toronto
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-10 tracking-wide font-body"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Experience the electrifying flavors of modern Chinese cuisine in the heart of Ontario.
          </motion.p>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.6 }}
          >
            <Link
              href="/Menu"
              className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-6 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105"
            >
              Order Now
            </Link>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black opacity-50 z-0"></div>
      </section>

      {/* Restaurant Information Section without Images */}
      <section className="py-16 md:py-24 bg-black overflow-hidden">
        <div className="container mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-red-400 mb-8 font-heading">
            Our Story 🔥
          </h2>
        <p className="text-lg text-gray-300 font-body max-w-2xl mx-auto">
            More than just a restaurant, we are a culinary journey driven by passion, a commitment to fresh ingredients, and the desire to bring the vibrant flavors of modern Chinese cuisine to your table with speed and convenience.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 container mx-auto px-4">
          {ourStoryCards.map((card, index) => (
            <motion.div
              key={card.id}
              className="relative group rounded-xl overflow-hidden shadow-xl hover:scale-105 transition-transform duration-300 p-6 flex flex-col items-center text-center"
              style={{ backgroundColor: card.color }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-2xl font-semibold text-red-400 mb-2 font-heading">{card.title}</h3>
              <p className="text-gray-300 font-body text-lg mb-4">{card.shortDescription}</p>
              <motion.p
                className="text-gray-200 text-sm font-body px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                {card.longDescription}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section - Now a Slideshow */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-red-400 mb-8 font-heading">
            What Our Customers Say 👨‍🍳
          </h2>
          <div className="relative overflow-hidden w-full">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center items-stretch"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <AnimatePresence mode="popLayout">
                {testimonials
                  .slice(currentReviewIndex, currentReviewIndex + 3)
                  .map((review) => (
                    <motion.div
                      key={review.id}
                      className="bg-black p-6 rounded-md shadow-md border border-gray-800"
                      initial={{ x: 300, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -300, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    >
                      <div className="flex items-center mb-2">
                        <span className="text-gray-400 mr-2">👤</span>
                        <h4 className="text-lg font-semibold text-gray-300 mr-4">
                          {review.username}
                        </h4>
                        <StarRating rating={review.rating} />
                      </div>
                      {/* quotes escaped to satisfy ESLint */}
                      <p className="text-gray-300 italic mb-4 font-body">
                        &quot;{review.text}&quot;
                      </p>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 md:py-24 bg-gray-800 relative overflow-hidden">
        {/* background image container is absolute; section is relative */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <Image
            src="/wok-cooking.jpg"
            alt="Wok cooking background"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto text-center relative z-10 p-8 rounded-lg">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-red-400 mb-6 font-heading"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            Ready to Experience Firewook?
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-300 mb-8 font-body"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Browse our extensive menu and place your order for a delicious and satisfying meal.
          </motion.p>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.4 }}
          >
            <Link
              href="/Menu"
              className="bg-red-600 hover:bg-red-500 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105"
            >
              View Our Menu &amp; Order
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 text-center text-gray-400 text-sm">
        <div className="container mx-auto">
          <p className="font-body">
            &copy; {new Date().getFullYear()} Firewook Toronto. All rights reserved.
          </p>
          <p className="mt-2 font-body">123 Cyber Street, Toronto, Ontario, Canada</p>
          <p className="mt-2 font-body">Powered by Fahad Hasan Siam</p>
        </div>
      </footer>
    </main>
  );
}
