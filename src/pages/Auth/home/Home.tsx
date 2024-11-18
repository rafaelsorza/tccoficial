import React from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar';

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
        <div className="itemh">
          <img src="/copo.png" alt="Contador de Água" />
          <div className="text">
            <p className="subtitle2">Contador de Água</p>
            <p className="description">Mantenha-se hidratado com nosso monitoramento diário de água.</p>
          </div>
        </div>
        <div className="itemh">
          <img src="/grafico.png" alt="Monitoramento de Calorias" />
          <div className="text">
            <p className="subtitle3">Monitoramento de Calorias</p>
            <p className="description">Acompanhe suas calorias para alcançar seus objetivos de saúde.</p>
          </div>
        </div>
        <div className="itemh">
          <img src="/cardapio.png" alt="Receitas" />
          <div className="text">
            <p className="subtitle1">Receitas</p>
            <p className="description">Descubra receitas saudáveis e saborosas.</p>
          </div>
        </div>
      </div>




      <div className="containerimg">
        <div className="section left">
          <img src="comendo.png" alt="Imagem à esquerda" className="image1" />
          <div className="text1">
            <h2>Nosso site permite que você faça o seu <p>Monitoramento de Calorias</p></h2>
            <p>O monitoramento de calorias é uma prática que envolve acompanhar a quantidade de calorias consumidas através da alimentação. Essa abordagem pode ser útil para diversas finalidades, como controle de peso, perda de gordura, ganho muscular ou manutenção da saúde em geral.</p>
          </div>
        </div>

        <div className="section right">
          <div className="text2">
          <h2> No nosso aplicativo você também encontra funções como o <p>Registro de Atividades</p></h2>
            <p>O Resgistro de Atividades do nosso aplicativo registra quantos passos você dá ao longo do dia, usando os sensores do seu celular. Ele ajuda a acompanhar sua atividade física, mostrando não só o número de passos, mas também a distância percorrida e as calorias queimadas. É uma forma simples de monitorar seu progresso e te incentivar a se mover mais, ajudando a alcançar suas metas de saúde e bem-estar.</p>
          </div>
          <img src="ioga.png" alt="Imagem à direita" className="image2" />
        </div>
      </div>



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
