import { createSlice } from "@reduxjs/toolkit";
import { caseStudyApi } from "../services/caseStudyApi";

const initialState = {
  products: [],
  sessionId: "",
  searchInput: "",
  cart: [],
};

export const caseStudySlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setSearchInput: (state, action) => {
      state.searchInput = action.payload;
    },
    addToCart: (state, action) => {
      // Assuming that action.payload is the product to add
      const existingProduct = state.cart.find(
        (product) => product.id === action.payload.id
      );
      if (existingProduct) {
        // If the product already exists, increase the quantity
        existingProduct.quantity += 1;
      } else {
        // If the product doesn't exist, add it with quantity 1
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    // Reducer to remove a product from the cart
    removeFromCart: (state, action) => {
      // Assuming that action.payload is the product ID to remove
      const index = state.cart.findIndex(
        (product) => product.id === action.payload
      );
      if (index !== -1) {
        if (state.cart[index].quantity > 1) {
          // If more than one item of the product exists, decrease the quantity
          state.cart[index].quantity -= 1;
        } else {
          // If only one item exists, remove it from the cart
          state.cart.splice(index, 1);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      caseStudyApi.endpoints.createSession.matchFulfilled,
      (state, { payload }) => {
        state.sessionId = payload;
      }
    );
    builder.addMatcher(
      caseStudyApi.endpoints.listProducts.matchFulfilled,
      (state, action) => {
        console.log(action);
        state.products = action.payload;
      }
    );
    builder.addMatcher(
      caseStudyApi.endpoints.searchProduct.matchFulfilled,
      (state, action) => {
        console.log(action);
        state.products = action.payload;
      }
    );
  },
});

// Action creators are generated for each case reducer function
export const { setSearchInput, addToCart, removeFromCart } =
  caseStudySlice.actions;

export default caseStudySlice.reducer;
