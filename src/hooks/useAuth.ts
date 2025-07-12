'use client';

import { useState } from 'react';
import { User } from '@/types';
import { useLocalStorage } from './useLocalStorage';
import { apiService } from '@/services/api';

export function useAuth() {
  const [user, setUser, removeUser, isStorageLoaded] = useLocalStorage<User | null>('streamunity_user', null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string): Promise<User> => {
    setIsLoading(true);
    try {
      // For development: create a mock user if API fails
      let response;
      try {
        response = await apiService.login({ email, password });
      } catch {
        // Mock user for development when API is not available
        console.warn('API not available, using mock user for development');
        response = {
          access_token: 'mock-token',
          user: {
            id: '1',
            name: email.split('@')[0],
            email: email
          }
        };
      }
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', response.access_token);
      }
      setUser(response.user);
      return response.user;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Erreur de connexion');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<User> => {
    setIsLoading(true);
    try {
      // For development: create a mock user if API fails
      let response;
      try {
        response = await apiService.register({ name, email, password });
      } catch {
        // Mock user for development when API is not available
        console.warn('API not available, using mock user for development');
        response = {
          access_token: 'mock-token',
          user: {
            id: '1',
            name: name,
            email: email
          }
        };
      }
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', response.access_token);
      }
      setUser(response.user);
      return response.user;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Erreur lors de l\'inscription');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
    removeUser();
  };

  const isAuthenticated = !!user;

  return {
    user,
    isLoading,
    isAuthenticated,
    isStorageLoaded,
    login,
    register,
    logout,
    setUser
  };
}