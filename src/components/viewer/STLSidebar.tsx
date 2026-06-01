import { Clock } from 'lucide-react';
import type { ModelStats } from '@/types';

interface STLSidebarProps {
  fileName: string;
  fileSize: number;
  stats: ModelStats | null;
  isSample: boolean;
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export function STLSidebar({ fileName, fileSize, stats, isSample }: STLSidebarProps) {
  const displayName = isSample ? 'Cubo de calibracion (muestra)' : fileName;
  const displaySize = isSample ? '—' : formatFileSize(fileSize);

  return (
    <div className="w-[280px] bg-dark-secondary border-l border-white/[0.06] flex-shrink-0 overflow-y-auto">
      <div className="p-8">
        {/* Model Info */}
        <div>
          <h4 className="caption-label mb-4">INFORMACION DEL MODELO</h4>
          <p className="text-sm font-medium text-[#F5F5F5] truncate" title={displayName}>
            {displayName}
          </p>
          <p className="text-[13px] text-[#7A7A7A] mt-1">{displaySize}</p>
        </div>

        <div className="my-4 h-px bg-white/[0.06]" />

        {/* Dimensions */}
        <div>
          <h4 className="caption-label mb-4">DIMENSIONES</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-[#7A7A7A]">Longitud (X):</span>
              <span className="font-mono text-lg font-bold text-[#F5F5F5]">
                {stats ? `${stats.dimX.toFixed(2)} mm` : '—'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-[#7A7A7A]">Ancho (Y):</span>
              <span className="font-mono text-lg font-bold text-[#F5F5F5]">
                {stats ? `${stats.dimY.toFixed(2)} mm` : '—'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-[#7A7A7A]">Altura (Z):</span>
              <span className="font-mono text-lg font-bold text-[#F5F5F5]">
                {stats ? `${stats.dimZ.toFixed(2)} mm` : '—'}
              </span>
            </div>
          </div>
        </div>

        <div className="my-4 h-px bg-white/[0.06]" />

        {/* Volume */}
        <div>
          <h4 className="caption-label mb-4">VOLUMEN</h4>
          <div className="flex items-baseline gap-1.5">
            <span className="font-mono text-2xl font-bold text-amber">
              {stats ? stats.volume.toFixed(2) : '—'}
            </span>
            <span className="text-sm text-[#7A7A7A]">cm³</span>
          </div>
          {stats && (
            <div className="mt-2 h-1 rounded-full bg-white/[0.06] overflow-hidden">
              <div
                className="h-full rounded-full bg-amber transition-all duration-500"
                style={{
                  width: `${Math.min((stats.volume / 1000) * 100, 100)}%`,
                  boxShadow: '0 0 8px rgba(229, 160, 68, 0.3)',
                }}
              />
            </div>
          )}
        </div>

        <div className="my-4 h-px bg-white/[0.06]" />

        {/* Triangle Count */}
        <div>
          <h4 className="caption-label mb-4">TRIANGULOS</h4>
          <span className="font-mono text-xl font-bold text-[#F5F5F5]">
            {stats ? stats.triangles.toLocaleString() : '—'}
          </span>
        </div>

        <div className="my-4 h-px bg-white/[0.06]" />

        {/* Print Time Estimate */}
        <div>
          <h4 className="caption-label mb-4">TIEMPO ESTIMADO</h4>
          <div className="flex items-center gap-2 text-sm text-[#7A7A7A]">
            <Clock size={14} />
            <span className="font-medium">
              {stats ? stats.printTime : '—'}
            </span>
          </div>
          {stats && (
            <p className="mt-2 text-[11px] text-[#4D4D4D] italic">
              * Estimacion aproximada
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
