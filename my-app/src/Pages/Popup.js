import React, { useState } from 'react';
import axios from 'axios';

function Popup(props) {
//   const [query, setQuery] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState(null);

  const handleClick = () => {
    axios.get(`http://localhost:8080/courseDetails?code=${props.query}`)
      .then(response => {
        console.log(response.data)
        setPopupData(response.data);
        setShowPopup(true);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <button type="button" class="btn btn-light" onClick={handleClick} size="50">View Details</button>
      {showPopup && popupData !== null &&
        <div>
          <p setQuery>{popupData}</p>
          <button type="button" class="btn btn-secondary" onClick={() => setShowPopup(false)}>Close</button>

        </div>
      }
    </div>
  );
}

export default Popup;

