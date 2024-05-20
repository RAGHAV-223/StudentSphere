// Footer.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom if you're using it for navigation
import "./footer.css"

const Footer = () => {
  return (
    <footer className="container-fluid footer_section">
      <div className="container">
        <div className="row">
          <div className="col-lg-7 col-md-9 mx-auto">
            <p>&copy; @2024 StudentSphere
                      All Rights Reserved</p>
            <ul>
              <li>
                <Link to="/about">About Us</Link> 
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
