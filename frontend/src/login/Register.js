import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { generateColoredLetters } from "./Nav";
export const Wrapper = styled.section`
  .login-container {
    display: flex;
    align-items: center;
    justify-content: center;

    background: url("https://d3nn873nee648n.cloudfront.net/1200x1800-new/20476/PK1048596.jpg")
      center/cover no-repeat;
  }
  /* Apply animation to create a pulsating border effect */
  @keyframes pulse {
    0% {
      border: 2px solid transparent;
    }
    50% {
      border: 2px solid #3498db;
    }
    100% {
      border: 2px solid transparent;
    }
  }

  .login-box {
    background-color: rgba(255, 255, 255, 0.8);
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 400px; /* Set a fixed width */
    height: auto;
    text-align: center;
    margin-top: 30px;
    margin-bottom: 30px;
    animation: pulse 5s infinite; /* Apply the animation */
  }
  .logo {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
    animation: bounce 5s infinite;
  }
  p.error1 {
    color: red;
    font-size: 14px;
    margin-top: 0.2rem;
  }
  p.succes {
    color: green;
    font-size: 14px;
    margin-top: 0.2rem;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .input-group {
    margin-bottom: 15px;
    width: 100%;
  }

  .login_label {
    display: block;
    margin-bottom: 6px;
    margin-top: 6px;
    color: #555;
    font-size: 15px;
  }

  .login_input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .login_button {
    background-color: #3498db;
    color: #fff;
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  .login_button:hover {
    background-color: #2980b9; /* New background color on hover */
  }
  button:hover {
    background-color: #2980b9;
  }

  .signup-link {
    margin-top: 15px;
    color: #555;
  }
  .btn {
    text-decoration: none;
    max-width: auto;
    background-color: rgb(98 84 243);
    color: rgb(255 255 255);
    width: 100%;
    border: none;

    text-align: center;
    cursor: pointer;
    border-radius: 5px;
    transition: all 0.3s ease;
    -webkit-transition: all 0.3s ease 0s;
    -moz-transition: all 0.3s ease 0s;
    -o-transition: all 0.3s ease 0s;

    &:hover,
    &:active {
      box-shadow: 0 2rem 2rem 0 rgb(132 144 255 / 30%);

      background-color: blue;
      transform: scale(0.96);
    }
  }
  .btn.disabled {
    pointer-events: none;
    opacity: 0.5;
  }
  .loader {
    border: 8px solid #f3f3f3;
    border-top: 8px solid blue;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    margin: 12px;
    animation: spin 2s linear infinite;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .colors4 {
    border-bottom: 8px solid red;
    border-right: 8px solid green;
    border-left: 8px solid pink;
  }
  .forget {
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
  }
  h3 {
    text-align: center;
    font-family: monospace;
    font-weight: bold;
    margin-top: 4px;

    margin-bottom: 7px;
  }
`;

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    otp: "",
  });
  const [errors, setErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(60); // Countdown in seconds (5 minutes)
  const [timerActive, setTimerActive] = useState(false);
  const [otpSent1, setOtpSent1] = useState(false);
  const [countdown1, setCountdown1] = useState(300); // Countdown in seconds (5 minutes)
  const [timerActive1, setTimerActive1] = useState(false);
  const [otpFieldDisabled, setOtpFieldDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessage1, setErrorMessage1] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setsucces] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const validateForm = () => {
    const newErrors = {};

    if (formData.full_name.length < 3) {
      newErrors.full_name = "Username must be at least 3 characters long";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);

    // Return true if there are no errors, indicating the form is valid
    return Object.keys(newErrors).length === 0;
  };
  useEffect(() => {
    let interval;

    if (timerActive) {
      interval = setInterval(() => {
        if (countdown > 0) {
          setCountdown((prevCountdown) => prevCountdown - 1);
        } else {
          setTimerActive(false);
          setOtpFieldDisabled(false);
          setOtpSent(false);
          setCountdown(60); // Reset countdown after 5 minutes
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [countdown, timerActive]);
  useEffect(() => {
    let interval;

    if (timerActive1) {
      interval = setInterval(() => {
        if (countdown1 > 0) {
          setCountdown1((prevCountdown) => prevCountdown - 1);
        } else {
          setTimerActive1(false);

          setOtpSent1(false);
          setCountdown1(300); // Reset countdown after 5 minutes
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [countdown1, timerActive1]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear validation errors on input change
  };

  const handleGetOTP = async () => {
    try {
      if (!formData.email) {
        setErrorMessage1("Please enter your email");
        return;
      }
      setOtpLoading(true);
      await axios.post("/generate-otp", { email: formData.email });
      setOtpSent(true);
      setTimerActive(true);
      setOtpSent1(true);
      setTimerActive1(true);
      setOtpFieldDisabled(false);
    } catch (error) {
      alert("Failed to send OTP");
    } finally {
      setOtpLoading(false); // Set loading to false after response (success or error)
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        setLoading(true);
        const response = await axios.post("/reg", formData);

        if (response.status === 201) {
          setsucces(response.data.message);
          navigate("/login");
        } else {
          setErrorMessage("Failed");
        }
      } catch (error) {
        if (error.response) {
          const { data, status } = error.response;

          if (status === 422) {
            setErrorMessage(data.error);
            // Show 'Please fill all fields'
          } else if (status === 404) {
            setErrorMessage(data.error);
            // Show 'OTP not found'
          } else if (status === 401) {
            setErrorMessage(data.error);
            // Show 'Invalid OTP' or 'OTP expired'
          } else if (status === 500) {
            setErrorMessage(data.error);
            // Show 'Registration failed'
          }
        } else {
          setErrorMessage("Network error occurred");

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
          <h3>Sign Up Here</h3>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="login_label" htmlFor="username">
                Username:
              </label>
              <input
                className="login_input"
                type="name"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
              />
              {errors.full_name && (
                <p className="error1"> {errors.full_name}</p>
              )}
            </div>
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
              <p className="error1">{errorMessage1}</p>
            </div>
            <div
              style={{ display: "flex", gap: "4px" }}
              className="input-group"
            >
              <input
                className="login_input"
                type="number"
                name="otp"
                placeholder="Enter the OTP"
                value={formData.otp}
                onChange={handleChange}
                disabled={otpFieldDisabled}
              />
              {/* <button
                className={`btn ${otpSent ? "disabled" : ""}`}
                onClick={handleGetOTP}
                disabled={otpSent}
              >
                {otpSent
                  ? `Resend OTP in ${Math.floor(countdown / 60)}:${(
                      "0" +
                      (countdown % 60)
                    ).slice(-2)}`
                  : "Get OTP"}
              </button> */}
              <button
                className={`btn ${otpSent ? "disabled" : ""}`}
                onClick={handleGetOTP}
                disabled={otpSent || otpLoading} // Disable button when OTP is sent or during loading
              >
                {otpLoading ? (
                  <div className="loader colors4" /> /* Show loader while loading */
                ) : otpSent ? (
                  `Resend OTP in ${Math.floor(countdown / 60)}:${(
                    "0" +
                    (countdown % 60)
                  ).slice(-2)}`
                ) : (
                  "Get OTP"
                )}
              </button>
            </div>
            {otpSent1 && (
              <p style={{ color: "green", fontWeight: "bold" }}>
                OTP sent to your email. Expires in {Math.floor(countdown1 / 60)}
                :{("0" + (countdown1 % 60)).slice(-2)}
              </p>
            )}
            <div className="input-group">
              <label className="login_label" htmlFor="password">
                Password:
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
              <p className="error1">{errorMessage}</p>
              <p className="succes">{success}</p>
            </div>
            <button className="login_button" type="submit" disabled={loading}>
              {loading ? (
                <div className="loader colors4" /> /* Show loader while loading */
              ) : (
                "Register"
              )}
            </button>
          </form>

          <p className="signup-link">
            Already have an account? <NavLink to="/login">Sign In</NavLink>
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default Register;
