// Vercel Serverless Function: /api/subscribe
// Adds a pack-funnel lead to MailerLite so the weekly sends have a list
// to go to. The API key lives in Vercel env vars, never in this file:
// this repository is public.
//
// "Быстрая польза 2.0", 10.09.2026: три бита (Love Dance, 5AM, You Don't Care),
// каждый со своим кодовым словом в ManyChat и своей 3-письмовой автоматизацией
// в MailerLite. Какая группа - решает не форма и не сам артист, а параметр
// ?beat= в ссылке, которую ManyChat отдаёт после комментария. Значение сверяем
// с белым списком, а не берём как есть - иначе кто угодно с чужой ссылкой мог
// бы подписаться в произвольную группу.
//
// Env: MAILERLITE_TOKEN  (required)
//      MAILERLITE_GROUP  (optional, group id for beat=null / неизвестный beat)

const DEFAULT_GROUP = '197237411642607559'; // "Beat pack - Instagram funnel" (общая)

// TODO 10.09: вписать сюда реальные ID групп, когда они будут созданы в
// MailerLite (Subscribers -> Groups -> открыть группу -> число в адресной
// строке между groups/ и /subscribers). Пока это заглушки - группа beat=love
// / 5am / ydc упадёт в DEFAULT_GROUP, ничего не сломается, письма просто
// уйдут по общей мелодик пак-воронке вместо бит-специфичной.
const BEAT_GROUPS = {
  love: 'ЗАМЕНИ_НА_ID_ГРУППЫ_LOVE_DANCE',
  '5am': 'ЗАМЕНИ_НА_ID_ГРУППЫ_5AM',
  ydc: 'ЗАМЕНИ_НА_ID_ГРУППЫ_YOU_DONT_CARE',
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  const { name, email, genre, beat } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ success: false, error: 'Name and email are required' });
  }

  // Trim: a token pasted into a dashboard field often carries a trailing
  // newline, which makes the Authorization header invalid and turns a
  // correct key into a 401.
  const TOKEN = (process.env.MAILERLITE_TOKEN || '').trim();
  if (!TOKEN) {
    console.error('Server Configuration Error: Missing MAILERLITE_TOKEN');
    return res.status(500).json({ success: false, error: 'Server configuration error' });
  }

  const mappedGroup = beat && BEAT_GROUPS[beat] && !BEAT_GROUPS[beat].startsWith('ЗАМЕНИ_')
    ? BEAT_GROUPS[beat]
    : null;
  const group = mappedGroup || process.env.MAILERLITE_GROUP || DEFAULT_GROUP;

  try {
    // Upsert: MailerLite returns the existing subscriber instead of erroring
    // when the address is already on the list, so a repeat submit is safe.
    const r = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email,
        fields: { name, genre: genre || '' },
        groups: [group],
      }),
    });

    if (!r.ok) {
      const body = await r.text();
      console.error('MailerLite error', r.status, body);
      // Surface the upstream status (not the body) so a broken key can be
      // told apart from a rejected payload without opening the logs.
      return res.status(502).json({ success: false, error: 'Upstream error', upstream: r.status });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('MailerLite request failed', err);
    return res.status(500).json({ success: false, error: 'Request failed' });
  }
}
