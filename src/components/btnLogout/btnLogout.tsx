import React from 'react';
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import './btnLogout.css'
import { IoMdLogOut } from 'react-icons/io';
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
   <IoMdLogOut />

    </button>
  );
};
