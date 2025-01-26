import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const fetchEmployees = async () => {
  try {
    const response = await axios.get(`${API_URL}/employees`);
    return response.data;
  } catch (error) {
    console.error('Error fetching employees:', error.response?.data || error.message);
    throw error;
  }
};

export const addEmployee = async (employee) => {
  try {
    const response = await axios.post(`${API_URL}/employees/create`, employee);
    return response;
  } catch (error) {
    console.error('Error adding employee:', error.response?.data || error.message);
    throw error;
  }
};

export const updateEmployee = async (id, employee) => {
  try {
    const response = await axios.put(`${API_URL}/employees/update/${id}`, employee);
    return response;
  } catch (error) {
    console.error('Error updating employee:', error.response?.data || error.message);
    throw error;
  }
};

export const deleteEmployee = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/employees/delete/${id}`);
    return response;
  } catch (error) {
    console.error('Error deleting employee:', error.response?.data || error.message);
    throw error;
  }
};
