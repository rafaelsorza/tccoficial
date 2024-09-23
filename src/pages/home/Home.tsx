import React from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom';

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


  return (
    <>

      <header className="hero-section">
        <h1 className="title">Bem vindo a Nossa Plataforma de Saúde Online!</h1>
        <p className='subtitle'>Acompanhe, monitore e gerencie sua saúde de forma rápida e eficiente.
        </p>
        <button className='botao-inicio' onClick={handleNavigate}>
      Iniciar
    </button>
      </header>


      <div className="half-circle"></div>
      <section className="info-section">
        <div className="info-card">
          <img src="/patins.jpg"/>
          <h3>Leve uma vida mais saúdavel acompanhando seu metabolismo.</h3>
          <p></p>
        </div>
        <div className="info-card">
              <img src="/pulandocorda.jpg" />
          <h3>pulando bb</h3>
          <p></p>
        </div>
      </section>
 
      <div className='cards-box'>
   <h1 className='title-container'>Sua Jornada de Saúde e Bem-Estar</h1>
      <div className="cards-container">

        <Card 
          title='Monitoramento de Calorias e Nutrição' 
          description="Este é o texto do primeiro card." 
          imageUrl="/icon1.png" 
        />

        <Card 
          title="Controle de Dieta e Atividades" 
          description="Este é o texto do segundo card." 
          imageUrl="/icon2.png"
        />
        <Card 
          title="Rastreamento de Alimentos e Exercícios" 
          description="Este é o texto do terceiro card." 
          imageUrl="/icon3.png" 
        />
      </div>
</div>

<section className="texto-imagem">
        <div className="imagem">  
          <img src="bebenoagua.png" alt="Appointment Schedules" /> 
          </div>
       
          <div className="texto">
           <p className='title'> Titulo </p>
            <p>Paragrafo com descrição </p>
            <button className="saiba-mais"> Saiba mais </button>
     </div>
      </section>


      <footer className="footer">
      <div className="footer-container">
  
        <div className="footer-info">
          <p>&copy; {new Date().getFullYear()} Vitality Vision. Todos os direitos reservados.</p>
          <p>Contato: <a href="mailto:contato@empresa.com">vitalityvisionn@gmail.com</a></p>
        </div>
      </div>
    </footer>




    </>
  )
}

export default Home
