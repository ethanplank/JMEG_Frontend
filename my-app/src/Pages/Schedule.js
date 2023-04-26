import React, { useState } from 'react';
import axios from 'axios';

const Schedule = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  
    const getSchedules = (event) => {
      event.preventDefault();
      axios.get(`http://localhost:8080/scheduleList`)
        .then((response) => {
          console.log(response.data);
          setResponse("hellow world");
          // console.log(response.data[0].title);
        })
        .catch((error) => {
          console.log(error);
          console.log("There's and error");
        });
    };
    return (
      <div onLoad={getSchedules}>
      <form onLoad={getSchedules}>
        
      </form>
        {response && <div className="response">{response}</div>}
      </div>
    )
  };
  export default Schedule;