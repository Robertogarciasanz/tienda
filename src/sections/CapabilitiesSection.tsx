import { FeatureCard } from '@/components/FeatureCard';

const features = [
  {
    image: '/images/feature-1.jpg',
    title: 'Prototipado Rapido',
    description:
      'Itera tus disenos en horas, no dias. Ideal para validacion de formas, ensamblajes y pruebas de concepto.',
  },
  {
    image: '/images/feature-2.jpg',
    title: 'Produccion en Serie',
    description:
      'Manufactura aditiva a escala. De 10 a 10,000 unidades con tolerancias precisas y acabados consistentes.',
  },
  {
    image: '/images/feature-3.jpg',
    title: 'Miniaturas de Alta Precision',
    description:
      'Detalles impresionantes en resina. Perfecto para modelismo, joyeria y piezas con geometria compleja.',
  },
  {
    image: '/images/feature-4.jpg',
    title: 'Consultoria de Materiales',
    description:
      'Seleccionamos el material optimo para tu aplicacion: PLA, ABS, PETG, resina, nylon, TPU y mas.',
  },
];

export function CapabilitiesSection() {
  return (
    <section id="capabilities" className="bg-[#1A1A1A] py-[120px]">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Heading block */}
        <div className="mb-16">
          <p className="eyebrow mb-4">SERVICIOS</p>
          <h2 className="section-heading">
            De tu pantalla<br />a la realidad
          </h2>
          <p className="body-text max-w-[560px] mt-5">
            Ofrecemos soluciones integrales de impresion 3D para profesionales,
            empresas y entusiastas. Desde prototipos funcionales hasta produccion en serie.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              image={feature.image}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
