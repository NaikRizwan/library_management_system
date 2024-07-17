import React, { useState } from "react";
import axios from "axios";

const AdminGrant = () => {
  const [userId, setUserId] = useState("");

  const handleGrantAdmin = async () => {
    try {
      // Assuming you retrieve the userId from an input field
      // Here, 'userId' is the MongoDB ObjectId of the user you want to make an admin
      const response = await axios.put(`/grant-admin/${userId}`);

      console.log(response.data); // Log response if needed

      // Handle success message or perform necessary actions
    } catch (error) {
      console.error("Error:", error);
      // Handle error scenarios, display messages, etc.
    }
  };

  return (
    <div>
      <h2>Grant Admin Role</h2>
      <input
        type="text"
        placeholder="Enter User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={handleGrantAdmin}>Grant Admin</button>
    </div>
  );
};

export default AdminGrant;
