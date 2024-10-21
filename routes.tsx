import React from 'react';
import PrivateRoute from './src/pages/Auth/Login/PrivateRoute';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './src/pages/home/Home';
import Login from './src/pages/Auth/Login/Login';
import Registro from './src/pages/Auth/Register/Register';
import Dashboard from './src/pages/Dashboard/Dashboard';
import Recipes from './src/pages/Recipes/Recipes';
import Refeicoes from './src/pages/Refeicoes/Refeicoes';
import Ajuda from './src/pages/Help/Help';
import Profile from './src/pages/Profile/Profile';


const AppRoutes: React.FC = () => {
    return (

        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Registro />} />


        
               <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/recipes" element={<Recipes />} />
                <Route path="/reifs" element={<Refeicoes />} />
                <Route path="/ajuda" element={<Ajuda />} />
                <Route path="/perfil" element={<Profile />} />
                

             
</Route>
            </Routes>
        </Router>
        

    );
}

export default AppRoutes