import React, { createContext, useState, useReducer } from "react";

// Create Context
export const AppContext = createContext();

// Reducer for cart
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, action.payload];
    case 'REMOVE_FROM_CART':
      return state.filter(item => item.id !== action.payload);
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
};

// Provider Component
export const AppProvider = ({ children }) => {
  // Theme Toggle (useState)
  const [theme, setTheme] = useState('light');

  // Cart Management (useReducer)
  const [cart, dispatch] = useReducer(cartReducer, []);

  // Toggle Theme
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Cart Actions
  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  // Context Value
  const value = {
    theme,
    toggleTheme,
    cart,
    addToCart,
    removeFromCart,
    clearCart,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};