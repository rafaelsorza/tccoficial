import React, { useState } from 'react';
import { useAuth } from '../../main';
import { LogoutButton } from '../btnLogout/btnLogout';
import { Link } from 'react-router-dom';
import './userMenu.css'; // Importar o arquivo de estilos

export const UserMenu: React.FC = () => {
  const { currentUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="user-menu-container">
      {currentUser ? (
        <>
          <div className="user-info" onClick={toggleMenu}>
            <img
              src={currentUser.photoURL || 'default-avatar.jpg'}
              className="user-avatar"
              alt="User Avatar"
            />
       
            <span className="dropdown-arrow">&#9662;</span>
          </div>
          {menuOpen && (
            <div className="dropdown-menu">
              <div className="user-details">
                <span className="user-name">{currentUser.displayName}</span>
                <span className="user-email">{currentUser.email}</span>
              </div>

              <ul className="menu-items">
                <li><Link to="/perfil"> Perfil </Link></li>
                <li><Link to="/settings">Configurações</Link></li>

                <div className="lgt"> <li><LogoutButton /></li>  </div>
               
              </ul>
            </div>
          )}
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
