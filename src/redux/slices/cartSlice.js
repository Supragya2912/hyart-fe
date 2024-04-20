import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  products: []
};

export const cartSlice = createSlice({
  name: "cartslice",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if(item) 
        item.quantity += action.payload.quantity;
      else
        state.products.push(action.payload);
      toast.success("Product added to cart");
    },

    increaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if(item)
        item.quantity++;
    },

    drecreaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if(item.quantity === 1)
        item.quantity = 1;
      else 
        item.quantity--;
    },

    deleteItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item._id !== action.payload
      );
      toast.error("Product removed from cart");
    },

    resetCart: (state) => {
      state.products = [];
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  drecreaseQuantity,
  deleteItem,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;