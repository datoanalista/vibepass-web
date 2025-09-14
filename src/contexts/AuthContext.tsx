"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  nombreCompleto: string;
  email: string;
  rut: string;
  telefono: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (userData: User) => void;
  logout: () => void;
  getFirstName: () => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Cargar usuario del localStorage al inicializar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('vibepass_user');
      if (savedUser) {
        try {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          console.log('🔐 [AuthContext] Usuario cargado desde localStorage:', userData);
        } catch (error) {
          console.error('❌ [AuthContext] Error al cargar usuario:', error);
          localStorage.removeItem('vibepass_user');
        }
      }
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    if (typeof window !== 'undefined') {
      localStorage.setItem('vibepass_user', JSON.stringify(userData));
      console.log('✅ [AuthContext] Usuario logueado:', userData);
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('vibepass_user');
      console.log('👋 [AuthContext] Usuario deslogueado');
    }
  };

  const getFirstName = (): string => {
    if (!user || !user.nombreCompleto) return 'Mi cuenta';
    
    // Obtener solo el primer nombre (hasta el primer espacio)
    const firstName = user.nombreCompleto.split(' ')[0];
    return firstName;
  };

  const isLoggedIn = user !== null;

  const value: AuthContextType = {
    user,
    isLoggedIn,
    login,
    logout,
    getFirstName,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
