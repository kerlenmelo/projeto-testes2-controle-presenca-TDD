class Professor {
  constructor() {
    throw new Error('Professor não implementado');
  }

  async matchPassword() {
    throw new Error('Professor.matchPassword não implementado');
  }
}

module.exports = Professor;
