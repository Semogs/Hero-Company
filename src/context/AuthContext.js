import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token') || null);
  const [trainerId, setTrainerId] = useState(localStorage.getItem('trainerId') || null);
  const [loading, setLoading] = useState(false);

  const toggleLoader = (value) => {
    setLoading(value);
  };

  const login = (token, trainerId) => {
    localStorage.setItem('token', token);
    localStorage.setItem('trainerId', trainerId);
    setAuthToken(token);
    setTrainerId(trainerId);
  };

  const logout = () => {
    localStorage.clear();
    setAuthToken(null);
  };

  return <AuthContext.Provider value={{ authToken, trainerId, login, logout, loading, toggleLoader }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
