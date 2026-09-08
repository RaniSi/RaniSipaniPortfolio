// api/contact.js
// Vercel serverless function that sends contact form messages using the Resend API.
// The API key lives server-side only (process.env.RESEND_API_KEY) and is never
// exposed to the browser.
//
// Useful environment variables (set in Vercel project settings):
//   RESEND_API_KEY    (required)  - your Resend API key, e.g. re_...
//   RESEND_FROM_EMAIL (optional)  - sender address, default "onboarding@resend.dev"
//   RESEND_TO_EMAIL   (optional)  - comma-separated recipient(s), default your email

const RESEND_API_ENDPOINT = "https://api.resend.com/emails";

const DEFAULT_FROM = "onboarding@resend.dev"; // Resend's free testing sender
const DEFAULT_TO = "ranisipani879@gmail.com";

function corsHeaders(req) {
  const origin = req.headers.get("origin");
  return {
    "Access-Control-Allow-Origin": origin || "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
  };
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function json(body, status = 200, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
}

export default async function handler(req) {
  // Pre-flight request (cross-origin requests from local dev)
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders(req) });
  }

  const cors = corsHeaders(req);

  if (req.method !== "POST") {
    return json({ error: "Method not allowed." }, 405, cors);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return json(
      { error: "The contact form is not configured yet. Please try again later." },
      500,
      cors
    );
  }

  let payload;
  try {
    payload = await req.json();
  } catch {
    return json({ error: "Invalid request body." }, 400, cors);
  }

  const name = String(payload.name || "").trim();
  const email = String(payload.email || "").trim();
  const message = String(payload.message || "").trim();

  if (!name || !email || !message) {
    return json(
      { error: "Please fill in your name, email and message." },
      400,
      cors
    );
  }

  const to = (process.env.RESEND_TO_EMAIL || DEFAULT_TO)
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);

  const resendResponse = await fetch(RESEND_API_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL || DEFAULT_FROM,
      to,
      reply_to: email,
      subject: `New portfolio message from ${name}`,
      html: [
        `<p><strong>Name:</strong> ${escapeHtml(name)}</p>`,
        `<p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>`,
        `<p><strong>Message:</strong></p>`,
        `<p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>`,
      ].join(""),
    }),
  });

  const resendData = await resendResponse.json().catch(() => ({}));

  if (!resendResponse.ok) {
    // Log details server-side for debugging without leaking the key.
    console.error("Resend error:", resendData);
    return json(
      { error: "Failed to send the message. Please try again later." },
      resendResponse.status,
      cors
    );
  }

  return json({ success: true, id: resendData.id }, 200, cors);
}