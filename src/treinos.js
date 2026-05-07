export async function handleTreinos(request, env, headers) {
  const url = new URL(request.url);
  const path = url.pathname;

  if (path === "/treinos" && request.method === "GET") {
    const usuario_id = url.searchParams.get("usuario_id");
    const mes = url.searchParams.get("mes");

    const treinos = await env.DB.prepare(
      "SELECT * FROM treinos WHERE usuario_id = ? AND data LIKE ? ORDER BY data ASC"
    ).bind(usuario_id, mes + "%").all();

    return new Response(JSON.stringify(treinos.results), { headers });
  }

  if (path === "/treinos" && request.method === "POST") {
    const body = await request.json();

    await env.DB.prepare(
      "INSERT INTO treinos (usuario_id, data, tipo, intensidade, duracao, pace_meta, distancia_meta) VALUES (?, ?, ?, ?, ?, ?, ?)"
    ).bind(
      body.usuario_id, body.data, body.tipo,
      body.intensidade, body.duracao, body.pace_meta, body.distancia_meta
    ).run();

    return new Response(JSON.stringify({ sucesso: true }), { headers });
  }

  if (path.startsWith("/treinos/resultado") && request.method === "PUT") {
    const body = await request.json();

    await env.DB.prepare(
      "UPDATE treinos SET pace_real = ?, distancia_real = ?, status = ?, observacoes = ? WHERE id = ?"
    ).bind(
      body.pace_real, body.distancia_real,
      "concluido", body.observacoes, body.id
    ).run();

    return new Response(JSON.stringify({ sucesso: true }), { headers });
  }

  return new Response(JSON.stringify({ erro: "Rota nao encontrada" }), {
    status: 404, headers
  });
}
