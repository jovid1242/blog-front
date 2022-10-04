import { API_URL } from "../components/api";
export const imageLoader = ({ src, width, quality }) => {
  console.log("sssrc", src, width, quality);
  return `${API_URL}/${src}`;
};
