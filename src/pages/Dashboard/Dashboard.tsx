import './Dashboard.css';
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar/sidebar';
import NavUser from '../../components/navUser/navUser';

const Dashboard: React.FC = () => {
  return (
    <>
      <div className="container">
        <div className="side"> <Sidebar /> </div>
<div className="nav-u">
  <NavUser/>
</div>


      </div>


    
    </>
  );
};

export default Dashboard;
