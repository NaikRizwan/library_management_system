import React from "react";
import styled from "styled-components";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaYoutube,
  FaTwitter,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { MdEmail } from "react-icons/md";

const Wrapper = styled.section`
  .footer {
    background-color: black;
    color: #fff;
    padding: 30px 10px;
    font-family: Arial, sans-serif;
  }

  .social-media {
    display: flex;
    justify-content: center;
    border-bottom: 1px solid cornflowerblue;
    padding-bottom: 20px;
  }

  .social-icons a {
    color: #fff;
    font-size: 24px;
    margin: 0 10px;
    transition: color 0.3s ease;
  }

  .social-icons a:hover {
    color: #ccc;
  }

  .footer-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    max-width: 1200px;
    margin: 20px auto 0;
  }

  .footer-column {
    flex: 1 1 200px;
    padding: 20px;
  }

  .footer-heading {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .footer-column p,
  .footer-column a {
    margin-bottom: 10px;
    color: papayawhip;
    font-size: 14px;
    text-decoration: none;
  }

  .footer-column a {
    display: flex;
    align-items: center;
  }

  .footer-column a:hover {
    text-decoration: underline;
  }

  .footer-bottom {
    text-align: center;
    padding-top: 20px;
    border-top: 1px solid cornflowerblue;
  }

  p.a {
    color: papayawhip;
  }

  * a {
    color: papayawhip;
    text-decoration: none;
  }
`;

const Footer = () => {
  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const generateColoredLetters = () => {
    const text = "Library Management System";
    const coloredLetters = text.split("").map((letter, index) => {
      const color = generateRandomColor();
      return (
        <span key={index} style={{ color }}>
          {letter}
        </span>
      );
    });
    return coloredLetters;
  };

  return (
    <Wrapper>
      <footer className="footer">
        <section className="social-media">
          <div className="social-icons">
            <a
              href="https://www.facebook.com/thestationerycorner"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookSquare />
            </a>
            <a
              href="https://www.instagram.com/thestationerycorner"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagramSquare />
            </a>
            <a
              href="https://www.youtube.com/thestationerycorner"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube />
            </a>
            <a
              href="https://www.twitter.com/thestationerycorner"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
          </div>
        </section>

        <section className="footer-content">
          <div className="footer-column">
            <h6 className="footer-heading">{generateColoredLetters()}</h6>
            <p>
              Here you can use rows and columns to organize your footer content.
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </div>

          <div className="footer-column">
            <h6 className="footer-heading">Support</h6>
            <p>
              <a href="#!">
                <FaPhoneAlt /> Help Centre
              </a>
            </p>
            <p>
              <a href="#!">
                <FaPhoneAlt /> Cancellation options
              </a>
            </p>
            <p>
              <a href="#!">
                <FaPhoneAlt /> Disability support
              </a>
            </p>
            <p>
              <a href="#!">
                <FaPhoneAlt /> Anti-discrimination
              </a>
            </p>
          </div>

          <div className="footer-column">
            <h6 className="footer-heading">Useful Links</h6>
            <p>
              <a href="#!">
                <FaMapMarkerAlt /> About Us
              </a>
            </p>
            <p>
              <a href="#!">
                <FaMapMarkerAlt /> Contact Us
              </a>
            </p>
            <p>
              <a href="#!">
                <FaMapMarkerAlt /> Destination
              </a>
            </p>
            <p>
              <a href="#!">
                <FaMapMarkerAlt /> New Features
              </a>
            </p>
          </div>

          <div className="footer-column">
            <h6 className="footer-heading">Contact</h6>
            <p>
              <FaMapMarkerAlt />
              india , jammu and kashmir
            </p>
            <p>
              <FaEnvelope /> info@example.com
            </p>
            <p>
              <FaPhoneAlt /> 7051790026
            </p>
            <p>
              <FaPhoneAlt /> 6005341553
            </p>
          </div>
        </section>

        <div className="footer-bottom">
          <p style={{ color: "papayawhip", fontWeight: "bold" }}>
            &copy; 2023. All Rights Reserved. {generateColoredLetters()}
          </p>
        </div>
      </footer>
    </Wrapper>
  );
};

export default Footer;
