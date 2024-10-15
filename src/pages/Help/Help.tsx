import React from 'react';
import './Help.css'; // Arquivo CSS para estilizar a tela de ajuda
import { Link } from 'react-router-dom';
import Sidebar from '../../components/sidebar/sidebar';

const Ajuda: React.FC = () => {
  return (
    <>
      <div className="side">
  <Sidebar />
</div>

<div className="help-container">
  <Link to="/">
    <img src="logo.png" width="35vh" height="35vh" alt="Logo" />
  </Link>
  <h1>Centro de Ajuda</h1>
  <p>Bem-vindo ao nosso centro de ajuda! Aqui você encontrará respostas para as dúvidas mais comuns.</p>

  <h2>Perguntas Frequentes</h2>
  <ul>
    <li><strong>Como faço para me cadastrar?</strong>
      <p>Vá até a tela de cadastro, preencha os seus dados e siga as instruções.</p>
    </li>
    <li><strong>Como recupero minha senha?</strong>
      <p>Clique no link "Esqueci minha senha" na tela de login e siga as instruções enviadas por e-mail.</p>
    </li>
    <li><strong>Como faço para registrar uma refeição ou exercício?</strong>
      <p>Na tela principal, clique em "Adicionar Refeição" ou "Adicionar Exercício" e insira as informações necessárias.</p>
    </li>
    <li><strong>Como posso entrar em contato com o suporte?</strong>
      <p>
        Envie um e-mail para 
        <a href="mailto:suporte@vitalityvision.com" target="_blank" rel="noopener noreferrer">
          suporte@vitalityvision.com
        </a> 
        ou ligue para (11) 1234-5678.
      </p>
    </li>
  </ul>

  <h2>Outras Dúvidas?</h2>
  <p>
    Se você não encontrou a resposta que procura, entre em contato com nossa equipe de suporte através do e-mail ou telefone.
  </p>
  <p>
    Você também pode nos encontrar no Instagram:
    <a href="https://instagram.com/tccditec" target="_blank" rel="noopener noreferrer">
      @tccditec
    </a>.
  </p>
</div>
    </>
  );
}

export default Ajuda;
