import axios from "axios";

const instance = axios.create({
  // baseURL: "http://backend.1026361-ca72388.tmweb.ru/api/",
  baseURL: "http://localhost:9001/api/",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImpvdmlkIiwiZW1haWwiOiJ0ZXN0QGpqLmpqIiwicGFzc3dvcmQiOiIkMmIkMDQkRVRYNS9ZSGFobGwyRXdCWVc4MURQLllzNi5TTzVmanpQVjNJMGlrUFR1UzZNeklLWXA1TE8iLCJpYXQiOjE2NjQ3OTEyNTksImV4cCI6MTY2NTM5NjA1OX0.GoZo0QMhnU9YFLDtPwREItu-hGV8os4_IKoBJy_njgo",
});

export default instance;
