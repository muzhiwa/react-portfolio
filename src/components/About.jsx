
import React from "react";
import "../styles/About.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGuitar,
  faGlobeAmericas,
  faBook,
  faBiking,
  faCoffee,
} from "@fortawesome/free-solid-svg-icons";

const About = ({ showMore, toggleShowMore }) => {
  const hobbies = [
    { icon: faGuitar, text: "Playing guitar in my spare time" },
    {
      icon: faGlobeAmericas,
      text: "Learning about different cultures",
    },
    { icon: faBook, text: "Reading novels" },
    { icon: faBiking, text: "Biking lover" },
    { icon: faCoffee, text: "Specialty coffee enthusiast" },
  ];

  return (
    <section className="about-section">
      <div className="about-content fade-in">
        <div className="about-text">
          <h2>My Journey</h2>
          <p>
            I'm a self-taught developer with 2 years of experience building
            responsive websites. Currently I am a studnt at CodeWeekend learning
            advanced react and modern CSS techniques.
          </p>
          <p>
            My core focus is on creating accessible, inclusive digital products
            that solve real problems while providing delightful user
            experiences.
          </p>

          {showMore && (
            <>
              <p>
                I'm currently diving deeper into TypeScript and learning backend
                development with Node.js to become a full-stack developer.
              </p>
              <p>
                My long-term goal is to contribute to open-source projects that
                make web development more accessible to underrepresented
                communities.
              </p>
            </>
          )}

          <button onClick={toggleShowMore} className="toggle-btn">
            {showMore ? "Show Less" : "Show More"}
          </button>
        </div>

        <div className="hobbies-section fade-in">
          <h3>Fun Facts & Hobbies</h3>
          <ul className="hobbies">
            {hobbies.map((hobby, index) => (
              <li key={index}>
                <FontAwesomeIcon icon={hobby.icon} className="hobby-icon" />
                <span>{hobby.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
