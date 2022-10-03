import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setCookie, getCookies, deleteCookie } from "cookies-next";
import http from "../../../components/http";

export const fetchLogin = createAsyncThunk("auth/login", async (user) => {
  const { data } = await http.post("login", user);
  return data;
});

export const fetchRegister = createAsyncThunk("auth/register", async (user) => {
  const { data } = await http.post("register", user);
  return data;
});

const initialState = {
  isAuth: false,
  user: {},
  token: getCookies("token"),
  status: false,
  isError: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = {};
      state.isAuth = false;
      deleteCookie("token");
    },
  },
  extraReducers: {
    [fetchLogin.pending]: (state) => {
      state.isAuth = false;
      state.user = {};
      state.status = true;
    },
    [fetchLogin.fulfilled]: (state, action) => {
      state.isAuth = true;
      state.user = action.payload.user;
      state.token = action.payload.accessToken;
      setCookie("token", action.payload.accessToken, { maxAge: 60 * 6 * 24 });
      state.status = false;
    },
    [fetchLogin.rejected]: (state, action) => {
      state.isAuth = false;
      state.isError = "action.payload";
      state.user = {};
      state.status = false;
    },
    // resgister
    [fetchRegister.pending]: (state) => {
      state.isAuth = false;
      state.user = {};
      state.status = true;
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.isAuth = true;
      state.user = action.payload.user;
      state.token = action.payload.accessToken;
      setCookie("token", action.payload.accessToken, { maxAge: 60 * 6 * 24 });
      state.status = false;
    },
    [fetchRegister.rejected]: (state, action) => {
      state.isAuth = false;
      state.isError = "action.payload";
      state.user = {};
      state.status = false;
    },
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
