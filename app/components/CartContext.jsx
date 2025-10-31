'use client';

import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const lastAddedProductRef = useRef(null);
  const isInitialMountRef = useRef(true);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('audiophile_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        // Silently handle localStorage error
      }
    }
    // Mark initial mount as complete after a short delay to ensure cart state has updated
    const timer = setTimeout(() => {
      isInitialMountRef.current = false;
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Save cart to localStorage whenever it changes AND show toast if product was added
  useEffect(() => {
    // Skip on initial mount (when loading from localStorage)
    if (isInitialMountRef.current) return;
    
    // Save to localStorage
    localStorage.setItem('audiophile_cart', JSON.stringify(cart));
    
    // Show toast if a product was just added (not from localStorage load)
    if (lastAddedProductRef.current) {
      const product = lastAddedProductRef.current;
      const cartItem = cart.find((item) => item.id === product.id);
      
      if (cartItem) {
        if (cartItem.quantity > 1) {
          // Item already in cart, increased quantity
          toast.success(`Added another ${product.name} to cart!`, {
            icon: '🛒',
          });
        } else {
          // New item added to cart
          toast.success(`${product.name} added to cart!`, {
            icon: '✅',
          });
        }
      }
      
      // Clear the ref after showing toast
      lastAddedProductRef.current = null;
    }
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      
      if (existingItem) {
        // Store product info for toast (after state update)
        lastAddedProductRef.current = product;
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      // Store product info for toast (after state update)
      lastAddedProductRef.current = product;
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('audiophile_cart');
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getShipping = () => {
    // Free shipping over $100, otherwise $50
    const subtotal = getSubtotal();
    return subtotal > 100 ? 0 : 50;
  };

  const getTax = () => {
    // 20% VAT
    return getSubtotal() * 0.2;
  };

  const getGrandTotal = () => {
    return getSubtotal() + getShipping() + getTax();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        setIsOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getSubtotal,
        getShipping,
        getTax,
        getGrandTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

