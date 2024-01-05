import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (thunkAPI) => {
    try {
      let response;
      if (thunkAPI) {
        response = await axios.get(
          `https://fakestoreapi.com/products/category/${thunkAPI}`
        );
      } else {
        response = await axios.get("https://fakestoreapi.com/products");
      }
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue("Error loading products ");
    }
  }
);

const initialState = {
  products: [],
  isLoading: false,
  error: "",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Reducer를 추가하면 프로미스를 기반으로 한 비동기 작업을 수행할 수 있습니다.
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    });
  },
});

export default productsSlice.reducer;
