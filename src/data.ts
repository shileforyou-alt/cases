// Releases - titles, artists and covers as they appear on Spotify.
export const TRACKS = [
  {
    t: "EXPENSES", a: "Http//:riri", cover: "/media/covers/sp_expenses.jpg",
    n: [["150K", "streams"]], url: "https://open.spotify.com/track/5Pgke4Mp6AusEyLHfX9jKh"
  },
  {
    t: "SUIC!DAL", a: "Http//:riri", cover: "/media/covers/sp_suicidal.jpg",
    n: [["50K", "streams"]], url: "https://open.spotify.com/track/5itEQ0dgLxitsLZ6gHIf0N"
  },
  {
    t: "Angie", a: "OnetakeCarter, Akeem Ali", cover: "/media/covers/sp_angie.jpg",
    n: [["250K", "reels"], ["50K", "streams"]], url: "https://open.spotify.com/track/4dSuc5q2zMcHAFiw1aGGCT"
  },
  {
    t: "Things I've Seen", a: "Maximum", cover: "/media/covers/sp_things.jpg",
    n: [["104K", "video"], ["30K", "streams"]], url: "https://open.spotify.com/track/3xmkPaN29xPdhBqDVTP2DU"
  },
  {
    t: "Bantics", a: "Http//:riri", cover: "/media/covers/sp_bantics.jpg",
    n: [["50K", "streams"]], url: "https://open.spotify.com/track/2WRsMijgmI1pcsd9xuDfg6"
  },
  {
    t: "Real Rap Raw", a: "Cargo Qell, Dillon Cooper, Danny James (Lil Dee)", cover: "/media/covers/sp_realrapraw.jpg",
    n: [["50K", "streams"]], url: "https://open.spotify.com/track/17Id5CBJvpd4jr2coluKAo"
  },
  {
    t: "Jesus on My Neck", a: "Kryptic Shaman, Conway the Machine", cover: "/media/covers/sp_jesus.jpg",
    n: [], url: "https://open.spotify.com/track/7xlx9oLxoIYCjVMbIx9GWi"
  }
];

// Mix & master - the same seconds of the same take, before and after.
export const MIXES = [
  { t: "Example 01", g: "hip-hop", a: "/media/audio/mix/3s-before.m4a",   b: "/media/audio/mix/3s-after.m4a" },
  { t: "Example 02", g: "trap",    a: "/media/audio/mix/plug-before.m4a", b: "/media/audio/mix/plug-after.m4a" },
  { t: "Example 03", g: "rap",     a: "/media/audio/mix/hm-before.m4a",   b: "/media/audio/mix/hm-after.m4a" },
  { t: "Example 04", g: "melodic", a: "/media/audio/mix/p-before.m4a",    b: "/media/audio/mix/p-after.m4a" }
];

// Custom production - the artist's ask, then what came out of it.
export const CUSTOM = [
  {
    t: "Blazy Eye", g: "built for the voice",
    ask: "The beat he'd recorded on had already been sold on YouTube - but he loved the track so much he wanted something like it anyway. So he came to me: redo it, keep the idea, but make it mine and make it his. Not a copy - the same idea taken somewhere new.",
    did: "The version he liked was hard: kicks slamming, bass slamming, no room. His voice needed framing, not competition. So I extracted his vocal and started over from a vocal sample - a melody I played in myself on synths - then worked that sample into something softer, smoother, catchier. The drums came last, built to give him space and still knock.",
    a: "/media/audio/custom/blazy-idea.m4a", b: "/media/audio/custom/blazy-result.m4a"
  },
  {
    t: "Abantu", g: "sample flip",
    ask: "He'd fallen for a sample and the idea inside it. He wanted a track built out of that - simple, clear, with soul, something that feels epic and doesn't sound like anybody else's production. Style you can hear, and a piano part kept as plain as possible.",
    did: "He gave me pieces: the sample, the bongos, an idea for a bassline. I found the loop inside his sample and built around it so it wouldn't land as just another trap drum pattern - something fresher and catchier than that. Then I put his parts together, added a few ideas of my own that fit his voice, and it became one picture instead of a folder of parts.",
    a: "/media/audio/custom/abantu-idea.m4a", b: "/media/audio/custom/abantu-result.m4a"
  },
  {
    t: "Push", g: "built around the vocal",
    ask: "He had a reference he was in love with. He wanted something in that world - but not a copy of it. Built around him instead: his voice, his tempo, his key. As original as possible, his words.",
    did: "I listened to the reference and heard why it worked: it's simple, it knocks, and it leaves the vocal room to do the work. So I didn't load it up. I kept the core bass idea and the core melody and rebuilt both around his voice, remade the bass and reworked the drums so they move together instead of sounding separate. He said the bass was still too open - I made it simpler again, until the groove was the thing you feel. We went through six drafts over two or three weeks. He wanted it perfect. He got it.",
    a: "/media/audio/custom/bronx-idea.m4a", b: "/media/audio/custom/bronx-result.m4a"
  }
];

