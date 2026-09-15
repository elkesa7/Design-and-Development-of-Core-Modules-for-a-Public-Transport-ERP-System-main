# Design and Development of Core Modules for a Public Transport ERP System
# Public Transport ERP System

## 📌 Project Overview

This project focuses on the **design and development of core modules for a Public Transport ERP System**.

The application provides a foundation for managing key transportation resources and operations, including buses, staff, routes, and transport movements.

It is developed as a full-stack web application using the **MERN stack**, with Docker containerisation and CI/CD automation through GitHub Actions.

> ⚠️ This project represents the development of core modules and an initial foundation for a larger Public Transport ERP system. It is not intended to represent a complete ERP solution.

---

## 🚀 Features

### 🚌 Bus Management

* Add, view, update, and delete buses.
* Manage bus information and operational data.
* Prevent deletion of buses assigned to existing transport movements.

### 👥 Staff Management

* Manage transport staff, including drivers and conductors.
* Role-based staff management.
* Manage driver licence information.
* Prevent deletion of staff members assigned to transport movements.
* Protect specific administrative roles from deletion.

### 🛣️ Route Management

* Create and manage transport routes.
* Store route information, including departure and destination points.
* Manage route distance and schedule information.
* Prevent deletion of routes used in existing transport movements.

### 🔄 Transport Movement Management

* Assign buses and staff members to transport movements.
* Manage the status of movements:

  * `Active`
  * `Completed`
  * `Cancelled`
* Prevent buses from being assigned to multiple active movements.
* Prevent drivers from being assigned to multiple active movements.
* Prevent conductors from being assigned to conflicting active movements.

### 🔐 Authentication and Authorization

* JWT-based authentication.
* Secure protected API routes.
* Role-based access control.
* Authorization middleware to restrict access based on user roles.
* Automatic JWT token handling on the frontend using Axios interceptors.

---

## 🛠️ Technology Stack

### Frontend

* React.js
* Axios
* React Router
* SweetAlert2
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Tokens (JWT)

### DevOps

* Docker
* GitHub Actions
* CI/CD

---


## 📊 Business Rules

The project implements several business rules to ensure data consistency.

### Active Movement Assignment

A bus cannot be assigned to more than one active movement.

```text
Bus A
   │
   ▼
Active Movement 1
```

The following assignment is rejected:

```text
Bus A
   │
   ├── Active Movement 1
   │
   └── Active Movement 2 ❌
```

The same principle applies to drivers and conductors.

Once a movement is marked as:

```text
Completed
```

or:

```text
Cancelled
```

the associated resources can be assigned to another active movement.

---



## ⚙️ Installation

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* MongoDB
* Docker (optional, for containerised deployment)

---

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-name>
```

---

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

Create an `.env` file:

```env
PORT=1234
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
npm run dev
```

---

### 3. Install Frontend Dependencies

Open another terminal:

```bash
cd frontend
npm install
npm start
```

The frontend should be available at:

```text
http://localhost:3000
```

---

## 🐳 Docker

The project can be containerised using Docker to provide consistent development and deployment environments.

Build and run the application:

```bash
docker compose up --build
```

Stop the containers:

```bash
docker compose down
```

---

## 🔄 CI/CD

The project uses **GitHub Actions** to automate parts of the development workflow.

The CI/CD pipeline can be used to:

* Install project dependencies.
* Run automated checks.
* Validate application builds.
* Automate integration workflows.

The workflow configuration is located in:

```text
.github/workflows/
```

---

## 🎯 Future Improvements

As this project represents the foundation of a larger Public Transport ERP system, future development could include:

* Ticket management.
* Real-time bus tracking.
* GPS integration.
* Passenger and client management.
* Maintenance management.
* Reporting and analytics.
* Dashboard improvements.
* Notifications and alerts.
* Advanced user and permission management.
* Deployment to a cloud platform.

---


## 📄 License

This project is intended for educational and portfolio purposes.
