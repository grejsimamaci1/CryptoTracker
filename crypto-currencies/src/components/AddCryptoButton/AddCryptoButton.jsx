import React from 'react';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';


const AddCryptoButton = () => {
  return (
    <div>
      <Link to={'/addCoins'} className='link'>
      <div className="buttonContainer">
          <AddIcon/>
          <button className='btn'>Add a CryptoCurrency</button>
      </div>
      </Link>
    </div>
  );
};

export default AddCryptoButton;
