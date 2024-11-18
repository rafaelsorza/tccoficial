import './Dashboard.css';
import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth'; // Importando Firebase Auth
import Sidebar from '../../components/sidebar/sidebar';
import NavUser from '../../components/navUser/navUser';
import DisplayDate from '../../components/DisplayDate/DisplayDate';
import ReusableChart from '../Refeicoes/ResaubleChart';


interface NutritionalValues {
  totalCalories: number;
  totalProtein: number;
  totalVitamins: number;
  totalCarbohydrates: number;
}




const Dashboard: React.FC = () => {
  const [chartData, setChartData] = useState<NutritionalValues | null>(null);

  useEffect(() => {
    const storedChartData = localStorage.getItem('exportedChartData');
    if (storedChartData) {
      setChartData(JSON.parse(storedChartData));
    }
  }, []);
  const auth = getAuth(); // Obtém a instância do Firebase Auth
  const currentUser = auth.currentUser; // Usuário autenticado

  return (
    <>
      <div className="container-dash">
        <div className="side">
          <Sidebar />
        </div>
        <div className="nav-u">
          <NavUser />
        </div>

        <div className="content-dash">
          <div className="headerr">
       
            <h1> Bem Vindo(a) de volta! Como você está? </h1>
          </div>
          <div className="user">
            {currentUser ? (
              <div className="user-info">
                <img
                  src={currentUser.photoURL || 'default-avatar.jpg'}
                  alt="User Avatar"
                  className="user-avatar"
                />
                <span className="user-name">
                  {currentUser.displayName || currentUser.email}
                </span>
              </div>
            ) : (
              <p>Carregando dados do usuário...</p>
            )}
          </div>

        
       
          
        </div>
      </div>
    </>
  );
};

export default Dashboard;
