import React from 'react';
import { Link } from 'react-router-dom';
import { LogoutButton } from '../btnLogout/btnLogout';
import { AiOutlineUser } from "react-icons/ai";

import { LuLayoutDashboard, LuBadgeHelp } from "react-icons/lu";

import { MdOutlineFastfood } from "react-icons/md";
import { HiMiniPencilSquare } from "react-icons/hi2";






import './sidebar.css';
import { UserButton } from '../../pages/Auth/Login/authContext';
import { UserMenu } from '../navUser/userButon/userMenu';

const Sidebar: React.FC = () => {
  return (
    <div className="content">
      <div className="sidebar">
        <div className="menu">
          {/* Envolvendo a logo dentro do componente Link para redirecionar ao dashboard */}
          <Link to="/dashboard">
            <img src='/logo.png' width={'35vh'} height={'35vh'} alt="Logo" />
          </Link>

          <ul>
            <li><Link to="/dashboard">< LuLayoutDashboard /></Link></li>
            <li><Link to="/recipes"><MdOutlineFastfood /></Link></li>
            <li><Link to="/reifs"><HiMiniPencilSquare /></Link></li>
            <li><Link to="/ajuda"><LuBadgeHelp /></Link></li>

          </ul>
        </div>

        <div className="menu2"> 
          <li><Link to="/perfil"><AiOutlineUser  /></Link></li>
      <LogoutButton/>
          </div>







      </div>


    </div>

  );
};

export default Sidebar;

