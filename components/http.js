import axios from "axios";

import { setCookie, getCookie } from "cookies-next";
export const API_URL = `http://api.ofolio.ru/api/`;

const $api = axios.create({
  withCredentials: false,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getCookie("token")}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = (await axios.get)(`${API_URL}/refresh`, {
          withCredentials: false,
        });
        setCookie("token", response.data.accessToken);
        return $api.request(originalRequest);
      } catch (e) {
        console.log("НЕ АВТОРИЗОВАН");
      }
    }
    throw error;
  }
);

export default $api;
