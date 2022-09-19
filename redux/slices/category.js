import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../components/http";

export const fetchCategory = createAsyncThunk(
  "posts/fetchCategory",
  async () => {
    const { data } = await http.get("categories");
    return data.data;
  }
);

const initialState = {
  category: {
    items: [],
    activeTab: 1,
    status: "loading",
  },
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCategory.pending]: (state) => {
      state.category.items = [];
      state.category.status = "loading";
    },
    [fetchCategory.fulfilled]: (state, action) => {
      state.category.items = action.payload;
      state.category.status = "loaded";
    },
    [fetchCategory.rejected]: (state) => {
      state.category.items = [];
      state.category.status = "error";
    },
  },
});

export default categorySlice.reducer;
