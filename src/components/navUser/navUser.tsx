import React from 'react';
import './navUser.css'
import { UserButton } from '../../pages/Auth/Login/authContext';

const NavUser: React.FC = () => {
    return (
      <div className="nav-user">
       <UserButton/>
      </div>

    );
}

export default NavUser;