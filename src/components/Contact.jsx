import React, { useState, useEffect } from "react";
import "../styles/Contact.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faUser,
  faEnvelope,
  faMessage,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

const Contact = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("contactFormData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("contactFormData", JSON.stringify(formData));
      setIsTyping(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [formData]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value.trim() ? "" : "Name is required";
      case "email":
        if (!value) return "Email is required";
        return validateEmail(value) ? "" : "Invalid email format";
      case "message":
        return value.trim() ? "" : "Message is required";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsTyping(true);

    if (name === "email") {
      const timer = setTimeout(() => {
        setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
      }, 400);
      return () => clearTimeout(timer);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      newErrors[key] = validateField(key, formData[key]);
    });

    setErrors(newErrors);

    if (!Object.values(newErrors).some((error) => error)) {
      onSubmit(`Thank you, ${formData.name}! Your message was sent.`);
      setFormData({ name: "", email: "", message: "" });
      localStorage.removeItem("contactFormData");
    }
  };

  const hasSavedData = Object.values(formData).some((value) => value);

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2 className="fade-in">Get In Touch</h2>

        {hasSavedData && (
          <div className="saved-data-hint fade-in">
            💾 You have unsent message data saved!
          </div>
        )}

        <div className="contact-content">
          <form className="contact-form fade-in" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">
                <FontAwesomeIcon icon={faUser} /> Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.name ? "error" : ""}
                placeholder="Your name"
              />
              {errors.name && (
                <span className="error-message">{errors.name}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <FontAwesomeIcon icon={faEnvelope} /> Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.email ? "error" : ""}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
              {isTyping && formData.email && !errors.email && (
                <span className="email-hint">✓ Valid email format</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="message">
                <FontAwesomeIcon icon={faMessage} /> Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.message ? "error" : ""}
                placeholder="Your message here..."
                rows="5"
              />
              {errors.message && (
                <span className="error-message">{errors.message}</span>
              )}
            </div>

            <button type="submit" className="submit-btn">
              <FontAwesomeIcon icon={faPaperPlane} /> Send Message
            </button>
          </form>

          <div className="live-preview fade-in">
            <h3>
              <FontAwesomeIcon icon={faPenToSquare} /> Live Preview
            </h3>
            <div className="preview-content">
              <p>
                <strong>From:</strong> {formData.name || "Anonymous"}
              </p>
              <p>
                <strong>Email:</strong> {formData.email || "Not provided"}
              </p>
              <div className="message-preview">
                {formData.message || "Start typing to see your message here..."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
