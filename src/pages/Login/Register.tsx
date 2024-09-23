import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from './firebase-config';
import { doc, setDoc } from 'firebase/firestore';

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
    <div className="form-container">
      <h2>Registrar</h2>
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
        <button type="submit">Registrar</button>
      </form>

      <p>Ou</p>

      {/* Botão para login com Google */}
      <button onClick={handleGoogleSignIn} className="google-button">
        Entrar com Google
      </button>

      <Link to="/login">Já tem uma conta? Entrar</Link>
    </div>
  );
};

export default Registro;
