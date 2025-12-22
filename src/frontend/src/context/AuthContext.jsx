import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [professor, setProfessor] = useState(null);

  const login = (professorData) => {
    setProfessor(professorData);
  };

  const logout = () => {
    setProfessor(null);
  };

  return (
    <AuthContext.Provider value={{ professor, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
