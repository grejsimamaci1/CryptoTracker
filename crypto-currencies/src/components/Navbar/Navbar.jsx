import React from 'react';
import './Navbar.scss';

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className="title">CryptoTracker Pro</div>
        <div className="profileImg">
          <img src="/img/profile-image.png" alt="User's Profile Image" />
        </div>
    </div>
  )
}

export default Navbar;