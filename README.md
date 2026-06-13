# TaskFlow — Modern Kanban Task Manager

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5-000000?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)](https://www.mongodb.com/)

A full-stack Kanban task manager built with the **MERN stack** and the **Next.js App Router**. It features a drag-and-drop board, an analytics dashboard with live charts, JWT authentication via httpOnly cookies, and a responsive light/dark UI — with strict TypeScript across both the frontend and backend.

---

## Features

- **Kanban Board** — Drag and drop tasks between Todo, In Progress, and Done columns using `@dnd-kit`
- **Authentication** — Register/login with bcrypt-hashed passwords and JWT stored in httpOnly cookies
- **Analytics Dashboard** — Pie and bar charts (via Recharts) showing task breakdowns by status, category, and priority
- **Filtering & Search** — Filter tasks by status, priority, and category, with live title search
- **Task Metadata** — Title, description, priority (low/medium/high), category (Work/Personal/Learning/Health), and due dates
- **Dark Mode** — Light/dark theme toggle powered by `next-themes`
- **Responsive UI** — Collapsible sidebar and mobile-first layouts
- **RESTful API** — MVC-style Express API with Mongoose models and centralized error handling
- **End-to-end TypeScript** — Strict typing on both frontend and backend

---

## Tech Stack

### Frontend (`/frontend`)
- **Next.js 16** (App Router, Server & Client Components)
- **React 19** with **Zustand** for state management
- **TypeScript** (strict mode)
- **Tailwind CSS 4**
- **@dnd-kit** for drag-and-drop
- **Recharts** for data visualization
- **Axios** for API requests, **date-fns** for date formatting
- **sonner** for toast notifications, **lucide-react** for icons

### Backend (`/backend`)
- **Node.js** + **Express 5** REST API
- **MongoDB** + **Mongoose** (schema validation & indexing)
- **TypeScript** (strict mode)
- **JWT** (`jsonwebtoken`) authentication with **httpOnly** cookies
- **bcryptjs** for password hashing
- **cookie-parser** and **cors** for cookie/session handling

---

## Architecture

```
┌──────────────────────────────────────────────────────────┐
│                  NEXT.JS 16 (App Router)                   │
│  ┌─────────────┐   ┌─────────────┐   ┌──────────────────┐ │
│  │   Server     │   │   Client    │   │     Zustand      │ │
│  │  Components  │   │ Components  │   │  Store (Tasks/   │ │
│  │              │   │             │   │      Auth)       │ │
│  └──────┬───────┘   └──────┬──────┘   └──────────────────┘ │
│         └──────────────────┘                              │
│                    Axios (withCredentials)                 │
└────────────────────────────┬───────────────────────────────┘
                               │ HTTP/JSON + httpOnly cookies
                               ▼
┌──────────────────────────────────────────────────────────┐
│                 EXPRESS 5 BACKEND (Node.js)                │
│  ┌─────────┐    ┌─────────────┐    ┌──────────┐           │
│  │ Routes  │ →  │ Controllers │ →  │ Mongoose │ → MongoDB  │
│  │ /auth   │    │  (CRUD +    │    │  Models  │   Atlas    │
│  │ /tasks  │    │   auth)     │    │          │            │
│  └─────────┘    └─────────────┘    └──────────┘           │
└──────────────────────────────────────────────────────────┘
```

---

## Project Structure

```
Task-Manager/
├── backend/
│   ├── src/
│   │   ├── config/db.ts          # MongoDB connection
│   │   ├── controllers/          # authController, taskController
│   │   ├── middleware/           # protect (JWT auth), errorHandler
│   │   ├── models/                # User, Task (Mongoose schemas)
│   │   ├── routes/                # authRoutes, taskRoutes
│   │   └── server.ts              # App entry point
│   ├── DOCKERFILE
│   └── package.json
└── frontend/
    ├── src/
    │   ├── app/                   # Next.js App Router pages
    │   │   ├── page.tsx           # Dashboard (Kanban board)
    │   │   └── analytics/         # Analytics dashboard
    │   ├── components/            # Sidebar, board, columns, cards, forms, charts...
    │   ├── lib/                    # axios instance, API helpers
    │   ├── store/                  # Zustand stores (auth, tasks)
    │   └── types/                  # Shared TypeScript types
    └── package.json
```

---

## API Reference

All endpoints are prefixed with `/api`. Authenticated requests rely on the `token` httpOnly cookie set during login/register.

### Auth

| Method | Endpoint             | Description                   | Auth |
| ------ | -------------------- | ------------------------------ | ---- |
| `POST` | `/api/auth/register`  | Create a new account            |      |
| `POST` | `/api/auth/login`     | Log in with email & password    |      |
| `POST` | `/api/auth/logout`    | Clear the session cookie        |      |
| `GET`  | `/api/auth/me`        | Get the current user            | ✅    |

### Tasks

| Method   | Endpoint          | Description                                                | Auth |
| -------- | ------------------ | ------------------------------------------------------------ | ---- |
| `GET`    | `/api/tasks`        | List tasks (supports `status`, `priority`, `category`, `search` query params) | ✅    |
| `GET`    | `/api/tasks/:id`    | Get a single task                                             | ✅    |
| `POST`   | `/api/tasks`        | Create a task                                                  | ✅    |
| `PUT`    | `/api/tasks/:id`    | Update a task                                                  | ✅    |
| `DELETE` | `/api/tasks/:id`    | Delete a task                                                  | ✅    |

### Data Models

**Task**
- `title` *(string, required, max 100 chars)*
- `description` *(string, optional, max 500 chars)*
- `status` — `todo` | `in-progress` | `done` *(default: `todo`)*
- `priority` — `low` | `medium` | `high` *(default: `medium`)*
- `category` — `Work` | `Personal` | `Learning` | `Health` *(required)*
- `dueDate` *(date, optional)*

**User**
- `name`, `email` *(unique)*, `password` *(hashed with bcrypt, min 6 chars)*

---

## Getting Started

### Prerequisites
- Node.js 20+
- A MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- npm and Git

### 1. Clone the repository

```bash
git clone https://github.com/MohamedBediwe/Task-Manager.git
cd Task-Manager
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/taskmanager?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_random_string
FRONTEND_URL=http://localhost:3000
```

Start the API in dev mode:

```bash
npm run dev
```

The API will be available at `http://localhost:5000`, with a health check at `/api/health`.

### 3. Frontend setup

In a new terminal:

```bash
cd frontend
npm install
```

Create a `.env.local` file inside `frontend/`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

**Backend** (`/backend`)
| Command | Description |
| --- | --- |
| `npm run dev` | Start the API with hot reload (`ts-node-dev`) |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run the compiled production build |

**Frontend** (`/frontend`)
| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js dev server |
| `npm run build` | Build for production |
| `npm start` | Run the production build |
| `npm run lint` | Run ESLint |

---

## Docker

The backend includes a `DOCKERFILE` for containerized deployment:

```bash
cd backend
docker build -t taskflow-api .
docker run -p 5000:5000 --env-file .env taskflow-api
```

---

## Deployment

**Backend** (Render / Railway)
1. Connect this repository and set the root directory to `backend/`
2. Add the environment variables: `MONGO_URI`, `JWT_SECRET`, `FRONTEND_URL`, `PORT`
3. Build command: `npm run build` · Start command: `npm start`

**Frontend** (Vercel)
1. Connect this repository and set the root directory to `frontend/`
2. Add the environment variable `NEXT_PUBLIC_API_URL` pointing to your deployed backend (e.g. `https://your-backend.onrender.com/api`)

---

## What I Learned

- **Next.js App Router** — splitting data fetching between Server Components and interactive Client Components
- **Zustand** — lightweight global state for tasks and auth without Redux boilerplate
- **JWT + httpOnly cookies** — building an auth flow that's resistant to XSS
- **@dnd-kit** — accessible, keyboard-friendly drag-and-drop
- **Mongoose schema design** — enums, validation, and indexes for query performance
- **Tailwind CSS v4** — the new CSS-first configuration and dark mode variants

---

## Contact

**Mohamed Bediwe**
[LinkedIn](https://www.linkedin.com/in/mohamed-bediwe-518596180/) · mohamed.bediwe@gmail.com
Project: [github.com/MohamedBediwe/Task-Manager](https://github.com/MohamedBediwe/Task-Manager)
