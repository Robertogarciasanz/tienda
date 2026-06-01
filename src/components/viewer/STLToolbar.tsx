import { useRef, useCallback } from 'react';
import {
  Upload,
  Box,
  Grid3X3,
  Layers,
  ScanEye,
  RotateCcw,
  Play,
  Pause,
} from 'lucide-react';
import type { RenderMode, CameraPreset } from '@/types';
import { CAMERA_PRESETS } from '@/types';

interface STLToolbarProps {
  renderMode: RenderMode;
  activePreset: CameraPreset | null;
  autoRotate: boolean;
  onModeChange: (mode: RenderMode) => void;
  onPresetClick: (preset: CameraPreset) => void;
  onResetView: () => void;
  onToggleAutoRotate: () => void;
  onFileUpload: (file: File) => void;
}

const modeIcons: { mode: RenderMode; Icon: typeof Box; label: string }[] = [
  { mode: 'solid', Icon: Box, label: 'Solido' },
  { mode: 'wireframe', Icon: Grid3X3, label: 'Wireframe' },
  { mode: 'edges', Icon: Layers, label: 'Bordes' },
  { mode: 'hiddenLine', Icon: ScanEye, label: 'Linea oculta' },
];

const presets: { key: CameraPreset; label: string }[] = [
  { key: 'front', label: 'F' },
  { key: 'back', label: 'B' },
  { key: 'left', label: 'L' },
  { key: 'right', label: 'R' },
  { key: 'top', label: 'T' },
  { key: 'bottom', label: 'D' },
];

export function STLToolbar({
  renderMode,
  activePreset,
  autoRotate,
  onModeChange,
  onPresetClick,
  onResetView,
  onToggleAutoRotate,
  onFileUpload,
}: STLToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        onFileUpload(file);
      }
      e.target.value = '';
    },
    [onFileUpload]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) {
        onFileUpload(file);
      }
    },
    [onFileUpload]
  );

  return (
    <div
      className="flex items-center justify-between h-14 bg-black border-b border-white/[0.06] px-3 flex-shrink-0"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {/* Left group */}
      <div className="flex items-center gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept=".stl"
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-4 py-2 bg-[#343434] hover:bg-[#4A4A4A] text-[#F5F5F5] rounded-md text-[13px] font-medium transition-colors duration-150"
        >
          <Upload size={16} />
          Abrir archivo
        </button>

        {/* View mode toggle */}
        <div className="flex items-center gap-0.5 bg-white/[0.04] rounded-md p-[3px]">
          {modeIcons.map(({ mode, Icon }) => (
            <button
              key={mode}
              onClick={() => onModeChange(mode)}
              className={`
                w-8 h-8 flex items-center justify-center rounded transition-all duration-150
                ${renderMode === mode
                  ? 'bg-[#343434] text-amber'
                  : 'bg-transparent text-[#7A7A7A] hover:text-[#F5F5F5]'
                }
              `}
              title={mode}
            >
              <Icon size={16} />
            </button>
          ))}
        </div>
      </div>

      {/* Center group - Camera presets */}
      <div className="flex items-center gap-2">
        {presets.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onPresetClick(key)}
            className={`
              w-8 h-8 flex items-center justify-center rounded-md text-xs font-semibold
              border transition-all duration-150
              ${activePreset === key
                ? 'bg-amber text-[#1A1A1A] border-amber'
                : 'bg-[#343434] text-[#7A7A7A] border-white/[0.08] hover:bg-[#4A4A4A]'
              }
            `}
            title={CAMERA_PRESETS[key].name}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Right group */}
      <div className="flex items-center gap-2">
        <button
          onClick={onResetView}
          className="w-8 h-8 flex items-center justify-center rounded-md bg-[#343434] text-[#7A7A7A] border border-white/[0.08] hover:bg-[#4A4A4A] transition-all duration-150"
          title="Restablecer vista"
        >
          <RotateCcw size={16} />
        </button>
        <button
          onClick={onToggleAutoRotate}
          className={`
            w-8 h-8 flex items-center justify-center rounded-md border transition-all duration-150
            ${autoRotate
              ? 'bg-amber text-[#1A1A1A] border-amber'
              : 'bg-[#343434] text-[#7A7A7A] border-white/[0.08] hover:bg-[#4A4A4A]'
            }
          `}
          title={autoRotate ? 'Pausar rotacion' : 'Rotacion automatica'}
        >
          {autoRotate ? <Pause size={16} /> : <Play size={16} />}
        </button>
      </div>
    </div>
  );
}
