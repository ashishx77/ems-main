# Employee Management System

A responsive React dashboard for managing employee tasks. The app includes admin and employee workspaces, persistent local data, task assignment, and task status tracking.

## Features

- Admin login and employee login
- Responsive dashboard layouts for desktop, tablet, and mobile
- Create tasks and assign them to employees
- Employee task cards for new, active, completed, and failed work
- Accept, complete, and fail task workflows
- Live task count summaries
- LocalStorage persistence with data normalization

## Demo Credentials

- Admin: `admin@example.com` / `123`
- Employee: `e@e.com` / `123`

## Tech Stack

- React
- Vite
- Tailwind CSS
- LocalStorage

## Run Locally

```bash
npm install
npm run dev
```

## Backend Setup

Create a `.env` file from `.env.example`, add your MongoDB Atlas URL, then run:

```bash
npm run server
```

The API starts on `http://localhost:5000`.
