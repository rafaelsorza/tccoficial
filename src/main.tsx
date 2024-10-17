import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { getAuth, onAuthStateChanged, User } from "firebase/auth";


interface AuthContextType {
  currentUser: User | null;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

// Hook para usar o contexto
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// AuthProvider está definido diretamente no main.tsx
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>;
};




ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider> 
  <React.StrictMode>
      <App />
  </React.StrictMode>
  </AuthProvider>
);