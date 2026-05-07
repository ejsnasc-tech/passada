export async function handleAuth(request, env, headers) {
  const url = new URL(request.url);
  const path = url.pathname;

  if (path === "/auth/cadastro" && request.method === "POST") {
    const body = await request.json();
    const { nome, email, senha } = body;

    const existe = await env.DB.prepare(
      "SELECT id FROM usuarios WHERE email = ?"
    ).bind(email).first();

    if (existe) {
      return new Response(JSON.stringify({ erro: "Email ja cadastrado" }), {
        status: 400, headers
      });
    }

    const hash = btoa(senha + "passada_salt");

    await env.DB.prepare(
      "INSERT INTO usuarios (nome, email, nivel) VALUES (?, ?, ?)"
    ).bind(nome, email, "iniciante").run();

    const usuario = await env.DB.prepare(
      "SELECT id FROM usuarios WHERE email = ?"
    ).bind(email).first();

    const token = btoa(usuario.id + ":" + Date.now());
    await env.SESSIONS.put(token, JSON.stringify({ id: usuario.id, email }), {
      expirationTtl: 86400
    });

    return new Response(JSON.stringify({
      sucesso: true,
      token,
      usuario: { id: usuario.id, nome, email }
    }), { headers });
  }

  if (path === "/auth/login" && request.method === "POST") {
    const body = await request.json();
    const { email, senha } = body;

    const usuario = await env.DB.prepare(
      "SELECT * FROM usuarios WHERE email = ?"
    ).bind(email).first();

    if (!usuario) {
      return new Response(JSON.stringify({ erro: "Usuario nao encontrado" }), {
        status: 404, headers
      });
    }

    const token = btoa(usuario.id + ":" + Date.now());
    await env.SESSIONS.put(token, JSON.stringify({ id: usuario.id, email }), {
      expirationTtl: 86400
    });

    return new Response(JSON.stringify({
      sucesso: true,
      token,
      usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email }
    }), { headers });
  }

  return new Response(JSON.stringify({ erro: "Rota nao encontrada" }), {
    status: 404, headers
  });
}
