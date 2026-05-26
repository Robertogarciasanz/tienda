import { useState, useCallback } from 'react';
import { TypewriterText } from '@/components/TypewriterText';
import { ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  onScrollToViewer: () => void;
  onScrollToServices: () => void;
}

export function HeroSection({ onScrollToViewer, onScrollToServices }: HeroSectionProps) {
  const [dimRemoved, setDimRemoved] = useState(false);

  const handleTypewriterComplete = useCallback(() => {
    setDimRemoved(true);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Dim overlay */}
      <div
        className="absolute inset-0 bg-black transition-opacity duration-[600ms] ease-linear pointer-events-none"
        style={{ opacity: dimRemoved ? 0.55 : 0.85 }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[900px] mx-auto px-6 text-center">
        {/* Eyebrow */}
        <p className="eyebrow mb-6">
          IMPRESION 3D INDUSTRIAL
        </p>

        {/* Headline with typewriter effect */}
        <h1 className="font-display font-extrabold text-[clamp(48px,8vw,120px)] leading-[0.9] tracking-[-0.03em] text-[#F5F5F5]">
          <TypewriterText
            text="Materializa\ntus disenos"
            speed={75}
            onComplete={handleTypewriterComplete}
          />
        </h1>

        {/* Subheadline */}
        <p className="mt-8 mx-auto max-w-[560px] text-lg font-normal leading-relaxed text-[#7A7A7A]">
          Prototipado rapido, manufactura aditiva y acabados profesionales para tus proyectos.
          Cotiza en minutos, recibe en dias.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
          <button
            onClick={onScrollToViewer}
            className="px-8 py-3.5 bg-amber text-[#1A1A1A] rounded-lg font-body text-base font-semibold tracking-[0.02em] hover:bg-amber-hover transition-colors duration-200"
          >
            Subir modelo STL
          </button>
          <button
            onClick={onScrollToServices}
            className="px-8 py-3.5 bg-transparent border border-white/20 text-[#F5F5F5] rounded-lg font-body text-base font-semibold tracking-[0.02em] hover:border-white/40 transition-colors duration-200"
          >
            Ver servicios
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <ChevronDown
          size={24}
          className="text-[#4D4D4D] animate-bounce-down"
        />
      </div>
    </section>
  );
}
