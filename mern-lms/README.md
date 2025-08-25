# MERN Simple LMS — Step-by-Step

This is a **minimal Learning Management System** built with **MongoDB, Express, React, Node**.

## 0) Prerequisites
- **Node.js LTS** (v18+): https://nodejs.org
- **MongoDB** (local or Atlas)
  - Local (Windows): Install *MongoDB Community Server* and ensure the service is running.
  - Atlas: Create a free cluster, allow your IP, and get a connection string.

## 1) Clone/Extract & Install
```
server/ -> Express API
client/ -> React (Vite)
```

### Backend
```
cd server
cp .env.example .env   # On Windows, copy manually
npm install
npm run dev
```
Check: http://localhost:5000

### Frontend
```
cd ../client
cp .env.example .env   # On Windows, copy manually
npm install
npm run dev
```
Open: http://localhost:5173

## 2) Configure Environment
In `server/.env`:
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mern_lms  # or your Atlas URI
JWT_SECRET=your_long_random_secret
```

In `client/.env`:
```
VITE_API_URL=http://localhost:5000/api
```

## 3) Core Features
- Register/Login with JWT
- Roles: student | instructor | admin
- Courses: create (instructor/admin), list, detail
- Lessons inside each course (title/content/video URL)
- Enroll students into courses
- Dashboard for enrolled/created courses

## 4) Useful API Routes
Auth:
- `POST /api/auth/register` { name, email, password, role? }
- `POST /api/auth/login` { email, password }
- `GET /api/auth/me`

Courses:
- `GET /api/courses`
- `GET /api/courses/:id`
- `GET /api/courses/mine` (auth)
- `POST /api/courses` (instructor/admin)
- `POST /api/courses/:id/enroll` (student)

Use `Authorization: Bearer <token>` header after login.

## 5) Suggested Next Steps
- Add pagination & search for courses
- Restrict who can view lessons unless enrolled
- File uploads (thumbnails, resources)
- Payments/integration for paid courses
- Rich text editor for lessons
- Unit tests (Jest, React Testing Library; Supertest for API)
