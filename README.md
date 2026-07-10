# Employee Management System (Full-Stack)

A full-stack responsive web application for managing employee tasks efficiently. Upgraded from local storage to a robust backend, this app includes dedicated admin and employee workspaces, secure authentication, database-backed task assignment, and live status tracking.

## 🚀 Features

- **Secure Authentication & Registration:** Users must register an account to access the system. Includes secure, role-based login portals for Admins and Employees.
- **Responsive UI:** Fully responsive dashboard layouts optimized for desktop, tablet, and mobile.
- **Task Management:** Admins can create new tasks, set deadlines, and assign them directly to specific employees.
- **Employee Workflows:** Employees have customized dashboards to view New, Active, Completed, and Failed tasks.
- **Real-Time Tracking:** Live task count summaries and status updates.
- **Database Integration:** Fully persistent data management using a dedicated backend API.

## 💻 Tech Stack

**Frontend:**
- React (with Vite)
- Tailwind CSS
- Axios / Fetch API (for backend communication)

**Backend:**
- Node.js & Express.js
- MongoDB (Database)
- JWT (for secure authentication)

## 🛠️ Installation & Setup

To run this project locally, you will need to start both the backend server and the frontend development server.

### 1. Backend Setup
Navigate to the root directory and set up the backend server:

\`\`\`bash
# Install backend dependencies (if you have a separate package.json in the backend)
cd backend
npm install

# Create environment variables
# Copy .env.example to .env and add your MongoDB Atlas URL & JWT Secret
cp .env.example .env

# Start the backend server
npm run server 
# (The API will start on http://localhost:5000)
\`\`\`

### 2. Frontend Setup
Open a new terminal window, navigate to the project root, and start the Vite app:

\`\`\`bash
# Install frontend dependencies
npm install

# Start the frontend development server
npm run dev
\`\`\`
