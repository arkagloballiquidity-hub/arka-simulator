// api/send-telegram.js — proxy server-side para notificaciones de leads
// El token NUNCA sale al cliente; vive en TELEGRAM_BOT_TOKEN (Vercel env)

const TG_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TG_CHATS = ['188610921', '-5125313014'];

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (!TG_TOKEN) {
    console.error('TELEGRAM_BOT_TOKEN no configurado');
    return res.status(500).json({ error: 'Telegram no configurado' });
  }

  const { name, email, whatsapp, amount, strategy, capital, years, monthly } = req.body || {};

  // Validaciones mínimas — evitar que sea un relay abierto
  if (!name || !email || !strategy) {
    return res.status(400).json({ error: 'name, email y strategy son requeridos' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Email inválido' });
  }
  if (typeof name !== 'string' || name.length > 120) {
    return res.status(400).json({ error: 'name inválido' });
  }

  // Formatear montos
  const fmt = n => Number(n || 0).toLocaleString('es-MX');
  const fecha = new Date().toLocaleString('es-MX', { dateStyle: 'medium', timeStyle: 'short' });

  const txt = [
    `🔔 *Nuevo Lead — ARKA Alpha Fund*`,
    ``,
    `👤 ${name}`,
    `📧 ${email}`,
    `📱 ${whatsapp || '—'}`,
    `💰 ${amount || 'No especificado'}`,
    ``,
    `📊 *Estrategia:* ${strategy}`,
    `📈 Capital: $${fmt(capital)} · ${years || '—'} años · $${fmt(monthly)}/mes`,
    ``,
    `🕐 ${fecha}`,
  ].join('\n');

  const errors = [];
  for (const chat_id of TG_CHATS) {
    try {
      const r = await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id, text: txt, parse_mode: 'Markdown' }),
      });
      if (!r.ok) {
        const err = await r.json();
        errors.push({ chat_id, error: err.description });
      }
    } catch (e) {
      errors.push({ chat_id, error: e.message });
    }
  }

  if (errors.length === TG_CHATS.length) {
    return res.status(502).json({ error: 'No se pudo enviar a ningún chat', details: errors });
  }

  return res.status(200).json({ ok: true, sent: TG_CHATS.length - errors.length });
}
