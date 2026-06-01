import { useState, useCallback } from 'react';
import type { BufferGeometry } from 'three';
import { STLToolbar } from '@/components/viewer/STLToolbar';
import { STLCanvas } from '@/components/viewer/STLCanvas';
import { STLSidebar } from '@/components/viewer/STLSidebar';
import { useSTLParser } from '@/hooks/useSTLParser';
import type { RenderMode, CameraPreset, ModelStats } from '@/types';

const sampleStats: ModelStats = {
  dimX: 20,
  dimY: 20,
  dimZ: 20,
  volume: 8,
  triangles: 12,
  printTime: '24min',
};

export function STLViewerSection() {
  const [geometry, setGeometry] = useState<BufferGeometry | null>(null);
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState(0);
  const [stats, setStats] = useState<ModelStats | null>(sampleStats);
  const [renderMode, setRenderMode] = useState<RenderMode>('solid');
  const [activePreset, setActivePreset] = useState<CameraPreset | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isSample, setIsSample] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const { parseFile } = useSTLParser();

  const handleFileUpload = useCallback(
    async (file: File) => {
      try {
        const result = await parseFile(file);
        setGeometry(result.geometry);
        setFileName(result.fileName);
        setFileSize(result.fileSize);
        setStats(result.stats);
        setIsSample(false);
        setAutoRotate(false);
        setToast({ message: `Modelo cargado: ${result.fileName}`, type: 'success' });
      } catch (err) {
        setToast({
          message: err instanceof Error ? err.message : 'Error al cargar el archivo',
          type: 'error',
        });
      }
    },
    [parseFile]
  );

  const handlePresetClick = useCallback((preset: CameraPreset) => {
    setActivePreset(preset);
  }, []);

  const handlePresetCleared = useCallback(() => {
    setActivePreset(null);
  }, []);

  const handleResetView = useCallback(() => {
    setActivePreset('front');
    setTimeout(() => setActivePreset(null), 900);
  }, []);

  const handleToggleAutoRotate = useCallback(() => {
    setAutoRotate((prev) => !prev);
  }, []);

  const handleToastDismiss = useCallback(() => {
    setToast(null);
  }, []);

  return (
    <section
      id="viewer"
      className="bg-[#1A1A1A] pt-[96px] pb-[80px]"
    >
      {/* Section header */}
      <div className="max-w-[1400px] mx-auto px-6 text-center mb-12">
        <p className="eyebrow mb-4">VISOR 3D</p>
        <h2 className="section-heading">Inspecciona tu modelo</h2>
        <p className="body-text max-w-[600px] mx-auto mt-4">
          Sube tu archivo STL para visualizarlo, analizar dimensiones y verificar la
          geometria antes de imprimir.
        </p>
      </div>

      {/* Viewer container */}
      <div className="max-w-[1400px] mx-auto px-6">
        <div
          className="bg-dark-secondary rounded-xl border border-white/[0.06] overflow-hidden"
          style={{ height: '85vh' }}
        >
          <STLToolbar
            renderMode={renderMode}
            activePreset={activePreset}
            autoRotate={autoRotate}
            onModeChange={setRenderMode}
            onPresetClick={handlePresetClick}
            onResetView={handleResetView}
            onToggleAutoRotate={handleToggleAutoRotate}
            onFileUpload={handleFileUpload}
          />

          <div className="flex h-[calc(85vh-56px)]">
            <STLCanvas
              geometry={geometry}
              renderMode={renderMode}
              activePreset={activePreset}
              autoRotate={autoRotate}
              isSample={isSample}
              onPresetCleared={handlePresetCleared}
              toast={toast}
              onToastDismiss={handleToastDismiss}
              onFileUpload={handleFileUpload}
            />
            <STLSidebar
              fileName={fileName}
              fileSize={fileSize}
              stats={stats}
              isSample={isSample}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
