const serviceLinks = ['Prototipado', 'Produccion Serie', 'Miniaturas', 'Consultoria'];
const materialLinks = ['PLA', 'ABS', 'PETG', 'Resina', 'Nylon', 'TPU'];

export function Footer() {
  return (
    <footer id="footer" className="bg-black border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 pt-16 pb-8">
        {/* Columns */}
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

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.08em] text-[#4D4D4D] mb-4">
              Contacto
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="tel:+34607444903" className="text-sm text-[#7A7A7A] hover:text-[#F5F5F5] transition-colors">
                  607 444 903
                </a>
              </li>
              <li>
                <a href="mailto:excavacionesart@gmail.com" className="text-sm text-[#7A7A7A] hover:text-[#F5F5F5] transition-colors">
                  excavacionesart@gmail.com
                </a>
              </li>
              <li>
                <span className="text-sm text-[#7A7A7A]">
                  Calle Manzano, 2<br />
                  Tudela de Duero, 47320<br />
                  Valladolid
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-white/[0.06]">
          <span className="font-display text-base font-bold text-[#F5F5F5]">
            SoluPrinter 3D
          </span>
          <span className="text-[13px] font-normal text-[#4D4D4D]">
            &copy; 2026 Excavaciones y Servicios Arturo S.L. Todos los derechos reservados.
          </span>
        </div>
      </div>
    </footer>
  );
}
