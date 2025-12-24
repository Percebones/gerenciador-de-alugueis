import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4040",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Adiciona token automaticamente
api.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
    console.log("Erro ao ler token:", e);
  }
  return config;
});

// Trata erros de resposta
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem("token");
      // você pode navegar usando React Navigation
      console.log("Token expirado — redirecionar para login");
    }
    return Promise.reject(error);
  }
);

export default api;
