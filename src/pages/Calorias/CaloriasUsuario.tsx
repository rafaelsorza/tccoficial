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
  portion: number; // Novo campo para porção em gramas
}

const CaloriasUsuario: React.FC = () => {
  const [foods, setFoods] = useState<Food[]>([]); // Lista de alimentos
  const [searchQuery, setSearchQuery] = useState(''); // Barra de pesquisa
  const [selectedFoods, setSelectedFoods] = useState<
    { food: Food; grams: number }[]
  >([]); // Alimentos consumidos e gramas

  // Buscar alimentos do Firestore
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

  // Função para adicionar alimento ao dia com gramas padrão (100g por exemplo)
  const handleAddFood = (food: Food) => {
    const existingFood = selectedFoods.find((item) => item.food.id === food.id);
    if (existingFood) {
      // Atualiza as gramas se o alimento já existir
      setSelectedFoods((prev) =>
        prev.map((item) =>
          item.food.id === food.id
            ? { ...item, grams: item.grams + food.portion }
            : item
        )
      );
    } else {
      // Adiciona o alimento com a porção padrão
      setSelectedFoods((prev) => [...prev, { food, grams: food.portion }]);
    }
  };

  // Função para alterar as gramas consumidas de um alimento
  const handleGramChange = (id: string, grams: number) => {
    setSelectedFoods((prev) =>
      prev.map((item) =>
        item.food.id === id ? { ...item, grams: grams } : item
      )
    );
  };

  // Dados para o gráfico
  const chartData = [
    {
      name: 'Calorias',
      value: selectedFoods.reduce(
        (acc, { food, grams }) =>
          acc + (food.calories * grams) / food.portion,
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
        (acc, { food, grams }) =>
          acc + (food.protein * grams) / food.portion,
        0
      ),
    },
  ];

  // Cores para o gráfico
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <>
      <div className="headerfod">Olá</div>
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
        <div className="selected-foods">
          <h2>Alimentos Consumidos</h2>
          {selectedFoods.length === 0 ? (
            <p>Nenhum alimento selecionado.</p>
          ) : (
            <ul>
              {selectedFoods.map(({ food, grams }) => (
                <li key={food.id}>
                  <div className="selected-food">
                    <span>
                      {food.name} - {grams}g consumidos
                    </span>
                    <input
                      type="number"
                      value={grams}
                      onChange={(e) =>
                        handleGramChange(food.id, Number(e.target.value))
                      }
                      min={1}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
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
    </>
  );
};

export default CaloriasUsuario;
