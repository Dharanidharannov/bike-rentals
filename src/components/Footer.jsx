import React from 'react';
import logo from "/Bikelogo.png";
import "./Footer.css";

function Footer() {
  return (
    <div className="Footer">
      <div>
        <img src={logo} alt="logo" />
      </div>
      <div>
        <p>Contact Us</p>
        <p>Privacy Policy</p>
        <p>Terms and Conditions</p>
      </div>
      <div>
        <p>Offers</p>
        <p>List your bikes</p>
        <p>FAQS</p>
      </div>
      <div>
        <p>support@bikes.com</p>
        <p>+91 9998876543</p>
      </div>
    </div>
  );
}

export default Footer;