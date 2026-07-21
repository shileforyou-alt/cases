import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import { useIntersection } from 'react-use';
import { CASES, PROOF } from './data';
import { PremiumDNAHelix, HelixLights } from './components/PremiumDNAHelix';
import { CaseModal } from './components/CaseModal';
import { Placeholder } from './components/Placeholder';
import { cn } from './lib/utils';

export default function App() {
  const [activeCase, setActiveCase] = useState<any>(null);

  return (
    <div className="bg-shile-black text-white min-h-screen font-body grain overflow-x-hidden">
      
      {/* Navigation (Added for Theme Aesthetic) */}
      <nav className="absolute top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center z-50">
        <div className="text-2xl font-display font-black tracking-wide">shile</div>
        <div className="hidden md:flex gap-12 text-[10px] uppercase tracking-[0.2em] font-medium text-shile-grey">
          <span className="text-white border-b border-shile-red pb-1 cursor-pointer">Cases</span>
          <span className="hover:text-white transition-colors cursor-pointer">About</span>
          <span className="hover:text-white transition-colors cursor-pointer">DNA</span>
          <a href="#apply" className="border border-white/20 px-4 py-2 -mt-2 text-white hover:bg-white hover:text-black transition-all cursor-pointer">Apply</a>
        </div>
      </nav>

      {/* CASE MODAL */}
      <AnimatePresence>
        {activeCase && (
          <CaseModal data={activeCase} onClose={() => setActiveCase(null)} />
        )}
      </AnimatePresence>

      {/* 1. HERO */}
      <section className="relative min-h-[100svh] flex flex-col justify-center items-start px-6 md:px-10 lg:px-16 pb-12 md:pb-24 pt-40">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none md:w-[50%] md:left-auto md:right-0">
          <Canvas
            camera={{ position: [0, 0, 21], fov: 42 }}
            dpr={[1, 1.75]}
            gl={{ antialias: true, powerPreference: "high-performance" }}
          >
            <HelixLights />
            <PremiumDNAHelix />
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
          >
            <a href="#apply" className="inline-block bg-shile-red text-white font-semibold text-xs md:text-sm px-8 py-4 uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors mb-8">
              Apply for a strategy call
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. CASES (CORE) */}
      <section className="w-full py-20 md:py-32 px-6 md:px-10 lg:px-16 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-12">
            <h2 className="font-display font-black italic text-4xl md:text-6xl tracking-wide uppercase">
              Cases
            </h2>
            <p className="text-[11px] uppercase tracking-widest text-[#8A8A8A] mt-4 md:mt-0 max-w-md md:text-right">
              Each of these started the same way - talented, stuck, guessing. Here's what changed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CASES.map((item, index) => (
              <motion.div 
                key={item.id}
                layoutId={`case-${item.id}-container`}
                onClick={() => setActiveCase(item)}
                className={cn(
                  "group cursor-pointer flex flex-col relative",
                  index === 1 ? "md:mt-16" : ""
                )}
                style={{ transformStyle: 'preserve-3d' }}
                whileHover={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="bg-[#111] border border-white/5 relative overflow-hidden flex flex-col h-full group-hover:border-white/20 transition-colors">
                  <div className="w-full relative aspect-[4/3] md:aspect-square bg-black p-2 md:p-4">
                    {item.image ? (
                      <div className="w-full h-full relative overflow-hidden bg-[#111] border border-white/5">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                      </div>
                    ) : (
                      <div className="w-full h-full border border-white/10 flex items-center justify-center text-[#555] text-[10px] uppercase tracking-widest bg-[#050505]">
                        [ Insert Image: {item.name} ]
                      </div>
                    )}
                    <div className="absolute inset-0 bg-shile-red opacity-0 group-hover:opacity-10 transition-opacity z-0 pointer-events-none"></div>
                  </div>
                  
                  <div className="flex flex-col flex-grow p-6 md:p-8 bg-[#0a0a0a]">
                    <motion.p layoutId={`case-${item.id}-tag`} className="text-[10px] text-shile-red font-bold tracking-widest uppercase mb-3">
                      {item.genre}
                    </motion.p>
                    
                    <p className="text-[11px] text-[#aaa] mb-4 italic tracking-wide">
                      {item.name}
                    </p>
                    
                    <motion.h3 layoutId={`case-${item.id}-hook`} className="font-display text-xl md:text-2xl font-bold leading-tight uppercase tracking-wide text-white mt-auto">
                      "{item.hook}"
                    </motion.h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PROOF */}
      <section className="py-24 md:py-32 px-6 md:px-10 lg:px-16 border-t border-white/10 bg-[#020202]">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-16">
            <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-wide">
              Production that moved
            </h2>
            <p className="text-[11px] uppercase tracking-widest text-[#8A8A8A] mt-4 md:mt-0 max-w-sm md:text-right">
              Releases built on production picked around each artist's voice, style and bpm.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
            {PROOF.map((item, i) => (
              <ProofCounter key={i} data={item} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. ABOUT */}
      <section className="py-24 md:py-40 px-6 md:px-10 lg:px-16 max-w-[1400px] mx-auto border-t border-white/10">
        <h2 className="font-display font-black text-4xl md:text-6xl uppercase tracking-wide mb-12">
          Who I work with
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-24 items-center">
          <div className="space-y-6 text-[#aaa] text-lg leading-relaxed">
            <p>
              <strong className="text-white font-bold">I produce for and develop independent artists</strong> - the ones who can actually make music but have no system around it. I've put beats behind names like Conway the Machine, 2feetbino, Lil Dee and Dillon Cooper - but the work I care about most is helping an artist figure out who they are, so everything they release finally points in one direction.
            </p>
            <p>
              I don't sell content. I don't promise streams. What I build is clarity. You already have the music. My job is the packaging around it.
            </p>
          </div>
          <div className="relative aspect-square w-full max-w-md mx-auto opacity-70">
            <Canvas
              camera={{ position: [0, 0, 21], fov: 42 }}
              dpr={[1, 1.75]}
              gl={{ antialias: true, powerPreference: "high-performance" }}
            >
              <HelixLights />
              <PremiumDNAHelix />
            </Canvas>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#050505] border border-white/5 p-8 relative overflow-hidden group hover:border-white/20 transition-colors flex flex-col">
            <div className="w-full max-w-[200px] aspect-square mb-8 relative bg-[#111] border border-white/5 p-2">
              <img src="https://www.dropbox.com/scl/fi/uzqxjyunagkvwxwtaqtlb/B2F4181B-8DCE-41AB-A75C-0A50B262418A_1_105_c.jpeg?rlkey=klciiw4ewf2jxg0blkh0mvj2q&st=suogubw7&raw=1" alt="Shile (Paul)" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
            </div>
            <h3 className="font-display font-black text-3xl uppercase tracking-wide mb-1 text-white mt-auto">Shile (Paul)</h3>
            <p className="text-[#E10600] text-[10px] uppercase tracking-widest font-bold mb-4">Music Producer & Artist Developer</p>
            <p className="text-[#8A8A8A] text-sm leading-relaxed max-w-sm">
              3 years with US artists · 150+ tracks produced. Builds long-term partnerships - most artists are still here a year in.
            </p>
          </div>
          
          <div className="bg-[#050505] border border-white/5 p-8 relative overflow-hidden group hover:border-white/20 transition-colors flex flex-col">
            <div className="w-full max-w-[200px] aspect-square mb-8 relative bg-[#111] border border-white/5 p-2">
              <img src="https://www.dropbox.com/scl/fi/zkn4gtda2iwpezxco3md6/2026-07-22-3.10.28-AM.png?rlkey=immqjyw52tg2qode40w52h6x8&st=y1mp29o2&raw=1" alt="Unavenlive (Misha)" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
            </div>
            <h3 className="font-display font-black text-3xl uppercase tracking-wide mb-1 text-white mt-auto">Unavenlive (Misha)</h3>
            <p className="text-[#E10600] text-[10px] uppercase tracking-widest font-bold mb-4">Creative Producer & Strategist</p>
            <p className="text-[#8A8A8A] text-sm leading-relaxed max-w-sm">
              2.5 years in creative production · brands, media, promo strategy. Goes deep on every detail of an artist, so the offer fits only them.
            </p>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="py-24 md:py-40 px-6 md:px-10 lg:px-16 border-t border-white/10 bg-[#020202]">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="font-display font-black text-4xl md:text-6xl uppercase tracking-wide mb-16 md:mb-24">
            How it works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 mb-24">
            {[
              { num: "01", title: "You fill out a short intake", desc: "A 15–20 question form, plus voice notes. The real you, not a surface read." },
              { num: "02", title: "We study you and your lane", desc: "Small artists in your niche and the ones who broke through. We find the exact gaps." },
              { num: "03", title: "We build your Artist DNA", desc: "Your archetypes, core message, audience, visual identity, content rollout and tone of voice." },
              { num: "04", title: "We get on a call", desc: "And walk through the whole file until every piece clicks." }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-start border-t border-white/10 pt-6">
                <span className="font-display text-4xl md:text-5xl font-black text-[#222] italic leading-none mb-6">
                  {step.num}
                </span>
                <h3 className="font-display font-bold text-xl uppercase tracking-tight mb-3 text-white">{step.title}</h3>
                <p className="text-shile-grey text-sm md:text-base leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="border border-white/10 bg-[#050505] p-8 md:p-12 relative">
            <p className="text-[10px] text-shile-red uppercase tracking-widest font-bold mb-6">What's inside Artist DNA</p>
            <p className="font-display font-bold text-2xl md:text-4xl leading-tight uppercase tracking-wide text-[#ccc]">
              Artist Archetype <span className="text-[#333] mx-2">/</span> 
              Archetypes in Action <span className="text-[#333] mx-2">/</span> 
              Core Message <span className="text-[#333] mx-2">/</span> 
              Audience <span className="text-[#333] mx-2">/</span> 
              Visual Identity <span className="text-[#333] mx-2">/</span> 
              Content Rollout <span className="text-[#333] mx-2">/</span> 
              Tone of Voice
            </p>
          </div>
        </div>
      </section>

      {/* 6. WHAT ARTISTS SAY */}
      <section className="relative py-24 md:py-40 px-6 md:px-10 lg:px-16 border-t border-white/10 overflow-hidden">
        {/* Mobile-only subtle DNA backdrop */}
        <div className="lg:hidden absolute inset-0 z-0 opacity-[0.18] pointer-events-none flex items-center justify-center">
          <Canvas
            camera={{ position: [0, 0, 22], fov: 44 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, powerPreference: 'high-performance' }}
          >
             <HelixLights />
             <PremiumDNAHelix />
          </Canvas>
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-16 lg:gap-16 items-start">
          {/* LEFT — quotes */}
          <div>
            <h2 className="font-display font-black text-4xl md:text-6xl uppercase tracking-wide mb-16 md:mb-20">
              What artists say
            </h2>

            <div className="space-y-20 md:space-y-28">
              {[
                { quote: "Now actually having a format to base my music off of and not be confused on how to format my songs or album - it helps with time management, getting things done faster.", author: "k.o.g_30z" },
                { quote: "Realized it's a real career - not random posts. Now I know how to present myself and pull the right people to my music.", author: "Eli_the_entity" },
                { quote: "The DNA helped me focus on a couple of tropes rather than going after 10 of them and wearing myself thin.", author: "Pricetonmusica" }
              ].map((item, i) => (
                <div key={i} className="border-l-2 border-shile-red pl-8 md:pl-12">
                  <p className="font-display font-bold text-3xl md:text-5xl leading-tight uppercase tracking-wide text-white mb-8">
                    "{item.quote}"
                  </p>
                  <p className="text-[11px] text-[#8A8A8A] uppercase tracking-[0.2em] font-bold">
                    - {item.author}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — large premium 3D helix (sticky on desktop) */}
          <div className="hidden lg:block sticky top-24 h-[82vh] min-h-[640px] -my-4">
            {/* soft red glow behind the helix */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_42%,_rgba(225,6,0,0.20),_transparent_62%)] blur-2xl pointer-events-none"></div>
            <div className="absolute inset-0 grain opacity-40 pointer-events-none mix-blend-overlay"></div>
            <Canvas
              camera={{ position: [0, 0, 21], fov: 40 }}
              dpr={[1, 2]}
              gl={{ antialias: true, powerPreference: 'high-performance' }}
            >
              <HelixLights />
              <PremiumDNAHelix />
            </Canvas>
          </div>
        </div>
      </section>

      {/* 7. OFFER + CTA */}
      <section id="apply" className="py-24 md:py-40 px-6 md:px-10 lg:px-16 bg-[#000] border-t border-white/10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <h2 className="font-display font-black text-[clamp(3rem,6vw,6rem)] leading-[0.9] tracking-wide uppercase mb-8 text-white">
              Build a system<br/>that works -<br/>
              <span className="text-shile-red">or keep doing it<br/>without direction.</span>
            </h2>
            
            <p className="text-shile-grey text-lg leading-relaxed mb-12 max-w-lg">
              Artist DNA - a written positioning strategy built specifically for you: who you are as an artist, who your music is for, and how you show up consistently across every platform and release. Secured with a formal agreement - both names, full deliverables list.
            </p>
          </div>

          {/* Form */}
          <form 
            onSubmit={(e) => { e.preventDefault(); alert('Form connected via Formspree/mailto later.'); }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-shile-grey text-sm tracking-widest uppercase mb-2">Name</label>
                <input type="text" required className="w-full bg-transparent border-b border-[#333] py-3 text-white focus:outline-none focus:border-shile-red transition-colors text-lg" />
              </div>
              <div>
                <label className="block text-shile-grey text-sm tracking-widest uppercase mb-2">Instagram / @handle</label>
                <input type="text" required className="w-full bg-transparent border-b border-[#333] py-3 text-white focus:outline-none focus:border-shile-red transition-colors text-lg" />
              </div>
            </div>
            
            <div>
              <label className="block text-shile-grey text-sm tracking-widest uppercase mb-2">Spotify or Music Link</label>
              <input type="url" required className="w-full bg-transparent border-b border-[#333] py-3 text-white focus:outline-none focus:border-shile-red transition-colors text-lg" />
            </div>

            <div>
              <label className="block text-shile-grey text-sm tracking-widest uppercase mb-2">What's your biggest blocker right now?</label>
              <input type="text" required className="w-full bg-transparent border-b border-[#333] py-3 text-white focus:outline-none focus:border-shile-red transition-colors text-lg" />
            </div>

            <div className="pt-8 flex flex-col sm:flex-row items-center gap-6">
              <button type="submit" className="w-full sm:w-auto bg-shile-red text-white font-semibold text-sm px-12 py-5 uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors cursor-pointer">
                Apply
              </button>
            </div>
          </form>

        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="border-t border-white/10 py-10 px-6 md:px-10 lg:px-16 bg-black">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.3em] font-semibold text-[#555] w-full">
            <div>© 2026 Shile Studio</div>
            <div className="hidden md:flex gap-8">
              <span className="text-shile-red">Angie / 250k+</span>
              <span>Things I've Seen / 104k+</span>
              <span>Hard To Kill / 650k+</span>
            </div>
            <div>@shile_prod</div>
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
    <div ref={ref} className="flex flex-col group border-l border-white/5 pl-8 md:pl-12">
      <div className="mb-6 flex-grow">
        <p className="text-white font-bold text-xl uppercase tracking-wide mb-1">{data.artist}</p>
        <p className="text-shile-red text-[11px] uppercase tracking-widest font-bold">{data.track}</p>
      </div>

      <div className="mb-8">
        <div className="font-display font-black text-5xl md:text-6xl tracking-wide mb-2 text-white">
          {hasTriggered ? <CountUp end={primaryValue} duration={2.5} separator="," /> : '0'}+
        </div>
        <p className="text-[#555] uppercase tracking-[0.2em] text-[10px] font-bold">{primaryLabel}</p>
      </div>

      <div className="mb-8">
        <div className="font-display font-black text-3xl md:text-4xl tracking-wide mb-2 text-[#aaa]">
          {hasTriggered ? <CountUp end={data.streams} duration={2.5} separator="," /> : '0'}+
        </div>
        <p className="text-[#555] uppercase tracking-[0.2em] text-[10px] font-bold">streams</p>
      </div>
      
      <div className="mt-8">
        {data.coverArt ? (
          <div className="w-full max-w-[200px] aspect-square relative bg-[#111] border border-white/5 p-2">
            <img src={data.coverArt} alt={`${data.artist} - ${data.track}`} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
          </div>
        ) : (
          <Placeholder label="Cover Art" aspectRatio="1/1" className="w-full max-w-[200px]" />
        )}
      </div>
    </div>
  );
}
