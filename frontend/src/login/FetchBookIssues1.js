// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import axios from "axios";
// import { useUser } from "../context/UserContext";
// import styled from "styled-components";

// const Container = styled.div`
//   .alert {
//     margin-top: 1rem;
//   }
//   .card {
//     margin-top: 1rem;
//     background: rgba(255, 255, 255, 0.8);
//     border: none;
//     border-radius: 10px;
//     box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//   }
// `;

// const Title = styled.h3`
//   text-align: center;
//   margin-top: 1rem;
//   color: #343a40;
// `;

// const FetchBookIssues = () => {
//   const [bookIssues, setBookIssues] = useState([]);
//   const [error, setError] = useState("");
//   const { state } = useUser();

//   useEffect(() => {
//     const fetchBookIssues = async () => {
//       try {
//         const response = await axios.get(`/issues/${state.email}`);
//         setBookIssues(response.data);
//         setError("");
//       } catch (error) {
//         setError("Error fetching book issues. Please try again.");
//         setBookIssues([]);
//       }
//     };
//     fetchBookIssues();
//   }, [state.email]);

//   return (
//     <Container className="container mt-5" >
//       {error && <div className="alert alert-danger">{error}</div>}
//       {bookIssues.length > 0 && (
//         <div className="mt-3">
//           <Title>Book Issues</Title>
//           <div className="row">
//             {bookIssues.map((issue, index) => (
//               <div key={index} className="col-md-6">
//                 <div className="card">
//                   <div className="card-body">
//                     <strong>Full Name:</strong> {issue.fullName}
//                     <br />
//                     <strong>Contact Number:</strong> {issue.contactNumber}
//                     <br />
//                     <strong>Issue Date:</strong>{" "}
//                     {new Date(issue.issueDate).toLocaleDateString()}
//                     <br />
//                     <strong>Due Date:</strong>{" "}
//                     {new Date(issue.dueDate).toLocaleDateString()}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </Container>
//   );
// };

// export default FetchBookIssues;
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useUser } from "../context/UserContext";
import styled from "styled-components";

const Container = styled.div`
  .alert {
    margin-top: 1rem;
  }
  .card {
    margin-top: 1rem;
    background: rgba(255, 255, 255, 0.8);
    border: none;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
`;

const Title = styled.h3`
  text-align: center;
  margin-top: 1rem;
  color: #343a40;
`;

const NoIssues = styled.div`
  text-align: center;
  margin-top: 2rem;
  font-size: 1.2rem;
  color: #6c757d;
`;

const FetchBookIssues = () => {
  const [bookIssues, setBookIssues] = useState([]);
  const [error, setError] = useState("");
  const { state } = useUser();

  useEffect(() => {
    const fetchBookIssues = async () => {
      try {
        const response = await axios.get(`/issues/${state.email}`);
        setBookIssues(response.data);
        setError("");
      } catch (error) {
        setError("Error fetching book issues. Please try again.");
        setBookIssues([]);
      }
    };
    fetchBookIssues();
  }, [state.email]);

  return (
    <Container className="container mt-5">
      {error && <div className="alert alert-danger">{error}</div>}
      {bookIssues.length > 0 ? (
        <div className="mt-3">
          <Title>Book Issues</Title>
          <div className="row">
            {bookIssues.map((issue, index) => (
              <div key={index} className="col-md-6">
                <div className="card">
                  <div className="card-body">
                    <strong>Full Name:</strong> {issue.fullName}
                    <br />
                    <strong>Contact Number:</strong> {issue.contactNumber}
                    <br />
                    <strong>Issue Date:</strong>{" "}
                    {new Date(issue.issueDate).toLocaleDateString()}
                    <br />
                    <strong>Due Date:</strong>{" "}
                    {new Date(issue.dueDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ height: "100vh" }}>
          <NoIssues>No books issued.</NoIssues>
        </div>
      )}
    </Container>
  );
};

export default FetchBookIssues;
