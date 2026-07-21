import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Placeholder } from './Placeholder';

interface CaseProps {
  data: any;
  onClose: () => void;
}

export function CaseModal({ data, onClose }: CaseProps) {
  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        layoutId={`case-${data.id}-container`}
        className="w-full max-w-4xl bg-[#0a0a0a] min-h-screen md:min-h-0 md:h-auto my-auto relative border border-[#222]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="sticky top-4 left-full -ml-12 md:absolute md:top-6 md:right-6 w-10 h-10 bg-black/50 hover:bg-shile-red transition-colors flex items-center justify-center text-white z-20 border border-[#333]"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col h-full max-h-screen md:max-h-[85vh] overflow-y-auto grain">
          {/* Header */}
          <div className="p-8 md:p-16 pb-0">
            <motion.h2 
              layoutId={`case-${data.id}-hook`}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 uppercase tracking-wide text-white"
            >
              {data.hook}
            </motion.h2>
            <motion.p 
              layoutId={`case-${data.id}-tag`}
              className="text-shile-red text-sm uppercase tracking-widest font-semibold mb-12"
            >
              {data.name} · {data.genre}
            </motion.p>
          </div>

          {/* Hero Image */}
          <div className="px-8 md:px-16 mb-16">
            {data.image ? (
              <div className="w-full relative bg-[#111] border border-white/5 p-2 md:p-4">
                <img src={data.image} alt={data.name} className="w-full object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700" style={{ aspectRatio: data.heroAspect.replace('/', ' / ') }} />
              </div>
            ) : (
              <Placeholder label={`Hero Visual: ${data.name}`} aspectRatio={data.heroAspect} />
            )}
          </div>

          {/* Body Content */}
          <div className="px-8 md:px-16 pb-16 space-y-16">
            
            {/* Sound Familiar */}
            <div>
              <h3 className="font-display text-2xl uppercase font-semibold mb-4 text-white">Sound familiar?</h3>
              <p className="text-shile-grey text-lg leading-relaxed max-w-3xl">
                {data.story.soundFamiliar}
              </p>
            </div>

            {/* Where they were */}
            <div>
              <h3 className="font-display text-2xl uppercase font-semibold mb-4 text-white">Where {data.name} was</h3>
              <p className="text-shile-grey text-lg leading-relaxed max-w-3xl">
                {data.story.whereTheyWere}
              </p>
            </div>

            {/* Old Feed Image */}
            {data.oldFeedAspect && (
              data.oldFeedImage ? (
                <div className="w-full relative bg-[#111] border border-white/5 p-2 md:p-4 mb-16">
                  <img src={data.oldFeedImage} alt="Old Feed / Point A" className="w-full object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700" style={{ aspectRatio: data.oldFeedAspect.replace('/', ' / ') }} />
                </div>
              ) : (
                <Placeholder label={`Old Feed / Point A`} aspectRatio={data.oldFeedAspect} className="mb-16" />
              )
            )}

            {/* What we did */}
            <div>
              <h3 className="font-display text-2xl uppercase font-semibold mb-6 text-white">What we did</h3>
              <ul className="space-y-4 max-w-3xl">
                {data.story.whatWeDid.map((item: string, i: number) => (
                  <li key={i} className="flex items-start text-shile-grey text-lg">
                    <span className="text-shile-red mr-4 mt-1.5 opacity-80">■</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* DNA Document Image */}
            <div className="my-16">
              {data.dnaImage ? (
                <div className="max-w-xl relative bg-[#111] border border-white/5 p-2 md:p-4">
                  <img src={data.dnaImage} alt="Artist DNA Preview" className="w-full object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700" style={{ aspectRatio: data.dnaAspect.replace('/', ' / ') }} />
                </div>
              ) : (
                <Placeholder label={`Artist DNA Preview`} aspectRatio={data.dnaAspect} className="max-w-xl" />
              )}
            </div>

            {/* Where they are now */}
            <div>
              <h3 className="font-display text-2xl uppercase font-semibold mb-6 text-white">Where {data.name} is now</h3>
              <ul className="space-y-4 max-w-3xl">
                {data.story.whereTheyAreNow.map((item: string, i: number) => (
                  <li key={i} className="flex items-start text-shile-grey text-lg">
                    <span className="text-shile-red mr-4 mt-1.5 opacity-80">■</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quote */}
            <div className="pt-8 border-t border-[#222]">
              <p className="font-display text-3xl md:text-4xl text-shile-red font-medium leading-tight mb-6">
                {data.story.quote}
              </p>
              <p className="text-white text-lg tracking-wide">
                {data.story.quoteAuthor}
              </p>
            </div>

            {/* CTA */}
            <div className="pt-8">
              <a 
                href="#apply"
                onClick={onClose}
                className="inline-block bg-shile-red text-white font-semibold text-lg px-8 py-4 uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
              >
                Apply for a strategy call
              </a>
            </div>

          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
