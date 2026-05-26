interface CTASectionProps {
  onScrollToViewer: () => void;
}

export function CTASection({ onScrollToViewer }: CTASectionProps) {
  return (
    <section id="cta" className="bg-dark-secondary py-24">
      <div className="max-w-[700px] mx-auto px-6 text-center">
        <h2 className="font-display font-bold text-[clamp(32px,4vw,56px)] leading-tight tracking-[-0.02em] text-[#F5F5F5]">
          Listo para imprimir?
        </h2>
        <p className="mt-4 text-lg font-normal leading-relaxed text-[#7A7A7A]">
          Sube tu modelo, selecciona el material y recibe una cotizacion al instante.
          Sin compromiso.
        </p>
        <button
          onClick={onScrollToViewer}
          className="
            mt-8 px-10 py-4 bg-amber text-[#1A1A1A] rounded-lg
            font-body text-lg font-semibold tracking-[0.02em]
            hover:bg-amber-hover hover:-translate-y-0.5
            hover:shadow-[0_8px_24px_rgba(229,160,68,0.25)]
            transition-all duration-200 ease-out
          "
        >
          Comenzar proyecto
        </button>
      </div>
    </section>
  );
}
