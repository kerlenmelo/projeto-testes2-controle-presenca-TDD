import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { listarChamadaCompleta } from '../api/chamada.service';
import Header from '../components/Header';
import React from 'react';

function ChamadaVisualizar() {
  const { disciplinaId } = useParams();
  const [data, setData] = useState(new Date().toISOString().slice(0, 10));
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    if (!disciplinaId || !data) return;

    listarChamadaCompleta(disciplinaId, data).then((lista) => {
      setAlunos(lista || []);
    });
  }, [disciplinaId, data]);

  const corStatus = (status) => {
    if (status === 'Presente') return 'green';
    if (status === 'Ausente') return 'red';
    return 'black';
  };

  return (
    <>
      <Header />

      <div style={{ padding: 30 }}>
        <h2>Visualizar Chamada</h2>

        <div style={{ marginBottom: 20 }}>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </div>

        <table>
          <thead>
            <tr>
              <th>Aluno</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {alunos.map((aluno) => (
              <tr key={aluno._id}>
                <td>{aluno.nome}</td>
                <td
                  style={{
                    color: corStatus(aluno.status),
                    fontWeight: 'bold',
                  }}
                >
                  {aluno.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ChamadaVisualizar;