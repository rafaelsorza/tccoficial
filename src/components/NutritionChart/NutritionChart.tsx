import React from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';

interface ChartData {
  name: string;
  value: number;
}

interface CaloriasChartProps {
  data: ChartData[];
}

const CaloriasChart: React.FC<CaloriasChartProps> = ({ data }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div className="chart-container">
      <h2>Nutrição do Dia</h2>
      <PieChart width={600} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          innerRadius={50}
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      <div className="chart-legend">
        {data.map((entry, index) => (
          <div key={index} className="legend-item">
            <div
              className="color-box"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></div>
            <span>
              {entry.name}: {entry.value.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaloriasChart;
