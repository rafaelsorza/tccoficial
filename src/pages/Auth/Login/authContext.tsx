import React from 'react';
import { useAuth } from '../../../main';
import { Link } from 'react-router-dom';

export const UserButton: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {currentUser ? (
        <>
          <img
            src={currentUser.photoURL || 'default-avatar.jpg'}
            style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 10 }}
          />
          <span>{currentUser.displayName || currentUser.email}</span>
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
