import axios from "axios";

const API_URL = "http://localhost:3001/users";

export const login = async (email, password) => {
  const response = await axios.get(
    `${API_URL}?email=${email}&password=${password}`
  );

  if (response.data.length > 0) {
    localStorage.setItem("user", JSON.stringify(response.data[0]));
    return response.data[0];
  }
  throw new Error("Invalid credentials");
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
