import React, { useState } from "react";
import axios from "axios";

function EventPopup({ event }) {
  const [popupData, setPopupData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (!isOpen) {
      axios
        .get(`http://localhost:8080/courseDetails?code=${event.query}`)
        .then((response) => {
          console.log(response.data);
          setPopupData(response.data);
          setIsOpen(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setIsOpen(false);
    }
  };

  return (
    <div>
      <div onClick={handleClick}>
        {event.title}
      </div>
      {isOpen && popupData !== null && (
        <div className="popup-overlay" onClick={handleClick}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <p>{popupData}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventPopup;

