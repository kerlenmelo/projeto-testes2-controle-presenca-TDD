import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DisciplinaCard({ disciplina }) {
  const navigate = useNavigate();

  const abrirDisciplina = () => {
    navigate(`/disciplinas/${disciplina._id}`);
  };

  return (
    <div
      onClick={abrirDisciplina}
      style={{
        border: '1px solid #ccc',
        padding: 16,
        borderRadius: 4,
        cursor: 'pointer'
      }}
    >
      <h3>{disciplina.nome}</h3>
      <p>Carga horária: {disciplina.cargaHoraria}</p>
    </div>
  );
}

export default DisciplinaCard;
