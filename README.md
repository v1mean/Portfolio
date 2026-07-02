# Portfolio Project - Personal Portfolio Website
# Web Development Course Final Assessment

## Project Structure
```
Portfolio/
├── frontend/       # React + Vite frontend
├── backend/        # Node.js + Express + MongoDB API
└── README.md
```

## Tech Stack
- **Frontend**: React, Vite, React Router, Axios, CSS3
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Deployment**: AWS (EC2/Elastic Beanstalk + S3/CloudFront)

## Getting Started

### Prerequisites
- Node.js >= 18
- MongoDB installed locally (or MongoDB Atlas URI)

### Backend Setup
```bash
cd backend
npm install
# Copy .env and configure MONGO_URI
npm run dev
# Server runs on http://localhost:5000
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:5173
```

### Seed Sample Projects
After starting the backend, visit:
```
POST http://localhost:5000/api/projects/seed/data
```
Or click "Seed Sample Data" in the Admin panel at `/admin`.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /api/projects | Get all projects |
| GET    | /api/projects/:id | Get single project |
| POST   | /api/projects | Create project |
| PUT    | /api/projects/:id | Update project |
| DELETE | /api/projects/:id | Delete project |
| POST   | /api/messages | Send contact message |
| GET    | /api/messages | Get all messages (admin) |
| PATCH  | /api/messages/:id/read | Mark as read |
| DELETE | /api/messages/:id | Delete message |

## Deployment
See `DEPLOYMENT.md` for AWS deployment instructions.
