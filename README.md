# Focus Todo

Focus Todo is a full-stack task management app for creating, editing, filtering, sorting, and completing personal tasks.

The app includes JWT authentication, user-specific tasks, protected API routes, PostgreSQL persistence, filtering, sorting, inline editing, and a simple focus timer with preset durations.

## Features

- User registration
- User login
- JWT-based authentication
- Protected task API routes
- User-specific tasks
- Create tasks
- Delete tasks
- Mark tasks as completed
- Edit task title, priority, and due date
- Search tasks by title
- Filter tasks by status:
  - All
  - Active
  - Completed
- Filter tasks by priority:
  - High
  - Medium
  - Low
- Sort tasks by:
  - Creation date
  - Due date
  - Priority
- Choose ascending or descending sorting order
- Reset active filters
- Display loading and error states
- Logout functionality
- Focus timer with preset durations:
  - 30s
  - 60s
  - 90s
  - 25min
- Responsive UI with a soft blue visual style

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- CSS
- Fetch API
- localStorage

### Backend

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- Zod
- JWT
- bcrypt
- Docker Compose

## API Endpoints

### Auth

```txt
POST   /auth/register
POST   /auth/login
```

### Todos

```txt
GET    /todos
POST   /todos
GET    /todos/:id
PATCH  /todos/:id
DELETE /todos/:id
```

All `/todos` routes are protected and require a JWT token in the `Authorization` header:

```txt
Authorization: Bearer <token>
```

The `GET /todos` endpoint supports query parameters:

```txt
/todos?completed=false
/todos?completed=true
/todos?priority=HIGH
/todos?search=api
/todos?sortBy=dueDate&order=asc
```

## Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- Docker
- Docker Compose

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Install frontend dependencies

From the project root:

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd server
npm install
```

## Environment Variables

### Backend `.env`

Inside the `server` folder, create a `.env` file:

```env
PORT=5001
DATABASE_URL="postgresql://todo_user:todo_password@localhost:5433/postgres_todo?schema=public"
CLIENT_URL=http://localhost:5173

JWT_SECRET="your_super_secret_jwt_key"
JWT_EXPIRES_IN="1d"
```

### Docker `.env.docker`

Inside the `server` folder, create a `.env.docker` file:

```env
POSTGRES_DB=postgres_todo
POSTGRES_USER=todo_user
POSTGRES_PASSWORD=todo_password
```

### Frontend `.env`

In the project root, create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:5001
```

## Running the Project

### 1. Start PostgreSQL

From the `server` folder:

```bash
docker compose up -d
```

### 2. Run Prisma migrations

From the `server` folder:

```bash
npx prisma migrate dev
```

### 3. Generate Prisma Client

From the `server` folder:

```bash
npx prisma generate
```

### 4. Start the backend

From the `server` folder:

```bash
npm run dev
```

The backend will run on:

```txt
http://localhost:5001
```

### 5. Start the frontend

Open a new terminal and run this command from the project root:

```bash
npm run dev
```

The frontend will run on:

```txt
http://localhost:5173
```

## Usage Flow

1. Register a new account.
2. Login with email and password.
3. The frontend stores the JWT token in localStorage.
4. All task requests are sent with the `Authorization: Bearer <token>` header.
5. Each user can see and manage only their own tasks.
6. Logout removes the saved authentication data from localStorage.

## Project Status

Core functionality is completed.

The app includes a React frontend, Express backend API, PostgreSQL database, Prisma ORM integration, JWT authentication, protected API routes, user-specific task CRUD operations, filtering, searching, sorting, inline editing, loading/error states, and a focus timer.