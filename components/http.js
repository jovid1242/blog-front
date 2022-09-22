import axios from "axios";

const instance = axios.create({
  baseURL: "http://backend.1026361-ca72388.tmweb.ru/api/",
});

export default instance;
