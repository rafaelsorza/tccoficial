import React from 'react';
import { Link } from 'react-router-dom';
import { FaChartLine, FaProductHunt, FaUserAlt, FaApple, FaFish, FaHandsHelping} from 'react-icons/fa';
import './sidebar.css';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="logo">
      <img src='/logo.png' width={'35vh'} height={'35vh'}></img>
      </div>
      <div className="menu">
        <ul>
          <li><Link to="/dashboard"><FaChartLine /> </Link></li>
        
          <li><Link to="/recipes"><FaApple /></Link></li>
          <li><Link to="/reifs"><FaFish /></Link></li>
         
         
          <li><Link to="/ajuda"><FaHandsHelping /> </Link></li>
        </ul>
      </div>
      
    </div>
  );
};

export default Sidebar;
