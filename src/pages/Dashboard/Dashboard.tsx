import './Dashboard.css';
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar/sidebar';
import { UserButton } from '../Auth/Login/authContext';
import { UserMenu } from '../../components/navUser/userButon/userMenu';


const Dashboard: React.FC = () => {
  return (
    <>
      <div className="container">
        <div className="side"> <Sidebar /> </div>
      </div>

      <UserMenu/>
    </>
  );
};

export default Dashboard;
