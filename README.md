

# Library Management System

Welcome to the **Library Management System**, a comprehensive application designed to manage the operations of a library. This system is built using the **MERN stack** (MongoDB, Express.js, React, Node.js).

## Features

- User Registration and Login with Email OTP verification
- JWT Token Authentication
- Role-based Access Control (User, Admin, Super Admin)
- Admin Management (Add, Remove Admins)
- Book Management (Add, Delete, Issue, Return Books)
- User Book Issue Tracking
- Password Management (Change Password, Forget Password)
- Secure Password Storage (Hashed Passwords)
- Logout Functionality

## Technology Stack

- **Frontend**: React, Bootstrap, styled-components
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Email Service**: Nodemailer

## Installation

### Clone the Repository

```bash
git clone https://github.com/yourusername/library-management-system.git
cd library-management-system
```

### Install Dependencies

#### Frontend

```bash
cd frontend
npm install
```

#### Backend

```bash
cd backend
npm install
```

## Running the Application

### Frontend

```bash
cd frontend
npm start
```

### Backend

```bash
cd backend
nodemon app
# or
node app
```

## Project Structure

```
.
├── frontend
│   ├── public
│   └── src
│       ├── components
│       ├── pages
│       ├── services
│       ├── App.js
│       ├── index.js
│       └── ...
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── utils
│   ├── app.js
│   └── ...
└── README.md
```

## Configuration

### Backend

- Configure your MongoDB connection and other settings in `backend/config.js`.
- Add this on connfig.dotenv
```bash
- SECRET_KEY=RIZWANMOHAMMOFSNAIKNAIKRIZWAN
- EMAIL=bhiirizwan@gmail.com
- PASSWORD=rizwan@26

```
### Frontend

- Update the API endpoints in your frontend services to match your backend URLs.

## Dependencies

### Frontend

- React
- React Router
- Axios
- Bootstrap
- styled-components

### Backend

- Express
- Mongoose
- JSON Web Token (JWT)
- Nodemailer
- Bcrypt

## Contributing

Feel free to fork this project, make improvements, and send a pull request. Your contributions are welcome!

## License

This project is licensed under the MIT License.

---

This version should meet your requirements and be suitable for your GitHub README file.
