import React from 'react';

interface FoodItemProps {
  food: {
    id: string;
    name: string;
    calories: number;
  };
  onAddFood: (food: any) => void;
}

const FoodItem: React.FC<FoodItemProps> = ({ food, onAddFood }) => {
  return (
    <li>
      <span>{food.name} - {food.calories} Calorias</span>
      <button onClick={() => onAddFood(food)}>Adicionar</button>
    </li>
  );
};

export default FoodItem;
