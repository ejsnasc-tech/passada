export async function handlePlanos(request, env, headers) {
  const url = new URL(request.url);
  const path = url.pathname;

  if (path === "/planos" && request.method === "POST") {
    const body = await request.json();

    const resposta = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": env.CLAUDE_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{
          role: "user",
          content: `Crie um plano de corrida para: 
            Nome: ${body.nome}
            Nivel: ${body.nivel}
            Meta: ${body.meta}
            Dias disponiveis: ${body.dias}
            Horarios: ${body.horarios}
            Pace atual: ${body.pace}
            Retorne APENAS JSON com o plano semanal.`
        }]
      })
    });

    const data = await resposta.json();
    const plano = data.content[0].text;

    await env.DB.prepare(
      "INSERT INTO planos (usuario_id, meta, nivel, dias_semana, horarios, pace_base) VALUES (?, ?, ?, ?, ?, ?)"
    ).bind(
      body.usuario_id, body.meta, body.nivel,
      body.dias, body.horarios, body.pace
    ).run();

    return new Response(JSON.stringify({ sucesso: true, plano }), { headers });
  }

  if (path === "/planos" && request.method === "GET") {
    const usuario_id = url.searchParams.get("usuario_id");

    const plano = await env.DB.prepare(
      "SELECT * FROM planos WHERE usuario_id = ? ORDER BY created_at DESC LIMIT 1"
    ).bind(usuario_id).first();

    return new Response(JSON.stringify(plano), { headers });
  }

  return new Response(JSON.stringify({ erro: "Rota nao encontrada" }), {
    status: 404, headers
  });
}
