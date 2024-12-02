import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3002/api/v1" });


API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const registerUser = (userData) => API.post("/user", userData);
export const loginUser = (userData) => API.post("/user/login", userData);
export const addRecipe = (recipeData) => API.post("/recipe", recipeData);
export const getRecipes = () => API.get("/recipe");
export const getRecipeById = (id) => API.get(`/recipe/${id}`);
