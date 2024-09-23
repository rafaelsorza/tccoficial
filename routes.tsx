import React from 'react';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './src/pages/home/Home';
import Login from './src/pages/Auth/Login/Login';
import Registro from './src/pages/Auth/Register/Register';
import Dashboard from './src/pages/Dashboard';

const AppRoutes: React.FC = () => {
    return (

        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/dashboard" element={<Dashboard />} />
             

            </Routes>
        </Router>
        

    );
}

export default AppRoutes