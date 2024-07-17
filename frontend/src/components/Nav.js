import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { FiLogIn } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import styled from "styled-components";
import logo from "../Designer (2).png";

const Navb = styled.nav`
  position: fixed;
  top: ${({ isScrolled }) => (isScrolled ? "0" : "28px")};
  width: 100%;
  z-index: 1000;
  transition: top 0.3s, background-color 0.3s;
  background-color: ${({ isScrolled }) =>
    isScrolled ? "currentColor" : "#2c3e50"};
  box-shadow: ${({ isScrolled }) =>
    isScrolled ? "0 2px 10px rgba(0, 0, 0, 0.1)" : "none"};

  .navbar-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 7px 20px;
  }
  .image_logo {
    width: 50px;
    border-color: chocolate;
    border-radius: 50%;
    border: 2px solid green;

    height: 50px;
  }
  .logo {
    font-size: 19px;
    font-weight: bold;
    color: white;
    font-family: monospace;
    background: linear-gradient(90deg, white, orange, green);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s;
  }

  .logo:hover {
    transform: scale(1.1);
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .nav-links a {
    color: white;
    text-decoration: none;
    font-family: system-ui;
    font-size: 16px;
    transition: color 0.3s;
  }

  .nav-links a:hover {
    color: #ffcc00;
  }

  .nav-links .active {
    color: #ffcc00;
    font-weight: bold;
  }

  .dropdown {
    position: relative;
  }

  .profile-dropdown {
    border: none;
    background-color: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  .profileimage {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: 2px solid #ffcc00;
  }

  .dropdown-content {
    position: absolute;
    top: 50px;
    right: 0;
    background-color: #343a40;
    border-radius: 5px;
    padding: 8px 0;
    min-width: 160px;
    z-index: 1;
    display: ${({ isOpen }) => (isOpen ? "block" : "none")};
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .dropdown-content a {
    color: #fff;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    transition: background-color 0.3s;
  }

  .dropdown-content a:hover {
    background-color: #007bff;
  }

  .nav-toggle {
    display: none;
    cursor: pointer;
    flex-direction: column;
    align-items: center;
  }

  .nav-toggle .bar {
    width: 25px;
    height: 3px;
    background-color: white;
    margin: 4px 0;
  }

  @media (max-width: 768px) {
    .nav-toggle {
      display: flex;
    }

    .nav-links {
      display: none;
      flex-direction: column;
      background-color: #343a40;
      width: 100%;
      position: absolute;
      top: 100%;
      left: 0;
      padding: 10px 0;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .nav-links.show {
      display: flex;
    }

    .nav-links a {
      color: #fff;
      margin: 10px 0;
      text-align: center;
    }
  }

  .logo-text {
    font-size: 27px; /* Adjust the size as needed */
    font-weight: bold;
    color: #333; /* Dark text color */
    font-family: "Arial", sans-serif; /* Choose a font family */
    background: linear-gradient(45deg, #ff6b6b, #f8e81c);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    position: relative;
    top: 6px;
    display: inline-block;
    padding: 5px 10px;
    // animation: glow 1.5s infinite alternate, slide-in 1s forwards;
  }

  @keyframes glow {
    from {
      text-shadow: 0 0 10px #ff6b6b, 0 0 20px #f8e81c, 0 0 30px #f8e81c,
        0 0 40px #f8e81c;
    }
    to {
      text-shadow: 0 0 20px #ff6b6b, 0 0 30px #f8e81c, 0 0 40px #f8e81c,
        0 0 50px #f8e81c;
    }
  }

  @keyframes slide-in {
    from {
      opacity: 0;
      transform: translateX(-100px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .logo-container:hover .logo-image {
    transform: scale(1.1);
  }

  .logo-container:hover .logo-text {
    animation: glow 1.5s infinite alternate, bounce 0.5s;
  }

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
`;

const Nav = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const { state, dispatch } = useUser();

  const callAbout = async () => {
    try {
      const response = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();
      if (response.status === 400 || !data) {
        dispatch({ type: "CLEAR_USER" });
      } else {
        dispatch({
          type: "SET_USER",
          payload: {
            name: data.full_name,
            email: data.email,
            role: data.role,
            img: data.profileImage,
          },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: "CLEAR_USER" });
    }
  };

  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    setIsScrolled(scrollTop > 0);
  };

  useEffect(() => {
    callAbout();
  }, [state.loggedIn]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Navb isScrolled={isScrolled}>
      <div className="container navbar-container">
        <NavLink exact to="/" activeClassName="active">
          <div>
            <img
              className="image_logo"
              src={
                "data:image/png;base64,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"
              }
              alt="logo"
            />
            <h1 className="logo-text">Library Management System</h1>
          </div>
        </NavLink>
        <div className="nav-toggle" onClick={toggleNav}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <div className={`nav-links ${isNavOpen ? "show" : ""}`}>
          {/* <NavLink exact to="/" activeClassName="active">
            Home
          </NavLink> */}

          {/* {state.loggedIn && state.role === "admin" && (
            <NavLink to="/admin" activeClassName="active">
              Admin
            </NavLink>
          )} */}
          {state.loggedIn ? (
            <div className="dropdown">
              <button className="profile-dropdown" onClick={toggleDropdown}>
                <img src={state.img} alt="Profile" className="profileimage" />
              </button>
              <div
                className="dropdown-content"
                style={{ display: isDropdownOpen ? "block" : "none" }}
              >
                {/* <NavLink to="/p" onClick={closeDropdown}>
                  <CgProfile /> My Profile
                </NavLink> */}
                {state.loggedIn && state.role === "admin" ? (
                  <NavLink to="/admin" activeClassName="active">
                    <CgProfile /> Admin
                  </NavLink>
                ) : (
                  <NavLink to="/p" onClick={closeDropdown}>
                    <CgProfile /> My Profile
                  </NavLink>
                )}
                <NavLink to="/logout" onClick={closeDropdown}>
                  <FiLogIn /> Logout
                </NavLink>
              </div>
            </div>
          ) : (
            <NavLink to="/login" activeClassName="active">
              <FiLogIn />
              &nbsp; Sign In
            </NavLink>
          )}
        </div>
      </div>
    </Navb>
  );
};

export default Nav;
