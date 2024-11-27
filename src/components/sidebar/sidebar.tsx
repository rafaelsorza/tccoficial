import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LogoutButton } from '../btnLogout/btnLogout';
import { AiOutlineUser } from "react-icons/ai";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineFastfood } from "react-icons/md";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { MdOutlineHelpOutline } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import './sidebar.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Importação das funções de autenticação do Firebase

const Sidebar: React.FC = () => {
  const [isDevMode, setIsDevMode] = useState(false); // Variável para controlar o modo desenvolvedor
  const [userEmail, setUserEmail] = useState<string | null>(null); // Estado para armazenar o e-mail do usuário

  const devEmail = 'rafa.505009@gmail.com'; // O e-mail do desenvolvedor autorizado

  // Verificar o e-mail do usuário logado
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email); // Atualiza o e-mail do usuário
        if (user.email === devEmail) {
          setIsDevMode(true); // Ativa o modo desenvolvedor se o e-mail for o autorizado
        } else {
          setIsDevMode(false); // Desativa o modo desenvolvedor caso contrário
        }
      } else {
        setUserEmail(null); // Se não houver usuário logado, limpa o e-mail
        setIsDevMode(false); // Desativa o modo desenvolvedor se o usuário não estiver logado
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="content-sidebar">
      <div className="sidebar">
        <div className="menu">
          {/* Logo do dashboard */}
          <Link to="/dashboard">
            <img src='/logo.png' width={'35vh'} height={'35vh'} alt="Logo" />
          </Link>

          <ul>
            <li><Link to="/dashboard">< LuLayoutDashboard /></Link></li>
            <li><Link to="/recipes"><MdOutlineFastfood /></Link></li>
            <li><Link to="/caloriasusuario"><HiMiniPencilSquare /></Link></li>

            {/* Verifica se o usuário é o desenvolvedor e, se for, exibe a linha */}
            {isDevMode && (
              <li><Link to="/caloriasDev"><IoIosAddCircleOutline /></Link></li>
            )}

            <li><Link to="/ajuda"><MdOutlineHelpOutline /></Link></li>

            
          </ul>
        </div>

        <div className="menu2">
          <li><Link to="/perfil"><AiOutlineUser /></Link></li>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;



