import React, { useState, useEffect } from "react";
import "../styles/FeedbackWall.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faFilter } from "@fortawesome/free-solid-svg-icons";

const defaultFeedbacks = [
  {
    id: 1,
    name: "Fatima Ali",
    rating: 5,
    comment: "Amazing portfolio! Very inspiring work 💯",
    date: new Date("2025-01-15").toISOString(),
    featured: true,
  },
  {
    id: 2,
    name: "Farwa Wafayi",
    rating: 4,
    comment: "Great design and smooth navigation. Keep it up!",
    date: new Date("2025-02-10").toISOString(),
    featured: false,
  },
  {
    id: 3,
    name: "Arzo Nazari",
    rating: 5,
    comment: "Really love your projects, especially the feedback wall!",
    date: new Date("2025-02-20").toISOString(),
    featured: true,
  },
];

const FeedbackWall = () => {
  const [feedbacks, setFeedbacks] = useState(() => {
    const savedFeedbacks = localStorage.getItem("portfolioFeedbacks");
    return savedFeedbacks ? JSON.parse(savedFeedbacks) : defaultFeedbacks;
  });

  const [newFeedback, setNewFeedback] = useState({
    name: "",
    rating: 0,
    comment: "",
  });
  const [sortBy, setSortBy] = useState("newest");
  const [hoverRating, setHoverRating] = useState(0);

  // Save feedbacks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("portfolioFeedbacks", JSON.stringify(feedbacks));
  }, [feedbacks]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFeedback((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingClick = (rating) => {
    setNewFeedback((prev) => ({ ...prev, rating }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newFeedback.name && newFeedback.rating > 0 && newFeedback.comment) {
      const feedback = {
        ...newFeedback,
        id: Date.now(),
        date: new Date().toISOString(),
        featured: newFeedback.rating === 5,
      };

      setFeedbacks((prev) => [feedback, ...prev]);
      setNewFeedback({ name: "", rating: 0, comment: "" });
      setHoverRating(0);
    }
  };

  const sortedFeedbacks = [...feedbacks].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.date) - new Date(a.date);
      case "oldest":
        return new Date(a.date) - new Date(b.date);
      case "highest":
        return b.rating - a.rating;
      case "lowest":
        return a.rating - b.rating;
      default:
        return 0;
    }
  });

  const StarRating = ({ rating, onRate, hoverRating, onHover }) => (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= (hoverRating || rating) ? "active" : ""}`}
          onClick={() => onRate(star)}
          onMouseEnter={() => onHover(star)}
          onMouseLeave={() => onHover(0)}
        >
          <FontAwesomeIcon icon={faStar} />
        </span>
      ))}
    </div>
  );

  return (
    <section id="feedback" className="feedback-section">
      <div className="container">
        <h2 className="fade-in">Visitor Feedback Wall</h2>
        <p className="section-subtitle fade-in">
          Share your thoughts about my portfolio and projects
        </p>

        {/* Feedback Form */}
        <form className="feedback-form fade-in" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newFeedback.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="form-group">
              <label>Your Rating</label>
              <StarRating
                rating={newFeedback.rating}
                onRate={handleRatingClick}
                hoverRating={hoverRating}
                onHover={setHoverRating}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="comment">Your Feedback</label>
            <textarea
              id="comment"
              name="comment"
              value={newFeedback.comment}
              onChange={handleInputChange}
              placeholder="Share your thoughts..."
              rows="3"
              required
            />
          </div>

          <button type="submit" className="submit-feedback-btn">
            <FontAwesomeIcon icon={faStar} /> Submit Feedback
          </button>
        </form>

        {/* Sorting Controls */}
        <div className="sort-controls fade-in">
          <FontAwesomeIcon icon={faFilter} />
          <span>Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
          </select>
        </div>

        {/* Feedback Cards Grid */}
        <div className="feedback-grid">
          {sortedFeedbacks.map((feedback, index) => (
            <div
              key={feedback.id}
              className={`feedback-card fade-in ${
                feedback.featured ? "featured" : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {feedback.featured && (
                <div className="featured-badge-feedback">
                  <FontAwesomeIcon icon={faStar} /> Featured
                </div>
              )}

              <div className="feedback-header">
                <h4>{feedback.name}</h4>
                <div className="rating">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={i < feedback.rating ? "star active" : "star"}
                    >
                      <FontAwesomeIcon icon={faStar} />
                    </span>
                  ))}
                </div>
              </div>

              <p className="feedback-comment">"{feedback.comment}"</p>

              <div className="feedback-footer">
                <span className="feedback-date">
                  {new Date(feedback.date).toLocaleDateString()}
                </span>
                <span className="rating-badge">{feedback.rating}/5</span>
              </div>

              {/* Interactive Emoji Reactions */}
              <div className="emoji-reactions">
                <button type="button" className="emoji-btn">
                  👍
                </button>
                <button type="button" className="emoji-btn">
                  ❤️
                </button>
                <button type="button" className="emoji-btn">
                  🎉
                </button>
              </div>
            </div>
          ))}
        </div>

        {feedbacks.length === 0 && (
          <div className="empty-state fade-in">
            <div className="empty-icon">💬</div>
            <h3>No feedback yet</h3>
            <p>Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeedbackWall;
