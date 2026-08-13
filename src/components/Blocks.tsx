import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PremiumDNAHelix, HelixLights } from './PremiumDNAHelix';
import { TRACKS, CUSTOM, CASES, TRIED } from '../data';

/* ------------------------------------------------------------------ helix */

export function Helix({
  className = 'helix',
  style,
  camera = 21,
  fov = 42,
  glow = 0.6,
  intensity = 0.6,
}: {
  className?: string;
  style?: React.CSSProperties;
  camera?: number;
  fov?: number;
  glow?: number;
  intensity?: number;
}) {
  return (
    <div className={className} style={style} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, camera], fov }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <HelixLights intensity={intensity} />
        <PremiumDNAHelix glow={glow} />
      </Canvas>
    </div>
  );
}

/* ----------------------------------------------------------------- player */

type Two = { t: string; g: string; a: string; b?: string | null };

const fmt = (s: number) => {
  const v = Math.max(0, Math.floor(s || 0));
  return `${Math.floor(v / 60)}:${String(v % 60).padStart(2, '0')}`;
};

export function Player({ item, labels }: { item: Two; labels: [string, string] }) {
  const refs = {
    a: useRef<HTMLAudioElement>(null),
    b: useRef<HTMLAudioElement>(null),
  };
  const [side, setSide] = useState<'a' | 'b'>('a');
  const [playing, setPlaying] = useState(false);
  const [pct, setPct] = useState(0);
  const [time, setTime] = useState('0:00');

  const cur = () => refs[side].current;

  const onTimeUpdate = (which: 'a' | 'b') => () => {
    if (which !== side) return;
    const el = cur();
    if (!el) return;
    setPct(el.duration ? (el.currentTime / el.duration) * 100 : 0);
    setTime(fmt(el.currentTime));
  };

  const toggle = () => {
    const el = cur();
    if (!el) return;
    if (el.paused) {
      // only one thing plays on the page at a time
      document.querySelectorAll('audio').forEach((x) => { if (x !== el) x.pause(); });
      el.play();
      setPlaying(true);
    } else {
      el.pause();
    }
  };

  const switchSide = (next: 'a' | 'b') => {
    if (next === side || !refs[next].current) return;
    const from = cur();
    const to = refs[next].current!;
    const wasPlaying = from ? !from.paused : false;
    const at = from ? from.currentTime : 0;
    from?.pause();
    to.currentTime = Math.min(at, to.duration || at);
    setSide(next);
    if (wasPlaying) { to.play(); setPlaying(true); }
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cur();
    if (!el || !el.duration) return;
    const r = e.currentTarget.getBoundingClientRect();
    el.currentTime = ((e.clientX - r.left) / r.width) * el.duration;
  };

  return (
    <div className="ab">
      <div className="h">
        <span className="t">{item.t}</span>
        <span className="g">{item.g}</span>
      </div>

      <div className="toggle">
        <button type="button" className={side === 'a' ? 'on' : ''} onClick={() => switchSide('a')}>
          {labels[0]}
        </button>
        <button
          type="button"
          className={side === 'b' ? 'on' : ''}
          disabled={!item.b}
          onClick={() => switchSide('b')}
        >
          {labels[1]}
        </button>
      </div>

      <div className="pl">
        <button className="play" type="button" onClick={toggle} aria-label={playing ? 'Pause' : 'Play'}>
          {playing ? '❚❚' : '▶'}
        </button>
        <div className="bar" onClick={seek}>
          <i style={{ width: `${pct}%` }} />
        </div>
        <span className="time">{time}</span>
      </div>

      <audio
        ref={refs.a}
        preload="none"
        src={item.a}
        onTimeUpdate={onTimeUpdate('a')}
        onPause={() => side === 'a' && setPlaying(false)}
        onPlay={() => side === 'a' && setPlaying(true)}
        onEnded={() => { if (side === 'a') { setPlaying(false); setPct(0); } }}
      />
      {item.b && (
        <audio
          ref={refs.b}
          preload="none"
          src={item.b}
          onTimeUpdate={onTimeUpdate('b')}
          onPause={() => side === 'b' && setPlaying(false)}
          onPlay={() => side === 'b' && setPlaying(true)}
          onEnded={() => { if (side === 'b') { setPlaying(false); setPct(0); } }}
        />
      )}
    </div>
  );
}

