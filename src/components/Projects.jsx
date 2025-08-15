
import React from "react";
import ProjectCard from "./ProjectCard";
import "../styles/Projects.css";

const Projects = () => {
  const projects = [
    {
      id: 1,
      name: "Freelance Invoice App",
      description:
        "Interactive analytics dashboard for freelancers to manage invoices and clients",
      techStack: ["JavaScript", "HTML", "CSS"],
      featured: true,
      githubUrl: "https://github.com/muzhiwa/freelance-invoice-app",
      liveUrl: "https://muzhda-freelance-invoice-app.netlify.app/",
    },
    {
      id: 2,
      name: "World Clock",
      description: "Browse real time zone of any city",
      techStack: ["JavaScript", "Moment.js", "HTML", "CSS"],
      featured: true,
      githubUrl: "https://github.com/muzhiwa/world-clock",
      liveUrl: "https://muzhda-world-clock.netlify.app/",
    },
    {
      id: 3,
      name: "Weather Forecast App",
      description: "Location-based weather application with 7-day forecasts",
      techStack: ["CSS", "OpenWeather API", "JavaScript", "HTML", "Boostrap"],
      featured: true,
      githubUrl: "https://chic-peony-f9eeac.netlify.app/",
      liveUrl: "https://github.com/muzhiwa/my-weather-app",
    },
    {
      id: 4,
      name: "AI Poem Generator",
      description: "Ask AI to write quote about any topic",
      techStack: ["JavaScript", "API", "CSS", "HTML"],
      featured: true,
      githubUrl: "https://github.com/muzhiwa/poem-generator",
      liveUrl: "https://muzhda-poem-generator.netlify.app/",
    },
    {
      id: 5,
      name: "React Dictionary App",
      description:
        "Search for any word and see meanings, synonyms, photos, examples, phonetics...",
      techStack: ["API", "React", "CSS"],
      featured: true,
      githubUrl: "https://github.com/muzhiwa/dictionary-app",
      liveUrl: "https://muzhda-dictionary-app.netlify.app/",
    },
    {
      id: 6,
      name: "New York",
      description:
        "Learn more about New York, see map locations of famous cafes, and beautiful photos",
      techStack: ["HTML", "CSS"],
      featured: false,
      githubUrl: "https://github.com/muzhiwa/new-york-travel-project",
      liveUrl: "https://new-york-travel-project.netlify.app/",
    },
  ];

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <h2 className="fade-in">My Projects</h2>
        <p className="projects-intro fade-in">
          Here are some of my recent works. Each project reflects my passion for
          clean design and efficient code.
        </p>

        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
