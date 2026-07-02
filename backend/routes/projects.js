const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// GET all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST create project
router.post('/', async (req, res) => {
  try {
    const project = new Project(req.body);
    const savedProject = await project.save();
    res.status(201).json({ success: true, data: savedProject, message: 'Project created successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PUT update project
router.put('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.json({ success: true, data: project, message: 'Project updated successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE project
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST seed sample projects
router.post('/seed/data', async (req, res) => {
  try {
    await Project.deleteMany({});
    const sampleProjects = [
      {
        title: 'Personal Portfolio Website',
        description: 'A full-stack portfolio website (this one!) built with React, Node.js, Express, and MongoDB. Features CRUD project management, contact form, dark/light mode, command palette, and interactive terminal.',
        technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'AWS', 'Vite'],
        imageUrl: '',
        githubUrl: 'https://github.com/v1mean/portfolio',
        liveUrl: 'https://ngornvimean.dev',
        category: 'Web',
        featured: true,
        order: 1,
      },
      {
        title: 'Internship Project — Firebase App',
        description: 'A Vue.js web application built during my internship, integrated with Firebase for authentication, real-time database, and cloud storage. Includes Google Maps API and Cloud Vision integration.',
        technologies: ['Vue.js', 'Firebase', 'JavaScript', 'Google Maps API', 'CSS3'],
        imageUrl: '',
        githubUrl: 'https://github.com/v1mean/internship-project',
        liveUrl: '',
        category: 'Web',
        featured: true,
        order: 2,
      },
      {
        title: 'RESTful API with Node.js & MongoDB',
        description: 'A scalable REST API backend with JWT authentication, role-based access control, rate limiting, and full CRUD operations. Deployed on AWS EC2 with MongoDB Atlas.',
        technologies: ['Node.js', 'Express', 'MongoDB', 'JWT', 'AWS EC2', 'Redis'],
        imageUrl: '',
        githubUrl: 'https://github.com/v1mean/rest-api',
        liveUrl: '',
        category: 'Backend',
        featured: true,
        order: 3,
      },
      {
        title: 'AI Image Classifier Web App',
        description: 'A machine learning web application that classifies uploaded images using a pre-trained CNN model exposed through a Python Flask API. Built with React frontend and AWS S3 for image storage.',
        technologies: ['Python', 'Flask', 'TensorFlow', 'React', 'AWS S3', 'CSS3'],
        imageUrl: '',
        githubUrl: 'https://github.com/v1mean/ai-classifier',
        liveUrl: '',
        category: 'AI/ML',
        featured: false,
        order: 4,
      },
      {
        title: 'Task Management Dashboard',
        description: 'A collaborative task management app with drag-and-drop kanban board, real-time updates via Firebase, user authentication, and team workspace management.',
        technologies: ['React', 'Firebase', 'Tailwind CSS', 'JavaScript'],
        imageUrl: '',
        githubUrl: 'https://github.com/v1mean/task-manager',
        liveUrl: 'https://taskmanager-vimean.vercel.app',
        category: 'Web',
        featured: false,
        order: 5,
      },
      {
        title: 'Student Grade Management System',
        description: 'A desktop/web application for managing student grades, built as a university project. Features CRUD operations with MySQL backend and a responsive React frontend.',
        technologies: ['React', 'Node.js', 'MySQL', 'Express', 'CSS3'],
        imageUrl: '',
        githubUrl: 'https://github.com/v1mean/grade-system',
        liveUrl: '',
        category: 'Web',
        featured: false,
        order: 6,
      },
    ];
    const projects = await Project.insertMany(sampleProjects);
    res.status(201).json({ success: true, data: projects, message: 'Sample projects seeded successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
