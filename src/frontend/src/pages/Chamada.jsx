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

    useEffect(() => {
    if (!disciplinaId) return;

    listarChamadaCompleta(disciplinaId).then((lista) => {
        const alunosNormalizados = lista.map((item) => {
        return {
            _id: item._id || item.aluno?._id,
            nome: item.nome || item.aluno?.nome,
            status: item.status || 'Presente'
        };
        });

        setAlunos(alunosNormalizados);

        const inicial = {};
        alunosNormalizados.forEach((aluno) => {
        if (aluno._id) {
            inicial[aluno._id] = aluno.status;
        }
        });

        setPresencas(inicial);
    });
    }, [disciplinaId]);

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
        data: new Date().toISOString().slice(0, 10),
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

        <table>
          <tbody>
            {alunos.map((aluno) => {
            const id = aluno._id || aluno.alunoId?._id || aluno.alunoId;

            return (
                <AlunoRow
                key={id}
                aluno={aluno}
                status={presencas[id]}
                onChange={atualizarStatus}
                />
            );
            })}
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
