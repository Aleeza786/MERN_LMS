# LMS Server (Express + MongoDB)

## Quick Start

1. Copy `.env.example` to `.env` and update values.
2. Install deps: `npm install`
3. Run dev server: `npm run dev` (http://localhost:5000)
4. API base: `/api`

### Auth
- `POST /api/auth/register` `{ name, email, password, role? }`
- `POST /api/auth/login` `{ email, password }`
- `GET /api/auth/me` (Bearer token)

### Courses
- `GET /api/courses` list
- `GET /api/courses/:id` get one
- `GET /api/courses/mine` (auth) courses where you're student/instructor
- `POST /api/courses` (instructor/admin) `{ title, description, lessons: [{title, content, videoUrl}] }`
- `POST /api/courses/:id/enroll` (student)

Use `Authorization: Bearer <token>` in protected routes.
