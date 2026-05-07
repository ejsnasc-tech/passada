export async function handleProvas(request, env, headers) {
  const url = new URL(request.url);
  const path = url.pathname;

  if (path === "/provas" && request.method === "GET") {
    const usuario_id = url.searchParams.get("usuario_id");

    const provas = await env.DB.prepare(
      "SELECT * FROM provas WHERE usuario_id = ? ORDER BY data ASC"
    ).bind(usuario_id).all();

    return new Response(JSON.stringify(provas.results), { headers });
  }

  if (path === "/provas" && request.method === "POST") {
    const body = await request.json();

    await env.DB.prepare(
      "INSERT INTO provas (usuario_id, nome, distancia, data, cidade, estado) VALUES (?, ?, ?, ?, ?, ?)"
    ).bind(
      body.usuario_id, body.nome, body.distancia,
      body.data, body.cidade, body.estado
    ).run();

    return new Response(JSON.stringify({ sucesso: true }), { headers });
  }

  if (path.startsWith("/provas/resultado") && request.method === "PUT") {
    const body = await request.json();

    await env.DB.prepare(
      "UPDATE provas SET resultado_tempo = ?, resultado_pace = ?, status = ? WHERE id = ?"
    ).bind(
      body.resultado_tempo, body.resultado_pace,
      "concluida", body.id
    ).run();

    return new Response(JSON.stringify({ sucesso: true }), { headers });
  }

  if (path === "/provas/buscar" && request.method === "GET") {
    const q = url.searchParams.get("q") || "";
    const distancia = url.searchParams.get("distancia") || "";

    const provas = await env.DB.prepare(
      "SELECT * FROM provas WHERE nome LIKE ? AND distancia LIKE ? LIMIT 20"
    ).bind("%" + q + "%", "%" + distancia + "%").all();

    return new Response(JSON.stringify(provas.results), { headers });
  }

  return new Response(JSON.stringify({ erro: "Rota nao encontrada" }), {
    status: 404, headers
  });
}
