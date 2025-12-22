import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { listarHistoricoAluno } from '../api/chamada.service';
import Header from '../components/Header';

function AlunoDetalhe() {
  const { alunoId } = useParams();
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    listarHistoricoAluno(alunoId).then(setHistorico);
  }, [alunoId]);

  return (
    <>
      <Header />

      <div style={{ padding: 30 }}>
        <h2>Histórico do Aluno</h2>

        <ul>
          {historico.map((h) => (
            <li key={h._id}>
              {h.data} — {h.status}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default AlunoDetalhe;
