import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import './styles/app.css';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DisciplinaDetalhe from './pages/DisciplinaDetalhe';
import Chamada from './pages/Chamada';
import AlunoDetalhe from './pages/AlunoDetalhe';

function App() {
  const { professor } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={professor ? <Navigate to="/dashboard" /> : <Login />}
      />

      <Route
        path="/dashboard"
        element={professor ? <Dashboard /> : <Navigate to="/" />}
      />

      <Route
        path="/disciplinas/:id"
        element={professor ? <DisciplinaDetalhe /> : <Navigate to="/" />}
      />

      <Route
        path="/disciplinas/:disciplinaId/chamada"
        element={professor ? <Chamada /> : <Navigate to="/" />}
      />

      <Route
        path="/alunos/:alunoId"
        element={professor ? <AlunoDetalhe /> : <Navigate to="/" />}
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
