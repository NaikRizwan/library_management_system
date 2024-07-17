// import React, { useState } from "react";

// import { MdDashboard } from "react-icons/md";
// import { FaBox } from "react-icons/fa";
// import { GoHistory } from "react-icons/go";
// import { SiSimpleanalytics } from "react-icons/si";
// import AddTripForm from "../AddNewTrip";
// import AddsingleTrip from "../AddsingleTrip";
// // import ProductForm from "./ProductForm";
// // import UpdateOrderDetails from "./UpdateOrderDetails";
// // import Layout from "./Layout";
// // import AdminOrder from "./orders/AdminOrder";
// //import Orderadmin from "./orders/Orderadmin";
// import styled from "styled-components";
// import AdminLogin from "./AdminLogin";
// //import Chartdashboard from "./chart/Chartdashboard";
// import { MdAddCard } from "react-icons/md";
// import AdminDashboardProfile from "./AdminProfile";
// import NotificationPage from "./Notification";
// import { FiLogOut } from "react-icons/fi";
// import { CiDeliveryTruck } from "react-icons/ci";
// import { CgProfile } from "react-icons/cg";
// import { FaDatabase } from "react-icons/fa";
// import { FcFeedback } from "react-icons/fc";
// import { IoNotificationsCircleSharp } from "react-icons/io5";
// import { MdLocalOffer } from "react-icons/md";
// import { IoMdPersonAdd } from "react-icons/io";
// import FeedbackPage from "./FeedbackPage";
// import DeleteTripForm from "../DeleteTripForm";
// import DeleteSingleTripForm from "../DeleteSingleTripForm";
// // import BookingListPage from "../BookingListPage";
// import BookingTable from "../BookingTable";
// const Wrapper = styled.section`
//   @import url("https://fonts.googleapis.com/css?family=Roboto:300,400,400i,500");
//   * {
//     margin: 0;
//     list-style: none;
//     text-decoration: none;
//   }
//   body {
//     font-family: "Roboto", sans-serif;
//   }

//   .sidebar {
//     display: flex;
//     flex-direction: column;
//     gap: 8px;
//     width: 160px;
//     background: midnightblue;
//     border-radius: 10px;
//     margin-left: 19px;
//     margin-top: 17px;
//     padding: 9px;
//     padding-bottom: 40px;

//     height: 100%;
//     transition: all 0.5s ease;
//     box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//   }

//   .sidebar ul {
//     padding: 0;
//     margin: 0;
//   }

//   .sidebar ul li {
//     display: flex;
//     justify-content: flex-start;
//   }
//   .sidebar ul button {
//     width: 100%;
//     /* line-height: 65px; */
//     font-size: 14px;
//     color: white;
//     font-weight: bold;
//     background-color: midnightblue;

//     box-sizing: border-box;

//     padding: 11px;
//     margin-top: 8px;
//     border: none;
//     border-radius: 5px;

//     transition: all 0.3s ease;
//     flex: 1;
//     display: flex;
//     justify-content: flex-start;
//     align-items: center;
//     text-align: left;
//   }

//   .cont {
//     display: flex;
//   }

//   .sidebar ul button:hover {
//     background-color: #06506b;
//     color: #fff;
//   }

//   .profile-container {
//     // padding: 20px;
//     border-radius: 10px;
//     box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//     // margin: 20px;
//     margin-top: 19px;
//     width: 100%;
//     background-color: #f8f9fa;
//   }
// `;

// const Dashboard = () => {
//   const [selectedComponent, setSelectedComponent] = useState(<AddTripForm />);

//   const handleComponentChange = (componentName) => {
//     switch (componentName) {
//       case "AddsingleTrip":
//         setSelectedComponent(<AddsingleTrip />);
//         break;
//       case "DeleteTripForm":
//         setSelectedComponent(<DeleteTripForm />);
//         break;
//       case "AddTripForm":
//         setSelectedComponent(<AddTripForm />);
//         break;
//       case "DeleteSingleTripForm":
//         setSelectedComponent(<DeleteSingleTripForm />);
//         break;
//       case "AdminLogin":
//         setSelectedComponent(<AdminLogin />);
//         break;
//       // case "Chartdashboard":
//       //   setSelectedComponent(<Chartdashboard />);
//       //   break;
//       case "AdminDashboardProfile":
//         setSelectedComponent(<AdminDashboardProfile />);
//         break;
//       case "BookingTable":
//         setSelectedComponent(<BookingTable />);
//         break;
//       case "FeedbackPage":
//         setSelectedComponent(<FeedbackPage />);
//         break;
//       // Add cases for other components if needed
//       default:
//         setSelectedComponent(null);
//     }
//   };
//   return (
//     <Wrapper>
//       <div className="cont">
//         <div class="sidebar">
//           <ul>
//             <li>
//               <button onClick={() => handleComponentChange("AddTripForm")}>
//                 <MdDashboard style={{ color: "chartreuse" }} /> &nbsp; DashBoard
//               </button>
//             </li>
//             <li>
//               <button onClick={() => handleComponentChange("AddsingleTrip")}>
//                 <MdAddCard /> &nbsp; Add Single Trip
//               </button>
//             </li>
//             <li>
//               <button onClick={() => handleComponentChange("DeleteTripForm")}>
//                 <FaDatabase /> &nbsp; Delete Trip
//               </button>
//             </li>{" "}
//             {/*
//             <li>
//               <button onClick={() => handleComponentChange("Chartdashboard")}>
//                 <SiSimpleanalytics /> &nbsp; Analayitcs
//               </button>
//             </li> */}
//             <li>
//               <button onClick={() => handleComponentChange("AdminLogin")}>
//                 <IoMdPersonAdd /> &nbsp; Add Admin
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => handleComponentChange("DeleteSingleTripForm")}
//               >
//                 <CiDeliveryTruck /> &nbsp; delete single
//               </button>
//             </li>{" "}
//             {/*
//             <li>
//               <button
//                 onClick={() => handleComponentChange("AdminDashboardProfile")}
//               >
//                 <MdLocalOffer /> &nbsp; Offers
//               </button>
//             </li> */}
//             <li>
//               <button
//                 onClick={() => handleComponentChange("AdminDashboardProfile")}
//               >
//                 <CgProfile /> &nbsp; Profile
//               </button>
//             </li>
//             <li>
//               <button onClick={() => handleComponentChange("BookingTable")}>
//                 <IoNotificationsCircleSharp /> &nbsp; Table
//               </button>
//             </li>
//             <li>
//               <button onClick={() => handleComponentChange("FeedbackPage")}>
//                 <FcFeedback /> &nbsp; Feedback
//               </button>
//             </li>
//             <li>
//               <button onClick={() => handleComponentChange("ProductForm")}>
//                 <FiLogOut /> &nbsp; Logout
//               </button>
//             </li>
//           </ul>
//         </div>
//         <div className="profile-container"> {selectedComponent} </div>
//       </div>
//     </Wrapper>
//   );
// };

