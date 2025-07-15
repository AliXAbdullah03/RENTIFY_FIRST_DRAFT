
'use client';

import { useRouter } from 'next/navigation';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type UserRole = 'renter' | 'owner' | 'admin';
export type Language = 'en' | 'tl';

interface User {
  name: string;
}

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  language: Language;
  setLanguage: (language: Language) => void;
  login: (name: string, role: UserRole) => void;
  signup: (name: string, role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [language, setLanguageState] = useState<Language>('en');
  const router = useRouter();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('rentify-user');
      const storedRole = localStorage.getItem('rentify-role') as UserRole | null;
      const storedLang = localStorage.getItem('rentify-language') as Language | null;
      if (storedUser && storedRole) {
        setUser(JSON.parse(storedUser));
        setRole(storedRole);
      }
      if (storedLang) {
        setLanguageState(storedLang);
      }
    } catch (error) {
      console.error("Could not parse data from localStorage", error);
      localStorage.clear();
    }
  }, []);

  const login = (name: string, role: UserRole) => {
    const userToStore = { name };
    setUser(userToStore);
    setRole(role);
    localStorage.setItem('rentify-user', JSON.stringify(userToStore));
    localStorage.setItem('rentify-role', role);
  };
  
  const signup = (name: string, role: UserRole) => {
    login(name, role);
  }

  const logout = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem('rentify-user');
    localStorage.removeItem('rentify-role');
    router.push('/login');
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('rentify-language', lang);
  }
  
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, role, language, setLanguage, login, signup, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
