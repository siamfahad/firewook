// app/CartContext.js
"use client";

import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../lib/supabaseClient';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); // Local state to manage user

  // This useEffect handles auth state changes to get the user
  useEffect(() => {
    const { data: { subscription: authListener } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    // Initial check for a session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  // This useEffect handles loading the cart, either from Supabase or localStorage
  useEffect(() => {
    const fetchAndLoadCart = async () => {
      setLoading(true);
      const localCart = JSON.parse(localStorage.getItem('guestCart') || '[]');

      if (user) {
        // If a user is logged in, fetch their cart from the database
        const { data, error } = await supabase
          .from('user_carts')
          .select('*')
          .eq('user_id', user.id);

        if (error) {
          console.error('Error fetching user cart:', error.message);
          setCartItems([]);
        } else {
          setCartItems(data || []);
        }
        // Clear local storage as we are now using the database cart
        localStorage.removeItem('guestCart');
      } else {
        // If no user is logged in, load the cart from local storage
        setCartItems(localCart);
      }
      setLoading(false);
    };

    fetchAndLoadCart();
  }, [user]);

  // This useEffect handles saving the guest cart to local storage whenever it changes.
  useEffect(() => {
    if (!user) {
      localStorage.setItem('guestCart', JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  const addToCart = async (item, quantity = 1) => {
    if (!item || !item.id) {
      console.warn("Attempted to add an item with a null or undefined ID. Operation aborted.");
      return;
    }
    // Correctly check for an existing item using item_id
    const existingItem = cartItems.find((cartItem) => cartItem.item_id === item.id);
    let updatedCart;

    if (user) {
      if (existingItem) {
        // Update item quantity in the database
        const newQuantity = existingItem.quantity + quantity;
        const { error } = await supabase
          .from('user_carts')
          .update({ quantity: newQuantity })
          .eq('user_id', user.id)
          // Use the Supabase primary key 'id' to update the row
          .eq('id', existingItem.id);

        if (error) {
          console.error('Error updating cart item quantity:', error.message);
        } else {
          updatedCart = cartItems.map((cartItem) =>
            cartItem.id === existingItem.id ? { ...cartItem, quantity: newQuantity } : cartItem
          );
          setCartItems(updatedCart);
        }
      } else {
        // Add new item to the database
        const { data, error } = await supabase
          .from('user_carts')
          .insert({
            user_id: user.id,
            // The fix: Ensure item.id is mapped to the 'item_id' column
            item_id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: quantity,
          }).select().single();

        if (error) {
          console.error('Error adding new cart item:', error.message);
        } else {
          updatedCart = [...cartItems, data];
          setCartItems(updatedCart);
        }
      }
    } else {
      // Logic for guest users (local storage)
      if (existingItem) {
        updatedCart = cartItems.map((cartItem) =>
          // The fix: Use item.id consistently for guest cart
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + quantity } : cartItem
        );
      } else {
        // The fix: Store a new item with item_id for guest users to be consistent with logged-in users.
        updatedCart = [...cartItems, { ...item, item_id: item.id, quantity }];
      }
      setCartItems(updatedCart);
    }
  };

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem(itemId);
      return;
    }

    const updatedCart = cartItems.map((item) =>
      item.item_id === itemId ? { ...item, quantity: newQuantity } : item
    );

    if (user) {
      // Find the Supabase internal ID from the item ID to update the correct row
      const itemToUpdate = cartItems.find(item => item.item_id === itemId);
      if (!itemToUpdate) return;
      
      const { error } = await supabase
        .from('user_carts')
        .update({ quantity: newQuantity })
        .eq('user_id', user.id)
        .eq('id', itemToUpdate.id);

      if (error) {
        console.error('Error updating quantity:', error.message);
      } else {
        setCartItems(updatedCart);
      }
    } else {
      // The fix: Update quantity for guest users using item.id
      const guestUpdatedCart = cartItems.map(cartItem =>
        cartItem.id === itemId ? { ...cartItem, quantity: newQuantity } : cartItem
      );
      setCartItems(guestUpdatedCart);
    }
  };

  const handleRemoveItem = async (itemId) => {
    const updatedCart = cartItems.filter((item) => item.item_id !== itemId);

    if (user) {
      // Find the Supabase internal ID from the item ID to delete the correct row
      const itemToRemove = cartItems.find(item => item.item_id === itemId);
      if (!itemToRemove) return;
      
      const { error } = await supabase
        .from('user_carts')
        .delete()
        .eq('user_id', user.id)
        .eq('id', itemToRemove.id);

      if (error) {
        console.error('Error removing item:', error.message);
      } else {
        setCartItems(updatedCart);
      }
    } else {
      // The fix: Remove item for guest users using item.id
      const guestUpdatedCart = cartItems.filter(cartItem => cartItem.id !== itemId);
      setCartItems(guestUpdatedCart);
    }
  };

  const handleClearCart = async () => {
    if (user) {
      // Clear cart in the database
      const { error } = await supabase
        .from('user_carts')
        .delete()
        .eq('user_id', user.id);

      if (error) {
        console.error('Error clearing cart:', error.message);
      } else {
        setCartItems([]);
      }
    } else {
      // Clear local storage cart
      setCartItems([]);
    }
  };

  const value = {
    cartItems,
    handleQuantityChange,
    handleRemoveItem,
    handleClearCart,
    addToCart,
    loading,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
