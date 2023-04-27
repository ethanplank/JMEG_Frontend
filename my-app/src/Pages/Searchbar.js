import React, { useState } from 'react';
import axios from 'axios';

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
        const dataMap = data.map((d) => <table><row key={d.crs_title}>{d.crs_title}</row></table>);
       // setResponse(dataTitles);
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
    
    </div>
  );
};
export default Searchbar;