import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Wrapper } from "../login/Register";

const RemoveAdmin = () => {
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
      const response = await fetch("/remove-admin", {
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
          <h2>Remove Admin</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="login_label" htmlFor="username">
                Super Admin Email
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
                Admin Email
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
                "Remove Admin"
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

export default RemoveAdmin;
