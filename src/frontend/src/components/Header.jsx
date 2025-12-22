import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Header() {
  const { professor, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header style={{ padding: 16, borderBottom: '1px solid #ccc' }}>
      <strong>Controle de Presença</strong>

      {professor && (
        <button
          onClick={handleLogout}
          style={{ float: 'right', cursor: 'pointer' }}
        >
          Sair
        </button>
      )}
    </header>
  );
}

export default Header;
