import { handleAuth } from "./auth.js";
import { handleTreinos } from "./treinos.js";
import { handlePlanos } from "./planos.js";
import { handleProvas } from "./provas.js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Content-Type": "application/json"
};

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    try {
      if (path === "/") {
        return new Response(JSON.stringify({
          app: "Passada API",
          version: "1.0.0",
          status: "online"
        }), { headers: corsHeaders });
      }

      if (path.startsWith("/auth")) {
        return await handleAuth(request, env, corsHeaders);
      }

      if (path.startsWith("/treinos")) {
        return await handleTreinos(request, env, corsHeaders);
      }

      if (path.startsWith("/planos")) {
        return await handlePlanos(request, env, corsHeaders);
      }

      if (path.startsWith("/provas")) {
        return await handleProvas(request, env, corsHeaders);
      }

      return new Response(JSON.stringify({ erro: "Rota nao encontrada" }), {
        status: 404, headers: corsHeaders
      });

    } catch (err) {
      return new Response(JSON.stringify({ erro: err.message }), {
        status: 500, headers: corsHeaders
      });
    }
  }
};
