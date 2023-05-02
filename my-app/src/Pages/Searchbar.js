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
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
        const dataMap = data.map((d) => 
        <div class="card" >
          <div class="card-body">
            <h5 class="card-title" key={d.crs_title}>{d.crs_title}: {d.crs_code}</h5>
          </div>
          <ul class="list-group list-group-flush">
            {/* <li class="list-group-item" key={d.credit_hrs}>Credit Hours: {d.credit_hrs}</li> */}

            <button type="button" class="btn btn-sm btn-primary" onClick={createFunction(d.crs_code)} >Add This Class</button>
             <div class="alert alert-success" role="alert">
              This is a success alert—check it out!
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button>
            </div> 
            <button type="button"class="btn btn-sm btn-secondary">Remove This Class</button>
            <Popup query={d.crs_code}></Popup>
          </ul>
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
        <div class="input-group input-group-lg">
  <div class="input-group-prepend">  </div>
  <input type="text" class="form-control" aria-label="Large" placeholder="Search by course code, course title, time" aria-describedby="inputGroup-sizing-sm" value={query} onChange={(event) => setQuery(event.target.value)}/>
</div>
      </form>

      {response && <dir className="response" style={{padding: 10}}>{response}</dir>}
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