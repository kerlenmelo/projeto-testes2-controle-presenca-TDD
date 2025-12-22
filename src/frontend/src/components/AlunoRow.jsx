import React from 'react';
import './AlunoRow.css';

function AlunoRow({ aluno, status, onChange }) {
  const alunoId = aluno._id;

  return (
    <tr className={status === 'Presente' ? 'presente' : 'ausente'}>
      <td>{aluno.nome}</td>

      <td style={{ textAlign: 'center' }}>
        <input
          type="checkbox"
          checked={status === 'Presente'}
          onChange={(e) =>
            onChange(alunoId, e.target.checked ? 'Presente' : 'Ausente')
          }
        />
      </td>
    </tr>
  );
}

export default AlunoRow;
