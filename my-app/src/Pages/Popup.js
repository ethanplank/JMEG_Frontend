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
      <button onClick={handleClick}>View Details</button>
      {showPopup && popupData !== null &&
        <div>
          <h2 setQuery>{popupData}</h2>
          <button onClick={() => setShowPopup(false)}>Close</button>
        </div>
      }
    </div>
  );
}

export default Popup;

