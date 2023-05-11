import React, { useState } from 'react';
import axios from 'axios';
import './CryptoForm.scss';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

import { Link } from 'react-router-dom';

function CryptoForm() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);

  async function handleQueryChange(event) {
    const newQuery = event.target.value;
    setQuery(newQuery);

    if (newQuery.trim().length === 0) {
      setResults([]);
      setSelectedResult(null);
      return;
    }

    try {
      const response = await axios.get(`https://data.messari.io/api/v1/assets?fields=id,name,symbol&filter=${encodeURIComponent(`name.icontains=${newQuery}`)}`);
      setResults(response.data.data);
    } catch (error) {
      console.error(error);
      setResults([]);
    }
  }

  function handleResultClick(result) {
    setSelectedResult(result);
    setResults([]);
  }

  function handleAddCoinClick() {
    if (selectedResult !== null) {
      setSelectedResult(null);
      setQuery('');
    }
  }

  return (
    <div className="crypto-form-container">
      <div className="crypto-form">
        <Link to={'/'} className='link'>
           <KeyboardDoubleArrowLeftIcon style={{color: 'black', display: 'flex',  cursor: 'pointer'}}/>
           <span>Go back</span>
        </Link>
        <h1>Add Crypto Currency</h1>
        <div className="search-box-container">
          <input
            type="text"
            placeholder="Use a name or a ticker symbol"
            value={query}
            className="search-box"
            onChange={handleQueryChange}
          />
          {results.length > 0 && (
            <ul className="search-results">
              {results.map((result) => (
                <li key={result.id} onClick={() => handleResultClick(result)}>
                  {result.name} ({result.symbol})
                </li>
              ))}
            </ul>
          )}
        </div>
        {selectedResult !== null && (
          <div className="selected-result">
            {selectedResult.name} ({selectedResult.symbol})
            <button className="add-coin-button" onClick={handleAddCoinClick}>Add</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CryptoForm;






