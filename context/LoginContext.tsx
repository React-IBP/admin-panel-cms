import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { getSession } from '@/utils/actions';

// Define la forma del estado
interface LoginContextProps {
  isAuthenticated: boolean;
  toggleAuth: () => void;
}

// Crea el contexto con un valor predeterminado
const LoginContext = createContext<LoginContextProps | undefined>(undefined);

// Proveedor del contexto
export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Intenta obtener el valor de localStorage al inicializar el estado
    const storedAuth = localStorage.getItem('isAuthenticated');
    return storedAuth ? JSON.parse(storedAuth) : false; // Devuelve el valor almacenado o false por defecto
  });

  // Guarda el valor de isAuthenticated en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  const toggleAuth = async () => {
    const sessionData: any = await getSession();
    if (sessionData?.isLoggedIn) {
      setIsAuthenticated(true); // Usa valores booleanos
    } else {
      setIsAuthenticated(false);
    }
  };

  return (
    <LoginContext.Provider value={{ isAuthenticated, toggleAuth }}>
      {children}
    </LoginContext.Provider>
  );
};

// Hook para usar el contexto
export const useLoginContext = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error('useLoginContext debe usarse dentro de LoginProvider');
  }
  return context;
};
