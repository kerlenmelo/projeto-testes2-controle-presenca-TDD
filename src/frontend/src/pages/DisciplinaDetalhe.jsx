import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './DisciplinaDetalhe.css';

function DisciplinaDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <div className="disciplina-container">
        <div className="disciplina-card">
          <h2>Disciplina 1</h2>

          <button
            className="btn-chamada"
            onClick={() => navigate(`/disciplinas/${id}/chamada`)}
          >
            Abrir Chamada
          </button>
        </div>
      </div>
    </>
  );
}

export default DisciplinaDetalhe;
