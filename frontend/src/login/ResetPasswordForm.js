import React, { useState } from "react";
import axios from "axios"; // Import Axios for making HTTP requests
import { Wrapper } from "./Register";
import { generateColoredLetters } from "./Nav";
const ResetPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }

    const resetToken = window.location.pathname.split("/").pop(); // Extract reset token from URL

    try {
      setLoading(true);
      // Send a POST request to your backend to update the password using the reset token
      const response = await axios.post(`/reset-password/${resetToken}`, {
        newPassword: password,
      });

      setSuccessMessage(response.data.message);
    } catch (error) {
      setErrorMessage("Failed to reset password");
    } finally {
      setLoading(false); // Set loading to false after response (success or error)
    }
  };

  return (
    <Wrapper>
      <div className="login-container">
        <div className="login-box">
          <h4 className="logo">{generateColoredLetters()}</h4>
          <h3>Reset Password</h3>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="login_label">New Password:</label>
              <input
                className="login_input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label className="login_label">Confirm Password:</label>
              <input
                className="login_input"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            {successMessage && (
              <p style={{ color: "green" }}>{successMessage}</p>
            )}
            {/* <button type="submit">Reset Password</button> */}
            <button className="login_button" type="submit" disabled={loading}>
              {loading ? (
                <div className="loader colors4" /> /* Show loader while loading */
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default ResetPasswordForm;