/* --------------------------------------------------------------- releases */

export function TrackList() {
  return (
    <div className="tracks">
      {TRACKS.map((k) => (
        <a key={k.t} className="track" href={k.url} target="_blank" rel="noreferrer">
          <img src={k.cover} alt={k.t} loading="lazy" />
          <span className="col">
            <span className="t">{k.t}</span>
            <span className="a">{k.a}</span>
            <span className="n">
              {k.n.map(([v, label]) => (
                <span key={label}><b>{v}</b> {label}</span>
              ))}
            </span>
            <span className="sp">Listen on Spotify ↗</span>
          </span>
        </a>
      ))}
    </div>
  );
}

/* ------------------------------------------------- custom production cases */

export function CustomCases({ limit }: { limit?: number }) {
  const list = limit ? CUSTOM.slice(0, limit) : CUSTOM;
  return (
    <div>
      {list.map((c, i) => (
        <article className="ccase" key={c.t}>
          <div>
            <div className="head">
              <span className="no">{String(i + 1).padStart(2, '0')}</span>
              <h3>{c.t}</h3>
            </div>
            <div className="stack-blk">
              <div>
                <p className="cap">What he asked for</p>
                <p className="quote-blk">{c.ask}</p>
              </div>
              <div>
                <p className="cap">What I did</p>
                <p className="did">{c.did}</p>
              </div>
            </div>
          </div>
          <div>
            <Player item={c} labels={['The idea', 'The result']} />
          </div>
        </article>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------- DNA cases */

export function CaseGrid({ onOpen, limit }: { onOpen: (c: any) => void; limit?: number }) {
  const list = limit ? CASES.slice(0, limit) : CASES;
  return (
    <div className="cases">
      {list.map((c) => (
        <button className="case" type="button" key={c.id} onClick={() => onOpen(c)}>
          <span className="ph">
            <img src={c.image} alt={c.name} loading="lazy" />
            <span className="badge">Full story</span>
          </span>
          <span className="body">
            <span className="who">
              <span className="h">{c.name}</span>
              <span className="label red">{c.genre} · @{c.handle}</span>
            </span>
            <span className="ba b">
              <span className="t">Before</span>
              <p>{c.before}</p>
            </span>
            <span className="ba a">
              <span className="t">After</span>
              <p>{c.after}</p>
            </span>
            <span className="more">Full story →</span>
          </span>
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------ "sound familiar?" */

const DURATIONS = [96, 74, 110, 82, 124, 88, 104, 78, 116];
const OPACITY = [0.13, 0.22, 0.34, 0.5, 1, 0.5, 0.34, 0.22, 0.13];

export function Cloud() {
  return (
    <div className="cloud" aria-label="Things artists say they have already tried">
      {TRIED.map((row, i) => (
        <div
          className="row"
          key={i}
          style={{
            animationDuration: `${DURATIONS[i]}s`,
            animationDirection: i % 2 === 1 ? 'reverse' : 'normal',
            opacity: OPACITY[i],
          }}
        >
          {[0, 1].map((dup) => (
            <div className="set" key={dup} aria-hidden={dup === 1}>
              {row.map((phrase, j) => <span key={j}>{phrase}</span>)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------- CTA banner */

export function CtaBand({
  title,
  note,
  label = 'Book a call',
  go,
}: {
  title: React.ReactNode;
  note?: string;
  label?: string;
  go: (path: string) => void;
}) {
  return (
    <section>
      <div className="wrap cta-band">
        <h2>{title}</h2>
        {note && <p>{note}</p>}
        <a className="btn big" href="/apply" onClick={(e) => { e.preventDefault(); go('/apply'); }}>
          {label}
        </a>
      </div>
    </section>
  );
}