// export default Dashboard;
import React, { useState } from "react";
import { MdDashboard, MdAddCard, MdLocalOffer } from "react-icons/md";
import { FaBox, FaDatabase } from "react-icons/fa";
import { GoHistory } from "react-icons/go";
import { SiSimpleanalytics } from "react-icons/si";
import { IoNotificationsCircleSharp } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { CiDeliveryTruck } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { FcFeedback } from "react-icons/fc";
import styled from "styled-components";
import AdminLogin from "./AdminLogin";
import AdminDashboardProfile from "./AdminProfile";
import AddBookForm from "../books/AddBookForm";
import BookIssueForm from "../books/BookIssueForm";
import BookList from "../books/BookList";
import FetchBookIssues from "../books/FetchBookIssues";
const Wrapper = styled.section`
  @import url("https://fonts.googleapis.com/css?family=Roboto:300,400,400i,500");
  * {
    margin: 0;
    list-style: none;
    text-decoration: none;
  }
  body {
    font-family: "Roboto", sans-serif;
  }

  .sidebar {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 200px;
    background: #343a40;
    border-radius: 10px;
    margin: 20px;
    padding: 20px;
    height: 100vh;
    transition: all 0.5s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .sidebar ul {
    padding: 0;
    margin: 0;
  }

  .sidebar ul li {
    display: flex;
    justify-content: flex-start;
  }
  .sidebar ul button {
    width: 100%;
    font-size: 16px;
    color: white;
    font-weight: bold;
    background-color: #343a40;
    box-sizing: border-box;
    padding: 15px;
    margin-top: 10px;
    border: none;
    border-radius: 5px;
    transition: all 0.3s ease;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-align: left;
  }

  .cont {
    display: flex;
  }

  .sidebar ul button:hover {
    background-color: #495057;
    color: #fff;
  }

  .profile-container {
    flex-grow: 1;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin: 20px;
    background-color: #f8f9fa;
    padding: 20px;
  }

  .sidebar ul button svg {
    margin-right: 10px;
  }
`;

const Dashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState(
    <AdminDashboardProfile />
  );

  const handleComponentChange = (componentName) => {
    switch (componentName) {
      case "AddBookForm":
        setSelectedComponent(<AddBookForm />);
        break;
      case "BookIssueForm":
        setSelectedComponent(<BookIssueForm />);
        break;
      case "BookList":
        setSelectedComponent(<BookList />);
        break;
      case "FetchBookIssues":
        setSelectedComponent(<FetchBookIssues />);
        break;
      case "AdminLogin":
        setSelectedComponent(<AdminLogin />);
        break;
      case "AdminDashboardProfile":
        setSelectedComponent(<AdminDashboardProfile />);
        break;

      default:
        setSelectedComponent(null);
    }
  };

  return (
    <Wrapper>
      <div className="cont">
        <div className="sidebar">
          <ul>
            <li>
              <button
                onClick={() => handleComponentChange("AdminDashboardProfile")}
              >
                <CgProfile /> &nbsp; Admin Profile
              </button>
            </li>
            <li>
              <button onClick={() => handleComponentChange("AddBookForm")}>
                <CgProfile /> &nbsp; Add Book
              </button>
            </li>
            <li>
              <button onClick={() => handleComponentChange("BookIssueForm")}>
                <CgProfile /> &nbsp; Book Issue
              </button>
            </li>
            <li>
              <button onClick={() => handleComponentChange("BookList")}>
                <CgProfile /> &nbsp; Book List
              </button>
            </li>
            <li>
              <button onClick={() => handleComponentChange("FetchBookIssues")}>
                <CgProfile /> &nbsp; book status
              </button>
            </li>

            <li>
              <button onClick={() => handleComponentChange("ProductForm")}>
                <FiLogOut /> &nbsp; Logout
              </button>
            </li>
          </ul>
        </div>
        <div className="profile-container"> {selectedComponent} </div>
      </div>
    </Wrapper>
  );
};

export default Dashboard;
