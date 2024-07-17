import React, { useState } from "react";
// import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Wrapper } from "../login/Register";
// const Wrapper = styled.section`
//   /* loginStyles.css */

//   body {
//     margin: 0;
//     padding: 0;
//     font-family: "Arial", sans-serif;
//     background-color: #f2f2f2;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     height: 100vh;
//   }

//   .container {
//     background-color: #fff;
//     border-radius: 10px;
//     box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
//     padding: 40px;
//     width: 400px;
//     max-width: 80%;
//     text-align: center;
//   }

//   .container h2 {
//     margin-bottom: 20px;
//     color: #333;
//   }

//   input[type="email"],
//   input[type="password"] {
//     width: calc(100% - 40px);
//     padding: 10px;
//     margin: 10px 0;
//     border: 1px solid #ccc;
//     border-radius: 5px;
//   }

//   button[type="submit"] {
//     width: calc(100% - 40px);
//     padding: 10px;
//     margin: 20px 0;
//     border: none;
//     border-radius: 5px;
//     background-color: #007bff;
//     color: #fff;
//     cursor: pointer;
//     transition: background-color 0.3s ease;
//   }

//   button[type="submit"]:hover {
//     background-color: #0056b3;
//   }

//   .message {
//     margin-top: 20px;
//     font-size: 14px;
//   }

//   .message.success {
//     color: #008000;
//   }

//   .message.error {
//     color: #ff0000;
//   }
// `;

const AdminLogin = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [targetUserEmail, setTargetUserEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("/grant-admin", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail,
          userPassword,
          targetUserEmail,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setError("");
      } else {
        setMessage("");
        setError(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to grant admin privileges");
      setMessage("");
    } finally {
      setLoading(false); // Set loading to false after response (success or error)
    }
  };

  return (
    <Wrapper>
      <div className="login-container">
        <div className="login-box">
          <h4 className="logo">Library Management System</h4>
          <h3>Add New Admin</h3>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="login_label" htmlFor="username">
                Your Email
              </label>
              <input
                className="login_input"
                type="email"
                placeholder="Your Email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label className="login_label" htmlFor="username">
                Password
              </label>
              <input
                className="login_input"
                type="password"
                placeholder="Your Password"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label className="login_label" htmlFor="username">
                New Admin Email
              </label>
              <input
                className="login_input"
                type="email"
                placeholder="Target User's Email"
                value={targetUserEmail}
                onChange={(e) => setTargetUserEmail(e.target.value)}
              />
            </div>

            <button className="login_button" type="submit" disabled={loading}>
              {loading ? (
                <div className="loader colors4" /> /* Show loader while loading */
              ) : (
                "Grant Admin"
              )}
            </button>
          </form>
          {message && <p style={{ color: "green" }}>{message}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <p className="signup-link">
            Go to Dashboard? <NavLink to="/admin">DashBoard</NavLink>
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default AdminLogin;
