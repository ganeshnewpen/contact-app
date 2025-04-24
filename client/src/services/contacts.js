import axios from 'axios';

const API_URL = 'http://localhost:8080/api/contact';



export const getContacts = async () => {
  const response = await axios.get(`${API_URL}/all`);
  return response.data;
};

export const addContact = async (contact) => {
  const response = await axios.post(`${API_URL}/create-contact`, contact);
  return response.data;
};

export const updateContact = async (id, updatedContact) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedContact);
  return response.data;
};

export const deleteContact = async (id) => {
  await axios.delete(`${API_URL}/delete/${id}`);
};

