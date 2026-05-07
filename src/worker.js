export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json"
    };
    if (request.method === "OPTIONS") {
      return new Response(null, { headers });
    }
    if (url.pathname === "/") {
      return new Response(JSON.stringify({
        app: "Passada API",
        version: "1.0.0",
        status: "online"
      }), { headers });
    }
    return new Response(JSON.stringify({ erro: "Rota nao encontrada" }), {
      status: 404, headers
    });
  }
};