export const CASES = [
  {
    id: "eli",
    name: "Eli",
    handle: "elitheentity",
    genre: "boom bap",
    hook: "I remembered I'm an artist again.",
    before: "Finished tape, good sound, no idea what to do with it. Posting felt like becoming a content creator instead of an artist.",
    after: "Remembered he's an artist. Knows what to show and in what order leading into the release.",
    image: "/cases/eli.jpg",
    coverAspect: "1/1",
    heroAspect: "1/1",
    oldFeedAspect: "4/3",
    oldFeedImage: "/media/dm-eli-2.jpg",
    dnaAspect: "3/4",
    dnaImage: "/media/dm-eli.jpg",
    story: {
      soundFamiliar: "You know how to make the music. But the second a track's done, you freeze - push it? Ads? Playlists? You post the cover to your story, blast it to your followers, and nothing really moves. And every time you sit down to make \"content,\" it feels like you're turning into a content creator instead of an artist - so part of you resists it.",
      whereTheyWere: "Boom bap, ~900 followers, deep into preparing his first real album - a personal one. The talent was there. But it was foggy: no idea what to do with a finished track, posting felt like a betrayal of being an artist, building something big off pure instinct with no map for how to present it or who it was even for.",
      whatWeDid: [
        "Deep intake - a 15–20 question form, then voice notes and calls.",
        "Studied his lane - what actually works in boom bap, then bent it around his voice.",
        "Built his Artist DNA - two archetypes (Hero + Seeker), core message, audience, visual language, a phase-by-phase rollout around the release.",
        "Produced half his debut album with him. Full file in 5 days, then walked through it on a call until every piece clicked."
      ],
      whereTheyAreNow: [
        "He remembered he's an artist - not a content machine.",
        "He got a spine - knows what to show, in what order, leading into the release.",
        "He stopped scattering - chose to prepare the album properly instead of rushing."
      ],
      quote: "\"Your insight gave me more structure in how to present content… it truly has helped me more than you know, and I know this will elevate any artist that feels they need guidance and structure.\"",
      quoteAuthor: "- Eli, elitheentity"
    }
  },
  {
    id: "princeton",
    name: "Princeton",
    handle: "Pricetonmusica",
    genre: "melodic trap / R&B",
    hook: "He almost passed because of budget. Now he's glad he didn't.",
    before: "Money in, nothing moving. Chasing ten directions at once and getting thin on all of them.",
    after: "Focused on the few that are actually him. The money question stopped being scary.",
    image: "/cases/princeton.jpg",
    coverAspect: "1/1",
    heroAspect: "1/1",
    dnaAspect: "3/4",
    dnaImage: "/media/dm-princeton.jpg",
    feedbackVideo: "/media/princeton-feedback.mp4",
    feedbackPoster: "/media/princeton-feedback-poster.jpg",
    story: {
      soundFamiliar: "Making music costs money - beats, mixing, mastering, maybe a little ad spend. You put it all in, drop the track, and watch the numbers barely move. Do that a few times and it starts to feel like you're pouring money into a void. So when someone says \"you need positioning,\" part of you thinks: with what money?",
      whereTheyWere: "Melodic trap and R&B, ~2,200 followers. The talent is real - the kind of voice that fills a beat. But he was stuck in the loop: spending on his music, seeing minimal return, feeling like it was money into a void. His hesitation was honest, and it was about budget.",
      whatWeDid: [
        "Deep intake - questions, voice notes, a call.",
        "Studied his lane - melodic trap and R&B, small artists and the ones who broke through.",
        "Built his Artist DNA - archetypes Hero + Ruler, core message \"You play to win,\" audience, visual identity, and a focused set of formats instead of chasing everything at once.",
        "Produced a beat for him - REVIVAL."
      ],
      whereTheyAreNow: [
        "The money question stopped being scary - he had a plan for it instead of a guess.",
        "The motivation came back.",
        "He stopped spreading thin - focused on the few directions that are actually him."
      ],
      quote: "\"The DNA has helped me focus more on a couple of tropes rather than going after 10 of them and wearing myself thin.\"",
      quoteAuthor: "- Princeton, Pricetonmusica"
    }
  },
  {
    id: "kendal",
    name: "Kendal",
    handle: "k.o.g_30z",
    genre: "boom bap",
    hook: "I was confused how to even format my own songs.",
    before: "Had the songs. No framework to format them or present them. So the project just sat there.",
    after: "A format to build every release on. The 4-track EP got finished.",
    image: "/cases/kog.jpg",
    coverAspect: "1/1",
    heroAspect: "1/1",
    dnaAspect: "3/4",
    dnaImage: "/media/dm-kendal.jpg",
    story: {
      soundFamiliar: "You've got songs - maybe a whole project's worth. But when you sit down to actually put it together, it all turns to fog: how do you format the songs, what order, what ties them together, how do you present it so it lands? You know you're good. You just can't see the shape of it. So it sits.",
      whereTheyWere: "Boom bap in the Nas / Joey Badass / Big L lineage - dense wordplay, ~3,000 followers. The craft is undeniable. But he had the music and no framework to format it or present it. When I offered positioning, there was zero hesitation - he said it was exactly what he needed.",
      whatWeDid: [
        "Deep intake - questions, voice notes, calls.",
        "Studied his lane - boom bap, small and mainstream.",
        "Built his Artist DNA - archetypes Sage + Outlaw, positioning (\"you don't know what you're going to get\"), audience, visual world, tone of voice.",
        "Fully produced his 4-track EP - mix and master included."
      ],
      whereTheyAreNow: [
        "The fog cleared - a real format to build his music on.",
        "Decisions got faster - time stopped leaking.",
        "The EP got finished - with a clear identity behind every track instead of a pile of loose songs."
      ],
      quote: "\"What changed for me in Artist DNA is now actually having a format to base my music off of, and not be confused on how to format my songs or album. This will also help with time management.\"",
      quoteAuthor: "- Kendal Gibbs, k.o.g_30z"
    }
  }
];

// Phrases artists actually used - the drifting cloud in "sound familiar?".
export const TRIED = [
  ["playlist submissions", "IG ads", "$50 promo services", "posting every day", "buying followers", "SubmitHub"],
  ["\"just make better music\"", "blog submissions", "TikTok trends", "cold DMs to labels", "pre-save campaigns", "new cover art"],
  ["no system", "no discipline", "burned out on my own release", "putting off outreach", "too many ideas at once"],
  ["collabs for reach", "dropping every month", "hashtag research", "boosting a post", "Distrokid promo", "paying a \"manager\""],
  ["I sound like three different artists", "I don't know who this is for", "my page looks like a hobby", "nobody's listening"],
  ["I'll post tomorrow", "I'll start when the project's done", "deleted the post", "started a new account", "waiting to feel ready"],
  ["three days of streams, then silence", "money in, nothing moves", "the next one will hit", "I'm good and it doesn't matter"],
  ["posting feels fake", "scared to look thirsty", "comparing myself to everyone", "lost the reason I started"],
  ["recorded it, then froze", "what do I even post", "does any of this connect", "\"I'll figure it out after the drop\""]
];
