import React from 'react';
import { MIXES, SERVICES, BLIND_QUOTES } from './data';
import { ApplyForm } from './components/ApplyForm';
import { PackForm } from './components/PackForm';
import { Helix, Player, TrackList, CustomCases, CaseGrid, Cloud, CtaBand } from './components/Blocks';

type Nav = { go: (path: string) => void; onOpen?: (c: any) => void };

const Link = ({ go, to, className, children }: { go: (p: string) => void; to: string; className?: string; children: React.ReactNode }) => (
  <a className={className} href={to} onClick={(e) => { e.preventDefault(); go(to); }}>{children}</a>
);

const Loop = () => (
  <video
    src="/media/back.mp4"
    poster="/media/back-poster.jpg"
    autoPlay
    muted
    loop
    playsInline
    aria-hidden="true"
    style={{ aspectRatio: '16 / 9' }}
  />
);

/* ============================================================ HOME */

export function Home({ go }: Nav) {
  const tiles = [
    {
      no: '01', to: '/artist-dna', h: 'Artist DNA',
      one: "Tells you what to do after the track is done. Who you are, who it's for, what happens next.",
      pills: ['remove the fog', 'clarity', 'visual identity', 'rollout plan'],
    },
    {
      no: '02', to: '/production', h: 'Custom production',
      one: 'A beat built from scratch on your references, your key, your bpm - and nobody else can ever buy it.',
      pills: ['your idea', 'from scratch', 'only for you', 'exclusive rights'],
    },
    {
      no: '03', to: '/mix-master', h: 'Mix & master',
      one: 'Billboard-level sound on your track in five days, built on your references and your idea.',
      pills: ['billboard sound', '5 days', 'your references', 'your idea'],
    },
    {
      no: '04', to: '/production', h: 'Full project',
      one: 'An EP or an album that sounds like one body of work - made together, start to finish.',
      pills: ['3 to 8 tracks', 'full execution', 'teamwork'],
    },
  ];

  return (
    <>
      <section className="hero with-video first" style={{ paddingTop: 'clamp(48px,7vw,80px)' }}>
        <div className="hero-video"><Loop /></div>
        <div className="wrap hero-in">
          <p className="label red">music production &amp; artist development</p>
          <h1>You make the music<em>I build everything around it</em></h1>
          <p className="hero-lead">
            Beats made for your voice. Mixes that sound finished. And the positioning that tells you
            what to do with all of it. Three years with US artists, 150+ tracks.
          </p>
          <div className="hero-cta">
            <Link go={go} to="/apply" className="btn">Book a call</Link>
            <Link go={go} to="/cases" className="btn ghost">Cases</Link>
          </div>
          <div className="hero-meta">
            <span>3 years with US artists</span>
            <span>150+ tracks produced</span>
            <span>One artist at a time</span>
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <div className="sec-head">
            <h2>What I do</h2>
            <p>Four ways in. Same person on all of them.</p>
          </div>
          <div className="tiles">
            {tiles.map((t) => (
              <Link go={go} to={t.to} className="tile" key={t.no}>
                <span className="no">{t.no}</span>
                <h3>{t.h}</h3>
                <p className="one">{t.one}</p>
                <ul>{t.pills.map((p) => <li key={p}>{p}</li>)}</ul>
                <span className="go">Cases →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="sec-head">
            <h2>Produced by me</h2>
            <p>Releases built on production picked around each artist's voice, style and bpm.</p>
          </div>
          <TrackList />
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <div className="sec-head">
            <h2>Who you're working with</h2>
            <p>Two people. No agency, no account manager, no handoff.</p>
          </div>
          <div className="people">
            <div className="person">
              <img src="/media/shile.jpg" alt="Shile" loading="lazy" />
              <div>
                <p className="nm">Shile (Paul)</p>
                <p className="rl">Music Producer &amp; Artist Developer</p>
              </div>
              <p className="bio">
                3 years with US artists · 150+ tracks produced. Beats behind Conway the Machine,
                2feetbino, Lil Dee, Dillon Cooper. Most artists are still here a year in.
              </p>
            </div>
            <div className="person">
              <img src="/media/michael.jpg" alt="Unavenlive" loading="lazy" />
              <div>
                <p className="nm">Unavenlive (Michael)</p>
                <p className="rl">Creative Producer &amp; Strategist</p>
              </div>
              <p className="bio">
                2.5 years in creative production — brands, media, promo strategy. Goes deep on every
                detail of an artist, so the work fits only them.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        go={go}
        title={<>Not sure which one you need?<br /><span className="red">Let's build</span></>}
        note="You want to make music - not just record tracks."
      />
    </>
  );
}

/* ============================================================ CUSTOM PRODUCTION */

export function Production({ go }: Nav) {
  return (
    <>
      <section className="hero first" style={{ paddingTop: 'clamp(48px,7vw,80px)' }}>
        <div className="wrap hero-media">
          <div className="hero-in">
            <p className="label red">02 — Custom production</p>
            <h1>A beat that exists<em>only for you</em></h1>
            <p className="hero-lead">
              Custom means an individual approach to your idea, your reference track, or even just the
              genre you described. I study your discography and pick the key, the tempo and the
              structure so every element fits your voice.
            </p>
            <div className="hero-meta">
              <span>First draft in 2 days</span>
              <span>Unlimited adjustments</span>
              <span>Exclusive rights</span>
            </div>
          </div>
          <figure className="figure">
            <video src="/media/faktura.mp4" poster="/media/faktura-poster.jpg" autoPlay muted loop playsInline aria-hidden="true" style={{ aspectRatio: '9 / 16' }} />
            <figcaption>In the room, mid-session.</figcaption>
          </figure>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <div className="sec-head"><h2>Two ways to work</h2><p>One track, or the whole project.</p></div>
          <div className="tiles">
            <div className="tile" style={{ cursor: 'default' }}>
              <span className="no">01</span>
              <h3>One custom beat</h3>
              <p className="one">You send references and a rough idea. I build the beat from scratch, you get it exclusive with the stems.</p>
              <ul><li>your idea</li><li>from scratch</li><li>only for you</li><li>unlimited adjustments</li></ul>
            </div>
            <div className="tile" style={{ cursor: 'default' }}>
              <span className="no">02</span>
              <h3>Full project</h3>
              <p className="one">3 to 8 tracks that sound like one body of work. Production, mix, master, and the rollout around the release.</p>
              <ul><li>3 to 8 tracks</li><li>full execution</li><li>teamwork</li><li>one sound</li></ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="sec-head"><h2>How a beat gets made</h2><p>Three artists, three completely different starting points.</p></div>
          <CustomCases />
        </div>
      </section>

      <section className="alt">
        <Helix className="helix" style={{ opacity: 0.22 }} camera={30} glow={0.7} intensity={0.7} />
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <div className="sec-head"><h2>How it goes</h2><p>From your first message to the files in your folder.</p></div>
          <div className="guards">
            <div className="guard">
              <span className="g-no">01</span><h3>You send what you like</h3>
              <p>It can be just an idea, or the references you already love. Two or three tracks and a note about what the song should feel like.</p>
            </div>
            <div className="guard">
              <span className="g-no">02</span><h3>First draft in 2 days</h3>
              <p>Not a loop - a real idea. You hear how it sits under your voice and freestyle on it before we go further.</p>
            </div>
            <div className="guard">
              <span className="g-no">03</span><h3>Unlimited adjustments</h3>
              <p>We keep going until it's right. Then we sign the paperwork and everything lands in your folder, stems included.</p>
            </div>
          </div>

          <div className="media-split" style={{ marginTop: 'clamp(48px,5vw,80px)' }}>
            <div>
              <h3 style={{ fontSize: 'clamp(1.4rem,2.6vw,2rem)' }}>Or we make it together, live</h3>
              <p className="grey" style={{ marginTop: 16, fontSize: 'var(--fs-lead)', lineHeight: 1.65, maxWidth: '44ch' }}>
                Jump on a call with me on Discord and we build the beat while you're there. You hear
                every decision, you change it on the spot, and you leave the call with something
                that's already yours.
              </p>
            </div>
            <figure className="figure">
              <video src="/media/back.mp4" poster="/media/back-poster.jpg" autoPlay muted loop playsInline aria-hidden="true" style={{ aspectRatio: '9 / 16' }} />
              <figcaption>Session, 2 a.m.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="sec-head"><h2>What you get</h2><p>Everything listed before you pay.</p></div>
          <div className="gets">
            <div className="get"><p><b>Exclusive rights.</b> The beat is only yours - we sign paperwork so it's clear for both of us, and you're the only holder.</p></div>
            <div className="get"><p><b>Stems and trackouts.</b> So any engineer can work with it later.</p></div>
            <div className="get"><p><b>Unlimited adjustments.</b> Not billed by the hour, not capped at two.</p></div>
            <div className="get"><p><b>The first draft in 2 days.</b> You find out fast whether we're on to something.</p></div>
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <div className="sec-head"><h2>Produced by me</h2><p>Different artists, different lanes, same producer.</p></div>
          <TrackList />
        </div>
      </section>

      <CtaBand
        go={go}
        title={<>Tired of YouTube beats.<br /><span className="red">I want to be unique</span></>}
        label="Ask first"
        price={SERVICES.custom.price}
        buyUrl={SERVICES.custom.url}
        priceNote="First draft in 2 days"
      />
    </>
  );
}

/* ============================================================ MIX & MASTER */

export function MixMaster({ go }: Nav) {
  return (
    <>
      <section className="hero first" style={{ paddingTop: 'clamp(48px,7vw,80px)' }}>
        <div className="wrap hero-media">
          <div className="hero-in">
            <p className="label red">03 — Mix &amp; master</p>
            <h1>From a demo<em>to a track you can release</em></h1>
            <p className="hero-lead">
              You recorded it. It sounds close, but not like the records you play next to it. That gap
              is mixing - and it's the cheapest thing you'll ever fix.
            </p>
            <div className="hero-meta">
              <span>Mix + master</span><span>5 days</span><span>Unlimited revisions</span>
            </div>
          </div>
          <figure className="figure">
            <img src="/media/studio.jpg" alt="Studio" loading="lazy" />
            <figcaption>Where it happens.</figcaption>
          </figure>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <div className="sec-head"><h2>Before / after</h2><p>Same take. Same second of the song. One of them is mixed.</p></div>
          <div className="works">
            {MIXES.map((m) => <Player key={m.t} item={m} labels={['Before', 'After']} />)}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="media-split">
            <div>
              <div className="sec-head" style={{ marginBottom: 'clamp(28px,3vw,40px)' }}><h2>What you get</h2></div>
              <div className="gets" style={{ gridTemplateColumns: '1fr' }}>
                <div className="get"><p><b>Billboard sound.</b> Your track holds up next to the records you're compared to.</p></div>
                <div className="get"><p><b>Mix.</b> Vocals sitting in the beat instead of on top of it.</p></div>
                <div className="get"><p><b>Master.</b> Loud enough for streaming, without squashing the life out of it.</p></div>
                <div className="get"><p><b>Unlimited revisions.</b> We go until it's right. No cap, no hourly billing.</p></div>
              </div>
            </div>
            <figure className="figure">
              <Loop />
              <figcaption>Where the fixing happens.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <CtaBand
        go={go}
        title={<>I want to sound<br /><span className="red">Billboard</span></>}
        label="Send me a song"
        price={SERVICES.mix.price}
        buyUrl={SERVICES.mix.url}
        priceNote="5 days"
      />
    </>
  );
}

/* ============================================================ ARTIST DNA */

export function ArtistDna({ go, onOpen }: Nav) {
  const changes: [string, string][] = [
    ['You sound like three different artists across your songs and your page.', 'One identity. Everywhere.'],
    ["You post and hope somebody out there is the right person.", "You know who you're talking to before you hit record."],
    ['You stare at your phone deciding what to post today.', 'You wake up already knowing.'],
    ['People hear you once and forget you.', 'They remember you after one listen.'],
    ['Your page reads like a hobby.', 'It reads like an artist people put money behind.'],
    ['Every drop starts from zero and dies in three days.', 'Every release builds on the last one.'],
    ['You pay for promo that has nothing to land on.', 'You stop paying for that.'],
  ];
  const parts: [string, string][] = [
    ['Artist Archetype', 'Who you are, in one sentence - so every post sounds like the same person.'],
    ['Archetypes in Action', 'What that actually looks like in real posts. Not theory.'],
    ['Core Message', 'The one thing people should remember after they hear you.'],
    ['Audience', "Who you're really talking to - what they watch, where they are, why they'd care."],
    ['Visual Identity', 'Colors, references, what your page is supposed to look like.'],
    ['Content Rollout', 'What you post, in what order, around a release. Week by week.'],
    ['Tone of Voice', 'How you write captions so it still sounds like you.'],
  ];

  return (
    <>
      <section className="hero first" style={{ paddingTop: 'clamp(48px,7vw,80px)' }}>
        <Helix className="helix" camera={21} glow={0.5} intensity={0.5} />
        <div className="wrap hero-in">
          <p className="label red">01 — Artist DNA</p>
          <h1>Artist DNA<em>tells you what to do after the track is done.</em></h1>
          <p className="hero-lead">
            One written document, built for one artist. Who you are, who your music is for, and what
            happens next - so everything you already pay for finally has something to sit on.
          </p>
          <div className="hero-cta">
            <Link go={go} to="/cases" className="btn ghost">Cases</Link>
          </div>
        </div>
      </section>

      <section className="mirror alt">
        <div className="inner wrap"><h2>sound familiar?</h2></div>
        <Cloud />
        <div className="inner wrap">
          <p className="cloud-cap">
            I didn't write any of this. <b>Artists did</b> — on calls, in DMs, in intake forms.
          </p>
          <div className="loop">
            <i>drop</i><b>→</b><i>30 streams</i><b>→</b>
            <i className="hope">"maybe this one's picking up"</i><b>→</b>
            <i>silence</i><b>→</b>
            <i className="hope last">"the next one will definitely hit"</i><b>↺</b>
          </div>
          <p className="turn">
            None of it was wrong. It just had <u>nothing to sit on.</u>
            <small>You were promoting an artist that wasn't defined yet.</small>
          </p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="stack">
            <p>Most artists work hard.</p>
            <p>Some make good music.</p>
            <p>Some post every day.</p>
            <p>Some run ads.</p>
            <p>Some drop every month.</p>
            <p className="punch">Nobody showed them how any of it connects.</p>
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <div className="sec-head">
            <h2>What changes</h2>
            <p>Not what's in the file. What stops happening to you.</p>
          </div>
          <div className="changes">
            {changes.map(([from, to], i) => (
              <div className="change" key={i}>
                <span className="no">{String(i + 1).padStart(2, '0')}</span>
                <p className="from">{from}</p>
                <p className="to">{to}</p>
              </div>
            ))}
          </div>
          <div className="slab">
            <p className="a">You stop being the artist who records and hopes.</p>
            <p className="b">
              You become the artist who records and <em>knows exactly what happens next.</em>
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="sec-head">
            <h2>What's actually in it</h2>
            <p>A written document. Built for one artist. Nothing recycled.</p>
          </div>
          <div className="split">
            <div className="parts">
              {parts.map(([k, v]) => (
                <div className="part" key={k}>
                  <span className="k">{k}</span>
                  <p className="v">{v}</p>
                </div>
              ))}
            </div>
            <div className="helix-box">
              <Helix className="" style={{ position: 'absolute', inset: 0 }} camera={34} fov={40} glow={1} intensity={1} />
            </div>
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <div className="sec-head">
            <h2>Artist DNA cases</h2>
            <p>Talented. Stuck. Guessing. Click any of them for the full story.</p>
          </div>
          <CaseGrid onOpen={onOpen!} />
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="sec-head">
            <h2>What protects you</h2>
            <p>Three things, before you pay anything.</p>
          </div>
          <div className="guards">
            <div className="guard"><span className="g-no">01</span><h3>A contract</h3><p>Both names, every deliverable listed. You see exactly what you're getting before anything moves.</p></div>
            <div className="guard"><span className="g-no">02</span><h3>Five days</h3><p>From the intake form to the finished file. Then a call where we walk through it until every piece clicks.</p></div>
            <div className="guard"><span className="g-no">03</span><h3>An honest no</h3><p>If your problem isn't positioning, I'll tell you on the call and we're done. I don't want the money for the wrong thing.</p></div>
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="wrap cta-band">
          <h2>Let's find out<br /><span className="red">who you are</span></h2>
          <div className="buy-row">
            {SERVICES.dna.price && (
              <div className="buy-price">
                {SERVICES.dna.price}
                <small>6 days, then a call</small>
              </div>
            )}
            <a className="btn big" href={SERVICES.dna.url} target="_blank" rel="noopener noreferrer">
              Buy on BeatStars
            </a>
            <Link go={go} to="/apply" className="btn big ghost">Book a call</Link>
          </div>
        </div>
      </section>
    </>
  );
}


/* ============================================================ BLIND SPOT */

export function BlindSpot({ go }: Nav) {
  const steps: [string, string][] = [
    ['Your pages', "What someone understands about you in the first 5 seconds, and where you're losing people before they ever press play."],
    ['Your last records', "I open them and listen out loud. How the vocal sits, where it's getting buried, whether the beats you're picking suit your voice."],
    ['What to do next', 'Three specific things to change on your next release. Not "build your brand" - three things you can do this week.'],
  ];

  return (
    <>
      <section className="hero first" style={{ paddingTop: 'clamp(48px,7vw,80px)' }}>
        <div className="wrap hero-media">
          <div className="hero-in">
            <p className="label red">04 — Blind spot</p>
            <h1>The part you can't see<em>from inside your own project</em></h1>
            <p className="hero-lead">
              You're too close to your own thing to see it the way a stranger does. This is me
              looking at it from the outside and telling you what I actually see.
            </p>
            <div className="hero-meta">
              <span>10 minutes</span><span>Back in 2 days</span><span>No call</span>
            </div>
          </div>
          <figure className="figure">
            <img src="/media/studio.jpg" alt="Studio" loading="lazy" />
            <figcaption>Where it gets recorded.</figcaption>
          </figure>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <div className="sec-head">
            <h2>What I go through</h2>
            <p>One video, recorded in one take, yours to keep.</p>
          </div>
          <div className="guards">
            {steps.map(([h, p2], i) => (
              <div className="guard" key={h}>
                <span className="g-no">{String(i + 1).padStart(2, '0')}</span>
                <h3>{h}</h3>
                <p>{p2}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="sec-head">
            <h2>What artists said after</h2>
            <p>Their words, straight out of the DMs.</p>
          </div>
          <div className="bs-quotes">
            {BLIND_QUOTES.map((q) => (
              <blockquote className="bs-q" key={q}><p>{q}</p></blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <div className="sec-head"><h2>How it works</h2><p>From payment to the video link.</p></div>
          <div className="guards">
            <div className="guard"><span className="g-no">01</span><h3>You pay</h3><p>Then message me on Instagram @shileforyou and tell me the email you paid from.</p></div>
            <div className="guard"><span className="g-no">02</span><h3>You send links</h3><p>Your profiles and your latest tracks, plus any questions you want answered.</p></div>
            <div className="guard"><span className="g-no">03</span><h3>You get the video</h3><p>Ten minutes, back with you within 2 days. No call, nothing to schedule.</p></div>
          </div>
        </div>
      </section>

      <CtaBand
        go={go}
        title={<>Show me what<br /><span className="red">I can't see</span></>}
        label="Ask first"
        price={SERVICES.blind.price}
        buyUrl={SERVICES.blind.url}
        priceNote="One video, yours to keep"
      />
    </>
  );
}

/* ============================================================ CASES */

export function CasesPage({ go, onOpen }: Nav) {
  return (
    <>
      <section className="first" style={{ paddingTop: 'clamp(56px,7vw,96px)' }}>
        <div className="wrap">
          <div className="sec-head">
            <h2>Artist DNA cases</h2>
            <p>Talented. Stuck. Guessing. Click any of them for the full story.</p>
          </div>
          <CaseGrid onOpen={onOpen!} />
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <div className="sec-head"><h2>Custom production cases</h2><p>Their idea, in their words - and what came out of it.</p></div>
          <CustomCases />
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="sec-head"><h2>Produced by me</h2><p>Different artists, different lanes, same producer.</p></div>
          <TrackList />
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <div className="sec-head"><h2>Mix &amp; master cases</h2><p>Same take. Same second of the song. One of them is mixed.</p></div>
          <div className="works">
            {MIXES.map((m) => <Player key={m.t} item={m} labels={['Before', 'After']} />)}
          </div>
        </div>
      </section>

      <CtaBand go={go} title={<>Want to be<br /><span className="red">the next one?</span></>} />
    </>
  );
}

/* ============================================================ APPLY */

export function Apply(_: Nav) {
  return (
    <>
      <section className="first" style={{ paddingTop: 'clamp(56px,7vw,96px)', overflow: 'hidden' }}>
        <Helix className="helix" style={{ opacity: 0.28 }} camera={30} glow={0.7} intensity={0.7} />
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <div className="split">
            <div>
              <p className="label red">Book a call</p>
              <h2 style={{ marginTop: 16 }}>Let's find<br /><span className="red">your direction</span></h2>
              <p className="grey" style={{ fontSize: 'var(--fs-lead)', lineHeight: 1.6, maxWidth: '42ch', marginTop: 24 }}>
                We'll talk about where you are right now - your point A - and where you want to be.
                Then we find the simplest, most effective way to get you there.
              </p>
              <div className="steps">
                <div className="step"><span className="n">01</span><p><b>You fill out this form.</b> Takes a minute.</p></div>
                <div className="step"><span className="n">02</span><p><b>I tell you what you can already fix</b> - the mistakes I can see right away.</p></div>
                <div className="step"><span className="n">03</span><p><b>We get on a call.</b></p></div>
              </div>
            </div>
            <ApplyForm />
          </div>
        </div>
      </section>
    </>
  );
}

/* ============================================================ PACK
   Funnel landing for the Instagram comment -> DM -> form flow.
   Not in NAV on purpose: entry point for one campaign, not a site section.
   Text leads, photos follow - the artist reads who this is from before
   the visuals. Video lives behind the form panel only, dimmed. */

export function Pack(_: Nav) {
  return (
    <section className="first" style={{ paddingTop: 'clamp(48px,6vw,84px)' }}>
      <div className="wrap">
        <div className="split">
          <div>
            <p className="pack-nm">Shile (Paul)</p>
            <p className="pack-rl">Music producer</p>

            <h2 style={{ marginTop: 18 }}>5 melodic<br /><span className="red">trap beats</span></h2>

            <div className="pack-story">
              <p>
                Three years at this full time, mostly with independent artists in the
                US and UK. 150+ tracks out.
              </p>
              <p>
                I got into it because of what music did to me first - the right track
                drops you back into a moment ten years later. That's still what I'm
                after every time I open a session.
              </p>
            </div>

            <div className="pack-shot">
              <img src="/media/shile-studio-2.jpg" alt="Shile in the studio" />
            </div>

            <div className="pack-story">
              <p>
                These five came out of the same run. One mood, arrangements left open,
                space kept for a voice on top.
              </p>
              <p><b>Fill in your name and email and the pack is yours - it lands straight in your inbox.</b></p>
            </div>
          </div>

          <div className="pack-formwrap">
            <div className="pack-formvid">
              <video src="/media/back.mp4" poster="/media/back-poster.jpg" autoPlay muted loop playsInline aria-hidden="true" />
            </div>
            <div className="pack-forminner">
              <PackForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
