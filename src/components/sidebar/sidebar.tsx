import React from 'react';
import { Link } from 'react-router-dom';
import { LogoutButton } from '../btnLogout/btnLogout';
import { FaChartLine, FaApple, FaFish, FaHandsHelping } from 'react-icons/fa';
import './sidebar.css';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="menu">
        {/* Envolvendo a logo dentro do componente Link para redirecionar ao dashboard */}
        <Link to="/dashboard">
          <img src='/logo.png' width={'35vh'} height={'35vh'} alt="Logo" />
        </Link>

        <ul>
          <li><Link to="/dashboard"><FaChartLine /></Link></li>
          <li><Link to="/recipes"><FaApple /></Link></li>
          <li><Link to="/reifs"><FaFish /></Link></li>
          <li><Link to="/ajuda"><FaHandsHelping /></Link></li>
          <div className="lgt"> <li><LogoutButton /></li>  </div>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

