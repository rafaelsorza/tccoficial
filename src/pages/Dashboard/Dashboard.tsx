import './Dashboard.css';
import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth'; // Importando Firebase Auth
import Sidebar from '../../components/sidebar/sidebar';
import DisplayDate from '../../components/DisplayDate/DisplayDate';
import { PieChart, Pie, Tooltip, Cell } from 'recharts'; // Importando biblioteca de gráficos

interface NutritionalValues {
  totalCalories: number;
  totalProtein: number;
  totalVitamins: number;
  totalCarbohydrates: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const Dashboard: React.FC = () => {
  const [chartData, setChartData] = useState<NutritionalValues | null>(null); // Dados do gráfico salvos
  const [searchQuery, setSearchQuery] = useState('');
  const [waterConsumed, setWaterConsumed] = useState(0);

  useEffect(() => {
    // Carregar dados do gráfico do localStorage
    const storedChartData = localStorage.getItem('exportedChartData');
    if (storedChartData) {
      setChartData(JSON.parse(storedChartData));
    }
  }, []);

  const auth = getAuth(); // Obtém a instância do Firebase Auth
  const currentUser = auth.currentUser; // Usuário autenticado

  const handleAddWater = () => {
    if (waterConsumed < 3000) {
      setWaterConsumed(waterConsumed + 250);
    }
  };

  const handleReduceWater = () => {
    if (waterConsumed > 0) {
      setWaterConsumed(waterConsumed - 250);
    }
  };

  const handleResetWater = () => {
    setWaterConsumed(0);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Dados do gráfico
  const pieChartData = [
    { name: 'Calorias', value: chartData?.totalCalories || 0 },
    { name: 'Proteínas', value: chartData?.totalProtein || 0 },
    { name: 'Vitaminas', value: chartData?.totalVitamins || 0 },
    { name: 'Carboidratos', value: chartData?.totalCarbohydrates || 0 },
  ];

  return (
    <>
      <div className="container-dash">
        <div className="side">
          <Sidebar />
        </div>

        <div className="content-dash">
          <div className="left">
            <div className="headerr">
              <DisplayDate />
              <h1>
                Oi {currentUser ? currentUser.displayName || currentUser.email : 'Usuário'}, Bem-vindo(a) de volta! Como você está?
              </h1>
            </div>
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

        <div className="partebaixo">
          <h2>Nutrição do Dia</h2>
          <PieChart width={600} height={300}>
            <Pie
              data={pieChartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={50}
              label
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>

          {/* Legenda do Gráfico */}
          <div className="chart-legend">
            {pieChartData.map((entry, index) => (
              <div key={index} className="legend-item">
                <div
                  className="color-box"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span>
                  {entry.name}: {entry.value.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
