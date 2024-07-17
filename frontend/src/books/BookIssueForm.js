import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const BookIssueForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    issueDate: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dueDate = new Date(formData.issueDate);
    dueDate.setMonth(dueDate.getMonth() + 3);

    const data = {
      ...formData,
      dueDate: dueDate.toISOString().split("T")[0],
    };

    try {
      await axios.post("/issue", data);
      alert("Book issued successfully");
    } catch (error) {
      console.error("There was an error issuing the book!", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Issue Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            className="form-control"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Contact Number</label>
          <input
            type="text"
            className="form-control"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Issue Date</label>
          <input
            type="date"
            className="form-control"
            name="issueDate"
            value={formData.issueDate}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Issue Book
        </button>
      </form>
    </div>
  );
};

export default BookIssueForm;
