import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import { useIntersection } from 'react-use';
import { CASES, PROOF, TRIED } from './data';
import { PremiumDNAHelix, HelixLights } from './components/PremiumDNAHelix';
import { CaseModal } from './components/CaseModal';
import { cn } from './lib/utils';

export default function App() {
  const [activeCase, setActiveCase] = useState<any>(null);

  return (
    <div className="bg-shile-black text-white min-h-screen font-body grain overflow-x-hidden">

      {/* Navigation */}
      <nav className="absolute top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center z-50">
        <a href="#top" className="text-2xl font-display font-black tracking-wide cursor-pointer">shile</a>
        <div className="hidden md:flex gap-12 text-[10px] uppercase tracking-[0.2em] font-medium text-shile-grey items-center">
          <a href="#dna" className="hover:text-white transition-colors cursor-pointer">DNA</a>
          <a href="#cases" className="text-white border-b border-shile-red pb-1 hover:text-shile-red transition-colors cursor-pointer">Cases</a>
          <a href="#about" className="hover:text-white transition-colors cursor-pointer">About</a>
          <a href="#apply" className="border border-white/20 px-4 py-2 -mt-2 text-white hover:bg-white hover:text-black transition-all cursor-pointer">Apply</a>
        </div>
      </nav>

      {/* CASE MODAL */}
      <AnimatePresence>
        {activeCase && (
          <CaseModal data={activeCase} onClose={() => setActiveCase(null)} />
        )}
      </AnimatePresence>

      {/* ============================================================ 1. HERO */}
      <section id="top" className="relative min-h-[100svh] flex flex-col justify-center items-start px-6 md:px-10 lg:px-16 pb-12 md:pb-24 pt-40">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none md:w-[50%] md:left-auto md:right-0">
          <Canvas
            camera={{ position: [0, 0, 21], fov: 42 }}
            dpr={[1, 1.75]}
            gl={{ antialias: true, powerPreference: "high-performance" }}
          >
            <HelixLights intensity={0.5} />
            <PremiumDNAHelix glow={0.5} />
          </Canvas>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#E1060011] to-transparent blur-3xl mix-blend-screen"></div>
        </div>

        <div className="relative z-10 max-w-3xl mt-auto md:mt-0">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-display font-black text-[clamp(3rem,7vw,88px)] leading-[0.9] tracking-wide uppercase mb-8"
          >
            You already have<br className="hidden md:block" />the music.<br className="md:hidden" /> <span className="text-shile-red">Let's build<br className="hidden md:block" />who you are.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-shile-grey text-lg max-w-xl leading-relaxed mt-8 mb-8"
          >
            I'm shile - I produce for and develop independent artists. I don't sell content. I don't promise streams. I build clarity: who you are, who your music is for, and how you show up so people actually remember you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 mb-10"
          >
            <a href="#apply" className="inline-block bg-shile-red text-white font-semibold text-xs md:text-sm px-8 py-4 uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors">
              Apply for a strategy call
            </a>
            <a href="#cases" className="inline-block border border-white/20 text-white font-semibold text-xs md:text-sm px-8 py-4 uppercase tracking-[0.2em] hover:bg-white hover:text-black hover:border-white transition-colors">
              See the cases
            </a>
          </motion.div>

          <div className="flex flex-wrap gap-x-8 gap-y-2 text-[10px] uppercase tracking-[0.2em] font-bold text-[#555]">
            <span><span className="text-shile-red">/ </span>3 years with US artists</span>
            <span><span className="text-shile-red">/ </span>150+ tracks produced</span>
            <span><span className="text-shile-red">/ </span>One artist at a time</span>
          </div>
        </div>
      </section>

      {/* ============================================================ 2. SOUND FAMILIAR */}
      <section className="relative py-24 md:py-32 border-t border-white/10 bg-[#020202] overflow-hidden text-center">
        <div className="px-6 md:px-10 lg:px-16">
          <h2 className="font-display font-medium lowercase tracking-tight text-[clamp(2.1rem,5vw,4rem)]">
            sound familiar?
          </h2>
        </div>

        <div className="cloud my-12 md:my-16 flex flex-col gap-[14px] md:gap-5">
          {TRIED.map((row, i) => (
            <div
              key={i}
              className="cloud-row"
              style={{
                animationDuration: `${[96, 74, 110, 82, 124, 88, 104, 78, 116][i]}s`,
                animationDirection: i % 2 === 1 ? 'reverse' : 'normal',
                opacity: [0.13, 0.22, 0.34, 0.5, 1, 0.5, 0.34, 0.22, 0.13][i],
              }}
            >
              {[0, 1].map((dup) => (
                <div key={dup} className="flex gap-7 md:gap-16 pr-7 md:pr-16 whitespace-nowrap" aria-hidden={dup === 1}>
                  {row.map((phrase, j) => (
                    <span key={j} className="text-[0.92rem] md:text-[1.15rem] font-medium">{phrase}</span>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="px-6 md:px-10 lg:px-16">
          <p className="text-shile-grey text-base md:text-lg font-medium">
            I didn't write any of this. <b className="text-white font-semibold">Artists did</b> - on calls, in DMs, in intake forms.
          </p>

          {/* The loop */}
          <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-3 mt-12 md:mt-16 max-w-6xl mx-auto">
            <span className="font-display font-semibold uppercase tracking-[0.08em] text-[0.72rem] md:text-[0.88rem] border border-white/10 px-4 py-3 text-shile-grey">drop</span>
            <b className="text-shile-red">→</b>
            <span className="font-display font-semibold uppercase tracking-[0.08em] text-[0.72rem] md:text-[0.88rem] border border-white/10 px-4 py-3 text-shile-grey">30 streams</span>
            <b className="text-shile-red">→</b>
            <span className="font-medium text-[0.8rem] md:text-[0.95rem] border border-shile-red/45 px-4 py-3 text-shile-red">"maybe this one's picking up"</span>
            <b className="text-shile-red">→</b>
            <span className="font-display font-semibold uppercase tracking-[0.08em] text-[0.72rem] md:text-[0.88rem] border border-white/10 px-4 py-3 text-shile-grey">silence</span>
            <b className="text-shile-red">→</b>
            <span className="font-medium text-[0.8rem] md:text-[0.95rem] border border-white/30 px-4 py-3 text-white">"the next one will definitely hit"</span>
            <b className="text-shile-red">↺</b>
          </div>

          <p className="font-display font-black uppercase leading-[1.02] tracking-wide text-[clamp(1.6rem,3.6vw,3rem)] max-w-[24ch] mx-auto mt-14 md:mt-20">
            None of it was wrong. It just had <span className="text-shile-red">nothing to sit on.</span>
          </p>
          <p className="text-shile-grey text-base md:text-lg leading-relaxed max-w-[44ch] mx-auto mt-6">
            You were promoting an artist that wasn't defined yet.
          </p>
        </div>
      </section>

      {/* ============================================================ 3. WHY IT REPEATS */}
      <section className="py-24 md:py-40 px-6 md:px-10 lg:px-16 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col gap-3.5 max-w-4xl">
            {[
              { t: "Most artists work hard.", c: "text-[#1c1c1c]" },
              { t: "Some make good music.", c: "text-[#242424]" },
              { t: "Some post every day.", c: "text-[#2e2e2e]" },
              { t: "Some run ads.", c: "text-[#3a3a3a]" },
              { t: "Some drop every month.", c: "text-[#484848]" },
            ].map((line, i) => (
              <p key={i} className={cn("font-display font-semibold uppercase leading-[1.05] text-[clamp(1.15rem,2.3vw,1.9rem)]", line.c)}>
                {line.t}
              </p>
            ))}
            <p className="font-display font-black uppercase leading-[1.05] text-[clamp(1.7rem,3.8vw,3.1rem)] text-white mt-7 border-l-2 border-shile-red pl-5 md:pl-10">
              Nobody showed them how any of it connects.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ 4. ARTIST DNA */}
      <section id="dna" className="scroll-mt-24 relative py-24 md:py-40 px-6 md:px-10 lg:px-16 border-t border-white/10 bg-[#020202] overflow-hidden">
        <div className="absolute inset-y-0 right-0 w-full md:w-[44%] z-0 opacity-55 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_50%,_rgba(225,6,0,0.18),_transparent_62%)] blur-2xl"></div>
          <Canvas
            camera={{ position: [0, 0, 30], fov: 42 }}
            dpr={[1, 1.75]}
            gl={{ antialias: true, powerPreference: "high-performance" }}
          >
            <HelixLights intensity={0.8} />
            <PremiumDNAHelix glow={0.8} />
          </Canvas>
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto">
          <div className="max-w-[760px] flex flex-col gap-6">
            <p className="text-[10px] uppercase tracking-[0.22em] font-bold text-[#555]">That's the whole job</p>
            <h2 className="font-display font-black uppercase leading-[0.86] tracking-wide text-[clamp(3rem,8vw,7rem)]">
              Artist DNA
            </h2>
            <p className="font-display font-semibold uppercase leading-[1.1] text-shile-red text-[clamp(1.25rem,2.7vw,2.15rem)]">
              Tells you what to do after the track is done.
            </p>
            <p className="text-shile-grey text-lg leading-relaxed max-w-[46ch]">
              One written document, built for one artist. It answers the three things you're guessing at every time you finish something: <b className="text-white font-semibold">who you are, who it's for, and what happens next.</b> Everything you already pay for - the beats, the mixing, the promo - finally has something to sit on.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ 5. WHAT CHANGES */}
      <section className="py-24 md:py-40 px-6 md:px-10 lg:px-16 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-baseline gap-6 mb-12 md:mb-16">
            <h2 className="font-display font-black text-4xl md:text-6xl uppercase tracking-wide">
              What changes
            </h2>
            <p className="text-[11px] uppercase tracking-widest text-[#8A8A8A] max-w-md md:text-right leading-loose">
              Not what's in the file. What stops happening to you.
            </p>
          </div>

          <div className="flex flex-col border-t border-white/10">
            {[
              ["You sound like three different artists across your songs and your page.", "One identity. Everywhere."],
              ["You post and hope somebody out there is the right person.", "You know who you're talking to before you hit record."],
              ["You stare at your phone deciding what to post today.", "You wake up already knowing."],
              ["People hear you once and forget you.", "They remember you after one listen."],
              ["Your page reads like a hobby.", "It reads like an artist people put money behind."],
              ["Every drop starts from zero and dies in three days.", "Every release builds on the last one."],
              ["You pay for promo that has nothing to land on.", "You stop paying for that."],
            ].map(([from, to], i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-[1.4rem_1fr_1fr] gap-1.5 md:gap-8 md:items-baseline py-6 border-b border-white/5">
                <span className="text-[0.62rem] text-[#2a2a2a] tracking-wider font-mono">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-[#555] leading-relaxed">
                  <span className="text-shile-red">- </span>{from}
                </p>
                <p className="font-display font-semibold uppercase leading-tight text-[1rem] md:text-[1.28rem]">{to}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 md:mt-16 border border-white/10 bg-[#0a0a0a] p-7 md:p-13 flex flex-col gap-3.5">
            <p className="font-display font-black uppercase leading-[1.06] text-[clamp(1.35rem,2.9vw,2.4rem)] text-[#555]">
              You stop being the artist who records and hopes.
            </p>
            <p className="font-display font-black uppercase leading-[1.06] text-[clamp(1.35rem,2.9vw,2.4rem)]">
              You become the artist who records and <span className="text-shile-red">knows exactly what happens next.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ 6. WHAT'S INSIDE */}
      <section className="py-24 md:py-40 px-6 md:px-10 lg:px-16 border-t border-white/10 bg-[#020202]">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-baseline gap-6 mb-12 md:mb-16">
            <h2 className="font-display font-black text-4xl md:text-6xl uppercase tracking-wide">
              What's actually in it
            </h2>
            <p className="text-[11px] uppercase tracking-widest text-[#8A8A8A] max-w-md md:text-right leading-loose">
              A written document. Built for one artist. Nothing recycled.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-start">
            {/* LEFT - the seven parts */}
            <div className="flex flex-col border-t border-white/10">
              {[
                ["Artist Archetype", "Who you are, in one sentence - so every post sounds like the same person."],
                ["Archetypes in Action", "What that actually looks like in real posts. Not theory."],
                ["Core Message", "The one thing people should remember after they hear you."],
                ["Audience", "Who you're really talking to - what they watch, where they are, why they'd care."],
                ["Visual Identity", "Colors, references, what your page is supposed to look like."],
                ["Content Rollout", "What you post, in what order, around a release. Week by week."],
                ["Tone of Voice", "How you write captions so it still sounds like you."],
              ].map(([k, v], i) => (
                <div key={i} className="grid grid-cols-1 sm:grid-cols-[15rem_1fr] gap-1 sm:gap-5 sm:items-baseline py-5 border-b border-white/5">
                  <span className="font-display font-semibold uppercase tracking-wide text-base">{k}</span>
                  <p className="text-shile-grey text-[0.96rem] leading-relaxed">{v}</p>
                </div>
              ))}
            </div>

            {/* RIGHT - large premium 3D helix */}
            <div className="relative w-full h-[560px] lg:h-[82vh] lg:min-h-[680px] lg:sticky lg:top-24">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_45%,_rgba(225,6,0,0.22),_transparent_62%)] blur-2xl pointer-events-none"></div>
              <div className="absolute inset-0 grain opacity-40 pointer-events-none mix-blend-overlay"></div>
              <Canvas
                camera={{ position: [0, 0, 34], fov: 40 }}
                dpr={[1, 2]}
                gl={{ antialias: true, powerPreference: "high-performance" }}
              >
                <HelixLights intensity={1} />
                <PremiumDNAHelix glow={1} />
              </Canvas>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ 7. CASES */}
      <section id="cases" className="scroll-mt-24 w-full py-24 md:py-40 px-6 md:px-10 lg:px-16 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-baseline gap-6 mb-12 md:mb-16">
            <h2 className="font-display font-black text-4xl md:text-6xl uppercase tracking-wide">
              Three artists.<br />Same starting point.
            </h2>
            <p className="text-[11px] uppercase tracking-widest text-[#8A8A8A] max-w-md md:text-right leading-loose">
              Talented. Stuck. Guessing. Click any of them for the full story.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CASES.map((item) => (
              <motion.div
                key={item.id}
                layoutId={`case-${item.id}-container`}
                onClick={() => setActiveCase(item)}
                className="group cursor-pointer flex flex-col relative"
                style={{ transformStyle: 'preserve-3d' }}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="bg-[#0a0a0a] border border-white/5 relative overflow-hidden flex flex-col h-full group-hover:border-white/20 transition-colors">
                  <div className="w-full relative aspect-square bg-black p-3">
                    <div className="w-full h-full relative overflow-hidden bg-[#111] border border-white/5">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    </div>
                    <div className="absolute inset-0 bg-shile-red opacity-0 group-hover:opacity-10 transition-opacity z-0 pointer-events-none"></div>

                    {/* Click affordance badge */}
                    <div className="absolute top-5 right-5 z-10 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm border border-white/15 px-3 py-1.5 text-[9px] uppercase tracking-[0.18em] font-bold text-white/90 group-hover:bg-shile-red group-hover:border-shile-red transition-colors pointer-events-none">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <polyline points="9 21 3 21 3 15"></polyline>
                        <line x1="21" y1="3" x2="14" y2="10"></line>
                        <line x1="3" y1="21" x2="10" y2="14"></line>
                      </svg>
                      Full story
                    </div>
                  </div>

                  <div className="flex flex-col flex-grow gap-4 p-6 md:p-8">
                    <div className="flex flex-col gap-1">
                      <h3 className="font-display text-xl font-semibold uppercase tracking-wide text-white">{item.name}</h3>
                      <motion.p layoutId={`case-${item.id}-tag`} className="text-[10px] text-shile-red font-bold tracking-widest uppercase">
                        {item.genre} · @{item.handle}
                      </motion.p>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#555]">Before</span>
                      <p className="text-[#555] text-[0.95rem] leading-relaxed">{item.before}</p>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-shile-red">After</span>
                      <p className="text-white text-[0.95rem] leading-relaxed">{item.after}</p>
                    </div>

                    <span className="mt-auto pt-2 inline-flex items-center gap-2 text-[10px] text-shile-red uppercase tracking-[0.2em] font-bold group-hover:gap-3 transition-all">
                      Full story
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Production numbers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mt-16 md:mt-24 pt-12 md:pt-14 border-t border-white/10">
            {PROOF.map((item, i) => (
              <ProofCounter key={i} data={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ 8. ABOUT */}
      <section id="about" className="scroll-mt-24 py-24 md:py-40 px-6 md:px-10 lg:px-16 border-t border-white/10 bg-[#020202]">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-baseline gap-6 mb-12 md:mb-16">
            <h2 className="font-display font-black text-4xl md:text-6xl uppercase tracking-wide">
              Who you're working with
            </h2>
            <p className="text-[11px] uppercase tracking-widest text-[#8A8A8A] max-w-md md:text-right leading-loose">
              Two people. No agency, no account manager, no handoff.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#050505] border border-white/5 p-8 relative overflow-hidden group hover:border-white/20 transition-colors flex flex-col">
              <div className="w-full max-w-[200px] aspect-square mb-8 relative bg-[#111] border border-white/5 p-2">
                <img src="https://www.dropbox.com/scl/fi/uzqxjyunagkvwxwtaqtlb/B2F4181B-8DCE-41AB-A75C-0A50B262418A_1_105_c.jpeg?rlkey=klciiw4ewf2jxg0blkh0mvj2q&st=suogubw7&raw=1" alt="Shile (Paul)" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              </div>
              <h3 className="font-display font-black text-3xl uppercase tracking-wide mb-1 text-white mt-auto">Shile (Paul)</h3>
              <p className="text-[#E10600] text-[10px] uppercase tracking-widest font-bold mb-4">Music Producer &amp; Artist Developer</p>
              <p className="text-[#8A8A8A] text-sm leading-relaxed max-w-sm">
                3 years with US artists · 150+ tracks produced. Beats behind Conway the Machine, 2feetbino, Lil Dee and Dillon Cooper. Most artists are still here a year in.
              </p>
            </div>

            <div className="bg-[#050505] border border-white/5 p-8 relative overflow-hidden group hover:border-white/20 transition-colors flex flex-col">
              <div className="w-full max-w-[200px] aspect-square mb-8 relative bg-[#111] border border-white/5 p-2">
                <img src="https://www.dropbox.com/scl/fi/zkn4gtda2iwpezxco3md6/2026-07-22-3.10.28-AM.png?rlkey=immqjyw52tg2qode40w52h6x8&st=y1mp29o2&raw=1" alt="Unavenlive (Michael)" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              </div>
              <h3 className="font-display font-black text-3xl uppercase tracking-wide mb-1 text-white mt-auto">Unavenlive (Michael)</h3>
              <p className="text-[#E10600] text-[10px] uppercase tracking-widest font-bold mb-4">Creative Producer &amp; Strategist</p>
              <p className="text-[#8A8A8A] text-sm leading-relaxed max-w-sm">
                2.5 years in creative production · brands, media, promo strategy. Goes deep on every detail of an artist, so the file fits only them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ 9. WHAT PROTECTS YOU */}
      <section className="py-24 md:py-40 px-6 md:px-10 lg:px-16 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-baseline gap-6 mb-12 md:mb-16">
            <h2 className="font-display font-black text-4xl md:text-6xl uppercase tracking-wide">
              What protects you
            </h2>
            <p className="text-[11px] uppercase tracking-widest text-[#8A8A8A] max-w-md md:text-right leading-loose">
              Three things, before you pay anything.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {[
              ["01", "A contract", "Both names, every deliverable listed. You see exactly what you're getting before anything moves."],
              ["02", "Five days", "From the intake form to the finished file. Then a call where we walk through it until every piece clicks."],
              ["03", "An honest no", "If your problem isn't positioning, I'll tell you on the call and we're done. I don't want the money for the wrong thing."],
            ].map(([no, title, desc], i) => (
              <div key={i} className="bg-shile-black p-7 md:p-11 flex flex-col gap-3">
                <span className="text-[0.62rem] text-[#2a2a2a] font-mono tracking-wider">{no}</span>
                <h3 className="font-display font-semibold uppercase tracking-wide text-lg">{title}</h3>
                <p className="text-shile-grey text-[0.95rem] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ 10. APPLY */}
      <section id="apply" className="scroll-mt-24 py-24 md:py-40 px-6 md:px-10 lg:px-16 bg-[#020202] border-t border-white/10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <h2 className="font-display font-black text-[clamp(2.6rem,6vw,5rem)] leading-[0.9] tracking-wide uppercase mb-8 text-white">
              Book a call.<br /><span className="text-shile-red">30 minutes.</span>
            </h2>

            <p className="text-shile-grey text-lg leading-relaxed mb-12 max-w-lg">
              We'll go through your page live. You'll leave knowing what's actually broken - whether you buy anything or not.
            </p>
          </div>

          {/* Form */}
          <ApplyForm />

        </div>
      </section>

      {/* ============================================================ FOOTER */}
      <footer className="border-t border-white/10 py-10 px-6 md:px-10 lg:px-16 bg-black">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.3em] font-semibold text-[#555] w-full">
            <div>shile.vision</div>
            <div className="hidden md:block text-shile-red">Artist DNA</div>
            <div>
              <a href="https://instagram.com/shileforyou" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">@shileforyou</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Proof Counter Component
function ProofCounter({ data }: { data: any }) {
  const ref = React.useRef(null);
  const intersection = useIntersection(ref, {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  });

  const [hasTriggered, setHasTriggered] = useState(false);

  if (intersection?.isIntersecting && !hasTriggered) {
    setHasTriggered(true);
  }

  const primaryValue = data.reels || data.video;
  const primaryLabel = data.reels ? 'on reels' : 'music video';

  return (
    <div ref={ref} className="flex gap-5 items-start group">
      {data.coverArt && (
        <div className="w-[76px] flex-none relative bg-[#111] border border-white/5">
          <img src={data.coverArt} alt={`${data.artist} - ${data.track}`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
        </div>
      )}

      <div className="flex flex-col">
        <div className="font-display font-black text-[clamp(1.9rem,3.2vw,2.7rem)] leading-none tabular-nums text-white">
          {hasTriggered ? <CountUp end={primaryValue} duration={2.5} separator="," /> : '0'}+
        </div>
        <p className="text-[#555] uppercase tracking-[0.2em] text-[10px] font-bold mt-1">{primaryLabel}</p>

        <p className="text-white font-semibold text-[0.95rem] mt-3">{data.artist}</p>
        <p className="text-shile-red text-[10px] uppercase tracking-[0.18em] font-bold">{data.track}</p>

        <p className="text-[#555] uppercase tracking-[0.2em] text-[10px] font-bold mt-3">
          {hasTriggered ? <CountUp end={data.streams} duration={2.5} separator="," /> : '0'}+ streams
        </p>
      </div>
    </div>
  );
}

// Apply Form — submits to /api/notify (Telegram lead notification,
// same service as the other shile site)
function ApplyForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [form, setForm] = useState({ name: '', handle: '', link: '', blocker: '', referredBy: '' });

  const field = (key: keyof typeof form) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
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
          'Biggest blocker': form.blocker,
          'Referred by': referredBy || '—',
        }),
      });
      const data = await res.json().catch(() => ({} as any));
      if (res.ok && (data.success === 'true' || data.success === true)) {
        setStatus('success');
        setForm({ name: '', handle: '', link: '', blocker: '', referredBy: '' });
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
