import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../main';
import { LogoutButton } from '../btnLogout/btnLogout';
import { Link } from 'react-router-dom';
import './userMenu.css';

export const UserMenu: React.FC = () => {
  const { currentUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="user-menu-container" ref={menuRef}>
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
                <li><Link to="/perfil">Perfil</Link></li>
                <li><Link to="/settings">Configurações</Link></li>
                <li><LogoutButton /></li>
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