# QuickJob – Full Stack Job Portal Application

## Overview

QuickJob is a full-stack Job Portal Application that connects job seekers and employers on a single platform. The application allows companies to post job opportunities, manage applicants, and maintain company profiles, while job seekers can create profiles, search jobs, apply for positions, and track their applications.

The project is built using Spring Boot for the backend, React.js for the frontend, MySQL for database management, and JWT Authentication for secure access control.

---

## Features

### Authentication & Authorization

* Secure user registration and login
* JWT-based authentication
* Role-based access control

  * Job Seeker
  * Company

### Job Seeker Features

* Create and manage profile
* Upload resume
* Search available jobs
* Apply for jobs
* Track applied jobs
* View company profiles

### Company Features

* Create and update company profile
* Upload company logo
* Post new job openings
* View posted jobs
* Manage applicants
* Review applicant profiles and resumes

### Security Features

* JWT Authentication
* Protected API endpoints
* Role-based authorization
* Secure password storage

---

## Tech Stack

### Frontend

* React.js
* React Router
* Axios
* React Toastify
* CSS

### Backend

* Spring Boot
* Spring Security
* Spring Data JPA
* JWT Authentication
* Maven

### Database

* MySQL

### Tools & Technologies

* Git
* GitHub
* Postman
* IntelliJ IDEA
* VS Code

---

## Project Structure

```text
JobPortalApplication/
│
├── JobPortalBackend/
│   ├── src/
│   ├── uploads/
│   ├── pom.xml
│   └── application.properties
│
├── JobPortalFrontend/
│   └── jobportalfrontend/
│       ├── src/
│       ├── public/
│       └── package.json
│
└── README.md
```

---

## Installation & Setup

### Clone Repository

```bash
git clone https://github.com/code-wit-yash/QuickJob---A-job-Portal.git
cd QuickJob-Job-Portal
```

### Backend Setup

Navigate to backend folder:

```bash
cd JobPortalBackend
```

Configure environment variables:

```properties
JWT_SECRET=your_jwt_secret

DB_URL=jdbc:mysql://localhost:3306/jobportal
DB_USERNAME=root
DB_PASSWORD=your_password
```

Run Spring Boot application:

```bash
mvn spring-boot:run
```

Backend runs on:

```text
http://localhost:8080
```

---

### Frontend Setup

Navigate to frontend folder:

```bash
cd JobPortalFrontend/jobportalfrontend
```

Install dependencies:

```bash
npm install
```

Run application:

```bash
npm start
```

Frontend runs on:

```text
http://localhost:3000
```

---

## API Features

### Authentication

* Register User
* Login User
* JWT Token Generation

### User APIs

* View Jobs
* Apply for Jobs
* Manage Profile
* View Applications

### Company APIs

* Create Company Profile
* Update Company Profile
* Post Jobs
* View Applicants
* Manage Job Listings

---

## Future Enhancements

* Email Notifications
* Interview Scheduling
* Advanced Job Filters
* Resume Parsing
* AI-Based Job Recommendations
* Admin Dashboard Analytics
* Cloud Deployment (AWS / Azure)

---

## Learning Outcomes

This project helped in gaining practical experience with:

* Full Stack Development
* REST API Design
* JWT Authentication
* Spring Security
* React State Management
* Database Design
* File Upload Handling
* Git & GitHub Workflow

---

## Author

Yash Jawale

GitHub: https://github.com/code-wit-yash

---

## License

This project is developed for educational and portfolio purposes.
