import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CallMadeIcon from '@mui/icons-material/CallMade';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import DeleteIcon from '@mui/icons-material/Delete';
import './CoinsTable.scss';
import AddCryptoButton from '../AddCryptoButton/AddCryptoButton';


function CoinsTable() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchCoins() {
      const response = await axios.get('https://data.messari.io/api/v1/assets');

      console.log(response.data.data);
      setCoins(response.data.data);
    }
    fetchCoins();
  }, []);

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleRemove = (id) => {
    setCoins(coins.filter((coin) => coin.id !== id));
  };

return (
    <div className="container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a cryptocurrency..."
          className="search-box"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="coins-container">
        {filteredCoins.map((coin) => (
          <div key={coin.id} className="coin-row">
            <div className="coin-info">
              <div className="coin-name">{coin.name}</div>
              <div className="coin-symbol">{coin.symbol}</div>
            </div>
            <div className="coin-price">
              <div className="price-usd">${coin.metrics.market_data.price_usd}</div>
              <div className="price-change">
                {coin.metrics.market_data.percent_change_usd_last_24_hours >= 0 ? (
                  <div style={{display: 'flex', alignItems: 'center'}}>
                  <CallMadeIcon style={{color: 'green'}}/>
                  <span style={{ color: 'green'}}>{coin.metrics.market_data.percent_change_usd_last_24_hours}%</span>
                  </div>
                  ) : (
                         <div style={{display: 'flex', alignItems: 'center'}}>
                         <CallReceivedIcon style={{color: 'red'}}/>
                         <span style={{color: 'red'}}>{coin.metrics.market_data.percent_change_usd_last_24_hours}%</span>
                         </div>
                  )}
              </div>
            </div>
            <div className="coin-remove">
              <DeleteIcon style={{color: 'red'}} onClick={() => handleRemove(coin.id)}/>
            </div>
          </div>
        ))}
      </div>
      <AddCryptoButton/>
    </div>     
  );

}

export default CoinsTable;

