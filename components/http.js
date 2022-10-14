import axios from "axios";
import { getCookie } from "cookies-next";

const instance = axios.create({
  baseURL: "http://api.ofolio.ru/api/",
});

instance.interceptors.request.use(
  (config) => {
    // Do something before request is sent

    config.headers["Authorization"] = `Bearer ${getCookie("token")}`;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default instance;

// import axios from "axios";
// import Router from "next/router";
// import { toast } from "react-toastify";

// const notify = (message) => {
//   toast.error(message, {
//     position: "top-center",
//     autoClose: 5000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: 0,
//   });
// };

// const validationErrorHandler = (res) => {
//   res.errors.forEach((err) => {
//     notify(err.message);
//   });
// };

// const http = axios.create({
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   },
//   baseURL: "http://localhost:9001/api/",
// });
// http: http.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   function (error) {
//     if (!error.response) {
//       notify("Нет соединения с интернетом. Перезагрузите страницу!!");
//     }
//     if (error.response && error.response.status == 422) {
//       validationErrorHandler(error.response.data);
//     }
//     if (error.response && error.response.status == 404) {
//       notify(error.response.data.message);
//     }
//     if (error.response && error.response.status == 403) {
//       notify(error.response.data.message);
//     }
//     if (error.response && error.response.status == 400) {
//       notify(error.response.data.message);
//     }
//     if (error.response && error.response.status == 500) {
//       notify(error.response.data.message);
//     }
//     if (error.response && error.response.status == 401) {
//       Router.push("/login");
//     }

//     return Promise.reject(error);
//   }
// );
// export default http;
