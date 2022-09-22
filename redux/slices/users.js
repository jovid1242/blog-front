import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../components/http";

export const fetchAuthors = createAsyncThunk(
  "posts/fetchPopularPost",
  async () => {
    const { data } = await http.get("users");
    return data.users;
  }
);

const initialState = {
  users: {
    items: [],
    status: "loading",
  },
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAuthors.pending]: (state) => {
      state.users.items = [];
      state.users.status = "loading";
    },
    [fetchAuthors.fulfilled]: (state, action) => {
      state.users.items = action.payload;
      state.users.status = "loaded";
    },
    [fetchAuthors.rejected]: (state) => {
      state.users.items = [];
      state.users.status = "error";
    },
  },
});

export default usersSlice.reducer;
