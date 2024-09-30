import './Dashboard.css';
import React, { useState, useEffect } from 'react';
import { UserButton } from '../Auth/Login/authContext';
import DisplayDate from '../../components/DisplayDate/DisplayDate';
import Sidebar from '../../components/sidebar/sidebar';

interface NutritionalValues {
  totalCalories: number;
  totalProtein: number;
  totalVitamins: number;
  totalCarbohydrates: number;
}

const Dashboard: React.FC = () => {
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

    <div className='container'>
      <div className="left">
        <Sidebar/>
      </div>
      <div className="main">
        <div className="welcome">
          <DisplayDate />
         <p>Ola bem-vindo de volta!</p>
        </div>
      </div>
      <div className="right">
     
         <UserButton /></div>

   
    </div>



  );
};

export default Dashboard;