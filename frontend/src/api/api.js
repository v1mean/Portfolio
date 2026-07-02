import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

const fallbackProjects = [
  {
    _id: "homesweet-fallback-id",
    title: "HomeSweet",
    description: "A full-stack student housing platform helping university students find safe and affordable accommodation near campus. Features identity verification, interactive map search, role-based dashboards, and real-time messaging.",
    technologies: ["React", "Firebase", "Tailwind CSS", "Google Maps API", "Vercel"],
    imageUrl: "https://image.thum.io/get/width/600/crop/800/https://internship-project-two-blush.vercel.app",
    githubUrl: "https://github.com/ThyrexGG/Internship-Project",
    liveUrl: "https://internship-project-two-blush.vercel.app",
    category: "Web",
    featured: true,
    order: 1,
    screenshots: [
      "/homesweet/1.png",
      "/homesweet/2.png",
      "/homesweet/3.png",
      "/homesweet/4.png",
      "/homesweet/5.png"
    ]
  },
  {
    _id: "portfolio-fallback-id",
    title: "Developer Portfolio",
    description: "A highly interactive, performance-optimized personal developer portfolio featuring dynamic 3D loading animations, a sleek macOS window mockup for showcasing projects, and seamless transitions.",
    technologies: ["React", "Vite", "Tailwind CSS", "Framer Motion", "Node.js"],
    imageUrl: "/portfolio/1.png",
    githubUrl: "https://github.com/ThyrexGG/portfolio",
    liveUrl: "https://vimean.dev",
    category: "Web",
    featured: true,
    order: 2,
    screenshots: [
      "/portfolio/1.png",
      "/portfolio/2.png",
      "/portfolio/3.png",
      "/portfolio/4.png",
      "/portfolio/5.png"
    ]
  }
];

// Projects API
export const getProjects = async () => {
  try {
    return await API.get('/projects');
  } catch (error) {
    console.warn("Backend offline, using fallback data");
    return { data: { success: true, data: fallbackProjects } };
  }
};

export const getProject = async (id) => {
  try {
    return await API.get(`/projects/${id}`);
  } catch (error) {
    console.warn("Backend offline, using fallback data for single project");
    const project = fallbackProjects.find(p => p._id === id);
    if (project) {
      return { data: { success: true, data: project } };
    }
    throw error;
  }
};
export const createProject = (data) => API.post('/projects', data);
export const updateProject = (id, data) => API.put(`/projects/${id}`, data);
export const deleteProject = (id) => API.delete(`/projects/${id}`);
export const seedProjects = () => API.post('/projects/seed/data');
export const uploadImage = (formData) => API.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });

// Messages API
export const sendMessage = (data) => API.post('/messages', data);
export const getMessages = () => API.get('/messages');
export const markMessageRead = (id) => API.patch(`/messages/${id}/read`);
export const deleteMessage = (id) => API.delete(`/messages/${id}`);

export default API;
