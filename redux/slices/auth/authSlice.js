import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../../components/http";
import { setCookie, getCookie, deleteCookie } from "cookies-next";

export const fetchLogin = createAsyncThunk("auth/login", async (user) => {
  const { data } = await http.post("login", user);
  return data;
});

export const fetchRegister = createAsyncThunk("auth/register", async (user) => {
  const { data } = await http.post("register", user);
  return data;
});

export const getToken = () => getCookie("token");
export const setToken = (token) => setCookie("token", token);
export const removeToken = () => {
  deleteCookie("token");
  deleteCookie("user");
};

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
    setUser: (state, action) => {
      state.user = action.payload;
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
      if (action.error) {
        state.isError = "Неправильный адрес электронной почты или пароль!";
      } else {
        state.isError = "Произошла ошибка при входе в систему";
      }
      state.isAuth = false;
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
      if (action.error && action.error.code) {
        state.isError = "Произошла ошибка при входе в систему";
      }
      state.isAuth = false;
      state.user = {};
      state.status = false;
    },
  },
});

export const { logout, setUser } = authSlice.actions;

export default authSlice.reducer;
