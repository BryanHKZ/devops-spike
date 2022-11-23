import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_RUTA}`,
  headers: {
    Authorization: window.localStorage.getItem("token") || null,
  },
});

export default axiosClient;
