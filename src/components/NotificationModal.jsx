import React, { useEffect } from "react";
import "../styles/NotificationModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimes } from "@fortawesome/free-solid-svg-icons";

const NotificationModal = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className="modal-icon">
          <FontAwesomeIcon icon={faCheckCircle} />
        </div>
        <h3>Message Sent!</h3>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default NotificationModal;
