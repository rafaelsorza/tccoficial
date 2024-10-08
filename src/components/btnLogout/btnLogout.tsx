import React from 'react';
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { IoExitOutline } from "react-icons/io5";
import './btnLogout.css'
export const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    getAuth().signOut()
      .then(() => {
        // Redireciona para a rota /home após logout
        navigate('/');
      })
      .catch((error) => {
        console.error('Erro ao fazer logout:', error);
      });
  };

  return (
    <button 
    className='btnSair'
    onClick={handleLogout}>
   <IoExitOutline />

    </button>
  );
};
