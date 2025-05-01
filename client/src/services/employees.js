import axios from "axios";

const API_URL =
  process.env.SERVER_API_URL ?? "http://localhost:8080/api/employee";

export const getEmployees = async () => {
  const response = await axios.get(`${API_URL}/all`);
  // console.log(response);
  return response.data;
};

export const addEmployee = async (employee) => {
  const response = await axios.post(`${API_URL}/create-employee`, employee);
  return response.data;
};

// Update a employee
export const updateEmployee = async (id, employeeData) => {
  const response = await axios.put(`${API_URL}/${id}`, employeeData);
  return response.data;
};

export const deleteEmployee = async (id) => {
  await axios.delete(`${API_URL}/delete/${id}`);
};
