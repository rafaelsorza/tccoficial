import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase-config'; // Configuração do Firebase
import { collection, getDocs } from 'firebase/firestore'; // Funções do Firestore
import { PieChart, Pie, Tooltip, Cell } from 'recharts'; // Biblioteca de gráficos
import Sidebar from '../../../components/sidebar/sidebar';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Importação de Auth do Firebase
import './CaloriasU.css';

interface Food {
  id: string;
  name: string;
  calories: number;
  fat: number;
  protein: number;
  portion: number; // Porção em gramas
}

const CaloriasUsuario: React.FC = () => {
  const [foods, setFoods] = useState<Food[]>([]); // Lista de alimentos
  const [searchQuery, setSearchQuery] = useState(''); // Barra de pesquisa
  const [selectedFoods, setSelectedFoods] = useState<{ food: Food; grams: number }[]>(() => {
    // Carregar alimentos selecionados do localStorage
    const savedData = localStorage.getItem('selectedFoods');
    return savedData ? JSON.parse(savedData) : [];
  }); // Alimentos consumidos e gramas
  const [userName, setUserName] = useState<string>(''); // Nome do usuário

  const auth = getAuth();

  // Buscar informações do usuário logado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || 'Usuário');
      } else {
        setUserName('Usuário');
      }
    });

    return () => unsubscribe();
  }, [auth]);

  // Buscar alimentos no Firestore
  useEffect(() => {
    const fetchFoods = async () => {
      const foodCollection = collection(db, 'foods');
      const foodSnapshot = await getDocs(foodCollection);
      const foodList = foodSnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Food)
      );
      setFoods(foodList);
    };

    fetchFoods();
  }, []);

  // Salvar alimentos selecionados no localStorage sempre que forem alterados
  useEffect(() => {
    localStorage.setItem('selectedFoods', JSON.stringify(selectedFoods));
  }, [selectedFoods]);

  // Adicionar alimento ao dia
  const handleAddFood = (food: Food) => {
    const existingFood = selectedFoods.find((item) => item.food.id === food.id);
    if (existingFood) {
      setSelectedFoods((prev) =>
        prev.map((item) =>
          item.food.id === food.id
            ? { ...item, grams: item.grams + food.portion }
            : item
        )
      );
    } else {
      setSelectedFoods((prev) => [...prev, { food, grams: food.portion }]);
    }
  };

  // Remover alimento da lista
  const handleRemoveFood = (id: string) => {
    setSelectedFoods((prev) => prev.filter((item) => item.food.id !== id));
  };

  // Dados para o gráfico
  const chartData = [
    {
      name: 'Calorias',
      value: selectedFoods.reduce(
        (acc, { food, grams }) => acc + (food.calories * grams) / food.portion,
        0
      ),
    },
    {
      name: 'Gorduras',
      value: selectedFoods.reduce(
        (acc, { food, grams }) => acc + (food.fat * grams) / food.portion,
        0
      ),
    },
    {
      name: 'Proteínas',
      value: selectedFoods.reduce(
        (acc, { food, grams }) => acc + (food.protein * grams) / food.portion,
        0
      ),
    },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div className="main-page">
      <div className="hello-card">
        <div className="hello-text">
          <h2>Oi {userName}</h2>
          <p>Aqui está seu Contador de Calorias.</p>
        </div>
        <div className="hello-image">
          <img src="assenando.png" alt="User waving" />
        </div>
      </div>

      <div className="user">
        <div className="chart-user">
          <h1>Nutrição do Dia</h1>
          <PieChart width={600} height={300}>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={50}
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
        <div className="chart-legend">
          {chartData.map((entry, index) => (
            <div key={index} className="legend-item">
              <div className="color-box" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
              <span>
                {entry.name}: {entry.value.toFixed(2)}
              </span>
            </div>
          ))}
          <div className="selected-foods">
            <h2>Alimentos Consumidos</h2>
            {selectedFoods.length === 0 ? (
              <p>Nenhum alimento consumido.</p>
            ) : (
              <ul>
                {selectedFoods.map(({ food, grams }) => (
                  <li key={food.id}>
                    <div className="selected-food">
                      <span>
                        {food.name} - {grams}g consumidos
                      </span>
                      <button onClick={() => handleRemoveFood(food.id)}>Excluir</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <Sidebar />

      <div className="barra">
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
      </div>
    </div>
  );
};

export default CaloriasUsuario;
