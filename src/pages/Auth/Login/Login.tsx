import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa'
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from './firebase-config';
import './Login.css'

const Login: React.FC = () => {
   const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Todos os campos precisam ser preenchidos.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (error: any) {
      setError(error.message);
    }
  };

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
       <Link to="/"><img src="logo.png"  width={"35vh"} height={"35vh"}/></Link> 
    </div>
   
      <div className="login-container"> 
         <div className="image-container">
          <img src="/patins.jfif"/>
      
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
             <button className="social-button google" onClick={handleGoogleLogin}> <FaGoogle/> </button>
            
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