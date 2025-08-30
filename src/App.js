import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Profile from "./components/Profile";
import About from "./components/About";
import Projects from "./components/Projects";
import FeedbackWall from "./components/FeedbackWall"; // use this for dynamic route
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import NotificationModal from "./components/NotificationModal";
import ScrollProgress from "./components/ScrollProgress";

import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleFormSubmit = (message) => {
    setModalMessage(message);
    setShowModal(true);
    setTimeout(() => setShowModal(false), 3000);
  };

  return (
    <Router>
      <div className={`app ${darkMode ? "dark" : ""}`}>
        <ScrollProgress />
        <Navbar
          darkMode={darkMode}
          toggleDarkMode={() => setDarkMode(!darkMode)}
        />

        <Routes>
          {/* Home page */}
          <Route path="/" element={<Header />} />

          {/* About page */}
          <Route
            path="/about"
            element={
              <>
                <Profile />
                <About
                  showMore={showMore}
                  toggleShowMore={() => setShowMore(!showMore)}
                />
              </>
            }
          />

          {/* Projects page */}
          <Route
            path="/projects"
            element={
              <>
                <Projects />
                <FeedbackWall />
              </>
            }
          />

          {/* Contact page */}
          <Route
            path="/contact"
            element={<Contact onSubmit={handleFormSubmit} />}
          />
        </Routes>

        <Footer />

        {showModal && (
          <NotificationModal
            message={modalMessage}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
