const mongoose = require('mongoose');
const connectDB = require('../database');

// Models Mongoose
const Aluno = require('../models/mongoose/AlunoModel');
const Professor = require('../models/mongoose/ProfessorModel');
const Disciplina = require('../models/mongoose/DisciplinaModel');
const AlunoDisciplina = require('../models/mongoose/AlunoDisciplinaModel');

const CURSO = 'Análise e Desenvolvimento de Sistemas';

const runSeed = async () => {
  await connectDB();

  console.log('Limpando banco...');
  await Aluno.deleteMany();
  await Professor.deleteMany();
  await Disciplina.deleteMany();
  await AlunoDisciplina.deleteMany();

  console.log('Criando professores...');
  const professores = [];

  for (let i = 1; i <= 5; i++) {
    professores.push(
      await Professor.create({
        nome: `Professor ${i}`,
        cpf: `0000000000${i}`,
        email: `prof${i}@ifpe.edu.br`,
        telefone: `8199999000${i}`,
        senha: '123456',
        role: 'Professor'
      })
    );
  }

  console.log('Criando disciplinas...');
  const disciplinas = [];

  let disciplinaCount = 1;

  for (const professor of professores) {
    for (let i = 0; i < 2; i++) {
      disciplinas.push(
        await Disciplina.create({
          nome: `Disciplina ${disciplinaCount}`,
          cargaHoraria: 60,
          descricao: `Disciplina ${disciplinaCount} do curso ADS`,
          professorId: professor._id
        })
      );
      disciplinaCount++;
    }
  }


  console.log('Criando alunos...');
  const alunos = [];

  for (let i = 1; i <= 100; i++) {
    alunos.push(
      await Aluno.create({
        nome: `Aluno ${i}`,
        endereco: `Rua ${i}`,
        dataNascimento: new Date(2000, 0, 1),
        cpf: `111111111${i.toString().padStart(2, '0')}`,
        matricula: `ADS2025${i}`,
        telefone: `819888800${i.toString().padStart(2, '0')}`,
        email: `aluno${i}@ifpe.edu.br`,
        curso: CURSO,
        senha: '123456',
        role: 'Aluno'
      })
    );
  }


  console.log('Matriculando alunos...');
  for (const aluno of alunos) {
    // cada aluno em 3 disciplinas aleatórias
    const disciplinasAleatorias = disciplinas
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    for (const disciplina of disciplinasAleatorias) {
      await AlunoDisciplina.create({
        alunoId: aluno._id,
        disciplinaId: disciplina._id,
        status: 'ativo'
      });
    }
  }

  console.log('Seed finalizado com sucesso!');
  process.exit();
};

runSeed();
