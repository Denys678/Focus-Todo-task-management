# Focus Todo

Focus Todo is a full-stack task management app for creating, editing, filtering, sorting, and completing tasks.

The project also includes a simple focus timer with preset durations.

## Features

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
- Display loading and error states
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

### Backend

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- Zod
- Docker Compose

## API Endpoints

```txt
GET    /todos
POST   /todos
GET    /todos/:id
PATCH  /todos/:id
DELETE /todos/:id
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

### 2. Run Prisma migration

From the `server` folder:

```bash
npx prisma migrate dev
```

### 3. Start the backend

From the `server` folder:

```bash
npm run dev
```

The backend will run on:

```txt
http://localhost:5001
```

### 4. Start the frontend

Open a new terminal and run this command from the project root:

```bash
npm run dev
```

The frontend will run on:

```txt
http://localhost:5173
```

## Project Status

Core functionality is completed.

The app includes a React frontend, Express backend API, PostgreSQL database, Prisma ORM integration, task CRUD operations, filtering, searching, sorting, inline editing, loading/error states, and a focus timer.