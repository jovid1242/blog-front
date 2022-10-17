import { API_URL } from "../../api";

export const CloudImage = async (form_data) => {
  try {
    const imgUpload = await fetch(`${API_URL}uploads`, {
      method: "POST",
      body: form_data,
    });
    const data = await imgUpload.json();

    if (data) {
      return data.secure_url;
    }
  } catch (err) {}
};
