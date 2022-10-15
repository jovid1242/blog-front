import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import postsSlice from "./slices/posts";
import popularPostsSlice from "./slices/popularPosts";
import resentPostsSlice from "./slices/resentPosts";
import categorySlice from "./slices/category";
import usersSlice from "./slices/users";
import authSlice from "./slices/auth/authSlice";
import authorSlice from "./slices/author/author";

const combineReducer = combineReducers({
  posts: postsSlice,
  popularPosts: popularPostsSlice,
  resentPosts: resentPostsSlice,
  category: categorySlice,
  users: usersSlice,
  auth: authSlice,
  author: authorSlice,
});

export const makestore = () =>
  configureStore({
    reducer: combineReducer,
  });

export const wrapper = createWrapper(makestore);
