import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IProduct } from "./product.type";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (category: string, thunkAPI) => {
    try {
      let response;
      if (category) {
        response = await axios.get<IProduct[]>(
          `https://fakestoreapi.com/products/category/${category}`
        );
      } else {
        response = await axios.get<IProduct[]>(
          "https://fakestoreapi.com/products"
        );
      }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error loading products ");
    }
  }
);

interface ProductsType {
  products: IProduct[];
  isLoading: boolean;
  error: string;
}

const initialState: ProductsType = {
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
      state.error = action.payload as string;
    });
  },
});

export default productsSlice.reducer;
