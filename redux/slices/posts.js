import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../components/http";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await http.get(`posts`);
  return data.posts;
});

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
  },
});

export default postsSlice.reducer;
