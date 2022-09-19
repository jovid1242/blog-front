import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../components/http";

export const fetchPopularPost = createAsyncThunk(
  "posts/fetchPopularPost",
  async () => {
    const { data } = await http.get("posts-popular");
    return data.popularPosts;
  }
);

const initialState = {
  popularPosts: {
    items: [],
    status: "loading",
  },
};

export const popularPostsSlice = createSlice({
  name: "popularPosts",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPopularPost.pending]: (state) => {
      state.popularPosts.items = [];
      state.popularPosts.status = "loading";
    },
    [fetchPopularPost.fulfilled]: (state, action) => {
      state.popularPosts.items = action.payload;
      state.popularPosts.status = "loaded";
    },
    [fetchPopularPost.rejected]: (state) => {
      state.popularPosts.items = [];
      state.popularPosts.status = "error";
    },
  },
});

export default popularPostsSlice.reducer;
