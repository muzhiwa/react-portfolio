
import React from "react";
import "../styles/ProjectCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faProjectDiagram,
  faStar,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card fade-in">
      <div className="project-image">
        <FontAwesomeIcon icon={faProjectDiagram} className="project-icon" />
        {project.featured && (
          <span className="featured-badge">
            <FontAwesomeIcon icon={faStar} /> Featured
          </span>
        )}
      </div>

      <div className="project-info">
        <h3>{project.name}</h3>
        <p>{project.description}</p>

        <div className="tech-stack">
          {project.techStack.map((tech) => (
            <span key={tech} className="tech-badge">
              {tech}
            </span>
          ))}
        </div>

        <div className="project-links">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            <FontAwesomeIcon icon={faExternalLinkAlt} /> Live Demo
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            <FontAwesomeIcon icon={faGithub} /> Source Code
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
