import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { listarChamadaCompleta, registrarChamada } from '../api/chamada.service';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import AlunoRow from '../components/AlunoRow';
import React from 'react';
import './Chamada.css';

function Chamada() {
  const { disciplinaId } = useParams();
  const { professor } = useAuth();
  const [alunos, setAlunos] = useState([]);
  const [presencas, setPresencas] = useState({});
  const [data, setData] = useState(new Date().toISOString().slice(0, 10));

  useEffect(() => {
    if (!disciplinaId || !data) return;

    listarChamadaCompleta(disciplinaId, data).then((lista) => {
      const alunosNormalizados = lista.map((item) => ({
        _id: item._id,
        nome: item.nome,
        status: item.status || 'Ausente'
      }));

      setAlunos(alunosNormalizados);

      const inicial = {};
      alunosNormalizados.forEach((aluno) => {
        inicial[aluno._id] = aluno.status;
      });

      setPresencas(inicial);
    });
  }, [disciplinaId, data]);

  const atualizarStatus = (alunoId, status) => {
    setPresencas({ ...presencas, [alunoId]: status });
  };

  const salvar = async () => {
    if (!professor) return;

    const presencasPayload = Object.entries(presencas)
      .filter(([alunoId]) => alunoId && alunoId !== 'undefined')
      .map(([alunoId, status]) => ({
        alunoId,
        status
      }));

    if (presencasPayload.length === 0) {
      alert('Nenhuma presença válida para salvar');
      return;
    }

    const dados = {
      disciplinaId,
      professorId: professor._id || professor.id,
      data,
      presencas: presencasPayload
    };

    await registrarChamada(dados);
    alert('Chamada registrada');
  };

  return (
    <>
      <Header />

      <div style={{ padding: 30 }}>
        <h2>Chamada</h2>

        <div style={{ marginBottom: 20 }}>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </div>

        <table>
          <tbody>
            {alunos.map((aluno) => (
              <AlunoRow
                key={aluno._id}
                aluno={aluno}
                status={presencas[aluno._id]}
                onChange={atualizarStatus}
              />
            ))}
          </tbody>
        </table>

        <div className="salvar-container">
          <button className="btn-salvar" onClick={salvar}>
            Salvar
          </button>
        </div>
      </div>
    </>
  );
}

export default Chamada;
