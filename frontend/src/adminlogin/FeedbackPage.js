import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const Wrapper = styled.section`
  .feedback-container {
    text-align: center;
    padding: 20px;
  }

  .feedback-heading {
    color: #333;
    font-size: 18px;
    font-weight: bold;
  }

  .feedback-list {
    margin-top: 20px;
  }

  .feedback-item {
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
    margin-bottom: 15px;
  }

  .email-text {
    font-weight: bold;
    font-size: 18px;
    color: #007bff;
  }

  .feedback-text {
    font-size: 16px;
    color: #555;
  }

  .divider {
    border: 0.5px solid #ccc;
    margin: 10px 0;
  }
`;
const FeedbackPage = () => {
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get("/all-feedback"); // Replace with your backend route
        setFeedbackList(response.data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <Wrapper>
      <div className="feedback-container">
        <h3 className="feedback-heading">Feedback</h3>
        <div className="feedback-list">
          {feedbackList.map((feedback, index) => (
            <div className="feedback-item" key={index}>
              <p className="email-text">Email: {feedback.email}</p>
              <p className="feedback-text">Feedback: {feedback.feedback}</p>
              <hr className="divider" />
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default FeedbackPage;
