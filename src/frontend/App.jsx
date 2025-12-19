import React, { useState } from 'react';

function App() {
  const [mensagem, setMensagem] = useState('');

  const registrarPresenca = async () => {
    setMensagem('Enviando...');

    try {
      const response = await fetch('http://localhost:3001/api/chamadas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          alunoId: '1',
          disciplinaId: '1',
          professorId: '1',
          data: '2025-01-01',
          status: 'Presente'
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setMensagem(data.message);
      } else {
        setMensagem('Presença registrada com sucesso');
      }
    } catch (error) {
      setMensagem('Erro ao conectar com a API');
    }
  };

  return (
    <div style={{ padding: 30, fontFamily: 'Arial' }}>
      <h1>Controle de Presença</h1>

      <button
        onClick={registrarPresenca}
        style={{
          padding: '10px 20px',
          fontSize: 16,
          cursor: 'pointer'
        }}
      >
        Registrar Presença
      </button>

      <p style={{ marginTop: 20 }}>{mensagem}</p>
    </div>
  );
}

export default App;
