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
        title: 'E-Commerce Platform',
        description: 'A full-stack e-commerce web application with user authentication, product management, shopping cart, and payment integration. Built with React, Node.js, and MongoDB.',
        technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe API'],
        imageUrl: '',
        githubUrl: 'https://github.com/yourusername/ecommerce-platform',
        liveUrl: 'https://your-ecommerce.vercel.app',
        category: 'Web',
        featured: true,
        order: 1,
      },
      {
        title: 'Task Management App',
        description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, team workspaces, and deadline tracking.',
        technologies: ['React', 'Firebase', 'Tailwind CSS', 'React DnD'],
        imageUrl: '',
        githubUrl: 'https://github.com/yourusername/task-manager',
        liveUrl: 'https://your-tasks.vercel.app',
        category: 'Web',
        featured: true,
        order: 2,
      },
      {
        title: 'AI Image Classifier',
        description: 'A machine learning web app that classifies images using a pre-trained CNN model exposed via a REST API. Users can upload images and get real-time predictions.',
        technologies: ['Python', 'Flask', 'TensorFlow', 'React', 'AWS S3'],
        imageUrl: '',
        githubUrl: 'https://github.com/yourusername/ai-classifier',
        liveUrl: 'https://your-classifier.vercel.app',
        category: 'AI/ML',
        featured: true,
        order: 3,
      },
    ];
    const projects = await Project.insertMany(sampleProjects);
    res.status(201).json({ success: true, data: projects, message: 'Sample projects seeded successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
