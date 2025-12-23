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

  const [bloqueado, setBloqueado] = useState(false);
  const [popupMensagem, setPopupMensagem] = useState('');
  const [mostrarPopup, setMostrarPopup] = useState(false);

  useEffect(() => {
    if (!disciplinaId || !data) return;

    listarChamadaCompleta(disciplinaId, data).then((lista) => {
      const alunosNormalizados = lista.map((item) => ({
        _id: item._id,
        nome: item.nome,
        status: item.status || 'Ausente',
      }));

      setAlunos(alunosNormalizados);

      const inicial = {};
      alunosNormalizados.forEach((aluno) => {
        inicial[aluno._id] = aluno.status;
      });
      setPresencas(inicial);

      const existePresente = lista.some(
        (a) => a.status === 'Presente'
      );

      if (existePresente) {
        setBloqueado(true);
        setPopupMensagem(
          'A chamada deste dia já foi realizada e não pode ser alterada.'
        );
        setMostrarPopup(true);
      } else {
        setBloqueado(false);
      }
    });
  }, [disciplinaId, data]);

  const atualizarStatus = (alunoId, status) => {
    if (bloqueado) return;
    setPresencas({ ...presencas, [alunoId]: status });
  };

  const salvar = async () => {
    if (!professor || bloqueado) return;

    const presencasPayload = Object.entries(presencas)
      .filter(([alunoId]) => alunoId && alunoId !== 'undefined')
      .map(([alunoId, status]) => ({
        alunoId,
        status,
      }));

    const temPresente = presencasPayload.some(
      (p) => p.status === 'Presente'
    );

    if (!temPresente) {
      setPopupMensagem(
        'Para registrar a chamada é necessário marcar pelo menos um aluno como Presente.'
      );
      setMostrarPopup(true);
      return;
    }

    const dados = {
      disciplinaId,
      professorId: professor._id || professor.id,
      data,
      presencas: presencasPayload,
    };

    await registrarChamada(dados);

    setPopupMensagem('Chamada registrada com sucesso.');
    setMostrarPopup(true);
    setBloqueado(true);
  };

  const alterarData = () => {
    setMostrarPopup(false);
    setBloqueado(false);
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
            disabled={bloqueado}
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
                disabled={bloqueado}
              />
            ))}
          </tbody>
        </table>

        {!bloqueado && (
          <div className="salvar-container">
            <button className="btn-salvar" onClick={salvar}>
              Salvar
            </button>
          </div>
        )}
      </div>

      {mostrarPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <p>{popupMensagem}</p>

            <button className="btn-salvar" onClick={alterarData}>
              Alterar data
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chamada;
