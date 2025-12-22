import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { listarDisciplinasPorProfessor } from '../api/disciplina.service';
import DisciplinaCard from '../components/DisciplinaCard';
import Header from '../components/Header';

function Dashboard() {
  const { professor } = useAuth();
  const [disciplinas, setDisciplinas] = useState([]);

  useEffect(() => {
    if (!professor) return;

    listarDisciplinasPorProfessor(professor.id)
      .then(setDisciplinas)
      .catch(console.error);
  }, [professor]);

  return (
    <>
      <Header />

      <div style={{ padding: 30 }}>
        <h2>Minhas Disciplinas</h2>

        <div style={{ display: 'grid', gap: 16 }}>
          {disciplinas.map((d) => (
            <DisciplinaCard key={d._id} disciplina={d} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
