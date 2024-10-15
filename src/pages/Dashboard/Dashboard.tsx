import './Dashboard.css';
import React, { useState, useEffect } from 'react';
import DisplayDate from '../../components/DisplayDate/DisplayDate';
import Sidebar from '../../components/sidebar/sidebar';
import { UserMenu } from '../../components/userMenu/userMenu';


const Dashboard: React.FC = () => {
  return (
    <>
      <div className="container">

        <div className="side">
          <Sidebar />
        </div>
          <div className="main">
           <div className="nave">
             <div className="user">
               <UserMenu />
              </div>
            </div>
           <DisplayDate />
          <p>Ola bem-vindo de volta!</p>
        </div>
        
      </div>
      <div className="divFunc"><h1>colocar elementos aqui</h1></div>
    </>
  );
};

export default Dashboard;
