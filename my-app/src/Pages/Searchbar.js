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
        console.log(response.data[0].crs_code);

        const data = response.data;

        const dataMap = data.map((d) => <li key={d.crs_code}>{d.crs_code}</li>);
        
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
      {response && <div className="response">{response}</div>}
    </div>
  );
};
export default Searchbar;