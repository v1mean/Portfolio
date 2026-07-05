# Web Development Final Assessment: Personal Portfolio Website

**Student Name:** Ngorn Vimean  
**Student ID:** 6025010008  
**Live Website URL:** http://13.211.234.155  
**GitHub Repository:** https://github.com/v1mean/Portfolio  

---

## 1. Project Overview
This project is a fully responsive, full-stack Personal Portfolio Website built to showcase my technical skills, education, and software engineering projects. It is designed with a modern, glassmorphism aesthetic and features an interactive command-line terminal, an admin dashboard with authentication, and a dynamic project showcase.

## 2. Technology Stack
The application was built using the MERN stack and deployed on AWS EC2.

### Frontend
* **React.js** (built with Vite)
* **Tailwind CSS** (for utility-first styling) & Custom CSS (for glassmorphism and animations)
* **React Router** (for SPA navigation)
* **Context API** (for global state and theme management)

### Backend & Database
* **Node.js & Express.js** (REST API)
* **MongoDB Atlas** (Cloud Database)
* **Mongoose** (Object Data Modeling)
* **JSON Web Tokens (JWT)** (for Admin Authentication)

### Deployment & Cloud
* **AWS EC2 (Ubuntu)** (Hosting both Frontend & Backend via PM2)
* **GitHub** (Version Control)

---

## 3. Key Features

### 🎨 User Interface & Experience
* **Responsive Design:** Fully responsive across all devices (mobile, tablet, desktop) using CSS Grid and Flexbox.
* **Modern Aesthetic:** Custom CSS variables for dynamic Dark/Light modes, animated background blobs, and glassmorphism UI components.
* **Interactive Elements:** Features a custom cursor, scroll progress bar, scroll-reveal animations, and an interactive "Terminal" easter egg that responds to shell commands.

### ⚙️ Core Functionality
* **Dynamic Projects:** Fetches featured projects from the MongoDB database to display on the Home and Projects pages.
* **Contact Form:** Allows users to send messages which are saved to the database.
* **Command Palette:** A quick-search feature (Ctrl+K) to easily navigate between pages or execute actions.

### 🔒 Admin Dashboard
* **Authentication:** Secure login using JWT cookies to access the admin panel.
* **Data Management:** Full CRUD (Create, Read, Update, Delete) capabilities for Projects and Messages directly from the frontend UI.
* **Database Seeding:** Ability to automatically populate the database with sample data.

---

## 4. Setup & Installation (Local Development)

If you wish to run this project locally, follow these steps:

### Prerequisites
* Node.js installed (v18+)
* MongoDB Atlas connection string

### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/v1mean/Portfolio.git
   cd Portfolio
   ```

2. **Setup Backend:**
   ```bash
   cd backend
   npm install
   ```
   *Create a `.env` file in the backend directory:*
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   NODE_ENV=development
   ```
   *Start the backend server:*
   ```bash
   npm run dev
   ```

3. **Setup Frontend:**
   ```bash
   cd ../frontend
   npm install
   ```
   *Start the frontend development server:*
   ```bash
   npm run dev
   ```

4. **Access the application:**
   Open `http://localhost:5173` in your browser.

---

## 5. Deployment Process
The application was deployed to a single AWS EC2 instance running Ubuntu.
1. The Node.js environment was configured using NVM.
2. The frontend was built into static files (`npm run build`).
3. Express was configured to serve the frontend `dist` directory dynamically alongside the API routes.
4. **PM2** was used to keep the server running continuously on **Port 80**, making it publicly accessible via the AWS Public IPv4 address.
5. MongoDB Network Access was configured to allow the AWS server to connect to the database.
