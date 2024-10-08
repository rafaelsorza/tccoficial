import './Dashboard.css';
import React, { useState, useEffect } from 'react';
import { UserButton } from '../Auth/Login/authContext';
import DisplayDate from '../../components/DisplayDate/DisplayDate';
import Sidebar from '../../components/sidebar/sidebar';
import { UserMenu } from '../../components/userMenu/userMenu';


const Dashboard: React.FC = () => {
  return (
    <div className="container">

      <div className="side">
        <Sidebar />
      </div>


      <div className="main">
        <div className="nave">
          <div className="user"> 
           <UserMenu/>
          </div>
           
        </div>
    

        <DisplayDate />
        <p>Ola bem-vindo de volta!</p>
      </div>
    </div>










  );
};

export default Dashboard;