import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const registerUser = (userData) => api.post('/api/users/register', userData);
export const loginUser = (userData) => api.post('/api/users/login', userData);
export const fetchUsers = () => api.get('/api/users');
export const updateUser = (id, userData) => api.put(`/api/users/update/${id}`, userData);
export const deleteUser = (id) => api.delete(`/api/users/delete/${id}`);
export const updateUserProfile = async (userId, formData) => {
    return await api.put(`/api/users/update/${userId}`, formData); 
};
export const fetchUserById = (id) => api.get(`/api/users/${id}`);
