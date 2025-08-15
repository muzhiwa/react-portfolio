// src/components/Profile.jsx
import React from "react";
import "../styles/Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const skills = [
    "React",
    "JavaScript",
    "CSS3",
    "HTML5",
    "API",
    "Node.js",
    "Git",
    "SEO",
    "Bootstrap",
  ];

  return (
    <section id="about" className="profile-section">
      <div className="profile-content fade-in">
        <div className="profile-image-sm">
          <FontAwesomeIcon icon={faUser} className="profile-icon" />
        </div>

        <div className="profile-info">
          <h3>Frontend Developer</h3>
          <p>
            Passionate about creating interactive applications and experiences
            on the web. I specialize in building responsive, accessible, and
            performant interfaces using modern frontend technologies.
          </p>

          <div className="skills">
            {skills.map((skill) => (
              <span key={skill} className="skill-badge">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
