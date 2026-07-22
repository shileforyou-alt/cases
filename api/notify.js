// Vercel Serverless Function: /api/notify
// Sends each application to Telegram — same service as the other shile site.
// Set environment variables in Vercel Dashboard: BOT_TOKEN, CHAT_ID
// (do NOT hardcode them here: this repository is public)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  const { name, handle, link, blocker } = req.body || {};

  if (!name || !handle || !link || !blocker) {
    return res.status(400).json({ success: false, error: 'All fields are required' });
  }

  const BOT_TOKEN = process.env.BOT_TOKEN;
  const CHAT_ID = process.env.CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    console.error('Server Configuration Error: Missing BOT_TOKEN or CHAT_ID');
    return res.status(500).json({ success: false, error: 'Server configuration error' });
  }

  const timestamp = new Date().toLocaleString('en-GB', { timeZone: 'UTC' });
  const message = `🎵 <b>NEW ARTIST LEAD! (shile.vision)</b>\n━━━━━━━━━━━━━━\n👤 <b>Name:</b> ${name}\n📸 <b>Instagram:</b> ${handle}\n🎧 <b>Music:</b> ${link}\n🚧 <b>Blocker:</b> ${blocker}\n━━━━━━━━━━━━━━\n🕐 ${timestamp} UTC`;

  try {
    const telegramRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      })
    });

    const data = await telegramRes.json();

    if (telegramRes.ok && data.ok) {
      return res.status(200).json({ success: true });
    } else {
      console.error('Telegram Error:', data);
      return res.status(500).json({ success: false, error: data.description || 'Telegram notification failed' });
    }
  } catch (error) {
    console.error('Network Error:', error);
    return res.status(500).json({ success: false, error: 'Network communication failure' });
  }
}
