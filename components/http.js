import axios from "axios";

const instance = axios.create({
  baseURL: "http://api.ofolio.ru/api/",
});

export default instance;
