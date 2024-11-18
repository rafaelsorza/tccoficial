import React, { useState, useEffect } from 'react';
import api from './services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import NutritionalChart from '../../components/NutritionChart/NutritionChart';
import './reifs.css';
import Sidebar from '../../components/sidebar/sidebar';
interface Food {
  id: string;
  product_name: string;
  calories: number;
  protein: number;
  vitamins: number;
  carbohydrates: number;
}

interface ApiResponse {
  products: {
    _id: string;
    product_name: string;
    nutriments: {
      'energy-kcal_100g': number;
      'proteins_100g': number;
      'vitamins_100g': number;
      'carbohydrates_100g': number;
    };
  }[];
}

interface NutritionalValues {
  totalCalories: number;
  totalProtein: number;
  totalVitamins: number;
  totalCarbohydrates: number;
}

const Refeicoes: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [foods, setFoods] = useState<Food[]>([]);
  const [selectedFoods, setSelectedFoods] = useState<Food[]>([]);
  const [meals, setMeals] = useState<NutritionalValues[]>([]);

  useEffect(() => {
    const storedMeals = localStorage.getItem('meals');
    const storedTimestamp = localStorage.getItem('mealsTimestamp');
    const currentTime = new Date().getTime();

    if (storedMeals && storedTimestamp) {
      const parsedMeals = JSON.parse(storedMeals);
      const timestamp = JSON.parse(storedTimestamp);

      if (currentTime - timestamp < 24 * 60 * 60 * 1000) {
        setMeals(parsedMeals);
      } else {
        localStorage.removeItem('meals');
        localStorage.removeItem('mealsTimestamp');
      }
    }
  }, []);

  const saveMealsToLocalStorage = (meals: NutritionalValues[]) => {
    const currentTime = new Date().getTime();
    localStorage.setItem('meals', JSON.stringify(meals));
    localStorage.setItem('mealsTimestamp', JSON.stringify(currentTime));
  };

  const fetchFoods = async (searchTerm: string) => {
    try {
      const response = await api.get<ApiResponse>(`/cgi/search.pl?search_terms=${searchTerm}&search_simple=1&json=1`);
      const products: Food[] = response.data.products.map(product => ({
        id: product._id,
        product_name: product.product_name,
        calories: product.nutriments['energy-kcal_100g'] || 0,
        protein: product.nutriments['proteins_100g'] || 0,
        vitamins: product.nutriments['vitamins_100g'] || 0,
        carbohydrates: product.nutriments['carbohydrates_100g'] || 0,
      }));
      setFoods(products);
    } catch (error) {
      console.error('Erro ao buscar alimentos:', error);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      fetchFoods(value);
    } else {
      setFoods([]);
    }
  };

  const handleSelect = (food: Food) => {
    if (isSelected(food)) {
      setSelectedFoods(selectedFoods.filter(f => f.id !== food.id));
    } else {
      setSelectedFoods([...selectedFoods, food]);
    }
  };

  const isSelected = (food: Food): boolean => {
    return selectedFoods.some(f => f.id === food.id);
  };

  const calculateNutritionalValues = (foods: Food[]): NutritionalValues => {
    const totalCalories = foods.reduce((acc, food) => acc + food.calories, 0);
    const totalProtein = foods.reduce((acc, food) => acc + food.protein, 0);
    const totalVitamins = foods.reduce((acc, food) => acc + food.vitamins, 0);
    const totalCarbohydrates = foods.reduce((acc, food) => acc + food.carbohydrates, 0);

    return {
      totalCalories,
      totalProtein,
      totalVitamins,
      totalCarbohydrates,
    };
  };

  const addMeal = () => {
    const nutritionalValues = calculateNutritionalValues(selectedFoods);
    const updatedMeals = [...meals, nutritionalValues];
    setMeals(updatedMeals);
    saveMealsToLocalStorage(updatedMeals);
    setSelectedFoods([]);
  };

  const clearChart = () => {
    setMeals([]);
    localStorage.removeItem('meals');
    localStorage.removeItem('mealsTimestamp');
  };

  const combinedNutritionalValues = meals.reduce(
    (acc, meal) => ({
      totalCalories: acc.totalCalories + meal.totalCalories,
      totalProtein: acc.totalProtein + meal.totalProtein,
      totalVitamins: acc.totalVitamins + meal.totalVitamins,
      totalCarbohydrates: acc.totalCarbohydrates + meal.totalCarbohydrates,
    }),
    { totalCalories: 0, totalProtein: 0, totalVitamins: 0, totalCarbohydrates: 0 }
  );

  return (
<>
    <Sidebar/>
    <div className="dashboard1">
      <div className="main1">
   

          <div className="box"> 
           
          <div className="search-container">
            <input
              type="text"
              value={query}
              onChange={handleSearch}
              placeholder="Digite o nome do alimento..."
              className="search-input"
            />
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
          </div>
          <div className="food-list-container">
            <ul className="food-list">
              {foods.map(food => (
                <li
                  key={food.id}
                  onClick={() => handleSelect(food)}
                  className={`food-item ${isSelected(food) ? 'selected' : ''}`}
                >
                  {food.product_name}
                </li>
              ))}
            </ul>
          </div>
          <button onClick={addMeal} className="add-meal-button">Adicionar Refeição</button>
          <button onClick={clearChart} className="clear-chart-button">Limpar Gráfico</button>
        </div>
          </div>
          
  
          <div className="box2"> 
          <div className="charts">
         
            <div className="progress-bars">
              <div className="progress-bar">
                <span>Calorias: {combinedNutritionalValues.totalCalories} kcal</span>
                <div className="progress">
                  <div className="progress-bar-fill" style={{ width: `${combinedNutritionalValues.totalCalories}px` }}></div>
                </div>
              </div>
              <div className="progress-bar">
                <span>Proteínas: {combinedNutritionalValues.totalProtein} g</span>
                <div className="progress">
                  <div className="progress-bar-fill" style={{ width: `${combinedNutritionalValues.totalProtein}px` }}></div>
                </div>
              </div>
              <div className="progress-bar">
                <span>Vitaminas: {combinedNutritionalValues.totalVitamins}</span>
                <div className="progress">
                  <div className="progress-bar-fill" style={{ width: `${combinedNutritionalValues.totalVitamins}px` }}></div>
                </div>
              </div>
              <div className="progress-bar">
                <span>Carboidratos: {combinedNutritionalValues.totalCarbohydrates}</span>
                <div className="progress">
                  <div className="progress-bar-fill" style={{ width: `${combinedNutritionalValues.totalCarbohydrates}px` }}></div>
                </div>
              </div>
            </div>
            <NutritionalChart nutritionalValues={combinedNutritionalValues} />
          </div>
          </div>
        </div>
     
  
    </>
  );
};

export default Refeicoes;