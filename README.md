# Huzaifa's Blog

Huzaifa's Blog is a full-stack blogging platform where users can read, comment on, and manage blog posts. The platform supports two types of users: admin and regular users. Regular users can manage their accounts and comments, while admin users have additional permissions to manage users, comments, and posts. The application also supports Google authentication for user login.

## Table of Contents

- [Features](#features)
- [Pictures](#pictures)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**
  - Google OAuth for secure login
  - Account management for regular users
- **Blog Management**
  - CRUD operations for posts (admin)
  - CRUD operations for comments
- **User Roles**
  - Admin: Manage users, posts, and comments
  - Regular User: Manage own account and comments
- **Modern UI/UX**
  - Responsive design using TailwindCSS
  - Rich text editor for blog posts

## Pictures

## Tech Stack

### Frontend

- **React** - Library for building user interfaces
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Firebase** - Authentication
- **TailwindCSS** - Styling
- **Vite** - Development environment

### Backend

- **Node.js** - JavaScript runtime
- **Express** - Web framework for Node.js
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ORM
- **JSON Web Token (JWT)** - Authentication
- **Bcrypt.js** - Password hashing
- **Dotenv** - Environment variable management

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/huzaifaghazali/huzaifa-blog.git
   cd huzaifa-blog
   ```

2. **Install dependencies:**

   - For the frontend:

     ```bash
     cd client
     npm install
     ```

   - For the backend:

     ```bash
     cd sever
     npm install
     ```

## Usage

1. **Setup environment variables for client and server**

   Create a .env file in the root of the client and server directory and add the following variables separately:

   ```bash
      #  For frontend
   VITE_FIREBASE_API_KEY
   VITE_FIREBASE_APP_ID
      #  For Backend
   MONGO_URL
   JWT_SECRET
   ```

2. **Run the development server:**

   - Start the backend:

     ```bash
     cd sever
     npm run dev
     ```

   - Start the frontend:
     ```bash
     cd client
     npm run dev
     ```

3. **Open your browser and navigate to:**
   ```bash
   http://localhost:5173
   ```
