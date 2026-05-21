# Primetrade Backend Developer Internship Assignment

A full-stack scalable MERN application built for the Backend Developer Intern assignment by the Primetrade.ai Hiring Team.

This project demonstrates:

- JWT Authentication
- Role-Based Access Control (RBAC)
- CRUD APIs
- Swagger API Documentation
- Redis Caching
- MongoDB Atlas Integration
- React Frontend Integration
- Secure Backend Practices
- Deployment Ready Architecture

---


# Tech Stack

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Redis Cloud
- JWT Authentication
- bcryptjs
- Swagger UI

---

## Frontend

- React.js
- React Router DOM
- Axios
- React Toastify
- Tailwind CSS

---

# Features

## Authentication

- User Registration
- User Login
- JWT Authentication
- Refresh Token Support
- Secure Cookie Handling
- Password Hashing using bcrypt

---

## Authorization

- User Role
- Admin Role
- Protected Routes
- Role-Based Middleware

---

## CRUD Operations

- Create Entity
- Read Entity
- Update Entity
- Delete Entity

Example entity:
- Tasks
- Notes
- Products

---

## Security Features

- Helmet Securit
- Input Validation
- CORS Protection
- HTTPOnly Cookies
- Secure JWT Storage

---

# Project Structure

```txt
primetrade/
│
├── frontend/
├── backend/
├── README.md
└── .gitignore
```

---

# Backend Folder Structure

```txt
backend/
│
├── src/
│   │
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── validations/
│   └── index.js
│
├── package.json
└── .env
```

---

# Frontend Folder Structure

```txt
frontend/
│
├── src/
│   │
│   ├── api/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── routes/
│   └── App.jsx
│
├── package.json
└── .env
```

---

# Local Setup Guide

# 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/primetrade.git
```

```bash
cd primetrade
```

---

# 2. Setup Backend

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

---

# Backend .env Configuration

Create:

```txt
backend/.env
```

Add:

```env
PORT=5000
NODE_ENV=development
BASE_PATH=/api/v1

MONGODB_URI=your_mongodb_atlas_uri
FRONTEND_ORIGIN=http://localhost:5173

ACCESS_TOKEN_SECRET=PrimetradeinternshipRound0AccessToken
ACCESS_TOKEN_EXPIRY=15m

REFRESH_TOKEN_SECRET=PrimetradeinternshipRound0RefreshToken
REFRESH_TOKEN_EXPIRY=7d

REDIS_URL=your_redis_cloud_url

```

---

# Start Backend Server

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

---

# Backend Runs On

```txt
http://localhost:5000
```

Swagger Docs:

```txt
http://localhost:5000/api-docs
```

---

# 3. Setup Frontend

Open new terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

---

# Frontend .env Configuration

Create:

```txt
frontend/.env
```

Add:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

---

# Start Frontend

```bash
npm run dev
```

---

# Frontend Runs On

```txt
http://localhost:5173
```

---

# API Versioning

All APIs follow versioning:

```txt
/api/v1
```

Example:

```txt
/api/v1/auth/login
/api/v1/tasks
```

---

# Authentication APIs

| Method | Endpoint |
|---|---|
| POST | `/api/v1/auth/register` |
| POST | `/api/v1/auth/login` |
| POST | `/api/v1/auth/logout` |
| POST | `/api/v1/auth/refresh-token` |

---

# CRUD APIs

| Method | Endpoint |
|---|---|
| POST | `/api/v1/tasks` |
| GET | `/api/v1/tasks` |
| GET | `/api/v1/tasks/:id` |
| PUT | `/api/v1/tasks/:id` |
| DELETE | `/api/v1/tasks/:id` |

---

# Protected Routes

These routes require JWT token.

Example:

```txt
Authorization: Bearer <token>
```

---

# Admin Routes

Accessible only by:

```txt
role = admin
```

---

# Redis Caching

Redis Cloud is used for:

- Session management
- Refresh token storage
- Caching frequently accessed data

---

# MongoDB Atlas

Cloud-hosted MongoDB database.

---

# Swagger Documentation

Swagger UI available at:

```txt
http://localhost:5000/docs
```

Production:

```txt
https://api.appshayu.in/docs
```

---

# Scalability Notes

This project follows scalable backend architecture principles.

## Future Improvements

- Microservices Architecture
- Kubernetes Deployment
- Load Balancing
- Queue Systems
- API Gateway
- Distributed Caching
- WebSockets
- Horizontal Scaling

---

# Security Practices Used

- Password hashing using bcrypt
- JWT Authentication
- Role-based authorization
- Secure cookies
- Input validation
- Environment variables
- Rate limiting
- Helmet middleware
- CORS configuration

---

# Deployment Architecture

```txt
Frontend (Vercel)
        ↓
Backend API (Render)
        ↓
MongoDB Atlas
        ↓
Redis Cloud
```


# Git Commands

Initialize git:

```bash
git init
```

Add files:

```bash
git add .
```

Commit:

```bash
git commit -m "Initial commit"
```

Push:

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/primetrade.git
git push -u origin main
```

---

# Recommended Node.js Version

```txt
Node.js 20 LTS
```

Download:

https://nodejs.org/en/download

---

# Submission Notes

This assignment demonstrates:

✅ Backend API Design  
✅ Authentication & Authorization  
✅ Secure Backend Architecture  
✅ Frontend Integration  
✅ Deployment Readiness  
✅ Scalability Considerations  
✅ Cloud Database & Redis Integration  

Built as part of the Backend Developer Internship Assignment for Primetrade.ai.