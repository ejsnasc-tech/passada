const API_URL = "https://passada.ejsnasc.workers.dev";

export const api = {
  async cadastrar(dados) {
    const res = await fetch(`${API_URL}/auth/cadastro`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    });
    return res.json();
  },

  async login(email, senha) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha })
    });
    return res.json();
  },

  async getTreinos(usuario_id, mes) {
    const res = await fetch(`${API_URL}/treinos?usuario_id=${usuario_id}&mes=${mes}`);
    return res.json();
  },

  async salvarResultado(dados) {
    const res = await fetch(`${API_URL}/treinos/resultado`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    });
    return res.json();
  },

  async gerarPlano(dados) {
    const res = await fetch(`${API_URL}/planos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    });
    return res.json();
  },

  async getProvas(usuario_id) {
    const res = await fetch(`${API_URL}/provas?usuario_id=${usuario_id}`);
    return res.json();
  },

  async salvarProva(dados) {
    const res = await fetch(`${API_URL}/provas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    });
    return res.json();
  }
};
