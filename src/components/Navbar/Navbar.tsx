import React from 'react';
import './Navbar.css'
import { Link } from 'react-router-dom';
import { UserButton } from '../../pages/Auth/Login/authContext';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
      <div className="navbar-brand">
     <img src="logo.png"  width={"35vh"} height={"35vh"}/>
  
      </div>
      <div className="navbar-buttons">
       <UserButton/>
      </div>
    </nav>
    );
}

export default Navbar;