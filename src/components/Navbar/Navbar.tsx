import React from 'react';
import './Navbar.css'
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
      <div className="navbar-brand">
     <img src="logo.png"  width={"35vh"} height={"35vh"}/>
  
      </div>
      <div className="navbar-buttons">

        
        <Link to='/login' className='loginbtn'>Entrar</Link>
     
         <Link to='/registro' className='registrobtn'>Cadastrar</Link>
      </div>
    </nav>
    );
}

export default Navbar;