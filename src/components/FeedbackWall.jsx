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
    reactions: { like: 3, love: 1, celebrate: 0 },
  },
  {
    id: 2,
    name: "Farwa Wafayi",
    rating: 4,
    comment: "Great design and smooth navigation. Keep it up!",
    date: new Date("2025-02-10").toISOString(),
    featured: false,
    reactions: { like: 1, love: 0, celebrate: 2 },
  },
  {
    id: 3,
    name: "Arezo Nazari",
    rating: 5,
    comment: "Really love your projects, especially the feedback wall!",
    date: new Date("2025-02-20").toISOString(),
    featured: true,
    reactions: { like: 5, love: 3, celebrate: 1 },
  },
];

const FeedbackWall = () => {
  const [feedbacks, setFeedbacks] = useState(() => {
    const savedFeedbacks = localStorage.getItem("portfolioFeedbacks");
    if (savedFeedbacks) {
      // Only migrate feedbacks from localStorage that don't have reactions
      const parsedFeedbacks = JSON.parse(savedFeedbacks);
      return parsedFeedbacks.map((feedback) =>
        feedback.reactions
          ? feedback
          : { ...feedback, reactions: { like: 0, love: 0, celebrate: 0 } }
      );
    }
    return defaultFeedbacks; // Return default feedbacks as-is
  });

  const [newFeedback, setNewFeedback] = useState({
    name: "",
    rating: 0,
    comment: "",
  });

  const [sortBy, setSortBy] = useState("newest");
  const [hoverRating, setHoverRating] = useState(0);
  const [errors, setErrors] = useState({});

  // Save feedbacks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("portfolioFeedbacks", JSON.stringify(feedbacks));
  }, [feedbacks]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFeedback((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleRatingClick = (rating) => {
    setNewFeedback((prev) => ({ ...prev, rating }));

    // Clear rating error when user selects a rating
    if (errors.rating) {
      setErrors((prev) => ({ ...prev, rating: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!newFeedback.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (newFeedback.rating === 0) {
      newErrors.rating = "Please select a rating";
    }

    if (!newFeedback.comment.trim()) {
      newErrors.comment = "Feedback message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const feedback = {
      ...newFeedback,
      id: Date.now(),
      date: new Date().toISOString(),
      featured: newFeedback.rating === 5,
      reactions: { like: 0, love: 0, celebrate: 0 },
    };

    setFeedbacks((prev) => [feedback, ...prev]);
    setNewFeedback({ name: "", rating: 0, comment: "" });
    setHoverRating(0);
    setErrors({});
  };

  const handleReaction = (feedbackId, reactionType) => {
    setFeedbacks((prev) =>
      prev.map((feedback) => {
        if (feedback.id === feedbackId) {
          return {
            ...feedback,
            reactions: {
              ...feedback.reactions,
              [reactionType]: (feedback.reactions[reactionType] || 0) + 1,
            },
          };
        }
        return feedback;
      })
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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

  const StarRating = ({
    rating,
    onRate,
    hoverRating,
    onHover,
    showError = false,
  }) => (
    <div className="star-rating-container">
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${
              star <= (hoverRating || rating) ? "active" : ""
            }`}
            onClick={() => onRate(star)}
            onMouseEnter={() => onHover(star)}
            onMouseLeave={() => onHover(0)}
          >
            <FontAwesomeIcon icon={faStar} />
          </span>
        ))}
      </div>
      {showError && errors.rating && (
        <span className="error-message">{errors.rating}</span>
      )}
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
              <label htmlFor="name">Your Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newFeedback.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className={errors.name ? "error" : ""}
              />
              {errors.name && (
                <span className="error-message">{errors.name}</span>
              )}
            </div>

            <div className="form-group">
              <label>Your Rating *</label>
              <StarRating
                rating={newFeedback.rating}
                onRate={handleRatingClick}
                hoverRating={hoverRating}
                onHover={setHoverRating}
                showError={true}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="comment">Your Feedback *</label>
            <textarea
              id="comment"
              name="comment"
              value={newFeedback.comment}
              onChange={handleInputChange}
              placeholder="Share your thoughts..."
              rows="3"
              className={errors.comment ? "error" : ""}
            />
            {errors.comment && (
              <span className="error-message">{errors.comment}</span>
            )}
          </div>

          <button type="submit" className="submit-feedback-btn">
            <FontAwesomeIcon icon={faStar} /> Submit Feedback
          </button>
        </form>

        {/* Sorting Controls */}
        {feedbacks.length > 0 && (
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
            <span className="feedback-count">
              ({feedbacks.length} feedbacks)
            </span>
          </div>
        )}

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
                  {formatDate(feedback.date)}
                </span>
                <span className="rating-badge">{feedback.rating}/5</span>
              </div>

              {/* Interactive Emoji Reactions with Counters */}
              <div className="emoji-reactions">
                <button
                  type="button"
                  className="emoji-btn"
                  onClick={() => handleReaction(feedback.id, "like")}
                  title="Like this feedback"
                >
                  👍{" "}
                  <span className="reaction-count">
                    {feedback.reactions.like}
                  </span>
                </button>
                <button
                  type="button"
                  className="emoji-btn"
                  onClick={() => handleReaction(feedback.id, "love")}
                  title="Love this feedback"
                >
                  ❤️{" "}
                  <span className="reaction-count">
                    {feedback.reactions.love}
                  </span>
                </button>
                <button
                  type="button"
                  className="emoji-btn"
                  onClick={() => handleReaction(feedback.id, "celebrate")}
                  title="Celebrate this feedback"
                >
                  🎉{" "}
                  <span className="reaction-count">
                    {feedback.reactions.celebrate}
                  </span>
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
