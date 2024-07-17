// AdminDashboardProfile.js

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { RiExchangeBoxLine } from "react-icons/ri";
import { RiLockPasswordFill } from "react-icons/ri";

import { IoMdPersonAdd } from "react-icons/io";
import { IoPersonRemove } from "react-icons/io5";
import { FcAddImage } from "react-icons/fc";
import axios from "axios";
const Wrapper = styled.section`
  /* Add your enhanced CSS styles here */

  /* Global Styles */
  body {
    font-family: "Arial", sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f9f9f9;
  }
  .profile-icon {
    position: relative;
    top: 2px;
    font-size: 14px;
  }
  /* Styles for the admin profile container */
  .admin-profile-container {
    width: 80%;
    margin: 20px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }

  /* Profile Info Layout */
  .profile-info-container {
    display: flex;
    width: 100%;
    align-items: center;

    padding-bottom: 20px;
  }

  /* Profile Image Styles */
  .profile-image {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    border: 5px solid #fff;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  }

  .profile-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* Update Profile Image Button */
  .update-profile-btn {
    padding: 10px 20px;
    margin-top: 15px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    margin-left: 15px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .update-profile-btn:hover {
    background-color: #45a049;
  }

  /* Username and Email Styles */
  .profile-details {
    width: 100%;
    padding-left: 20px;
    border-left: 1px solid #ddd; /* Adding a border between sections */
    box-shadow: 5px 0 10px rgba(0, 0, 0, 0.1); /* Adding box shadow */
    border-radius: 5px;
  }

  .profile-details p {
    font-size: 18px;
    font-weight: bold;
    color: #333;
  }

  .admin-actions {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;

    padding-bottom: 12px;

    border-bottom: 1px solid midnightblue;
  }

  /* Change Password Button */
  .change-password-btn,
  .forget-password-btn,
  .add-admin-btn,
  .remove-admin-btn {
    padding: 12px 24px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .change-password-btn {
    background-color: #2196f3;
    color: #fff;
  }

  .forget-password-btn {
    background-color: #f44336;
    color: #fff;
  }

  .add-admin-btn {
    background-color: #ff9800;
    color: #fff;
  }

  .remove-admin-btn {
    background-color: #e91e63;
    color: #fff;
  }

  /* Button hover effects */
  .change-password-btn:hover,
  .forget-password-btn:hover,
  .add-admin-btn:hover,
  .remove-admin-btn:hover,
  .update-profile-btn:hover {
    opacity: 0.9;
  }
  // .file-input {
  //   display: flex;
  //   jsutify-content: center;
  //   margin-top: 4px;
  // }
  .admin-users-container {
    text-align: center;
    padding: 20px;
  }

  h3 {
    text-align: center;
    font-family: monospace;
    font-weight: bold;

    border-bottom: 1px solid midnightblue;
    margin-bottom: 7px;
  }
  h4 {
    text-align: center;
    font-size: 12px;
    font-family: monospace;
    font-weight: bold;
  }
  .admin-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .admin-card {
    margin: 15px;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    width: 250px;
    background-color: #f9f9f9;
  }

  .admin-profile-image {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 10px;
  }

  .admin-details h3 {
    margin-bottom: 5px;
    font-size: 18px;
  }

  .admin-details p {
    color: #555;
    font-size: 14px;
  }
`;

