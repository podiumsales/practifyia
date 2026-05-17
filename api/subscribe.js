export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://www.practifyia.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, source } = req.body || {};

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Email inválido' });
  }

  const apiKey = process.env.BREVO_API_KEY;
  const listId = parseInt(process.env.BREVO_LIST_ID, 10);

  if (!apiKey || !listId) {
    console.error('Missing BREVO_API_KEY or BREVO_LIST_ID');
    return res.status(500).json({ error: 'Server misconfigured' });
  }

  try {
    const brevoRes = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({
        email,
        attributes: {
          FIRSTNAME: name || '',
          SOURCE: source || 'landing-claude-ventas'
        },
        listIds: [listId],
        updateEnabled: true
      })
    });

    if (!brevoRes.ok && brevoRes.status !== 204) {
      const errBody = await brevoRes.text();
      console.error('Brevo error', brevoRes.status, errBody);
      return res.status(502).json({ error: 'No se pudo registrar el email' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('subscribe handler error', err);
    return res.status(500).json({ error: 'Error inesperado' });
  }
}
