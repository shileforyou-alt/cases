import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { CaseModal } from './components/CaseModal';
import { Home, Production, MixMaster, ArtistDna, BlindSpot, CasesPage, Apply, Pack } from './pages';

/* Tiny router: real URLs, no dependency. vercel.json already rewrites
   every non-api path to index.html, so deep links work on refresh. */

const PAGES: Record<string, React.ComponentType<any>> = {
  '/': Home,
  '/artist-dna': ArtistDna,
  '/production': Production,
  '/mix-master': MixMaster,
  '/blind-spot': BlindSpot,
  '/cases': CasesPage,
  '/apply': Apply,
  // Campaign landing - intentionally absent from NAV below.
  '/pack': Pack,
};

const NAV: [string, string][] = [
  ['/artist-dna', 'Artist DNA'],
  ['/production', 'Custom production'],
  ['/mix-master', 'Mix & Master'],
  ['/blind-spot', 'Blind Spot'],
  ['/cases', 'Cases'],
];

const clean = (p: string) => {
  const s = p.replace(/\/+$/, '') || '/';
  return PAGES[s] ? s : '/';
};

export default function App() {
  const [path, setPath] = useState(() => clean(window.location.pathname));
  const [menu, setMenu] = useState(false);
  const [activeCase, setActiveCase] = useState<any>(null);

  useEffect(() => {
    const onPop = () => setPath(clean(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenu(false); };
    document.addEventListener('keydown', onKey);
    // Фон не должен прокручиваться под открытым меню.
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [menu]);

  const go = (to: string) => {
    const next = clean(to);
    if (next !== window.location.pathname) window.history.pushState({}, '', next);
    setActiveCase(null);
    setMenu(false);
    setPath(next);
    window.scrollTo(0, 0);
  };

  const Page = PAGES[path];

  return (
    <div className="bg-shile-black text-white min-h-screen font-body grain overflow-x-hidden">
      <nav>
        <div className="nav-in">
          <a className="brand" href="/" onClick={(e) => { e.preventDefault(); go('/'); }}>shile</a>
          <div className="nav-links">
            {NAV.map(([to, label]) => (
              <a
                key={to}
                href={to}
                className={path === to ? 'on' : ''}
                onClick={(e) => { e.preventDefault(); go(to); }}
              >
                {label}
              </a>
            ))}
          </div>
          {/* Кнопки записи на созвон в шапке больше нет: разговор начинается
              в личке из раздела услуги, а форма живёт только в кейсах. */}
          <button
            type="button"
            className="burger"
            aria-label={menu ? 'Close menu' : 'Open menu'}
            aria-expanded={menu}
            onClick={() => setMenu((v) => !v)}
          >
            <i /><i /><i />
          </button>
        </div>
      </nav>

      {menu && (
        <div className="navmenu" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="navmenu-top">
            <a className="brand" href="/" onClick={(e) => { e.preventDefault(); go('/'); }}>shile</a>
            <button type="button" className="navmenu-x" aria-label="Close menu" onClick={() => setMenu(false)}>&times;</button>
          </div>
          <div className="navmenu-links">
            {NAV.map(([to, label], i) => (
              <a
                key={to}
                href={to}
                className={path === to ? 'on' : ''}
                onClick={(e) => { e.preventDefault(); go(to); }}
              >
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                {label}
              </a>
            ))}
          </div>
        </div>
      )}

      <AnimatePresence>
        {activeCase && <CaseModal data={activeCase} onClose={() => setActiveCase(null)} />}
      </AnimatePresence>

      <Page go={go} onOpen={setActiveCase} />

      <footer>
        <div className="foot">
          <span>shile.vision</span>
          <span>
            <a href="https://instagram.com/shileforyou" target="_blank" rel="noreferrer">@shileforyou</a>
          </span>
        </div>
      </footer>
    </div>
  );
}
