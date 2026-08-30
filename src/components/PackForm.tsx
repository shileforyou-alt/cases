import React, { useState } from 'react';

// Pack Form - the funnel landing capture. Two fields only: name + email.
// Every extra field costs completion, and the pack link is the payoff, so
// the artist gets it on the very next screen - no waiting for the email.
const PACK_URL = 'https://bsta.rs/xe3KxB';

export function PackForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const [form, setForm] = useState({ name: '', email: '', genre: '' });

  const field = (key: keyof typeof form) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value })),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');

    // Fire-and-forget Telegram notification.
    fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'pack', name: form.name, email: form.email, genre: form.genre }),
    }).catch(() => {});

    // Email copy of the lead via FormSubmit.
    try {
      await fetch('https://formsubmit.co/ajax/shileforyou@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: 'New pack lead - shile.vision/pack',
          _template: 'table',
          _captcha: 'false',
          Name: form.name,
          Email: form.email,
          Genre: form.genre,
          Source: 'Instagram pack funnel',
        }),
      });
    } catch {
      // Non-blocking on purpose: a failed capture must never cost the
      // artist the pack he was promised. Telegram is the second channel.
    }

    setStatus('done');
  };

  if (status === 'done') {
    return (
      <div className="flex flex-col justify-center">
        <p className="text-shile-red text-[10px] uppercase tracking-widest font-bold mb-6">It's yours</p>
        <p className="font-display font-bold text-3xl md:text-4xl leading-tight uppercase tracking-wide text-white mb-8">
          Pack unlocked
        </p>
        <a
          href={PACK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block self-start bg-shile-red text-white font-semibold text-sm px-12 py-5 uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors mb-8"
        >
          Open the pack
        </a>
        <p className="text-white text-base leading-relaxed mb-8">
          And if you've been looking for a producer to actually build something with -
          follow me. That's where it starts.
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
      <div>
        <label className="block text-shile-grey text-sm tracking-widest uppercase mb-2">Name</label>
        <input
          type="text"
          required
          {...field('name')}
          className="w-full bg-transparent border-b border-[#333] py-3 text-white focus:outline-none focus:border-shile-red transition-colors text-lg"
        />
      </div>

      <div>
        <label className="block text-shile-grey text-sm tracking-widest uppercase mb-2">Email</label>
        <input
          type="email"
          required
          {...field('email')}
          className="w-full bg-transparent border-b border-[#333] py-3 text-white focus:outline-none focus:border-shile-red transition-colors text-lg"
        />
        <p className="text-[#5f5f5f] text-[13px] leading-relaxed mt-2">
          I send the link here too, so it doesn't get buried in your DMs.
        </p>
      </div>

      <div>
        <label className="block text-shile-grey text-sm tracking-widest uppercase mb-2">What do you usually go for?</label>
        <select
          required
          {...field('genre')}
          className="w-full bg-transparent border-b border-[#333] py-3 text-white focus:outline-none focus:border-shile-red transition-colors text-lg appearance-none cursor-pointer"
        >
          <option value="" className="bg-[#0a0a0a]">Choose one</option>
          <option className="bg-[#0a0a0a]">Dark trap</option>
          <option className="bg-[#0a0a0a]">Melodic trap</option>
          <option className="bg-[#0a0a0a]">I'm open to everything</option>
        </select>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full sm:w-auto bg-shile-red text-white font-semibold text-sm px-12 py-5 uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-wait"
        >
          {status === 'sending' ? 'Sending…' : 'Send me the pack'}
        </button>
      </div>
    </form>
  );
}
