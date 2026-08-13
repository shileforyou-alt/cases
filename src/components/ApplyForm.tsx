import React, { useState } from 'react';

// Apply Form — submits to /api/notify (Telegram lead notification,
// same service as the other shile site)
export function ApplyForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [form, setForm] = useState({ name: '', handle: '', link: '', need: '', blocker: '', referredBy: '' });

  const field = (key: keyof typeof form) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value })),
  });

  // Normalize an optional "referred by" IG handle:
  // trim, strip a full instagram.com/xxx URL down to xxx, and ensure a
  // leading "@". Empty stays empty.
  const normalizeReferral = (raw: string) => {
    let v = raw.trim();
    if (!v) return '';
    v = v.replace(/^https?:\/\/(www\.)?instagram\.com\//i, '');
    v = v.replace(/[/?#].*$/, ''); // drop trailing path/query after the handle
    v = v.replace(/^@+/, '');       // collapse existing @
    return v ? '@' + v : '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');

    const referredBy = normalizeReferral(form.referredBy);
    const payload = {
      name: form.name,
      handle: form.handle,
      link: form.link,
      need: form.need,
      blocker: form.blocker,
      referredBy,
    };

    // Fire-and-forget Telegram notification (works once BOT_TOKEN/CHAT_ID
    // env vars are set in Vercel); email below is the primary channel.
    fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => {});

    try {
      // Email notification via FormSubmit
      const res = await fetch('https://formsubmit.co/ajax/shileforyou@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: 'New artist application — shile.vision',
          _template: 'table',
          _captcha: 'false',
          Name: form.name,
          Instagram: form.handle,
          'Music link': form.link,
          'What they need': form.need,
          'Biggest blocker': form.blocker,
          'Referred by': referredBy || '—',
        }),
      });
      const data = await res.json().catch(() => ({} as any));
      if (res.ok && (data.success === 'true' || data.success === true)) {
        setStatus('success');
        setForm({ name: '', handle: '', link: '', need: '', blocker: '', referredBy: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="border border-white/10 bg-[#050505] p-10 md:p-14 flex flex-col justify-center">
        <p className="text-shile-red text-[10px] uppercase tracking-widest font-bold mb-6">Application sent</p>
        <p className="font-display font-bold text-3xl md:text-4xl leading-tight uppercase tracking-wide text-white mb-6">
          Got it. We'll listen and get back to you.
        </p>
        <p className="text-shile-grey text-base leading-relaxed mb-8">
          Keep making music - we'll reach out on Instagram. Meanwhile, follow me on Instagram:
        </p>
        <a
          href="https://www.instagram.com/shileforyou/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block self-start border border-white/20 px-6 py-3 text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-white hover:text-black transition-colors"
        >
          @shileforyou
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-shile-grey text-sm tracking-widest uppercase mb-2">Name</label>
          <input type="text" required {...field('name')} className="w-full bg-transparent border-b border-[#333] py-3 text-white focus:outline-none focus:border-shile-red transition-colors text-lg" />
        </div>
        <div>
          <label className="block text-shile-grey text-sm tracking-widest uppercase mb-2">Instagram / @handle</label>
          <input type="text" required {...field('handle')} className="w-full bg-transparent border-b border-[#333] py-3 text-white focus:outline-none focus:border-shile-red transition-colors text-lg" />
        </div>
      </div>

      <div>
        <label className="block text-shile-grey text-sm tracking-widest uppercase mb-2">Spotify or Music Link</label>
        <input type="url" required {...field('link')} className="w-full bg-transparent border-b border-[#333] py-3 text-white focus:outline-none focus:border-shile-red transition-colors text-lg" />
        <p className="text-[#5f5f5f] text-[13px] leading-relaxed mt-2">Just a link to your Spotify, Apple Music or YouTube.</p>
      </div>

      <div>
        <label className="block text-shile-grey text-sm tracking-widest uppercase mb-2">What do you need</label>
        <select
          required
          {...field('need')}
          className="w-full bg-transparent border-b border-[#333] py-3 text-white focus:outline-none focus:border-shile-red transition-colors text-lg appearance-none cursor-pointer"
        >
          <option value="" className="bg-[#0a0a0a]">Choose one</option>
          <option className="bg-[#0a0a0a]">Artist DNA / positioning</option>
          <option className="bg-[#0a0a0a]">Custom production</option>
          <option className="bg-[#0a0a0a]">Mix &amp; master</option>
          <option className="bg-[#0a0a0a]">A full project (EP / album)</option>
          <option className="bg-[#0a0a0a]">Not sure yet</option>
        </select>
      </div>

      <div>
        <label className="block text-shile-grey text-sm tracking-widest uppercase mb-2">What's your biggest blocker right now?</label>
        <input type="text" required {...field('blocker')} className="w-full bg-transparent border-b border-[#333] py-3 text-white focus:outline-none focus:border-shile-red transition-colors text-lg" />
      </div>

      <div>
        <label className="block text-shile-grey text-sm tracking-widest uppercase mb-2">Referred by (optional)</label>
        <input type="text" placeholder="@username" {...field('referredBy')} className="w-full bg-transparent border-b border-[#333] py-3 text-white placeholder:text-[#444] focus:outline-none focus:border-shile-red transition-colors text-lg" />
      </div>

      <div className="pt-8 flex flex-col sm:flex-row items-center gap-6">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full sm:w-auto bg-shile-red text-white font-semibold text-sm px-12 py-5 uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-wait"
        >
          {status === 'sending' ? 'Sending…' : 'Apply'}
        </button>
        {status === 'error' && (
          <p className="text-shile-red text-xs uppercase tracking-widest font-bold">
            Something went wrong - try again or DM @shileforyou
          </p>
        )}
      </div>
    </form>
  );
}
