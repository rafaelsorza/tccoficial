import React, { useState } from 'react';
import './Register.css'
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from '../Login/firebase-config';
import { doc, setDoc } from 'firebase/firestore';
import { FaGoogle } from 'react-icons/fa';


const Registro: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Função para registro com email e senha
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError('Todos os campos precisam ser preenchidos.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
      });

      navigate('/dashboard');
    } catch (error: any) {
      setError(error.message);
    }
  };

  // Função para autenticação com Google
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Adiciona usuário ao Firestore se for novo
      const userDoc = doc(db, 'users', user.uid);
      await setDoc(userDoc, {
        name: user.displayName,
        email: user.email,
      });

      navigate('/dashboard');
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="register-page">
       <div className="logo">
        <img src="logo.png"  width={"35vh"} height={"35vh"}/>
    </div>

       <div className="register-container"> 
         <div className="image-container">
          <img src="/patins.jfif"/>
      
        </div>

 <div className="form-container">
          <h1>Bem-vindo ao Vitality Vision!</h1>
          <p>Acompanhe sua saúde de uma maneira rápida e eficiente.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
         {error && <p className="error-message">{error}</p>}
        <button type="submit" className='register-button'> Cadastrar </button>
         </form>



  <div className="divider">
            <span>ou continue com</span>
          </div>

          <div className="social-login">
             <button className="social-button google" onClick={handleGoogleSignIn}> <FaGoogle/> </button>
            
          </div>

          <p className="register-link">
            Já tem uma conta? <Link to="/login"> Entrar </Link>
          </p>
        </div>
       
     

     

    
</div>
  
      </div>
   
  );
};

export default Registro;
