import React from 'react';
import './recipes.css'

interface Recipe {
  name: string;
  kcal: string;
  categoria: string;
  image: string;
  description: string;
  ingredients: string[];
  instructions: string;
}

interface RecipeCardProps {
  recipe: Recipe;
  onClick: (recipe: Recipe) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick }) => {
  return (
    <div onClick={() => onClick(recipe)} className='card-style'>
      <img src={recipe.image} alt={recipe.name} className='card-image'/>
      <p className='title-recipe'>{recipe.name}</p>
      <p className='kcal'> {recipe.kcal} </p>
      <p className='categoria-recipe'> {recipe.categoria} </p>
    </div>
  );
};

export default RecipeCard;