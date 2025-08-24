// app/menu/page.js
"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// The Navbar import has been removed as it is already in the main layout file.
import { useCart } from '../CartContext';

const menuItems = [
  // --- Appetizers (10 items) ---
  {
    id: 1,
    category: "Appetizers",
    name: "Crispy Spring Rolls",
    description: "Hand-rolled with fresh vegetables and served with a sweet chili dipping sauce.",
    price: 6.99,
    image: "/menu-images/crispy-spring-rolls.jpg",
    isMeat: false,
    allergens: ["Wheat", "Soy"],
  },
  {
    id: 2,
    category: "Appetizers",
    name: "Pork & Chive Dumplings",
    description: "Steamed or pan-fried, filled with juicy pork and aromatic chives.",
    price: 8.50,
    image: "/menu-images/pork-chive-dumplings.jpg",
    isMeat: true,
    allergens: ["Wheat", "Soy"],
  },
  {
    id: 3,
    category: "Appetizers",
    name: "Szechuan Wontons",
    description: "Wontons in a spicy and numbing chili oil sauce, topped with crushed peanuts.",
    price: 9.00,
    image: "/menu-images/szechuan-wontons.jpg",
    isMeat: true,
    allergens: ["Wheat", "Soy", "Peanuts"],
  },
  {
    id: 4,
    category: "Appetizers",
    name: "Crab Rangoon",
    description: "Crispy wonton wrappers filled with cream cheese and imitation crab.",
    price: 7.50,
    image: "/menu-images/crab-rangoon.jpg",
    isMeat: false,
    allergens: ["Wheat", "Dairy", "Shellfish"],
  },
  {
    id: 5,
    category: "Appetizers",
    name: "Spicy Edamame",
    description: "Steamed soybeans tossed in a savory and spicy garlic chili sauce.",
    price: 5.99,
    image: "/menu-images/spicy-edamame.jpg",
    isMeat: false,
    allergens: ["Soy", "Sesame"],
  },
  {
    id: 6,
    category: "Appetizers",
    name: "Scallion Pancakes",
    description: "Crispy, flaky flatbread with scallions, served with a soy-vinegar dipping sauce.",
    price: 6.50,
    image: "/menu-images/scallion-pancakes.jpg",
    isMeat: false,
    allergens: ["Wheat", "Soy"],
  },
  {
    id: 7,
    category: "Appetizers",
    name: "Chicken Satay Skewers",
    description: "Grilled chicken skewers marinated in a special blend of spices, served with peanut sauce.",
    price: 10.00,
    image: "/menu-images/chicken-satay-skewers.jpg",
    isMeat: true,
    allergens: ["Soy", "Peanuts"],
  },
  {
    id: 8,
    category: "Appetizers",
    name: "Sesame Balls",
    description: "Sweet, fried sesame balls with a gooey red bean paste filling.",
    price: 5.00,
    image: "/menu-images/sesame-balls.jpg",
    isMeat: false,
    allergens: ["Sesame", "Wheat"],
  },
  {
    id: 9,
    category: "Appetizers",
    name: "Fried Wontons",
    description: "Golden and crispy wontons filled with a savory pork filling.",
    price: 7.99,
    image: "/menu-images/fried-wontons.jpg",
    isMeat: true,
    allergens: ["Wheat", "Soy"],
  },
  {
    id: 10,
    category: "Appetizers",
    name: "Shrimp Tempura",
    description: "Lightly battered and deep-fried shrimp, served with a tempura dipping sauce.",
    price: 12.00,
    image: "/menu-images/shrimp-tempura.jpg",
    isMeat: false,
    allergens: ["Shellfish", "Wheat"],
  },
  // --- Main Dishes (20 items) ---
  {
    id: 11,
    category: "Main Dishes",
    name: "Spicy Dragon Noodles",
    description: "Fiery noodles with a mix of premium meats and fresh vegetables, tossed in our signature spicy sauce.",
    price: 15.99,
    image: "/menu-images/spicy-dragon-noodles.jpg",
    isMeat: true,
    allergens: ["Wheat", "Soy", "Sesame"],
  },
  {
    id: 12,
    category: "Main Dishes",
    name: "Kung Pao Chicken",
    description: "Tender chicken stir-fried with peanuts, vegetables, and chili peppers in a savory, spicy sauce.",
    price: 14.50,
    image: "/menu-images/kung-pao-chicken.jpg",
    isMeat: true,
    allergens: ["Peanuts", "Soy"],
  },
  {
    id: 13,
    category: "Main Dishes",
    name: "Beef with Broccoli",
    description: "Succulent slices of beef and fresh broccoli florets in a rich, savory brown sauce.",
    price: 16.00,
    image: "/menu-images/beef-with-broccoli.jpg",
    isMeat: true,
    allergens: ["Soy"],
  },
  {
    id: 14,
    category: "Main Dishes",
    name: "Sweet and Sour Pork",
    description: "Crispy pork chunks tossed in a tangy and sweet sauce with pineapple and bell peppers.",
    price: 14.00,
    image: "/menu-images/sweet-sour-pork.jpg",
    isMeat: true,
    allergens: ["Wheat", "Soy"],
  },
  {
    id: 15,
    category: "Main Dishes",
    name: "General Tso's Chicken",
    description: "Crispy fried chicken pieces coated in a slightly sweet and spicy sauce.",
    price: 15.00,
    image: "/menu-images/general-tsos-chicken.jpg",
    isMeat: true,
    allergens: ["Wheat", "Soy", "Sesame"],
  },
  {
    id: 16,
    category: "Main Dishes",
    name: "Mapo Tofu",
    description: "Silken tofu and minced meat in a fiery Szechuan pepper sauce. A classic for a reason!",
    price: 13.50,
    image: "/menu-images/mapo-tofu.jpg",
    isMeat: true,
    allergens: ["Soy"],
  },
  {
    id: 17,
    category: "Main Dishes",
    name: "Mongolian Beef",
    description: "Tender slices of beef stir-fried with scallions and onions in a savory, slightly sweet sauce.",
    price: 16.50,
    image: "/menu-images/mongolian-beef.jpg",
    isMeat: true,
    allergens: ["Soy", "Wheat"],
  },
  {
    id: 18,
    category: "Main Dishes",
    name: "Shrimp with Lobster Sauce",
    description: "Succulent shrimp in a silky white sauce with fermented black beans and minced pork.",
    price: 18.00,
    image: "/menu-images/shrimp-lobster-sauce.jpg",
    isMeat: false,
    allergens: ["Shellfish", "Soy"],
  },
  {
    id: 19,
    category: "Main Dishes",
    name: "Hunan Chicken",
    description: "Spicy stir-fry with chicken and a variety of vegetables in a thick, dark sauce.",
    price: 14.50,
    image: "/menu-images/hunan-chicken.jpg",
    isMeat: true,
    allergens: ["Soy"],
  },
  {
    id: 20,
    category: "Main Dishes",
    name: "Orange Chicken",
    description: "Battered and fried chicken pieces tossed in a sweet, tangy, and slightly spicy orange glaze.",
    price: 15.00,
    image: "/menu-images/orange-chicken.jpg",
    isMeat: true,
    allergens: ["Wheat", "Soy"],
  },
  {
    id: 21,
    category: "Main Dishes",
    name: "Lemon Chicken",
    description: "Crispy chicken fillets drizzled with a sweet and zesty lemon sauce.",
    price: 14.50,
    image: "/menu-images/lemon-chicken.jpg",
    isMeat: true,
    allergens: ["Wheat"],
  },
  {
    id: 22,
    category: "Main Dishes",
    name: "Chicken with Garlic Sauce",
    description: "Stir-fried chicken and vegetables in a savory, spicy garlic sauce.",
    price: 14.00,
    image: "/menu-images/chicken-garlic-sauce.jpg",
    isMeat: true,
    allergens: ["Garlic", "Soy"],
  },
  {
    id: 23,
    category: "Main Dishes",
    name: "Crispy Duck",
    description: "A half duck, roasted to perfection with crispy skin, served with plum sauce.",
    price: 22.00,
    image: "/menu-images/crispy-duck.jpg",
    isMeat: true,
    allergens: ["Soy", "Wheat"],
  },
  {
    id: 24,
    category: "Main Dishes",
    name: "Shrimp Lo Mein",
    description: "Soft egg noodles stir-fried with succulent shrimp and fresh vegetables.",
    price: 16.50,
    image: "/menu-images/shrimp-lo-mein.jpg",
    isMeat: false,
    allergens: ["Wheat", "Soy", "Shellfish"],
  },
  {
    id: 25,
    category: "Main Dishes",
    name: "Vegetable Fried Rice",
    description: "Classic fried rice with peas, carrots, and onions, made with a vegetarian sauce.",
    price: 11.00,
    image: "/menu-images/vegetable-fried-rice.jpg",
    isMeat: false,
    allergens: ["Soy"],
  },
  {
    id: 26,
    category: "Main Dishes",
    name: "Beef & Vegetable Hot Pot",
    description: "A rich and savory beef hot pot with various vegetables, served with a side of rice.",
    price: 18.00,
    image: "/menu-images/beef-vegetable-hot-pot.jpg",
    isMeat: true,
    allergens: ["Soy"],
  },
  {
    id: 27,
    category: "Main Dishes",
    name: "Tofu with Mixed Vegetables",
    description: "Firm tofu stir-fried with a colorful mix of vegetables in a light sauce.",
    price: 12.50,
    image: "/menu-images/tofu-mixed-vegetables.jpg",
    isMeat: false,
    allergens: ["Soy"],
  },
  {
    id: 28,
    category: "Main Dishes",
    name: "Crispy Aromatic Duck",
    description: "Finely shredded crispy duck, served with hoisin sauce and thin pancakes.",
    price: 23.00,
    image: "/menu-images/crispy-aromatic-duck.jpg",
    isMeat: true,
    allergens: ["Wheat", "Soy"],
  },
  {
    id: 29,
    category: "Main Dishes",
    name: "Fish with Ginger and Scallions",
    description: "Steamed fish fillets with fresh ginger and scallions in a light soy sauce.",
    price: 19.50,
    image: "/menu-images/fish-ginger-scallions.jpg",
    isMeat: false,
    allergens: ["Fish", "Soy"],
  },
  {
    id: 30,
    category: "Main Dishes",
    name: "Stir-fried Eggplant",
    description: "Tender eggplant stir-fried with garlic and a hint of spice.",
    price: 13.00,
    image: "/menu-images/stir-fried-eggplant.jpg",
    isMeat: false,
    allergens: ["Soy"],
  },
  // --- Healthy Salads (10 items) ---
  {
    id: 31,
    category: "Healthy Salads",
    name: "Asian Sesame Salad",
    description: "Fresh greens, edamame, shredded carrots, and crispy wonton strips with a light sesame dressing.",
    price: 11.00,
    image: "/menu-images/asian-sesame-salad.jpg",
    isMeat: false,
    allergens: ["Soy", "Sesame", "Wheat"],
  },
  {
    id: 32,
    category: "Healthy Salads",
    name: "Cucumber & Scallion Salad",
    description: "Crunchy cucumber slices and scallions in a refreshing rice vinegar dressing.",
    price: 9.00,
    image: "/menu-images/cucumber-scallion-salad.jpg",
    isMeat: false,
    allergens: ["Soy"],
  },
  {
    id: 33,
    category: "Healthy Salads",
    name: "Spicy Tofu Salad",
    description: "Tofu cubes tossed with fresh cilantro, chili flakes, and a zesty lime dressing.",
    price: 10.00,
    image: "/menu-images/spicy-tofu-salad.jpg",
    isMeat: false,
    allergens: ["Soy"],
  },
  {
    id: 34,
    category: "Healthy Salads",
    name: "Chinese Chicken Salad",
    description: "Shredded chicken, crispy noodles, and vegetables with a flavorful ginger dressing.",
    price: 13.50,
    image: "/menu-images/chinese-chicken-salad.jpg",
    isMeat: true,
    allergens: ["Soy", "Wheat"],
  },
  {
    id: 35,
    category: "Healthy Salads",
    name: "Green Papaya Salad",
    description: "Refreshing green papaya, carrots, and peanuts in a tangy tamarind dressing.",
    price: 11.50,
    image: "/menu-images/green-papaya-salad.jpg",
    isMeat: false,
    allergens: ["Peanuts"],
  },
  {
    id: 36,
    category: "Healthy Salads",
    name: "Seaweed Salad",
    description: "Marinated seaweed with sesame oil and sesame seeds, a classic side dish.",
    price: 8.00,
    image: "/menu-images/seaweed-salad.jpg",
    isMeat: false,
    allergens: ["Sesame"],
  },
  {
    id: 37,
    category: "Healthy Salads",
    name: "Shrimp & Mango Salad",
    description: "Succulent shrimp and sweet mango chunks on a bed of greens with a light vinaigrette.",
    price: 14.00,
    image: "/menu-images/shrimp-mango-salad.jpg",
    isMeat: false,
    allergens: ["Shellfish"],
  },
  {
    id: 38,
    category: "Healthy Salads",
    name: "Cilantro & Peanut Slaw",
    description: "Crispy cabbage slaw with fresh cilantro and a savory peanut dressing.",
    price: 9.50,
    image: "/menu-images/cilantro-peanut-slaw.jpg",
    isMeat: false,
    allergens: ["Peanuts"],
  },
  {
    id: 39,
    category: "Healthy Salads",
    name: "Glass Noodle Salad",
    description: "Cool glass noodles with mixed vegetables in a light, refreshing dressing.",
    price: 10.50,
    image: "/menu-images/glass-noodle-salad.jpg",
    isMeat: false,
    allergens: ["Soy"],
  },
  {
    id: 40,
    category: "Healthy Salads",
    name: "Edamame & Corn Salad",
    description: "A simple, light salad of edamame, sweet corn, and red onions with a citrus dressing.",
    price: 8.50,
    image: "/menu-images/edamame-corn-salad.jpg",
    isMeat: false,
    allergens: ["Soy"],
  },
  // --- Desserts & Drinks (10 items) ---
  {
    id: 41,
    category: "Desserts",
    name: "Mango Sticky Rice",
    description: "A classic dessert with sweet coconut-infused sticky rice and fresh mango slices.",
    price: 7.00,
    image: "/menu-images/mango-sticky-rice.jpg",
    isMeat: false,
    allergens: ["Coconut"],
  },
  {
    id: 42,
    category: "Desserts",
    name: "Fried Banana with Honey",
    description: "Crispy fried banana slices drizzled with honey and sesame seeds.",
    price: 6.00,
    image: "/menu-images/fried-banana-honey.jpg",
    isMeat: false,
    allergens: ["Sesame"],
  },
  {
    id: 43,
    category: "Desserts",
    name: "Green Tea Ice Cream",
    description: "Rich and creamy green tea flavored ice cream, a refreshing end to any meal.",
    price: 5.50,
    image: "/menu-images/green-tea-ice-cream.jpg",
    isMeat: false,
    allergens: ["Dairy"],
  },
  {
    id: 44,
    category: "Desserts",
    name: "Coconut Mochi",
    description: "Chewy rice cakes with a sweet coconut filling.",
    price: 5.00,
    image: "/menu-images/coconut-mochi.jpg",
    isMeat: false,
    allergens: ["Coconut"],
  },
  {
    id: 45,
    category: "Desserts",
    name: "Lychee Jelly",
    description: "A light and fruity jelly dessert with sweet lychee fruit inside.",
    price: 4.50,
    image: "/menu-images/lychee-jelly.jpg",
    isMeat: false,
    allergens: [],
  },
  {
    id: 46,
    category: "Drinks",
    name: "Thai Iced Tea",
    description: "A rich and creamy Thai iced tea, a perfect complement to spicy food.",
    price: 7.00,
    image: "/menu-images/thai-iced-tea.jpg",
    isMeat: false,
    allergens: ["Dairy"],
  },
  {
    id: 47,
    category: "Drinks",
    name: "Bubble Milk Tea",
    description: "Classic milk tea with chewy tapioca pearls.",
    price: 6.50,
    image: "/menu-images/bubble-milk-tea.jpg",
    isMeat: false,
    allergens: ["Dairy"],
  },
  {
    id: 48,
    category: "Drinks",
    name: "Fresh Mango Smoothie",
    description: "A sweet and refreshing smoothie made with fresh mangoes.",
    price: 6.00,
    image: "/menu-images/fresh-mango-smoothie.jpg",
    isMeat: false,
    allergens: [],
  },
  {
    id: 49,
    category: "Drinks",
    name: "Jasmine Green Tea",
    description: "A light and fragrant green tea, brewed to perfection.",
    price: 3.50,
    image: "/menu-images/jasmine-green-tea.jpg",
    isMeat: false,
    allergens: [],
  },
  {
    id: 50,
    category: "Drinks",
    name: "Aloe Vera Juice",
    description: "A hydrating and refreshing drink with pieces of aloe vera.",
    price: 4.00,
    image: "/menu-images/aloe-vera-juice.jpg",
    isMeat: false,
    allergens: [],
  },
];

