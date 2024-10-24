import React, { useState } from 'react';
import './Recipes.css';
import RecipeCard from './Recipecard';
import RecipeDetails from './RecipeDetail';
import { faCoffee, faUtensils, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Sidebar from '../../components/sidebar/sidebar';

// Interface para receita
export interface Recipe {
  name: string;
  image: string;
  description: string;
  ingredients: string[];
  instructions: string;
  kcal: string;
  categoria: string;
}

const Recipes: React.FC = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('breakfast');

  // Definindo receitas
  const recipes: { [key: string]: Recipe[] } = {
    breakfast: [
      {
        name: 'Panquecas',
        kcal: '19kcal',
        categoria: 'leve e rápido',
        image: './panqueca.png', // Verifique se a imagem está acessível
        description: 'Deliciosas panquecas...',
        ingredients: [
          '2 xícaras de farinha',
          '2 ovos',
          '1 xícara de leite',
          '1 colher de sopa de açúcar',
          '1 colher de chá de fermento'
        ],
        instructions: 'Misture todos os ingredientes...'
      }
      // Adicione mais receitas de café da manhã se necessário
    ],
    lunch: [
      {
        name: 'Lasanha',
        kcal: '19kcal',
        categoria: 'leve e rápido',
        image: './lasanha.png', // Corrija o caminho da imagem se necessário
        description: 'Uma saborosa lasanha...',
        ingredients: [
          '500g de carne moída',
          '2 xícaras de molho de tomate',
          '500g de massa para lasanha',
          '200g de queijo mussarela',
          '100g de queijo parmesão'
        ],
        instructions: 'Monte as camadas da lasanha...'
      }
      // Adicione mais receitas de almoço se necessário
    ],
    dinner: [
      {
        name: 'Sopa de Legumes',
        kcal: '19kcal',
        categoria: 'leve e rápido',
        image: 'https://example.com/sopa-de-legumes.jpg', // Certifique-se de que essa URL esteja correta
        description: 'Uma sopa nutritiva...',
        ingredients: [
          '2 cenouras',
          '2 batatas',
          '1 abobrinha',
          '1 litro de caldo de legumes'
        ],
        instructions: 'Cozinhe todos os ingredientes...'
      }
      // Adicione mais receitas de jantar se necessário
    ]
  };

  const categories = Object.keys(recipes);
  const currentRecipes = recipes[selectedCategory].slice(0, 6);

  return (
    <>
      <div className="container">
        <Sidebar />
        <div className="left2">
          <div className="menu-recipes">
            {categories.map((category) => (
              <button
                key={category}
                className={selectedCategory === category ? 'active' : ''}
                onClick={() => setSelectedCategory(category)}
              >
                <FontAwesomeIcon icon={category === 'breakfast' ? faCoffee : category === 'lunch' ? faUtensils : faMoon} />
                {category === 'breakfast' ? 'Café da Manhã' : category === 'lunch' ? 'Almoço' : 'Jantar'}
              </button>
            ))}
          </div>
          <div className="cards-section">
            {currentRecipes.map((recipe, index) => (
              <div key={index} className="recipe-card-container">
                <RecipeCard recipe={recipe} onClick={setSelectedRecipe} />
              </div>
            ))}
          </div>
        </div>
        <div className="right">
          <div className="profile-section">
            <RecipeDetails recipe={selectedRecipe} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Recipes;
