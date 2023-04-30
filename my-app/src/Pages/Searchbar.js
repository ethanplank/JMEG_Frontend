import React, { useState } from 'react';
import axios from 'axios';
import "./Searchbar.css";
import Popup from "./Popup"

const Searchbar = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    axios.get(  `http://localhost:8080/search?code=${query}`)
      .then((response) => {
        console.log(response);
        const data = response.data;

        //const dataMap = data.map((d) => <li key={d.crs_code}>{d.crs_code}</li>);
        const dataMap = data.map((d) => 
        <div id="mydiv"><table><tr><div>
          <dir key={d.crs_title}>{d.crs_title}</dir>
          <dir key={d.crs_code}>{d.crs_code}</dir>          
          <button onClick={createFunction(d.crs_code)} size="50">Add This Class</button>
          <Popup query={d.crs_code}></Popup>
          </div></tr></table>
          <input size= "50" type="checkbox"></input>
          <script type="text/javascript">
            document.getElementById('mydiv').style.visibility='visible';
          </script>
        </div>);

        setResponse(dataMap);
      })
      .catch((error) => {
        setError('Failed to retrieve search results.');
      });
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        {error && <div className="error">{error}</div>}
        <label htmlFor="search">Search:</label>
        <input type="text" id="search" value={query} onChange={(event) => setQuery(event.target.value)} />
        <button type="submit">Search</button>
      </form>

      {response && <dir className="response">{response}</dir>}
      
{/* <script>
var e = document.getElementById('icon');
e.onmouseover = function() {
  document.getElementById('info').style.display = 'block'
}
e.onmouseout = function() {
  document.getElementById('info').style.display = 'none'
}
</script> */}
<div><button size="200">Add selected courses</button></div>
    </div>
      
  );
};

const createFunction = (course_code) => {
  const currentCourse = course_code;

  const handleAdd = (event) => {
    event.preventDefault();
    axios.get(  `http://localhost:8080/addCourse?code=${currentCourse}`)
      .then((response) => {
        console.log(response);
        const data = response.data;
        if (data === true) {
          console.log("Add class ran")
        } else {
          console.log("Add class ran, but died")
        }
      })
      .catch((error) => {
        console.log("Add class failed")
      });
  }
  return handleAdd;
}

export default Searchbar;