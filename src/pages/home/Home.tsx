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
        <p className="subtitle">
          Acompanhe, monitore e gerencie sua saúde de forma rápida e eficiente.
        </p>
      </header>
      <div className="half-circle"></div>

      <div className="fotosHome">
        <div className="item1">
          <img src="/fotorec.PNG" />
          <div><p className="subtitle">Mostrar função de receitas</p></div>
        </div>
        <div className="item1">
          <img src="/IconCal.PNG" alt="Monitoramento de calorias" />
          <div><p className="subtitle">Monitoramento de calorias</p></div>
        </div>
        <div className="item1">
          <img src="caminho/para/imagem3.jpg" alt="Funções do app" />
          <div><p className="subtitle">Funções do app</p></div>
        </div>
      </div>

      <div className="fotosHome">
        <div className="item2">
          <img src="caminho/para/imagem4.jpg" alt="Função de receitas" />
          <div className="item2-text">Mostrar função de receitas</div>
        </div>
      </div>
      <div className="fotosHome">
        <div className="item2">
          <div className="item2-text">Monitoramento de calorias</div>
          <img src="caminho/para/imagem5.jpg" alt="Monitoramento de calorias" />
          
        </div>
      </div>
      <div className="fotosHome">
        <div className="item2">
          <img src="caminho/para/imagem6.jpg" alt="Funções do app" />
          <div className="item2-text">Funções do app</div>
        </div>
      </div >


      <div className="footer">
        <div className="footer-container">

        </div >
        <div className="footer-info">
          <p>&copy; {new Date().getFullYear()} Vitalitay Vision. Todos os direitos reservados.</p>
          <p>
            Contato: <a href="mailto:vitalityvisionn@gmail.com">vitalityvisionn@gmail.com</a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;
