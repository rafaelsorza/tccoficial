import React from 'react';
import './ResaubleChart.css'



interface NutritionalValues {
  totalCalories: number;
  totalProtein: number;
  totalVitamins: number;
  totalCarbohydrates: number;
}

interface Props {
  nutritionalValues: NutritionalValues;
}

const ReusableChart: React.FC<Props> = ({ nutritionalValues }) => {
  return (
    <div className="charts">
      <div className="progress-bars">
        <div className="progress-bar">
          <span>Calorias: {nutritionalValues.totalCalories} kcal</span>
          <div className="progress">
            <div
              className="progress-bar-fill"
              style={{ width: `${nutritionalValues.totalCalories}px` }}
            ></div>
          </div>
        </div>
        <div className="progress-bar">
          <span>Proteínas: {nutritionalValues.totalProtein} g</span>
          <div className="progress">
            <div
              className="progress-bar-fill"
              style={{ width: `${nutritionalValues.totalProtein}px` }}
            ></div>
          </div>
        </div>
        <div className="progress-bar">
          <span>Vitaminas: {nutritionalValues.totalVitamins}</span>
          <div className="progress">
            <div
              className="progress-bar-fill"
              style={{ width: `${nutritionalValues.totalVitamins}px` }}
            ></div>
          </div>
        </div>
        <div className="progress-bar">
          <span>Carboidratos: {nutritionalValues.totalCarbohydrates}</span>
          <div className="progress">
            <div
              className="progress-bar-fill"
              style={{ width: `${nutritionalValues.totalCarbohydrates}px` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReusableChart;
