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
      image: "/images/invoice.png",
    },

    {
      id: 2,
      name: "Travel Bucket List",
      description:
        "Plan your dream trips, track visited places, and get AI-powered travel assistance all in one place.",
      techStack: ["React", "API", "Bootstrap", "CSS"],
      featured: true,
      githubUrl: "https://github.com/muzhiwa/travel-bucket",
      liveUrl: "https://travel-bucket-list-react.netlify.app/",
      image: "/images/travelPlanner.png",
    },

    {
      id: 3,
      name: "World Clock",
      description: "Browse real time zone of any city",
      techStack: ["JavaScript", "Moment.js", "HTML", "CSS"],
      featured: false,
      githubUrl: "https://github.com/muzhiwa/world-clock",
      liveUrl: "https://muzhda-world-clock.netlify.app/",
      image: "/images/clock.png",
    },

    {
      id: 4,
      name: "React Dictionary App",
      description:
        "Search for any word and see meanings, synonyms, photos, examples, phonetics...",
      techStack: ["API", "React", "CSS"],
      featured: true,
      githubUrl: "https://github.com/muzhiwa/dictionary-app",
      liveUrl: "https://muzhda-dictionary-app.netlify.app/",
      image: "/images/dictionary.png",
    },

    {
      id: 5,
      name: "Weather Forecast App",
      description: "Location-based weather application with 7-day forecasts",
      techStack: ["CSS", "OpenWeather API", "JavaScript", "HTML", "Bootstrap"],
      featured: false,
      githubUrl: "https://github.com/muzhiwa/my-weather-app",
      liveUrl: "https://chic-peony-f9eeac.netlify.app/",
      image: "/images/weather.png",
    },

    {
      id: 6,
      name: "AquaTrack",
      description:
        "Track your daily water usage, visualize it with graphs, and receive AI tips to reduce water consumption.",
      techStack: ["HTML", "Bootstrap", "CSS", "API", "JavaScript"],
      featured: true,
      githubUrl: "https://github.com/muzhiwa/AquaTrack",
      liveUrl: "https://aquatrack-muzhda.netlify.app/",
      image: "/images/aquatrack.png",
    },

    {
      id: 7,
      name: "PollyGlot",
      description:
        "An AI-powered web appplication designed to translate English text into French, Spanish, or Japanese.",
      techStack: ["React", "CSS", "API"],
      featured: true,
      githubUrl: "https://github.com/muzhiwa/PollyGlot/tree/new/",
      liveUrl: "https://pollyglot2-5vk.pages.dev/",
      image: "/images/pollyglot.png",
    },

    {
      id: 8,
      name: "New York",
      description:
        "Learn more about New York, see map locations of famous cafes, and beautiful photos",
      techStack: ["HTML", "CSS"],
      featured: false,
      githubUrl: "https://github.com/muzhiwa/new-york-travel-project",
      liveUrl: "https://new-york-travel-project.netlify.app/",
      image: "/images/new-york.png",
    },

    {
      id: 9,
      name: "Discover Afghanistan",
      description:
        "A website that showcases Afghan culture, music, art, food, traditions, clothing, and stories.",
      techStack: ["HTML", "Bootstrap", "CSS"],
      featured: true,
      githubUrl: "https://github.com/muzhiwa/dicover-afghanistan",
      liveUrl: "https://discover-afghanistan.netlify.app/",
      image: "/images/afganistan.png",
    },

    {
      id: 10,
      name: "AI Poem Generator",
      description: "Ask AI to write quote about any topic",
      techStack: ["JavaScript", "API", "CSS", "HTML"],
      featured: true,
      githubUrl: "https://github.com/muzhiwa/poem-generator",
      liveUrl: "https://muzhda-poem-generator.netlify.app/",
      image: "/images/poem.png",
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
