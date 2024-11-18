import './Dashboard.css';
import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth'; // Importando Firebase Auth
import Sidebar from '../../components/sidebar/sidebar';
import NavUser from '../../components/navUser/navUser';
import ReusableChart from '../Refeicoes/ResaubleChart';
import DisplayDate from '../../components/DisplayDate/DisplayDate';

interface NutritionalValues {
  totalCalories: number;
  totalProtein: number;
  totalVitamins: number;
  totalCarbohydrates: number;
}

const Dashboard: React.FC = () => {
  const [chartData, setChartData] = useState<NutritionalValues | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const storedChartData = localStorage.getItem('exportedChartData');
    if (storedChartData) {
      setChartData(JSON.parse(storedChartData));
    }
  }, []);

  const auth = getAuth(); // Obtém a instância do Firebase Auth
  const currentUser = auth.currentUser; // Usuário autenticado

  const [waterConsumed, setWaterConsumed] = useState(0);
  const handleAddWater = () => { if (waterConsumed < 3000) { setWaterConsumed(waterConsumed + 250); } };
  const handleReduceWater = () => { if (waterConsumed > 0) { setWaterConsumed(waterConsumed - 250); } };
  const handleResetWater = () => { setWaterConsumed(0); };

  // Função para lidar com a mudança no valor da pesquisa
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

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
          <div className="left">
            <div className="headerr">
               <DisplayDate/>
              <h1>Bem Vindo(a) de volta! Como você está?</h1> 
            
            </div>

        

            {/* <div className="graficos">
              <div className="grafico1">
                {chartData ? (
                  <ReusableChart nutritionalValues={chartData} />
                ) : (
                  <p>Carregando gráfico...</p>
                )}
              </div>
            </div> */}
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
{/* 
            <div className="water-counter">
              <span className="water-label">Água Consumida: {waterConsumed} ml</span>
              <div className="water-cup">
                <div
                  className="water-level"
                  style={{
                    height: Math.min((waterConsumed / 3000) * 100, 100) + '%',
                  }}
                ></div>
                <span className="water-percentage">
                  {Math.min((waterConsumed / 3000) * 100, 100).toFixed(0)}%
                </span>
              </div>

              <div className="water-controls">
                <button className="water-button" onClick={handleAddWater}>+</button>
                <button className="water-button" onClick={handleReduceWater}>-</button>
                <button className="reset-water-button" onClick={handleResetWater}>Esvaziar Copo</button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
