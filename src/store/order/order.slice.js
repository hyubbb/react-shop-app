import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchOrder = createAsyncThunk(
  "order/fetchOrder",
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://6596d32f6bb4ec36ca0369e0.mockapi.io/orders?search=${userId}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error receiving order ");
    }
  }
);

const initialState = {
  order: [],
  isLoading: false,
  error: "",
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrder.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
      state.order = action.payload;
    });
    builder.addCase(fetchOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    });
  },
});

export default orderSlice.reducer;
