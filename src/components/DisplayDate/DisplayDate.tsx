import React, { useState, useEffect } from 'react';
import './DisplayDate.css';
import { MdDateRange } from 'react-icons/md';  // Novo ícone

const DisplayDate: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('pt-BR', {
      weekday: 'long',  // Dia da semana por extenso
      year: 'numeric',
      month: 'long',    // Mês por extenso
      day: 'numeric',
    });
    setCurrentDate(formattedDate);
  }, []);

  return (
    <div className="date-container">
   
      <div className="text-section">{currentDate}</div>
    </div>
  );
};

export default DisplayDate;
