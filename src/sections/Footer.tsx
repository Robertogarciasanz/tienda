import { Instagram, Linkedin } from 'lucide-react';

const serviceLinks = ['Prototipado', 'Produccion Serie', 'Miniaturas', 'Consultoria'];
const materialLinks = ['PLA', 'ABS', 'PETG', 'Resina', 'Nylon', 'TPU'];
const companyLinks = ['Sobre nosotros', 'Contacto', 'FAQ', 'Blog'];

export function Footer() {
  return (
    <footer id="footer" className="bg-black border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 pt-16 pb-8">
        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12">
          {/* Services */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.08em] text-[#4D4D4D] mb-4">
              Servicios
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link}>
                  <span className="text-sm font-normal text-[#7A7A7A] hover:text-[#F5F5F5] transition-colors cursor-pointer">
                    {link}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Materials */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.08em] text-[#4D4D4D] mb-4">
              Materiales
            </h4>
            <ul className="space-y-2.5">
              {materialLinks.map((link) => (
                <li key={link}>
                  <span className="text-sm font-normal text-[#7A7A7A] hover:text-[#F5F5F5] transition-colors cursor-pointer">
                    {link}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.08em] text-[#4D4D4D] mb-4">
              Empresa
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link}>
                  <span className="text-sm font-normal text-[#7A7A7A] hover:text-[#F5F5F5] transition-colors cursor-pointer">
                    {link}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-white/[0.06]">
          <span className="font-display text-base font-bold text-[#F5F5F5]">
            SoluPrinter 3D
          </span>
          <span className="text-[13px] font-normal text-[#4D4D4D]">
            &copy; 2025 SoluPrinter. Todos los derechos reservados.
          </span>
          <div className="flex items-center gap-4">
            <span className="text-[#4D4D4D] hover:text-[#F5F5F5] transition-colors cursor-pointer">
              <Instagram size={20} />
            </span>
            <span className="text-[#4D4D4D] hover:text-[#F5F5F5] transition-colors cursor-pointer">
              <Linkedin size={20} />
            </span>
            <span className="text-[#4D4D4D] hover:text-[#F5F5F5] transition-colors cursor-pointer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
