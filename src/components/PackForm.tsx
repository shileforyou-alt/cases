import React, { useState } from 'react';

// Pack Form - the funnel landing capture. Two fields only: name + email.
//
// Раньше экран после отправки отдавал прямую ссылку на Dropbox. Артист забирал
// пак тут же и в почту не заходил - а без открытого первого письма вся цепочка
// из пяти писем мертва. Теперь пак живёт только в почте, а экран ведёт в инбокс.
const STORE_URL = 'https://bsta.rs/xe3KxB';

// Открыть чужой инбокс нельзя, но можно привести в его вебмейл по домену.
// Незнакомый домен - кнопки нет, остаётся текст.
const WEBMAIL: [RegExp, string, string][] = [
  [/@(gmail|googlemail)\.com$/i, 'https://mail.google.com/', 'Open Gmail'],
  [/@(yahoo|ymail|rocketmail)\./i, 'https://mail.yahoo.com/', 'Open Yahoo Mail'],
  [/@(outlook|hotmail|live|msn)\./i, 'https://outlook.live.com/mail/', 'Open Outlook'],
  [/@(icloud\.com|me\.com|mac\.com)$/i, 'https://www.icloud.com/mail', 'Open iCloud Mail'],
  [/@proton(mail)?\./i, 'https://mail.proton.me/', 'Open Proton Mail'],
  [/@aol\./i, 'https://mail.aol.com/', 'Open AOL Mail'],
];

const inbox = (email: string) => WEBMAIL.find(([re]) => re.test(email.trim()));

export function PackForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const [form, setForm] = useState({ name: '', email: '' });

  const field = (key: keyof typeof form) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value })),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');

    // The list is the point of this funnel: a single sale closes in 7 days
    // for 3% of deals, the rest take months of touches. So the subscriber
    // matters more than the checkout.
    fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: form.name, email: form.email }),
    }).catch(() => {});

    // Fire-and-forget Telegram notification.
    fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'pack', name: form.name, email: form.email }),
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
    const mail = inbox(form.email);
    return (
      <div className="flex flex-col justify-center">
        <p className="text-shile-red text-[10px] uppercase tracking-widest font-bold mb-6">Check your inbox</p>
        <p className="font-display font-bold text-3xl md:text-4xl leading-tight uppercase tracking-wide text-white mb-6">
          It's on the way
        </p>
        <p className="text-shile-grey text-base leading-relaxed mb-8">
          The pack just landed in your email. Open it and the folder is inside.
        </p>

        {mail && (
          <a
            href={mail[1]}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block self-start bg-shile-red text-white font-semibold text-sm px-12 py-5 uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors mb-6"
          >
            {mail[2]}
          </a>
        )}

        <p className="text-[#5f5f5f] text-[13px] leading-relaxed mb-8">
          Not there in two minutes? Check promotions or spam, and drag it into your main
          tab so the next ones land right.
        </p>

        <p className="text-shile-grey text-base leading-relaxed mb-8">
          <a
            href={STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline underline-offset-4 hover:text-shile-red transition-colors"
          >
            Licenses, stems and the full pack are here
          </a>{' '}
          when you're ready to release.
        </p>
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
          This is where the pack goes, so use the one you actually open.
        </p>
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
