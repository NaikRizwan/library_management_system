import React from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";

const Background = styled.div`
  background-image: url("https://d3nn873nee648n.cloudfront.net/900x600/19601/220-SM946388.jpg");
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

const WelcomeMessage = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  padding: 2rem;
  border-radius: 10px;
  text-align: center;

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.5rem;
  }
`;

const Home = () => {
  return (
    <Background>
      <WelcomeMessage>
        <h1>Welcome to the Library Management System</h1>
        <p>Manage and issue books with ease and efficiency.</p>
      </WelcomeMessage>
    </Background>
  );
};

export default Home;
