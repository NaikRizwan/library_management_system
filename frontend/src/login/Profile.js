import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  RiLogoutCircleRLine,
  RiExchangeBoxLine,
  RiLockPasswordFill,
} from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { FcAddImage } from "react-icons/fc";
import { MdEmail, MdPerson } from "react-icons/md";
import { useUser } from "../context/UserContext";
import "bootstrap/dist/css/bootstrap.min.css";

const Profile = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [showFileInput, setShowFileInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useUser();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpdateImage = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("email", state.email);

      const response = await fetch("/upload-image", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        window.location.reload(); // Refresh the page
      } else {
        alert("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFileInput = () => {
    setShowFileInput(!showFileInput);
  };

  return (
    <div className="container mt-5  mb-4">
      <div className="card p-4 shadow-lg">
        <h3 className="text-center mb-4">Your Profile Details</h3>
        <div className="d-flex justify-content-center mb-4">
          <div className="text-center">
            <div className="profile-image mb-3 position-relative">
              <img
                src={state.img}
                alt="Profile"
                className="rounded-circle"
                style={{ width: "150px", height: "150px" }}
              />
            </div>
            <h4 className="mb-1">
              <MdPerson /> Username: {state.name}
            </h4>
            <p className="text-muted">
              <MdEmail /> Email: {state.email}
            </p>
          </div>
        </div>

        <div className="d-flex justify-content-center mb-4">
          {!showFileInput ? (
            <button className="btn btn-success" onClick={toggleFileInput}>
              <FcAddImage /> Update Image
            </button>
          ) : (
            <button className="btn btn-danger" onClick={toggleFileInput}>
              Cancel
            </button>
          )}
        </div>

        {showFileInput && (
          <div className="text-center mb-4">
            <input
              type="file"
              onChange={handleFileChange}
              className="form-control-file mb-2"
            />
            <button
              className="btn btn-primary"
              onClick={handleUpdateImage}
              disabled={isLoading}
            >
              {isLoading ? "Uploading..." : "Save"}
            </button>
          </div>
        )}

        <div className="d-flex justify-content-around flex-wrap mt-4">
          <button
            className="btn btn-warning mb-2"
            onClick={() => navigate("/fetchuser")}
          >
            <RxDashboard className="mb-1" /> My Books
          </button>
          <button
            className="btn btn-danger mb-2"
            onClick={() => navigate("/fetchbook")}
          >
            <RiLockPasswordFill className="mb-1" /> Book List
          </button>
          <button
            className="btn btn-info mb-2"
            onClick={() => navigate("/changepass")}
          >
            <RiExchangeBoxLine className="mb-1" /> Change Password
          </button>
          <button
            className="btn btn-danger mb-2"
            onClick={() => navigate("/forget")}
          >
            <RiLockPasswordFill className="mb-1" /> Forget Password
          </button>
          <button
            className="btn btn-secondary mb-2"
            onClick={() => navigate("/logout")}
          >
            <RiLogoutCircleRLine className="mb-1" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
