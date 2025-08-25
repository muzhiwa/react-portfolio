import React, { useState } from "react";
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
      techStack: ["CSS", "OpenWeather API", "JavaScript", "HTML", "Bootstrap"],
      featured: true,
      githubUrl: "https://github.com/muzhiwa/my-weather-app",
      liveUrl: "https://chic-peony-f9eeac.netlify.app/",
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

  // collect all unique skills
  const allSkills = [
    "All",
    ...new Set(projects.flatMap((project) => project.techStack)),
  ];

  const [selectedSkill, setSelectedSkill] = useState("All");

  // filter projects
  const filteredProjects =
    selectedSkill === "All"
      ? projects
      : projects.filter((p) => p.techStack.includes(selectedSkill));

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <h2 className="fade-in">My Projects</h2>
        <p className="projects-intro fade-in">
          Here are some of my recent works. Each project reflects my passion for
          clean design and efficient code.
        </p>

        {/* 🔎 Filter Buttons */}
        <div className="filter-buttons">
          {allSkills.map((skill) => (
            <button
              key={skill}
              className={`filter-btn ${
                selectedSkill === skill ? "active" : ""
              }`}
              onClick={() => setSelectedSkill(skill)}
            >
              {skill}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <p>No projects found for {selectedSkill}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
