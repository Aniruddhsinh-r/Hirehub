# HireHub – Job Portal MERN Stack (Under Development)

A comprehensive **Job Portal Web Application** built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**.
This platform allows job seekers to explore job opportunities and apply for positions, while employers can post and manage job listings efficiently.

The application provides a complete solution for job searching, application tracking, and recruitment management.

---

## Features

* **User Authentication:** Secure authentication using **JWT (JSON Web Tokens)**.
* **Job Listings:** Browse available job opportunities stored in MongoDB.
* **Apply for Jobs:** Users can apply for jobs directly through the platform.
* **Application Management:** Employers can manage job postings and view applicants.
* **Secure Password Handling:** Password encryption using **bcrypt**.
* **RESTful API:** Backend built with a scalable REST API architecture.
* **Responsive Interface:** Smooth experience across desktop and mobile devices.

---

## Technologies Used

### Frontend

* React.js
* React Router
* Axios
* CSS / tailwind css

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JWT (JSON Web Tokens)
* Bcrypt

### Development Tools

* Git
* GitHub
* Visual Studio Code

---

## Getting Started

Follow the steps below to run the project locally.

---

## Prerequisites

Make sure the following tools are installed on your system:

* Node.js (Latest version recommended)
* MongoDB Atlas account or local MongoDB server
* Cloudinary account for image storage

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/HireHub.git
```

### 2. Install Dependencies

```bash
cd HireHub
cd backend
npm install
cd..
cd ../frontend
npm install
```

---

## 3. Environment Variables

Create a `.env` file inside the **backend folder** and add the following variables:

```env
PORT=8000
MONGO_URI=mongodb://localhost:27017/hirehub
JWT_SECRET=hirehub_secret_key
CLOUD_NAME=your_cloudinary_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password  (2 step verification)
```


## 4. Run the Application

### Start Backend Server

```bash
cd backend
npm run dev
```

### Start Frontend

```bash
cd frontend
npm run dev
```

After running both servers, open your browser and go to:

```
http://localhost:5173
```

---

## Support

If you like this project, please consider giving it a **star ⭐ on GitHub**.

---

## Contact

Developer: **Rathod Aniruddhsinh**

GitHub: [https://github.com/Aniruddhsinh](https://github.com/Aniruddhsinh-r)

Project Repository:
[https://github.com/Aniruddhsinh/HireHub](https://github.com/Aniruddhsinh-r/Hirehub)
