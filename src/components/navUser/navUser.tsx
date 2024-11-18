import React from 'react';
import './navUser.css'
import { UserButton } from '../../pages/Auth/Login/authContext';

const NavUser: React.FC = () => {
    return (
      <div className="nav-user">
        <div className="itens">
            <UserButton/>  
        </div>
      </div>

    );
}

export default NavUser;