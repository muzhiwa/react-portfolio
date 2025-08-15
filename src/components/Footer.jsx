import React from "react";
import "../styles/Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedinIn,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const socialLinks = [
    { icon: faGithub, url: "https://github.com/muzhiwa", label: "GitHub" },
    {
      icon: faLinkedinIn,
      url: "https://www.linkedin.com/in/muzhda-wafa-b78582321",
      label: "LinkedIn",
    },
    {
      icon: faInstagram,
      url: "https://www.instagram.com/muzhdawafa?igsh=d3htbHc5azY1azM4",
      label: "Instagram",
    },
    {
      icon: faEnvelope,
      url: "mailto:contact@muzhdawafa27@gmail.com",
      label: "Email",
    },
  ];

  return (
    <footer id="contact" className="footer">
      <div className="footer-content fade-in">
        <h2>Let's Connect</h2>
        <div className="social-links">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label={social.label}
            >
              <FontAwesomeIcon icon={social.icon} />
            </a>
          ))}
        </div>
        <div className="copyright">
          &copy; {new Date().getFullYear()} Muzhda Wafa. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
