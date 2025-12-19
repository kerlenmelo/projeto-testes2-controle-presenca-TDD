class Chamada {
  constructor() {
    throw new Error('Chamada não implementada');
  }

  marcarPresenca() {
    throw new Error('Chamada.marcarPresenca não implementado');
  }

  marcarAusencia() {
    throw new Error('Chamada.marcarAusencia não implementado');
  }

  setStatus() {
    throw new Error('Chamada.setStatus não implementado');
  }
}

module.exports = Chamada;
