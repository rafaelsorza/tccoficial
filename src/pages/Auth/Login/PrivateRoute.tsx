import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../../main'

const PrivateRoute: React.FC = () => {
  const { currentUser } = useAuth();

  // Se o usuário não estiver autenticado, redireciona para a página de login
  // if (!currentUser) {
  //   return <Navigate to="/login" replace />;
  // }

  // Se o usuário estiver autenticado, renderiza os filhos (as rotas privadas)
  return <Outlet />;
};

export default PrivateRoute;
