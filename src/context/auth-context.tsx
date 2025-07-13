
'use client';

import { useRouter } from 'next/navigation';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type UserRole = 'renter' | 'owner' | 'admin';

interface User {
  name: string;
}

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  login: (name: string, role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const router = useRouter();

  useEffect(() => {
    // This is a simple session persistence using localStorage for the demo.
    // In a real app, you would use HttpOnly cookies or a more secure method.
    try {
      const storedUser = localStorage.getItem('rentify-user');
      const storedRole = localStorage.getItem('rentify-role') as UserRole | null;
      if (storedUser && storedRole) {
        setUser(JSON.parse(storedUser));
        setRole(storedRole);
      }
    } catch (error) {
      console.error("Could not parse user from localStorage", error);
      localStorage.removeItem('rentify-user');
      localStorage.removeItem('rentify-role');
    }
  }, []);

  const login = (name: string, role: UserRole) => {
    const userToStore = { name };
    setUser(userToStore);
    setRole(role);
    localStorage.setItem('rentify-user', JSON.stringify(userToStore));
    localStorage.setItem('rentify-role', role);
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem('rentify-user');
    localStorage.removeItem('rentify-role');
    router.push('/login');
  };
  
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, role, login, logout, isAuthenticated }}>
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
