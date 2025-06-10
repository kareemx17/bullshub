import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      checkAuth();
    }
  }, [token]);

  const checkAuth = async () => {
    try {
      const response = await axios.get(`${API_URL}/protected`);
      setUser(response.data);
    } catch (error) {
      console.error('Error checking authentication:', error);
      logout();
    }
  };

  const refreshUser = async () => {
    if (token) {
      await checkAuth();
    }
  };

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, 
        new URLSearchParams({ username, password }),
        { 
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }
      );
      const { access_token } = response.data;
      setToken(access_token);
      localStorage.setItem('token', access_token);
      await checkAuth();
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  const register = async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/register`,
        new URLSearchParams({ username, password }),
        { 
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }
      );
      return response.data.message === "User created successfully";
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);