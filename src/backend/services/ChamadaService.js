const Chamada = require('../models/Chamada');
const ChamadaRepository = require('../repositories/ChamadaRepository');
const AlunoDisciplinaRepository = require('../repositories/AlunoDisciplinaRepository');

class ChamadaService {
  /**
   * Registra a presença de UM aluno
   */
  async registrar(dados) {
  const dataNormalizada = new Date(dados.data);
  dataNormalizada.setHours(0, 0, 0, 0);

  const resultados = [];

  for (const presenca of dados.presencas) {
  if (
    !presenca.alunoId ||
    presenca.alunoId === 'undefined'
  ) {
    continue;
  }

  const chamada = new Chamada({
    alunoId: presenca.alunoId,
    disciplinaId: dados.disciplinaId,
    professorId: dados.professorId,
    status: presenca.status,
    data: dataNormalizada,
  });

  resultados.push(await ChamadaRepository.create(chamada));
}

  return resultados;
}


  async listarPorDisciplinaEData(disciplinaId, data) {
    return ChamadaRepository.findByDisciplinaAndData(disciplinaId, data);
  }

  async listarPorAluno(alunoId) {
    return ChamadaRepository.findByAluno(alunoId);
  }

  async listarChamadaCompleta(disciplinaId, data) {
  const dataNormalizada = new Date(data);
  dataNormalizada.setHours(0, 0, 0, 0);

  const matriculas = await AlunoDisciplinaRepository.findByDisciplina(
    disciplinaId
  );

  const chamadas = await ChamadaRepository.findByDisciplinaAndData(
    disciplinaId,
    dataNormalizada
  );

  return matriculas.map((matricula) => {
    const chamadaAluno = chamadas.find(
      (c) => String(c.alunoId._id) === String(matricula.alunoId._id)
    );

    return {
      _id: matricula.alunoId._id,
      nome: matricula.alunoId.nome,
      email: matricula.alunoId.email,
      status: chamadaAluno ? chamadaAluno.status : 'Ausente',
    };
  });
}

}

module.exports = new ChamadaService();
