import axios from "axios";

const API_URL = 
  process.env.SERVER_API_URL ?? "http://localhost:8080/api/department";

// export const getDepartments = async () => {
//   const response = await axios.get(`${API_URL}/all`);
//   return response.data;
// };

export const getDepartments = async () => {
  const res = await axios.get(`${API_URL}`);
  return res.data;
};
export const createDepartment = async (department) => {
  const response = await axios.post(`${API_URL}/create`, department);
  return response.data;
};

export const updateDepartment = async (id, departmentData) => {
  const response = await axios.put(`${API_URL}/update/${id}`, departmentData);
  return response.data;
};

export const deleteDepartment = async (id) => {
  await axios.delete(`${API_URL}/delete/${id}`);
};