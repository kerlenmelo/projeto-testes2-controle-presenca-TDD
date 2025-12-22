import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { loginProfessor } from '../api/auth.service';


function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    try {
      const professor = await loginProfessor(email, senha);
      login(professor);
    } catch (err) {
      setErro(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: 30 }}>
      <h2>Login do Professor</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      <button type="submit">Entrar</button>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}
    </form>
  );
}

export default Login;
