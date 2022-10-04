import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../../components/http";

export const fetchLogin = createAsyncThunk("auth/login", async (user) => {
  const { data } = await http.post("login", user);
  return data;
});

export const fetchRegister = createAsyncThunk("auth/register", async (user) => {
  const { data } = await http.post("register", user);
  return data;
});

export const getToken = () => window.localStorage.getItem("token");
export const setToken = (token) =>
  window.localStorage.setItem("token", JSON.stringify(token));
export const removeToken = () => window.localStorage.removeItem("token");

const initialState = {
  isAuth: false,
  user: {},
  token: "",
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
      removeToken();
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
      setToken(action.payload.accessToken);
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
      setToken(action.payload.accessToken);
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
