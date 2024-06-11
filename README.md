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

  ![hblog1](https://github.com/huzaifaghazali/huzaifa-blog/assets/63412385/731109a5-2f6a-412d-a2b2-865789aba619)

  ![hblog1a](https://github.com/huzaifaghazali/huzaifa-blog/assets/63412385/21f434d4-b1c6-4ad3-8cd6-71716d50bde0)

  ![hblog2](https://github.com/huzaifaghazali/huzaifa-blog/assets/63412385/5c38828c-c70e-48cf-9edd-71a0efaaaaab)

  ![hblog3](https://github.com/huzaifaghazali/huzaifa-blog/assets/63412385/5348c330-7fbd-4b02-9da7-16abaee90577)

  ![hblog4](https://github.com/huzaifaghazali/huzaifa-blog/assets/63412385/5435b252-a915-43f5-b076-0f500ecac086)

  ![hblog5](https://github.com/huzaifaghazali/huzaifa-blog/assets/63412385/3c03c35e-6f9d-44f6-b03c-54575e884e4c)

  ![hblog6](https://github.com/huzaifaghazali/huzaifa-blog/assets/63412385/866aac5d-bb29-41ff-8f48-1071dfde112e)

  ![hblog7](https://github.com/huzaifaghazali/huzaifa-blog/assets/63412385/4cb493a9-e1f6-43fa-bdd6-a02a840d9bda)

  ![hblog8](https://github.com/huzaifaghazali/huzaifa-blog/assets/63412385/a0b2f4e7-7049-4d6f-bdb4-67c2a5219357)

  ![hblog9](https://github.com/huzaifaghazali/huzaifa-blog/assets/63412385/19e461cb-635f-4a58-8696-f6539bd65796)

  ![hblog10](https://github.com/huzaifaghazali/huzaifa-blog/assets/63412385/94cbf588-414a-47c9-8d0d-60260c2fa807)

  ![hblog11](https://github.com/huzaifaghazali/huzaifa-blog/assets/63412385/8eb3453b-a202-4564-8ba9-a35fd539d174)

  ![hblog12](https://github.com/huzaifaghazali/huzaifa-blog/assets/63412385/e00b476b-89cf-4714-9e41-aa260dfaecbb)

  ![hblog13](https://github.com/huzaifaghazali/huzaifa-blog/assets/63412385/cb432d40-71da-425d-a0b9-01207e50b6ea)

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
