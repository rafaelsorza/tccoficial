import React, { useState, useEffect } from 'react';
import { db } from '../../firebase-config'; // Importando o Firebase
import { collection, getDocs } from 'firebase/firestore'; // Importando funções do Firestore para ler dados
import { Bar } from 'react-chartjs-2'; // Importando o componente de gráfico
import Chart from 'chart.js/auto'; // Importando a biblioteca de gráficos
import './Calorias.css'; // Importando o CSS para esta tela

interface Food {
  id: string;
  name: string;
  calories: number;
  fat: number;
  protein: number;
}

const Calorias: React.FC = () => {
  // Estado para armazenar os alimentos recebidos do Firestore
  const [foods, setFoods] = useState<Food[]>([]);

  // Estado para armazenar o valor da pesquisa do usuário
  const [searchQuery, setSearchQuery] = useState('');

  // Estado para armazenar os alimentos que o usuário adicionou ao seu dia
  const [selectedFoods, setSelectedFoods] = useState<Food[]>([]);

  // Hook para buscar alimentos do Firestore assim que o componente for montado
  useEffect(() => {
    const fetchFoods = async () => {
      // Referência à coleção de alimentos no Firestore
      const foodCollection = collection(db, 'foods');
      
      // Obtendo todos os documentos da coleção
      const foodSnapshot = await getDocs(foodCollection);
      
      // Mapeando os dados dos alimentos para o estado
      const foodList = foodSnapshot.docs.map((doc) => doc.data() as Food);
      setFoods(foodList);
    };

    fetchFoods(); // Chamando a função de fetch
  }, []);

  // Função para atualizar o estado da pesquisa quando o usuário digitar
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Função para adicionar o alimento ao dia do usuário
  const handleAddFood = (food: Food) => {
    setSelectedFoods((prev) => [...prev, food]);
  };

  // Dados do gráfico: Somatório das calorias, gorduras e proteínas dos alimentos selecionados
  const nutritionData = {
    labels: ['Calories', 'Fat', 'Protein'], // Labels para o gráfico
    datasets: [
      {
        label: 'Nutrição do Dia', // Título do gráfico
        data: [
          selectedFoods.reduce((acc, food) => acc + food.calories, 0), // Total de calorias
          selectedFoods.reduce((acc, food) => acc + food.fat, 0), // Total de gorduras
          selectedFoods.reduce((acc, food) => acc + food.protein, 0), // Total de proteínas
        ],
        backgroundColor: ['#ff5733', '#33ff57', '#3357ff'], // Cores para os elementos do gráfico
      },
    ],
  };

  return (
    
    <div className="user-dashboard">
      <h1>Alimentos que eu comi hoje</h1>
      
      {/* Barra de pesquisa */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Pesquise alimentos..."
          value={searchQuery}
          onChange={handleSearchChange} // Atualiza a pesquisa conforme o usuário digita
        />
      </div>
      
      {/* Lista de alimentos que correspondem à pesquisa */}
      <ul className="food-list">
        {foods
          .filter((food) => food.name.toLowerCase().includes(searchQuery.toLowerCase())) // Filtra alimentos com base na pesquisa
          .map((food) => (
            <li key={food.id} className="food-item">
              <span>{food.name} - {food.calories} Calorias</span>
              <button onClick={() => handleAddFood(food)}>Adicionar</button> {/* Adiciona o alimento ao dia */}
            </li>
          ))}
      </ul>
      
      {/* Gráfico com as informações nutricionais do dia */}
      <div className="chart-container">
        <Bar data={nutritionData} /> {/* Renderiza o gráfico de barras */}
      </div>
    </div>
  );
};

export default Calorias;
