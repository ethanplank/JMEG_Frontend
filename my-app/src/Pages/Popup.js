import React, { useState } from 'react';
import axios from 'axios';

function Popup(props) {
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState('');

  const handleClick = () => {
    axios.get(`http://localhost:8080/courseDetails?code=${props.query}`)
      .then(response => {
        setPopupData(response.data);
        setShowPopup(true);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <button onClick={handleClick}>View Details</button>
      {showPopup &&
        <div>
          <h2>{popupData.crs_title}</h2>
          <button onClick={() => setShowPopup(false)}>Close</button>
        </div>
      }
    </div>
  );
}

export default Popup;