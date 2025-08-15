import React, { useState, useEffect } from "react";
import "../styles/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [quote, setQuote] = useState("");

  const quotes = [
    "Code is like humor. When you have to explain it, it's bad.",
    "First, solve the problem. Then, write the code.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "The only way to learn a new programming language is by writing programs in it.",
    "Programming isn't about what you know; it's about what you can figure out.",
  ];

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <header id="home" className="header">
      <div className="bg-element bg-1"></div>
      <div className="bg-element bg-2"></div>

      <div className="header-content">
        <div className="header-text fade-in">
          <h1>
            Hi, I'm <span>Muzhda Wafa</span>
          </h1>
          <h2>Frontend Developer & UI/UX Enthusiast</h2>
          <p className="quote">"{quote}"</p>

          <div className="header-buttons">
            <a href="#projects" className="btn btn-primary">
              View Projects
            </a>
            <a href="#contact" className="btn btn-outline">
              Contact Me
            </a>
          </div>
        </div>

        <div className="header-image fade-in">
          <div className="profile-image">
            <FontAwesomeIcon icon={faCode} className="code-icon" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
