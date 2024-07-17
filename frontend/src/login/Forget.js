import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { Wrapper } from "./Register";
import { generateColoredLetters } from "./Nav";
const Forget = () => {
  const navigate = useNavigate();
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
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
  });

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
      setErrorMessage("Failed to send OTP");
    } finally {
      setOtpLoading(false); // Set loading to false after response (success or error)
    }
  };
  // const handleGetOTP = async () => {
  //   try {
  //     // Make a request to your backend to send OTP
  //     await axios.post("/generate-otp", { email: formData.email });
  //     alert("OTP sent to your email!");
  //   } catch (error) {
  //     alert("Failed to send OTP");
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post("/forget", formData);

      if (response.status === 200) {
        setsucces(response.data.message);
      } else {
        setErrorMessage("Failed");
      }
    } catch (error) {
      if (error.response) {
        const { data, status } = error.response;

        if (status === 422) {
          setErrorMessage(data.error);

          // Show 'Please fill all fields'
        } else if (status === 400) {
          setErrorMessage(data.error);
        } else if (status === 404) {
          setErrorMessage(data.error); // Show 'OTP not found'
        } else if (status === 401) {
          setErrorMessage(data.error); // Show 'Invalid OTP' or 'OTP expired'
        } else if (status === 500) {
          setErrorMessage(data.error); // Show 'Registration failed'
        }
      } else {
        setErrorMessage("Network error occurred");
        // Handle other network errors here
      }
    } finally {
      setLoading(false); // Set loading to false after response (success or error)
    }
  };

  return (
    <Wrapper>
      <div className="login-container">
        <div className="login-box">
          <h4 className="logo">{generateColoredLetters()}</h4>
          <h3>Forget Password</h3>
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
              <p className="error1">{errorMessage1}</p>
            </div>
            {/* <div
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
                required
              /> */}
            {/* <button className="btn" onClick={handleGetOTP}>
                Get OTP
              </button> */}

            {/* </div> */}
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
              <p className="error1">{errorMessage}</p>
              <p className="succes">{success}</p>
            </div>
            {/* <button className="login_button" type="submit">
              Forget Password
            </button> */}
            <button className="login_button" type="submit" disabled={loading}>
              {loading ? (
                <div className="loader colors4" /> /* Show loader while loading */
              ) : (
                "Forget Password"
              )}
            </button>
          </form>
          <p className="signup-link">
            Already have an account?{" "}
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
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>
            <button
              className="login_button"
              style={{ backgroundColor: "#2196f3" }}
              onClick={() => navigate("/changepass")}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Forget;
