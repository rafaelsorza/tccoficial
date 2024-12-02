import React, { useEffect, useState } from 'react';
import { db } from '../../firebase-config'; // Configuração do Firebase
import { collection, getDocs } from 'firebase/firestore'; // Funções do Firestore
import { PieChart, Pie, Tooltip, Cell } from 'recharts'; // Biblioteca de gráficos
import Sidebar from '../../components/sidebar/sidebar';

interface Food {
  id: string;
  name: string;
  calories: number;
  fat: number;
  protein: number;
}

const CaloriasUsuario: React.FC = () => {
  const [foods, setFoods] = useState<Food[]>([]); // Lista de alimentos
  const [searchQuery, setSearchQuery] = useState(''); // Barra de pesquisa
  const [selectedFoods, setSelectedFoods] = useState<Food[]>([]); // Alimentos do dia

  // Buscar alimentos do Firestore
  useEffect(() => {
    const fetchFoods = async () => {
      const foodCollection = collection(db, 'foods');
      const foodSnapshot = await getDocs(foodCollection);
      const foodList = foodSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Food));
      setFoods(foodList);
    };

    fetchFoods();
  }, []);

  // Função para adicionar alimento ao dia
  const handleAddFood = (food: Food) => {
    setSelectedFoods((prev) => [...prev, food]);
  };

  // Dados para o gráfico
  const chartData = [
    { name: 'Calorias', value: selectedFoods.reduce((acc, food) => acc + food.calories, 0) },
    { name: 'Gorduras', value: selectedFoods.reduce((acc, food) => acc + food.fat, 0) },
    { name: 'Proteínas', value: selectedFoods.reduce((acc, food) => acc + food.protein, 0) },
  ];

  // Cores para o gráfico
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div className="main-page">
      <Sidebar />
      <div className="search-bar">
        <input
          type="text"
          placeholder="Pesquisar alimentos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <ul className="food-list">
        {searchQuery.trim() === '' ? (
          <p>Digite algo na barra de pesquisa para encontrar alimentos.</p>
        ) : (
          foods
            .filter((food) =>
              food.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((food) => (
              <li key={food.id} className="food-item">
                <span>
                  {food.name} - {food.calories} Calorias
                </span>
                <button onClick={() => handleAddFood(food)}>Adicionar</button>
              </li>
            ))
        )}
      </ul>
      <div className="chart-container">
        <h2>Nutrição do Dia</h2>
        <PieChart width={600} height={300}>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={50} // Define o formato de rosquinha
            fill="#82ca9d"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
};

export default CaloriasUsuario;
