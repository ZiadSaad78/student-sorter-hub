import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { authService } from '@/services/api';
import { getStoredToken, removeToken, storeToken } from '@/services/api/config';
import { LoginResponse } from '@/types/api';

interface AuthUser {
  id: number;
  email: string;
  role: string;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  role: string | null;
  loading: boolean;
  signIn: (username: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  isSuperAdmin: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on mount
    const storedToken = getStoredToken();
    if (storedToken) {
      setToken(storedToken);
      // Try to parse user info from token if stored
      const storedUser = localStorage.getItem('auth_user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setRole(parsedUser.role);
        } catch (e) {
          console.error('Error parsing stored user:', e);
        }
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (username: string, password: string) => {
    try {
      const response = await authService.login({ username, password });
      
      if (response.error) {
        return { error: new Error(response.error) };
      }

      if (response.data?.token) {
        const loginData = response.data as LoginResponse;
        setToken(loginData.token);
        
        const authUser: AuthUser = {
          id: loginData.userId || 0,
          email: username,
          role: loginData.role || 'admin',
        };
        
        setUser(authUser);
        setRole(authUser.role);
        localStorage.setItem('auth_user', JSON.stringify(authUser));
        
        return { error: null };
      }

      return { error: new Error('Invalid response from server') };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    authService.logout();
    setUser(null);
    setToken(null);
    setRole(null);
    localStorage.removeItem('auth_user');
  };

  const value: AuthContextType = {
    user,
    token,
    role,
    loading,
    signIn,
    signOut,
    isSuperAdmin: role === 'SuperAdmin' || role === 'super_admin',
    isAdmin: role === 'SuperAdmin' || role === 'super_admin' || role === 'Admin' || role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
