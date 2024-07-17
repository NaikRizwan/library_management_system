import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const FetchBookIssues = () => {
  const [email, setEmail] = useState("");
  const [bookIssues, setBookIssues] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/issues/${email}`);
      setBookIssues(response.data);
      setError("");
    } catch (error) {
      setError("Error fetching book issues. Please try again.");
      setBookIssues([]);
    }
  };

  const handleRemove = async (issueId) => {
    try {
      const response = await axios.delete(`/issues/${email}/${issueId}`);
      setBookIssues(response.data);
      setError("");
    } catch (error) {
      setError("Error removing book issue. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Fetch Book Issues</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Fetch Book Issues
        </button>
      </form>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {bookIssues.length > 0 && (
        <div className="mt-3">
          <h3>Book Issues</h3>
          <ul className="list-group">
            {bookIssues.map((issue, index) => (
              <li key={index} className="list-group-item">
                <strong>Full Name:</strong> {issue.fullName}
                <br />
                <strong>Contact Number:</strong> {issue.contactNumber}
                <br />
                <strong>Issue Date:</strong>{" "}
                {new Date(issue.issueDate).toLocaleDateString()}
                <br />
                <strong>Due Date:</strong>{" "}
                {new Date(issue.dueDate).toLocaleDateString()}
                <br />
                <button
                  className="btn btn-danger mt-2"
                  onClick={() => handleRemove(issue._id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FetchBookIssues;
