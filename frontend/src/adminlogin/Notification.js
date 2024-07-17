// NotificationPage.js

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
const Wrapper = styled.section`
  /* NotificationPage.css */
  .notification-total {
    font-size: 20px;
    margin-bottom: 10px;
    text-align: center;
    color: #777;
  }

  .button-delete {
    background-color: #ff5c5c;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .button-delete:hover {
    background-color: #ff3a3a;
  }
  /* Global Styles */
  body {
    font-family: "Arial", sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f9f9f9;
  }

  /* Notification Page Styles */
  .notification-page {
    width: 80%;
    margin: 20px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .notification-page h1 {
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 28px;
    color: #333;
    text-align: center;
  }

  .notification-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .notification-item {
    display: flex;
    align-items: center;
    padding: 15px;
    border-radius: 5px;
    background-color: #f0f0f0;
    transition: background-color 0.3s ease;
  }

  .notification-item:hover {
    background-color: #e0e0e0;
  }

  .notification-icon {
    margin-right: 15px;
    font-size: 24px;
  }

  .notification-content p {
    margin: 0;
    color: #444;
    font-size: 18px;
  }

  /* Add different styles based on your specific notification types */
  /* Example: Different background colors for different notification types */
  .notification-item.new-order {
    background-color: #f5fffa; /* Light green for new orders */
  }

  .notification-item.payment-successful {
    background-color: #e6f7ff; /* Light blue for payment successful */
  }

  .notification-item.item-shipped {
    background-color: #fff9e6; /* Light yellow for shipped items */
  }

  /* You can add more specific styles for various notification types */
`;

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);

  // Function to fetch notifications
  const fetchNotifications = async () => {
    try {
      const response = await axios.get("/notification"); // Replace with your backend endpoint
      setNotifications(response.data); // Update notifications state with fetched data
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    // Fetch notifications when the component mounts or when there's a change in notifications
    fetchNotifications();
  }, []); // Empty dependency array ensures this effect runs only once

  // Function to handle deletion of a notification
  const handleDeleteNotification = async (id) => {
    try {
      await axios.delete(`/notification/${id}`); // Replace with your backend delete endpoint
      // Fetch updated notifications after deletion
      fetchNotifications();
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  return (
    <Wrapper>
      <div className="notification-page">
        <h1>Notifications</h1>
        <div className="notification-total">
          Total Notifications: {notifications.length}
        </div>
        <div className="notification-list">
          {notifications.map((notification, index) => (
            <div key={index} className="notification-item">
              {/* Display notification content */}
              <div className="notification-content">
                <p>Email: {notification.email}</p>
                <p>Date: {new Date(notification.createdAt).toLocaleString()}</p>
              </div>
              {/* Delete button for each notification */}
              <button
                className="button-delete"
                onClick={() => handleDeleteNotification(notification._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default NotificationPage;
// const NotificationPage = () => {
//   const [notifications, setNotifications] = useState([
//     { id: 1, message: "New order received" },
//     { id: 2, message: "Payment successful" },
//     { id: 3, message: "Item shipped" },
//     // ... other notifications
//   ]);

//   return (
//     <Wrapper>
//       <div className="notification-page">
//         <h1>Notifications</h1>
//         <div className="notification-list">
//           {notifications.map((notification) => (
//             <div key={notification.id} className="notification-item">
//               <div className="notification-icon">
//                 {/* Icon or indicator for different types of notifications */}
//                 <span role="img" aria-label="Notification">
//                   📣
//                 </span>
//               </div>
//               <div className="notification-content">
//                 <p>{notification.message}</p>
//                 {/* Additional information or actions related to the notification */}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </Wrapper>
//   );
// };

// export default NotificationPage;
