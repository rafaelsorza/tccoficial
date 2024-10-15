import React from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

interface CardProps {
  title: string;
  description: string;
  imageUrl?: string;  // Adiciona a prop opcional imageUrl
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl }) => {
  return (
    <div className="card">
      {imageUrl && <img src={imageUrl} className="card-image" />}
      <h2 className="card-title">{title}</h2>
      <p className="card-description">{description}</p>
    </div>
  );
};

function Home() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/login'); // Redireciona para a rota de login
  };

  const handleNavigate2 = () => {
    navigate('/register'); // Redireciona para a rota de login
  };
  return (
    <>
      <Navbar />
      <header className="hero-section">
        <h1 className="title">Bem vindo a Nossa Plataforma de Saúde Online!</h1>
        <p className='subtitle'>Acompanhe, monitore e gerencie sua saúde de forma rápida e eficiente.
        </p>

      </header>

      <div className="half-circle"></div>

      <footer className="footer">
        <div className="footer-container">

          <div className="footer-info">
            <p>&copy; {new Date().getFullYear()} Vitalitay Vision. Todos os direitos reservados.</p>
            <p>Contato: <a href="mailto:contato@empresa.com">vitalityvisionn@gmail.com</a></p>
          </div>
        </div>
      </footer>




    </>
  )
}

export default Home