const categories = ["All", "Appetizers", "Main Dishes", "Healthy Salads", "Desserts", "Drinks"];

export default function MenuPage() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [quantity, setQuantity] = useState(1);
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(false);
  const [selectedMeat, setSelectedMeat] = useState(null);

  const { cartItems, addToCart } = useCart();

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setQuantity(1);
    setSelectedMeat(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const handleQuantityChange = (change) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + change));
  };

  const handleAddToCart = () => {
    if (selectedItem.isMeat && !selectedMeat) {
      return;
    }

    addToCart({
      ...selectedItem,
      meat: selectedMeat,
      quantity: quantity,
    });

    setShowLoadingAnimation(true);
    setTimeout(() => {
      setShowLoadingAnimation(false);
      handleCloseModal();
    }, 1500);
  };

  const filteredItems = selectedCategory === "All"
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="bg-gray-950 text-gray-200 min-h-screen py-20 px-4 md:px-8">
      {/* The Navbar component is removed from here to prevent duplication. */}
      <section className="text-center py-12">
        <h2 className="text-4xl md:text-5xl font-bold text-red-400 mb-6 font-heading">Our Menu 🍱</h2>
        <p className="text-gray-400 text-lg mb-10 font-body">
          Explore our delicious Firewook takeout dishes, made fresh to order.
        </p>
      </section>

      {/* Category Filter Navbar */}
      <div className="flex flex-wrap justify-center gap-4 mb-12 p-4 bg-gray-900 rounded-lg shadow-lg">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full font-semibold transition-colors duration-300 ${
              selectedCategory === category
                ? "bg-red-600 text-white"
                : "bg-gray-700 hover:bg-gray-600 text-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Single Menu Item Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
            onClick={() => handleItemClick(item)}
          >
            <div className="relative w-full h-48">
              <Image src={item.image} alt={item.name} fill className="object-cover" />
            </div>
            <div className="p-6">
              <h4 className="text-xl font-semibold text-white mb-2 font-heading">{item.name}</h4>
              <p className="text-gray-400 font-body">{item.description}</p>
              <p className="text-red-400 text-lg font-bold mt-4 font-body">${item.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Item Details Modal */}
      {showModal && selectedItem && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-lg relative shadow-2xl animate-fade-in">
            <button onClick={handleCloseModal} className="absolute top-4 right-4 text-gray-500 hover:text-red-400 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex flex-col items-center text-center">
              <h3 className="text-3xl font-bold text-red-400 mb-4 font-heading">{selectedItem.name}</h3>
              <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
                <Image src={selectedItem.image} alt={selectedItem.name} fill className="object-cover" />
              </div>
              <p className="text-gray-300 font-body mb-4">{selectedItem.description}</p>
              <p className="text-2xl font-bold text-red-400 mb-4 font-body">${selectedItem.price.toFixed(2)}</p>
              {/* Quantity Buttons */}
              <div className="flex items-center space-x-2 mb-4">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="bg-red-600 hover:bg-red-500 text-white p-1 rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold transition-colors duration-300"
                >
                  -
                </button>
                <span className="text-lg font-bold w-6 text-center">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="bg-red-600 hover:bg-red-500 text-white p-1 rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold transition-colors duration-300"
                >
                  +
                </button>
              </div>
              {/* Allergies Warning */}
              {selectedItem.allergens.length > 0 && (
                <div className="bg-yellow-900 p-2 rounded-lg text-sm text-yellow-300 mb-4 w-full">
                  <p className="font-semibold">Allergy Warning:</p>
                  <p>Contains: {selectedItem.allergens.join(", ")}</p>
                </div>
              )}
              {/* Meat Selection or Direct Add to Cart */}
              {selectedItem.isMeat ? (
                <div className="w-full">
                  <p className="text-gray-300 mb-2 font-body">Select your protein:</p>
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {["Chicken", "Beef", "Pork"].map((meat) => (
                      <button
                        key={meat}
                        onClick={() => setSelectedMeat(meat)}
                        className={`font-bold py-2 px-4 rounded transition-colors duration-300 ${
                          selectedMeat === meat ? "bg-red-600 text-white" : "bg-gray-700 hover:bg-red-600 text-white"
                        }`}
                      >
                        {meat}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
              <button
                onClick={handleAddToCart}
                className={`font-bold py-3 px-6 rounded-full transition-colors duration-300 w-full mt-4 ${
                  selectedItem.isMeat && !selectedMeat ? "bg-gray-600 cursor-not-allowed" : "bg-red-600 hover:bg-red-500 text-white"
                }`}
                disabled={selectedItem.isMeat && !selectedMeat}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Loading Animation */}
      {showLoadingAnimation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="text-6xl text-red-400 animate-pulse">
            🛒
          </div>
        </div>
      )}
    </div>
  );
}
