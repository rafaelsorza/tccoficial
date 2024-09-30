import React, { useState, useEffect } from 'react';
import './DisplayDate.css'
import { FaCalendar } from 'react-icons/fa';

const DisplayDate: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('pt-BR', {
     year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
    setCurrentDate(formattedDate);
  }, []);

  return <div className='date-container'>
    <FaCalendar/>
    <div className='text-section'> {currentDate}</div></div>;
};

export default DisplayDate;