import { createSlice } from "@reduxjs/toolkit";

// Initial Redux state for the shopping cart and product search.
const initialState = {
  items: [],
  searchTerm: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    // Add a product to the cart.
    // If the product already exists, increase its quantity.
    // Otherwise, add it to the cart with an initial quantity of 1.
    addToCart: (state, action) => {
      const product = action.payload;

      const existingProduct = state.items.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.items.push({
          ...product,
          quantity: 1,
        });
      }
    },

    // Remove a product completely from the shopping cart
    // using its unique product ID.
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },

    // Increase the quantity of an existing cart product.
    increaseQuantity: (state, action) => {
      const product = state.items.find(
        (item) => item.id === action.payload
      );

      if (product) {
        product.quantity += 1;
      }
    },

    // Decrease the quantity of an existing cart product.
    // The quantity is not allowed to go below 1.
    decreaseQuantity: (state, action) => {
      const product = state.items.find(
        (item) => item.id === action.payload
      );

      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },

    // Remove all products from the cart.
    // This is used after an order has been successfully placed.
    clearCart: (state) => {
      state.items = [];
    },

    // Update the search term entered by the user.
    // ProductList uses this value to filter the products.
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

// Export Redux actions so components can dispatch them.
export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  setSearchTerm,
} = cartSlice.actions;

// Export the reducer so it can be added to the Redux store.
export default cartSlice.reducer;