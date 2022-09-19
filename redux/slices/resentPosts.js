import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../components/http";

export const fetchResentPost = createAsyncThunk(
  "posts/fetchResentPost",
  async () => {
    const { data } = await http.get("posts-resent");
    return data.resentPosts;
  }
);

const initialState = {
  resentPosts: {
    items: [],
    status: "loading",
  },
};

export const resentPostsSlice = createSlice({
  name: "resentPosts",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchResentPost.pending]: (state) => {
      state.resentPosts.items = [];
      state.resentPosts.status = "loading";
    },
    [fetchResentPost.fulfilled]: (state, action) => {
      state.resentPosts.items = action.payload;
      state.resentPosts.status = "loaded";
    },
    [fetchResentPost.rejected]: (state) => {
      state.resentPosts.items = [];
      state.resentPosts.status = "error";
    },
  },
});

export default resentPostsSlice.reducer;
