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
  const [activeCase, setActiveCase] = useState<any>(null);

  useEffect(() => {
    const onPop = () => setPath(clean(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const go = (to: string) => {
    const next = clean(to);
    if (next !== window.location.pathname) window.history.pushState({}, '', next);
    setActiveCase(null);
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
          <div className="nav-right">
            {/* The pack landing is a single-goal page: the only action on it is
                the form, so the nav CTA is hidden there. */}
            {path !== '/pack' && (
              <a className="btn sm" href="/apply" onClick={(e) => { e.preventDefault(); go('/apply'); }}>
                Book a call
              </a>
            )}
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {activeCase && <CaseModal data={activeCase} onClose={() => setActiveCase(null)} />}
      </AnimatePresence>

      <Page go={go} onOpen={setActiveCase} />

      <footer>
        <div className="foot">
          <span>shile.vision</span>
          <span className="mid">Artist DNA</span>
          <span>
            <a href="https://instagram.com/shileforyou" target="_blank" rel="noreferrer">@shileforyou</a>
          </span>
        </div>
      </footer>
    </div>
  );
}
