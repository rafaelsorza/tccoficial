import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../../firebase-config';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  // Função para verificar login com email e senha
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verificação se os campos estão preenchidos
    if (!email || !password) {
      setError("Todos os campos precisam ser preenchidos.");
      return;
    }

    try {
      // Tentativa de login com e-mail e senha
      await signInWithEmailAndPassword(auth, email, password);

      // Verificar se o e-mail é de um desenvolvedor
      if (email === 'developer@example.com') {
        navigate('/admin'); // Redireciona para a tela de administração
      } else {
        navigate('/dashboard'); // Redireciona para a tela principal do usuário
      }
    } catch (error: any) {
      if (error.code === 'auth/wrong-password') {
        setError('Senha incorreta. Por favor, verifique sua senha e tente novamente.');
      } else if (error.code === 'auth/user-not-found') {
        setError('E-mail não encontrado. Verifique o e-mail inserido.');
      } else {
        setError('Erro ao fazer login. Tente novamente mais tarde.');
      }
    }
  };

  // Função de login com Google
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="logo">
        <Link to="/"><img src="logo.png" width={"35vh"} height={"35vh"} alt="Logo" /></Link>
      </div>

      <div className="login-container">
        <div className="image-container">
          <img src="/foto1.jfif" alt="Imagem de fundo" />
        </div>
        <div className="form-container">
          <h1>Bem-vindo de volta!</h1>
          <p>Acompanhe sua saúde de uma maneira rápida e eficiente.</p>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />

            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="login-button">Entrar</button>
          </form>

          <div className="divider">
            <span>ou continue com</span>
          </div>

          <div className="social-login">
            <button className="social-button google" onClick={handleGoogleLogin}>
              <FaGoogle />
            </button>
          </div>

          <p className="register-link">
            Não tem uma conta? <Link to="/registro">Registre-se</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
