import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  avatar?: string;
  initials: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (name: string, email: string, password: string, title: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Helper function to generate initials from a name
const generateInitials = (name: string): string => {
  if (!name) return 'U';
  
  const nameParts = name.split(' ');
  if (nameParts.length === 1) {
    return name.substring(0, 2).toUpperCase();
  }
  
  return nameParts
    .filter(part => part.length > 0)
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('linkedinUser');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      // Ensure user always has initials
      if (!parsedUser.initials) {
        parsedUser.initials = generateInitials(parsedUser.name);
      }
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login - in a real app, this would call an API
    if (email && password) {
      const name = email.split('@')[0];
      const mockUser: User = {
        id: 'user-' + Date.now(),
        name,
        email,
        title: 'New User',
        initials: generateInitials(name),
      };
      
      localStorage.setItem('linkedinUser', JSON.stringify(mockUser));
      setUser(mockUser);
      setIsAuthenticated(true);
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const signup = async (name: string, email: string, password: string, title: string) => {
    // Mock signup - in a real app, this would call an API
    if (name && email && password) {
      const mockUser: User = {
        id: 'user-' + Date.now(),
        name,
        email,
        title,
        initials: generateInitials(name),
      };
      
      localStorage.setItem('linkedinUser', JSON.stringify(mockUser));
      setUser(mockUser);
      setIsAuthenticated(true);
    } else {
      throw new Error('Invalid signup information');
    }
  };

  const logout = () => {
    localStorage.removeItem('linkedinUser');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
