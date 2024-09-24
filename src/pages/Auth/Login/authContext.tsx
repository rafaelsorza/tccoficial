import React from 'react';
import { useAuth } from '../../../main'
import { getAuth } from "firebase/auth";
import { useNavigate, Link } from 'react-router-dom';

export const UserButton: React.FC = () => {
  const { currentUser } = useAuth();
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
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {currentUser ? (
        <>
          <img
            src={currentUser.photoURL || 'default-avatar.png'} 
            
            style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 10 }}
          />
          <span>{currentUser.displayName || currentUser.email}</span>
          <button style={{ marginLeft: 10 }} onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <span>
           <Link to='/login' className='loginbtn'>Entrar</Link>
     
         <Link to='/registro' className='registrobtn'>Cadastrar</Link>
        </span>
      )}
    </div>
  );
};
