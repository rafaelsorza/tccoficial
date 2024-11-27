import React from 'react';
import PrivateRoute from './src/pages/Auth/Login/PrivateRoute';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './src/pages/Auth/home/Home';
import Login from './src/pages/Auth/Login/Login';
import Registro from './src/pages/Auth/Register/Register';
import Dashboard from './src/pages/Dashboard/Dashboard';
import Recipes from './src/pages/Recipes/Recipes';
import CaloriasDev from './src/pages/Calorias/CaloriasDev';
import Ajuda from './src/pages/Help/Help';
import Profile from './src/pages/Profile/Profile';
import CaloriasUsuario from './src/pages/Calorias/CaloriasUsuario';


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
                    <Route path="/caloriasusuario" element={<CaloriasUsuario />} />
                    <Route path="/ajuda" element={<Ajuda />} />
                    <Route path="/perfil" element={<Profile />} />
                    <Route path="/caloriasdev" element={<CaloriasDev />} />

                </Route>
            </Routes>
        </Router>


    );
}

export default AppRoutes