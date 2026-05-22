import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_KEY = Deno.env.get("RESEND_API_KEY") || "";
const FROM_EMAIL = "noreply@noreplay.arkaglobalinvestments.com";
const LOGO_B64 = "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";

function buildEmailHtml(name: string, strategy: string, sym: string, capital: number, years: number): string {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;900&display=swap" rel="stylesheet">
</head>
<body style="margin:0;padding:0;background:#f4f5f6;font-family:'Montserrat',Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f6;padding:40px 0">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">

  <tr><td style="background:#0a0a0a;border-radius:12px 12px 0 0;padding:32px 40px;text-align:center">
    <img src="cid:logo" width="60" height="53" alt="ARKA" style="display:block;margin:0 auto 14px;border:0">
    <div style="font-family:'Montserrat',Arial,sans-serif;font-size:20px;font-weight:900;color:#00BAB3;letter-spacing:.1em">ARKA</div>
    <div style="font-family:'Montserrat',Arial,sans-serif;font-size:8px;font-weight:300;color:#4a4f56;letter-spacing:.28em;text-transform:uppercase;margin-top:5px">Global Liquidity</div>
  </td></tr>

  <tr><td style="background:linear-gradient(90deg,#00948e,#00BAB3);height:3px;font-size:0;line-height:3px">&nbsp;</td></tr>

  <tr><td style="background:#ffffff;padding:40px 40px 36px">
    <p style="font-family:'Montserrat',Arial,sans-serif;font-size:11px;font-weight:600;color:#00948e;letter-spacing:.18em;text-transform:uppercase;margin:0 0 10px">Informe Personalizado</p>
    <h1 style="font-family:'Montserrat',Arial,sans-serif;font-size:22px;font-weight:700;color:#0a0a0a;margin:0 0 20px;line-height:1.3">Hola ${name},</h1>
    <p style="font-family:'Montserrat',Arial,sans-serif;font-size:14px;font-weight:300;color:#4a4f56;line-height:1.9;margin:0 0 24px">
      Adjunto encontrarás tu <strong style="font-weight:600;color:#0a0a0a">informe personalizado de proyección de inversión</strong> con la estrategia 
      <strong style="font-weight:700;color:#00948e">${strategy}</strong> para un capital de 
      <strong style="font-weight:600;color:#0a0a0a">${sym}${capital.toLocaleString("en-US")}</strong> 
      a <strong style="font-weight:600;color:#0a0a0a">${years} años</strong>.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px">
      <tr><td style="background:#f8f9fa;border-left:3px solid #00948e;border-radius:0 8px 8px 0;padding:20px 24px">
        <p style="font-family:'Montserrat',Arial,sans-serif;font-size:9px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#72787f;margin:0 0 14px">El informe incluye</p>
        <p style="font-family:'Montserrat',Arial,sans-serif;font-size:13px;font-weight:300;color:#4a4f56;margin:6px 0"><span style="color:#00948e;font-weight:700;margin-right:10px">—</span>Proyección año por año de tu capital</p>
        <p style="font-family:'Montserrat',Arial,sans-serif;font-size:13px;font-weight:300;color:#4a4f56;margin:6px 0"><span style="color:#00948e;font-weight:700;margin-right:10px">—</span>Comparativa vs S&P 500, CETES y Banca Tradicional</p>
        <p style="font-family:'Montserrat',Arial,sans-serif;font-size:13px;font-weight:300;color:#4a4f56;margin:6px 0"><span style="color:#00948e;font-weight:700;margin-right:10px">—</span>Proceso de onboarding y custodia institucional</p>
      </td></tr>
    </table>
    <p style="font-family:'Montserrat',Arial,sans-serif;font-size:14px;font-weight:300;color:#4a4f56;line-height:1.9;margin:0 0 32px">
      Un asesor ARKA se pondrá en contacto contigo en las próximas <strong style="font-weight:600;color:#0a0a0a">24 horas</strong>.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center">
        <a href="https://arkaglobalinvestments.com" style="display:inline-block;background:#00948e;color:#ffffff;font-family:'Montserrat',Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;text-decoration:none;padding:15px 36px;border-radius:6px">
          Visitar ARKA Global Liquidity
        </a>
      </td></tr>
    </table>
  </td></tr>

  <tr><td style="background:#0a0a0a;border-radius:0 0 12px 12px;padding:28px 40px;text-align:center">
    <p style="font-family:'Montserrat',Arial,sans-serif;font-size:10px;font-weight:700;color:#00BAB3;letter-spacing:.18em;text-transform:uppercase;margin:0 0 8px">ARKA GLOBAL LIQUIDITY LTD.</p>
    <p style="font-family:'Montserrat',Arial,sans-serif;font-size:10px;font-weight:300;color:#4a4f56;margin:0 0 4px">IBC No. 2025-00568 · Saint Lucia</p>
    <p style="font-family:'Montserrat',Arial,sans-serif;font-size:10px;font-weight:300;color:#4a4f56;margin:0 0 18px">contacto@arkaltd.io · arkaglobalinvestments.com</p>
    <p style="font-family:'Montserrat',Arial,sans-serif;font-size:9px;font-weight:300;color:#2a2e36;line-height:1.7;margin:0">
      Los rendimientos proyectados no garantizan resultados futuros.<br>
      Material destinado exclusivamente a inversionistas calificados.
    </p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

function buildProfileEmailHtml(name: string, profileName: string, sym: string, capital: any): string {
  const capStr = capital && !isNaN(Number(capital))
    ? `${sym}${Number(capital).toLocaleString("en-US")}`
    : (capital || "No especificado");
  return buildEmailHtml(name, `Perfil ${profileName}`, sym, 0, 0)
    .replace(
      `a <strong style="font-weight:600;color:#0a0a0a">0 años</strong>.`,
      `con capital ${capStr}.`
    )
    .replace(
      `<strong style="font-weight:700;color:#00948e">Perfil ${profileName}</strong> para un capital de <strong style="font-weight:600;color:#0a0a0a">${sym}0</strong>`,
      `<strong style="font-weight:700;color:#00948e">${profileName}</strong> con capital disponible de <strong style="font-weight:600;color:#0a0a0a">${capStr}</strong>`
    );
}

// Orígenes permitidos — solo el simulador ARKA
const ALLOWED_ORIGINS = [
  "https://arka-simulator.vercel.app",
  "https://arka-simulator-gabo93gl-8984s-projects.vercel.app",
  "http://localhost:3000",
  "http://127.0.0.1:5500",
];

function corsHeaders(origin: string | null) {
  const allowed = origin && ALLOWED_ORIGINS.some(o => origin === o || origin.endsWith(".vercel.app"))
    ? origin
    : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Headers": "authorization, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

// Validación básica de email
function isValidEmail(e: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) && e.length < 200;
}

serve(async (req) => {
  const origin = req.headers.get("origin");
  const ch = corsHeaders(origin);
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: ch });
  }
  try {
    const { name, email, pdfBase64, strategy, capital, years, currency } = await req.json();

    // Validaciones de entrada
    if (!email || !pdfBase64) return new Response(JSON.stringify({ error: "Missing email or PDF" }), { status: 400, headers: { "Content-Type": "application/json", ...ch } });
    if (!isValidEmail(email)) return new Response(JSON.stringify({ error: "Invalid email" }), { status: 400, headers: { "Content-Type": "application/json", ...ch } });
    if (typeof name !== "string" || name.trim().length < 1 || name.length > 200) return new Response(JSON.stringify({ error: "Invalid name" }), { status: 400, headers: { "Content-Type": "application/json", ...ch } });
    // Limitar tamaño del PDF (~5 MB en base64 ≈ 6.7 MB de texto)
    if (typeof pdfBase64 !== "string" || pdfBase64.length > 7_000_000) return new Response(JSON.stringify({ error: "PDF demasiado grande" }), { status: 400, headers: { "Content-Type": "application/json", ...ch } });
    const sym = currency === "MXN" ? "MX$" : "$";
    const isProfile = years === "—" || !years;
    const html = isProfile
      ? buildProfileEmailHtml(name, strategy, sym, capital)
      : buildEmailHtml(name, strategy, sym, Number(capital), Number(years));
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Authorization": `Bearer ${RESEND_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: `ARKA Global Liquidity <${FROM_EMAIL}>`,
        to: [email],
        subject: `Tu Informe de Proyección — ${strategy}`,
        html,
        attachments: [
          {
            filename: `ARKA_Proyeccion_${new Date().toISOString().slice(0,10)}.pdf`,
            content: pdfBase64,
          },
          {
            filename: "logo.png",
            content: LOGO_B64,
            content_type: "image/png",
            inline: true,
            content_id: "logo",
          },
        ],
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Resend error");
    return new Response(JSON.stringify({ ok: true, id: data.id }), { headers: { "Content-Type": "application/json", ...ch } });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json", ...ch } });
  }
});
