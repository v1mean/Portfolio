import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Projects API
export const getProjects = () => API.get('/projects');
export const getProject = (id) => API.get(`/projects/${id}`);
export const createProject = (data) => API.post('/projects', data);
export const updateProject = (id, data) => API.put(`/projects/${id}`, data);
export const deleteProject = (id) => API.delete(`/projects/${id}`);
export const seedProjects = () => API.post('/projects/seed/data');

// Messages API
export const sendMessage = (data) => API.post('/messages', data);
export const getMessages = () => API.get('/messages');
export const markMessageRead = (id) => API.patch(`/messages/${id}/read`);
export const deleteMessage = (id) => API.delete(`/messages/${id}`);

export default API;
