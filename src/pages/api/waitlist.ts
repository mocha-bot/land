import type { NextApiRequest, NextApiResponse } from 'next';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LEN = 256;

type WaitlistResponse = {
  ok: boolean;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WaitlistResponse>,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  const { email } = (req.body ?? {}) as { email?: unknown };
  if (
    typeof email !== 'string' ||
    email.length > MAX_EMAIL_LEN ||
    !EMAIL_RE.test(email)
  ) {
    return res.status(400).json({ ok: false, error: 'invalid_email' });
  }

  const webhookUrl = process.env.DISCORD_WAITLIST_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error('[waitlist] DISCORD_WAITLIST_WEBHOOK_URL is not set');
    return res.status(500).json({ ok: false, error: 'not_configured' });
  }

  const safeEmail = email.replace(/`/g, "'");
  const content = `**New waitlist signup** \`${safeEmail}\` — \`${new Date().toISOString()}\``;

  try {
    const discordRes = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, username: 'Mocha Waitlist' }),
    });

    if (!discordRes.ok) {
      console.error('[waitlist] discord webhook failed', discordRes.status);
      return res.status(502).json({ ok: false, error: 'upstream_failed' });
    }
  } catch (err) {
    console.error('[waitlist] discord webhook threw', err);
    return res.status(502).json({ ok: false, error: 'upstream_failed' });
  }

  return res.status(200).json({ ok: true });
}
