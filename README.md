# TaskFlow — Modern Kanban Task Manager

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express.js-4-000000?logo=express)](https://expressjs.com/)

A full-stack Kanban task management application built with the **MERN stack** and modern **Next.js App Router**. Features drag-and-drop task management, real-time analytics dashboards, JWT authentication with httpOnly cookies, and a fully responsive dark-mode UI.

**[Live Demo](https://your-app.vercel.app)** • **[API Docs](https://your-backend.onrender.com/api/health)**

---

## Features

- **Kanban Board** — Drag-and-drop tasks between Todo, In Progress, and Done columns using `@dnd-kit`
- **JWT Authentication** — Secure register/login with bcrypt password hashing and httpOnly cookie sessions
- **Analytics Dashboard** — Interactive charts (Pie, Bar) showing task distribution by status, category, and priority
- **Real-time Filtering** — Search, filter by status, priority, and category with instant UI updates
- **Dark Mode** — Seamless light/dark theme toggle with Tailwind CSS
- **Responsive Design** — Collapsible sidebar, adaptive grid layouts, mobile-first approach
- **RESTful API** — Clean MVC architecture with Express.js, Mongoose ODM, and centralized error handling
- **TypeScript** — Full type safety across frontend and backend

---

## Tech Stack

### Frontend
- **Next.js 16** (App Router, Server Components, Client Components)
- **React 19** (Hooks, Zustand state management)
- **TypeScript** (strict mode)
- **Tailwind CSS 4** (utility-first styling, custom variants)
- **@dnd-kit** (drag-and-drop primitives)
- **Recharts** (data visualization)
- **date-fns** (date formatting)
- **sonner** (toast notifications)
- **lucide-react** (icons)

### Backend
- **Node.js** + **Express.js** (REST API)
- **MongoDB Atlas** + **Mongoose** (ODM, schema validation, indexing)
- **TypeScript** (strict mode)
- **bcryptjs** (password hashing)
- **jsonwebtoken** (JWT authentication)
- **cookie-parser** (httpOnly cookie management)
- **cors** (cross-origin resource sharing)

---

## Architecture
┌──────────────────────────────────────────────────────────────┐
│                    NEXT.JS 16 (App Router)                   │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────────┐ │
│  │   Server     │  │   Client     │  │      Zustand        │ │
│  │ Components   │  │ Components   │  │    Store (Tasks)    │ │
│  └──────┬───────┘  └──────┬───────┘  └─────────────────────┘ │
│         │                 │                                  │
│              fetch / axios                                   │
└──────────────────┼───────────────────────────────────────────┘
│
▼ HTTP/JSON + httpOnly Cookies
┌─────────────────────────────────────────────────────────────┐
│              EXPRESS.JS BACKEND (Node.js)                   │
│  ┌─────────┐  ┌───────────┐  ┌──────────┐  ┌──────────────┐ │
│  │ Routes  │→ │Controllers│→ │ Mongoose │→ │ MongoDB Atlas│ │
│  │ /tasks  │  │ (CRUD)    │  │  Models  │  │   (Cloud)    │ │
│  └─────────┘  └───────────┘  └──────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────────┘

---

## API Reference

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Create new account |
| `POST` | `/api/auth/login` | Login with credentials |
| `POST` | `/api/auth/logout` | Clear session cookie |
| `GET`  | `/api/auth/me` | Get current user (protected) |

### Tasks
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/tasks` | Get all tasks (with filters) | ✅ |
| `GET` | `/api/tasks/:id` | Get single task | ✅ |
| `POST` | `/api/tasks` | Create new task | ✅ |
| `PUT` | `/api/tasks/:id` | Update task | ✅ |
| `DELETE` | `/api/tasks/:id` | Delete task | ✅ |

---

## Getting Started

### Prerequisites
- Node.js 20+
- MongoDB Atlas account
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/task-manager.git
cd task-manager
---
###2. Backend Setup
```bash
cd backend
npm install

Create .env:
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_random_string
FRONTEND_URL=http://localhost:3000
---
Start the server:
```bash
npm run dev
---
###3. Frontend Setup
```bash
cd ../frontend
npm install
---
####Create .env.local:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
---
####Start the dev server:
```bash
npm run dev
---
Open http://localhost:3000
---
###Deployment
####Backend (Render / Railway)
Connect GitHub repository
Set root directory to backend/
Add environment variables (MONGO_URI, JWT_SECRET, FRONTEND_URL)
Deploy
---
####Frontend (Vercel)
Connect GitHub repository
Set root directory to frontend/
Add environment variable NEXT_PUBLIC_API_URL
Deploy
---
Screenshots
Table
Dashboard (Dark)	Analytics	Mobile View
screenshots/dashboard.png	screenshots/analytics.png	screenshots/mobile.png
---
###What I Learned
Next.js App Router — Server Components for initial data fetching, Client Components for interactivity
Zustand — Lightweight global state management without Redux boilerplate
JWT + httpOnly Cookies — Secure authentication flow resistant to XSS attacks
@dnd-kit — Accessible, modern drag-and-drop with keyboard support
MongoDB Schema Design — Indexing strategies, enum validation, and relational data modeling in NoSQL
Tailwind CSS v4 — New @import syntax, @custom-variant for dark mode, and CSS-first configuration
---
##Contact
 Mohamed Bediwe — [LinkedIn](https://www.linkedin.com/in/mohamed-bediwe-518596180/) — mohamed.bediwe@gmail.com
Project Link: https://github.com/MohamedBediwe/task-manager
plain

---

## Replace These Placeholders

| Placeholder | What to Put |
|-------------|-------------|
| `https://your-app.vercel.app` | Your actual Vercel URL (after deployment) |
| `https://your-backend.onrender.com/api/health` | Your actual Render API URL |
| `YOUR_USERNAME` | Your GitHub username |
| `your.email@example.com` | Your real email |
| `linkedin.com/in/yourprofile` | Your LinkedIn |
| Screenshots section | Add screenshots after deployment (use [ShareX](https://getsharex.com/) or browser dev tools) |

---

## Push the README

```bash
cd task-manager
git add README.md
git commit -m "docs: add comprehensive README with architecture, API docs, and setup guide"
git push origin main
