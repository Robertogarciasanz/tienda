import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ArrowRight } from 'lucide-react';

interface FeatureCardProps {
  image: string;
  title: string;
  description: string;
  index: number;
}

export function FeatureCard({ image, title, description, index }: FeatureCardProps) {
  const { ref, imageRef, overlayRef, textRef } = useScrollReveal<HTMLDivElement>({
    threshold: 0.8,
    staggerIndex: index,
  });

  return (
    <div ref={ref} className="group">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-dark-secondary">
        <div
          ref={imageRef}
          className="absolute inset-0 transition-transform duration-100 ease-linear will-change-transform"
          style={{ transform: 'scale(1.2)' }}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black pointer-events-none"
          style={{ opacity: 0.7 }}
        />
      </div>
      <div
        ref={textRef}
        className="mt-5 transition-all duration-[600ms] ease-out"
        style={{
          transform: 'translateY(30px)',
          opacity: 0,
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <h3 className="text-xl font-semibold text-[#F5F5F5]">{title}</h3>
        <p className="mt-2 text-[15px] font-normal leading-relaxed text-[#7A7A7A]">
          {description}
        </p>
        <button className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-amber hover:underline transition-all">
          Saber mas <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
