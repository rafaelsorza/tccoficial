import './recipes.css'
import React from 'react';

interface Recipe {
  name: string;
  image: string;
  description: string;
  ingredients: string[];
  instructions: string[];
}

interface RecipeDetailsProps {
  recipe: Recipe | null;
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ recipe }) => {
  if (!recipe) {
    return <div>Selecione uma receita para ver os detalhes</div>;
  }

  return (
    <div className="details-style">
      <h2>{recipe.name}</h2>
      <img src={recipe.image} alt={recipe.name} className='details-image'/>
      <p>{recipe.description}</p>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <p className='comopreparar'>Como preparar</p>

  {/* Lista de instruções */}
  <ol>
    {recipe.instructions.map((step, index) => (
      <li key={index}>{step}</li>
    ))}
  </ol>
    </div>
  );
};

export default RecipeDetails;