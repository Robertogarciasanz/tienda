import { useCallback } from 'react';
import { Navigation } from '@/sections/Navigation';
import { STLViewerSection } from '@/sections/STLViewerSection';
import { CapabilitiesSection } from '@/sections/CapabilitiesSection';
import { CTASection } from '@/sections/CTASection';
import { Footer } from '@/sections/Footer';

function App() {
  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80; // nav height
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      <Navigation onScrollTo={scrollTo} />
      <STLViewerSection />
      <CapabilitiesSection />
      <CTASection onScrollToViewer={() => scrollTo('viewer')} />
      <Footer />
    </div>
  );
}

export default App;
