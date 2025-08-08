# 🛒 Quantum: A Modern E-commerce Platform

Quantum is a **full-stack e-commerce web application** built as a project showcase.  
It features a **responsive user interface**, a **robust backend API**, and a **comprehensive admin dashboard** for managing users, products, and orders.

---

## 🚀 Features

### 🛍 Product Catalog
- Browse products in a **clean, modern UI**.
- Filter, search, and view product details.

### 🔐 User Authentication
- Secure **registration** and **login** with JWT.
- Password hashing with `bcryptjs`.

### 🛒 Shopping Cart
- Add, update, and remove items dynamically.
- Cart state managed using **Redux Toolkit**.

### 💳 Checkout & Payments
- Multi-step checkout process.
- **PayPal integration** for payment simulation.

### 👤 User Profile
- View personal details.
- Order history and status tracking.

### 🛠 Admin Dashboard
Protected admin panel for:
- **User Management**: Add, update, delete accounts & roles.
- **Product Management**: Create, edit, delete products.
- **Order Management**: Update and track order statuses.

### 🖼 Image Handling
- Product image upload & management via **Cloudinary**.
- File uploads handled using **Multer**.

---

## 🛠 Tech Stack

### **Frontend**
- ⚛ **React** – UI library.
- ⚡ **Vite** – Fast build tool.
- 🗂 **Redux Toolkit** – State management.
- 🎨 **Tailwind CSS** – Utility-first styling.
- 🔗 **React Router DOM** – Client-side routing.
- 🌐 **Axios** – HTTP requests.

### **Backend**
- 🟩 **Node.js** & **Express.js** – REST API.
- 🍃 **MongoDB** & **Mongoose** – Database.
- 🔑 **JWT** – Authentication.
- 🔒 **bcryptjs** – Password hashing.
- ☁ **Cloudinary** – Image storage.
- 📂 **Multer** – File uploads.

---

## 📦 Getting Started

### ✅ Prerequisites
- [Node.js](https://nodejs.org/) v16 or higher
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account or a local MongoDB instance

---

### 1️⃣ Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file in backend/
# Example:
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
# CLOUDINARY_CLOUD_NAME=your_cloud_name
# CLOUDINARY_API_KEY=your_api_key
# CLOUDINARY_API_SECRET=your_api_secret

# Seed database with sample data
npm run seed

# Start development server
npm run dev
