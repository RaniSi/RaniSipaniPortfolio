// api/dev-server.mjs
// Lightweight local replacement for `vercel dev`. Serves the serverless
// function in api/contact.js at http://localhost:3000 so the Vite dev server
// (which proxies /api to port 3000) can reach it during development.
//
// Usage:  npm run dev:api   (in a second terminal, alongside `npm run dev`)
//
// Environment variables are loaded from the project's .env file if present.

import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import handler from "./contact.js";

// Minimal .env loader (no dependencies needed).
const envFile = await readFile(new URL("../.env", import.meta.url), "utf8").catch(() => "");
for (const line of envFile.split(/\r?\n/)) {
  const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
  if (!match) continue;
  let value = match[2].trim();
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1);
  }
  if (!(match[1] in process.env)) {
    process.env[match[1]] = value;
  }
}

const PORT = process.env.PORT || 3000;

createServer(async (req, res) => {
  try {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const body = Buffer.concat(chunks);

    const request = new Request(`http://localhost:${PORT}${req.url}`, {
      method: req.method,
      headers: {
        "content-type": req.headers["content-type"] || "",
        origin: req.headers.origin || `http://localhost:5173`,
      },
      body: req.method === "GET" || req.method === "HEAD" ? undefined : body,
    });

    const response = await handler(request);
    res.statusCode = response.status;
    response.headers.forEach((value, key) => res.setHeader(key, value));
    res.end(Buffer.from(await response.arrayBuffer()));
  } catch (error) {
    console.error("dev-server error:", error);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Internal server error." }));
  }
}).listen(PORT, () => {
  console.log(`API dev server running at http://localhost:${PORT}`);
  console.log(
    process.env.RESEND_API_KEY
      ? "RESEND_API_KEY loaded from .env"
      : "WARNING: RESEND_API_KEY is missing — add it to .env"
  );
});
