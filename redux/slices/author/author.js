import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../../components/http";

export const fetchAuthorPosts = createAsyncThunk(
  "posts/fetchAuthorPosts",
  async () => {
    const { data } = await http.get(`/author/posts`);
    return data.posts.rows;
  }
);

const initialState = {
  authorPosts: {
    items: [],
    status: "loading",
    isLoad: true,
  },
};

export const authorSlice = createSlice({
  name: "author",
  initialState,
  reducers: {
    setLoad: (state, action) => {
      state.authorPosts.isLoad = action.payload;
    },
    removePost: (state, action) => {
      state.authorPosts.items = state.authorPosts.items.filter(
        (elm) => elm.id !== action.payload
      );
    },
    addPost: (state, action) => {
      state.authorPosts.items = [...state.authorPosts.items, action.payload];
      state.authorPosts.isLoad = false;
    },
  },
  extraReducers: {
    [fetchAuthorPosts.pending]: (state) => {
      state.authorPosts.items = [];
      state.authorPosts.status = "loading";
      state.authorPosts.isLoad = true;
    },
    [fetchAuthorPosts.fulfilled]: (state, action) => {
      state.authorPosts.items = action.payload;
      state.authorPosts.status = "loaded";
      state.authorPosts.isLoad = false;
    },
    [fetchAuthorPosts.rejected]: (state) => {
      state.authorPosts.items = [];
      state.authorPosts.status = "error";
      state.authorPosts.isLoad = true;
    },
  },
});

export const { setLoad, removePost, addPost } = authorSlice.actions;

export default authorSlice.reducer;
