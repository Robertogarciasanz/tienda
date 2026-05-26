import { useState, useEffect } from 'react';

interface NavigationProps {
  onScrollTo: (id: string) => void;
}

const navLinks = [
  { label: 'Servicios', target: 'capabilities' },
  { label: 'Materiales', target: 'capabilities' },
  { label: 'Catalogo', target: 'viewer' },
  { label: 'Contacto', target: 'footer' },
];

export function Navigation({ onScrollTo }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);

      // Determine active section
      const sections = ['viewer', 'capabilities', 'cta', 'footer'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-[1000] h-[80px] flex items-center
        transition-all duration-200 ease-out
        ${scrolled
          ? 'bg-black/95 shadow-[0_1px_0_rgba(255,255,255,0.06)]'
          : 'bg-black/60'
        }
      `}
      style={{ backdropFilter: 'blur(12px)' }}
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-display text-2xl font-extrabold text-[#F5F5F5] tracking-[-0.02em] hover:text-amber transition-colors"
        >
          SoluPrinter
        </button>

        {/* Nav links - desktop only */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, target }) => (
            <button
              key={label}
              onClick={() => onScrollTo(target)}
              className={`
                relative font-body text-base font-medium pb-1
                transition-colors duration-200
                ${activeSection === target
                  ? 'text-[#F5F5F5] border-b-2 border-amber'
                  : 'text-[#7A7A7A] hover:text-[#F5F5F5] border-b-2 border-transparent hover:border-amber/50'
                }
              `}
            >
              {label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => onScrollTo('viewer')}
          className="px-6 py-2.5 bg-amber text-[#1A1A1A] rounded-md font-body text-base font-semibold tracking-[0.02em] hover:bg-amber-hover transition-colors duration-200"
        >
          Cotizar proyecto
        </button>
      </div>
    </nav>
  );
}
