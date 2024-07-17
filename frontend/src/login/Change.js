import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { generateColoredLetters } from "./Nav";
import { Wrapper } from "./Register";
const Change = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    newpassword: "",
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setsucces] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear validation errors on input change
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters or number long";
    }
    if (formData.newpassword.length < 6) {
      newErrors.newpassword =
        "Password must be at least 6 characters or number long";
    }

    setErrors(newErrors);

    // Return true if there are no errors, indicating the form is valid
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        setLoading(true);
        const response = await axios.post("/changepassword", formData);

        if (response.status === 200) {
          setsucces(response.data.message);
          navigate("/login");
        } else {
          setError("Failed");
        }
      } catch (error) {
        if (error.response) {
          const { data, status } = error.response;

          if (status === 400) {
            setError(data.error); // Show 'Please fill all fields'
          } else if (status === 401) {
            setError(data.error); // Show 'Invalid OTP' or 'OTP expired'
          } else if (status === 500) {
            setError(data.error); // Show 'Registration failed'
          }
        } else {
          setError("Network error occurred");
          // Handle other network errors here
        }
      } finally {
        setLoading(false); // Set loading to false after response (success or error)
      }
    }
  };

  return (
    <Wrapper>
      <div className="login-container">
        <div className="login-box">
          <h4 className="logo">{generateColoredLetters()}</h4>
          <h3>Change Password</h3>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="login_label" htmlFor="email">
                Email:
              </label>
              <input
                className="login_input"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label className="login_label" htmlFor="password">
                Old Password:
              </label>
              <input
                className="login_input"
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errors.password && <p className="error1">{errors.password}</p>}
            </div>
            <div className="input-group">
              <label className="login_label" htmlFor="password">
                New Password:
              </label>
              <input
                className="login_input"
                type="password"
                id="password"
                name="newpassword"
                value={formData.newpassword}
                onChange={handleChange}
                required
              />
              {errors.newpassword && (
                <p className="error1">{errors.newpassword}</p>
              )}
              {success && <p className="succes">{success}</p>}
            </div>
            {error && <p className="error1">{error}</p>}
            <button className="login_button" type="submit" disabled={loading}>
              {loading ? (
                <div className="loader colors4" /> /* Show loader while loading */
              ) : (
                "Change Password"
              )}
            </button>
          </form>
          <p className="signup-link">
            Go Back To Login Page?{" "}
            <NavLink
              to="/login"
              // className="navbar-link "
            >
              Sign In
            </NavLink>
          </p>
          <div className="forget">
            <button
              className="login_button"
              style={{ backgroundColor: "#f44336" }}
              onClick={() => navigate("/forget")}
            >
              Forget Password
            </button>
            <button
              className="login_button"
              style={{ backgroundColor: "#2196f3" }}
              onClick={() => navigate("/login")}
            >
              &nbsp; Sign In &nbsp;
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Change;