const AdminDashboardProfile = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [showFileInput, setShowFileInput] = useState(false);
  const [adminUsers, setAdminUsers] = useState([]);
  const { state } = useUser();
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpdateImage = async () => {
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("email", state.email);

      // Make a POST request to your backend API endpoint to upload the image
      const response = await fetch("/upload-image", {
        method: "POST",
        body: formData,
        // Add any necessary headers, like authorization token if required
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        // dispatch({
        //   type: "SET_USER",
        //   payload: {
        //     name: data.full_name,
        //     email: data.email,
        //     role: data.role,
        //     img: data.profileImage,
        //   },
        // });
        // Handle success - maybe show a message to the user or update the UI
      } else {
        alert("not uploaded error");
        // Handle failure - show an error message or take appropriate action
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const toggleFileInput = () => {
    setShowFileInput(!showFileInput); // Toggle the file input visibility
  };
  useEffect(() => {
    const fetchAdminUsers = async () => {
      try {
        const response = await axios.get("/adminUsers"); // Replace with your backend route
        setAdminUsers(response.data);
      } catch (error) {
        console.error("Error fetching admin users:", error);
      }
    };

    fetchAdminUsers();
  }, []);
  return (
    <Wrapper>
      <div className="admin-profile-container">
        <h3>Your Profile Details Here</h3>
        {/* <div className="profile-info-container">
          <div style={{ width: "100%", marginLeft: "10%" }}>
            <div className="profile-image">
              <img src={state.img} alt="p" />
            </div>
            {!showFileInput ? (
              <button className="update-profile-btn" onClick={toggleFileInput}>
                Update Image
              </button>
            ) : (
              <button className="update-profile-btn" onClick={toggleFileInput}>
                Cancel
              </button>
            )}
            {showFileInput && (
              <div className="file-input">
                <input type="file" onChange={handleFileChange} />
                <button
                  style={{ marginLeft: "0px" }}
                  className="update-profile-btn"
                  onClick={handleUpdateImage}
                >
                  Save
                </button>
              </div>
            )}
          </div>
          <div className="profile-details">
            <p style={{ borderBottom: "1px solid #ddd" }}>
              Username:{state.name}
            </p>
            <p>Eamil:{state.email}</p>
          </div>
        </div> */}
        <div className="profile-info-container">
          <div
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <div className="profile-image">
              <img src={state.img} alt="p" />
            </div>
            <div className="admin-details">
              <h3>Username :{state.name}</h3>
              <p>Email: {state.email}</p>
            </div>
          </div>
        </div>

        {/* Admin Actions Buttons */}
        <div
          style={{ position: "relative", left: "40%", marginBottom: "50px" }}
        >
          {!showFileInput ? (
            <button className="update-profile-btn" onClick={toggleFileInput}>
              <FcAddImage className="profile-icon" /> Update Image
            </button>
          ) : (
            <button className="update-profile-btn" onClick={toggleFileInput}>
              Cancel
            </button>
          )}
          {showFileInput && (
            <div className="file-input">
              <input type="file" onChange={handleFileChange} />
              <button
                style={{ marginLeft: "0px" }}
                className="update-profile-btn"
                onClick={handleUpdateImage}
              >
                Save
              </button>
            </div>
          )}
        </div>
        <div className="admin-actions">
          <button
            className="add-admin-btn"
            onClick={() => navigate("/addadmin")}
          >
            {" "}
            <IoMdPersonAdd className="profile-icon" /> Add Admin
          </button>
          <button
            className="remove-admin-btn"
            onClick={() => navigate("/removeadmin")}
          >
            <IoPersonRemove /> Remove Admin
          </button>
          <button
            className="change-password-btn"
            onClick={() => navigate("/changepass")}
          >
            <RiExchangeBoxLine className="profile-icon" />
            Change Password
          </button>
          <button
            className="forget-password-btn"
            onClick={() => navigate("/forget")}
          >
            {" "}
            <RiLockPasswordFill className="profile-icon" /> Forget Password
          </button>
          <button
            className="remove-admin-btn"
            onClick={() => navigate("/logout")}
          >
            {" "}
            <RiLogoutCircleRLine className="profile-icon" />
            Logout
          </button>
        </div>
        <div className="admin-users-container">
          <h4> All Admin Details Here </h4>
          <div className="admin-list">
            {adminUsers.map((user) => (
              <div className="admin-card" key={user._id}>
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="admin-profile-image"
                />
                <div className="admin-details">
                  <h3>{user.full_name}</h3>
                  <p>Email: {user.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Admin Actions Buttons */}
      </div>
    </Wrapper>
  );
};

export default AdminDashboardProfile;
