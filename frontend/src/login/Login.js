// Login.js
import { NavLink, useNavigate } from "react-router-dom";

import { useUser } from "../context/UserContext";
import { Wrapper } from "./Register";
import React, { useState } from "react";
import { generateColoredLetters } from "./Nav";
// export const Wrapper = styled.section`
//   .login-container {
//     display: flex;
//     align-items: center;
//     justify-content: center;

//     background: url("https://d3nn873nee648n.cloudfront.net/1200x1800-new/20476/PK1048596.jpg")
//       center/cover no-repeat;
//   }
//   /* Apply animation to create a pulsating border effect */
//   @keyframes pulse {
//     0% {
//       border: 2px solid transparent;
//     }
//     50% {
//       border: 2px solid #3498db;
//     }
//     100% {
//       border: 2px solid transparent;
//     }
//   }

//   .login-box {
//     background-color: rgba(255, 255, 255, 0.8);
//     padding: 20px;
//     border-radius: 8px;
//     box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//     width: 400px;
//     height: 500px;
//     text-align: center;
//     margin-top: 30px;
//     margin-bottom: 30px;
//     animation: pulse 2s infinite; /* Apply the animation */
//   }
//   .forget {
//     display: flex;
//     gap: 5px;
//     margin-top: 7px;
//     margin-top: 7px;
//   }
//   .logo {
//     font-size: 24px;
//     font-weight: bold;
//     margin-bottom: 10px;
//     animation: bounce 5s infinite;
//   }
//   p.error1 {
//     color: red;
//     font-size: 14px;
//     margin-top: 0.2rem;
//   }
//   .error-msg {
//     color: red;
//     font-size: 14px;
//     margin-bottom: 5px;
//   }
//   form {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//   }

//   .input-group {
//     margin-bottom: 15px;
//     width: 100%;
//   }

//   .login_label {
//     display: block;
//     margin-bottom: 6px;
//     margin-top: 6px;
//     color: #555;
//     font-size: 15px;
//   }

//   .login_input {
//     width: 100%;
//     padding: 8px;
//     border: 1px solid #ccc;
//     border-radius: 4px;
//   }

//   .login_button {
//     background-color: #3498db;
//     color: #fff;
//     padding: 6px 12px;
//     border: none;
//     border-radius: 4px;
//     cursor: pointer;
//     transition: background-color 0.3s ease;
//   }
//   .login_button:hover {
//     background-color: #2980b9; /* New background color on hover */
//   }
//   button:hover {
//     background-color: #2980b9;
//   }

//   .signup-link {
//     margin-top: 15px;
//     color: #555;
//   }
// `;
const Login = () => {
  const navigate = useNavigate();
  const { dispatch } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [num1] = useState(Math.floor(Math.random() * 10)); // Generate random numbers
  const [num2] = useState(Math.floor(Math.random() * 10));
  const [captchaResult, setCaptchaResult] = useState("");
  const [error, setError] = useState("");
  const [success, setsucces] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSum = (e) => {
    e.preventDefault();
    const sum = num1 + num2;
    if (parseInt(captchaResult) === sum) {
      // CAPTCHA is correct, proceed with login
      handleSubmi(e);
    } else {
      setError("Wrong answer! Plz try again.");
    }
  };
  const handleSubmi = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/log", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (res.status === 400) {
        const data = await res.json();
        dispatch({ type: "CLEAR_USER" });
        if (data && data.error) {
          // Show specific error message sent from the server
          setError(data.error);
        } else {
          setError("Invalid credentials. Please try again.");
        }
      } else if (res.status === 200) {
        const data = await res.json();
        dispatch({
          type: "SET_USER",
          payload: {
            name: data.userlogin.full_name,
            email: data.userlogin.email,
          },
        });
        setsucces("succesfully Login");
        navigate("/");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } catch (error) {
      setError("Login failed. Please try again later.");
    } finally {
      setLoading(false); // Set loading to false after response (success or error)
    }
  };
  // const handleSubmi = async (e) => {
  //   e.preventDefault();
  //   const res = await fetch("/log", {
  //     method: "POST",
  //     credentials: "include",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       email,
  //       password,
  //     }),
  //   });
  //   const data = await res.json();

  //   if (res.status === 400 || !data) {
  //     dispatch({ type: "CLEAR_USER" });
  //     alert("invalid cariendtiols");
  //   } else {
  //     dispatch({
  //       type: "SET_USER",
  //       payload: {
  //         name: data.userlogin.full_name,
  //         email: data.userlogin.email,
  //       },
  //     });

  //     navigate("/");
  //   }
  // };
  return (
    <Wrapper>
      <div className="login-container">
        <div className="login-box">
          <h4 className="logo">{generateColoredLetters()}</h4>
          <h3>Login Here</h3>
          <form onSubmit={(e) => handleSum(e)}>
            <div className="input-group">
              <label className="login_label" htmlFor="email">
                Email:
              </label>
              <input
                className="login_input"
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label className="login_label" htmlFor="password">
                Password:
              </label>
              <input
                className="login_input"
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label
                style={{ fontWeight: "bold" }}
                className="login_label"
                htmlFor="captcha"
              >
                Solve the SUM: {num1} + {num2} =
              </label>
              <input
                className="login_input"
                type="number"
                id="captcha"
                name="captcha"
                value={captchaResult}
                onChange={(e) => setCaptchaResult(e.target.value)}
                required
              />
            </div>
            {error && <p className="error1">{error}</p>}
            {success && <p className="succes">{success}</p>}
            {/* <button className="login_button" type="submit">
              Login
            </button> */}
            <button className="login_button" type="submit" disabled={loading}>
              {loading ? (
                <div className="loader colors4" /> /* Show loader while loading */
              ) : (
                "Login"
              )}
            </button>
          </form>
          <p className="signup-link">
            Don't have an account?{" "}
            <NavLink
              to="/register"
              // className="navbar-link "
            >
              Sign Up
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

export default Login;
// Login.js
