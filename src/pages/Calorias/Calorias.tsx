
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Funções de autenticação
import CaloriasUsuario from './caloriasUsuario/CaloriasUsuario'; // Componente para usuário
import CaloriasDev from './CaloriasDev'; // Componente para desenvolvedor

const Calorias: React.FC = () => {
  const [isDevMode, setIsDevMode] = useState(false); // Controle de acesso ao modo dev
  const [userEmail, setUserEmail] = useState<string | null>(null); // E-mail do usuário logado

  const devEmail = 'rafa.505009@gmail.com'; // E-mail autorizado para o modo desenvolvedor

  // Verificar o e-mail do usuário logado
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email); // Armazenar o e-mail do usuário logado
        if (user.email === devEmail) {
          setIsDevMode(true); // Ativar modo dev se o e-mail for autorizado
        } else {
          setIsDevMode(false); // Desativar modo dev se o e-mail não for autorizado
        }
      } else {
        setUserEmail(null); // Se não houver usuário logado
        setIsDevMode(false); // Desativar modo dev se não estiver logado
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="dashboard">
      <h1>Controle Nutricional</h1>
      {/* Renderiza o componente correto baseado no e-mail do usuário */}
      {isDevMode ? <CaloriasDev /> : <CaloriasUsuario />}
    </div>
  );
};

export default Calorias;
