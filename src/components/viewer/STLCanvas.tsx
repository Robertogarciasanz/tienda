import { useRef, useEffect, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Grid, OrbitControls } from '@react-three/drei';
import { BoxGeometry, BufferGeometry, EdgesGeometry, LineSegments, Mesh, Vector3 } from 'three';
import type { OrbitControls as OrbitControlsType } from 'three-stdlib';
import type { RenderMode, CameraPreset } from '@/types';
import { CAMERA_PRESETS } from '@/types';
import { AxesOverlay } from './AxesOverlay';
import { Toast } from '../Toast';

interface CameraControllerProps {
  activePreset: CameraPreset | null;
  onPresetCleared: () => void;
  autoRotate: boolean;
}

function CameraController({ activePreset, onPresetCleared, autoRotate }: CameraControllerProps) {
  const { camera } = useThree();
  const controlsRef = useRef<OrbitControlsType>(null);
  const isAnimating = useRef(false);
  const rafId = useRef(0);
  const prevPreset = useRef<CameraPreset | null>(null);

  // Animate to preset
  useEffect(() => {
    if (!activePreset || activePreset === prevPreset.current) return;
    prevPreset.current = activePreset;

    const preset = CAMERA_PRESETS[activePreset];
    if (!preset) return;

    const target = new Vector3(...preset.position);
    const startPos = camera.position.clone();
    const duration = 800;
    const startTime = performance.now();

    if (rafId.current) cancelAnimationFrame(rafId.current);
    isAnimating.current = true;
    if (controlsRef.current) {
      controlsRef.current.enabled = false;
    }

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      camera.position.lerpVectors(startPos, target, eased);
      camera.lookAt(0, 0, 0);

      if (controlsRef.current) {
        controlsRef.current.target.set(0, 0, 0);
        controlsRef.current.update();
      }

      if (progress < 1) {
        rafId.current = requestAnimationFrame(animate);
      } else {
        isAnimating.current = false;
        if (controlsRef.current) {
          controlsRef.current.enabled = true;
        }
      }
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [activePreset, camera]);

  // Detect user manual interaction to clear active camera preset
  const handleControlsStart = useCallback(() => {
    if (activePreset) {
      onPresetCleared();
      prevPreset.current = null;
    }
  }, [activePreset, onPresetCleared]);

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.05}
      minDistance={10}
      maxDistance={300}
      autoRotate={autoRotate}
      autoRotateSpeed={1.5}
      onStart={handleControlsStart}
    />
  );
}

interface ModelMeshProps {
  geometry: BufferGeometry;
  renderMode: RenderMode;
  autoRotate: boolean;
}

function ModelMesh({ geometry, renderMode, autoRotate }: ModelMeshProps) {
  const meshRef = useRef<Mesh>(null);
  const lineRef = useRef<LineSegments>(null);

  useFrame((_, delta) => {
    if (autoRotate && meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
    }
    if (lineRef.current && meshRef.current) {
      lineRef.current.rotation.copy(meshRef.current.rotation);
    }
  });

  const edgesGeometry = useMemo(() => {
    if (renderMode === 'edges' || renderMode === 'hiddenLine') {
      return new EdgesGeometry(geometry, 15);
    }
    return null;
  }, [geometry, renderMode]);

  return (
    <group>
      <mesh ref={meshRef} geometry={geometry} castShadow receiveShadow>
        {renderMode === 'solid' && (
          <meshStandardMaterial color="#E5A044" metalness={0.1} roughness={0.6} />
        )}
        {renderMode === 'wireframe' && (
          <meshStandardMaterial color="#F5F5F5" metalness={0} roughness={1} wireframe transparent opacity={0.7} />
        )}
        {renderMode === 'edges' && (
          <meshStandardMaterial color="#E5A044" transparent opacity={0.15} />
        )}
        {renderMode === 'hiddenLine' && (
          <meshBasicMaterial color="#2A2A2A" />
        )}
      </mesh>

      {edgesGeometry && renderMode === 'edges' && (
        <lineSegments ref={lineRef} geometry={edgesGeometry}>
          <lineBasicMaterial color="#E5A044" transparent opacity={0.9} />
        </lineSegments>
      )}
      {edgesGeometry && renderMode === 'hiddenLine' && (
        <lineSegments ref={lineRef} geometry={edgesGeometry}>
          <lineBasicMaterial color="#F5F5F5" transparent opacity={0.8} />
        </lineSegments>
      )}
    </group>
  );
}

interface STLCanvasProps {
  geometry: BufferGeometry | null;
  renderMode: RenderMode;
  activePreset: CameraPreset | null;
  autoRotate: boolean;
  isSample: boolean;
  onPresetCleared: () => void;
  toast: { message: string; type: 'success' | 'error' } | null;
  onToastDismiss: () => void;
  onFileUpload?: (file: File) => void;
}

export function STLCanvas({
  geometry,
  renderMode,
  activePreset,
  autoRotate,
  isSample,
  onPresetCleared,
  toast,
  onToastDismiss,
  onFileUpload,
}: STLCanvasProps) {
  const sampleGeometry = useMemo(() => new BoxGeometry(20, 20, 20), []);
  const activeGeometry = geometry || sampleGeometry;

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && onFileUpload) {
      onFileUpload(file);
    }
  }, [onFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  return (
    <div className="relative flex-1 bg-black min-h-0" onDrop={handleDrop} onDragOver={handleDragOver}>
      {toast && <Toast message={toast.message} type={toast.type} onDismiss={onToastDismiss} />}

      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ fov: 50, near: 0.1, far: 1000, position: [60, 50, 60] }}
        gl={{ antialias: true, alpha: false }}
        onCreated={({ gl }) => gl.setClearColor('#000000')}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[50, 80, 30]} intensity={0.8} castShadow color="#ffffff" />
        <directionalLight position={[-30, 40, -20]} intensity={0.3} color="#e8e8e8" />
        <pointLight position={[0, 20, 0]} intensity={0.2} color="#E5A044" />

        <Grid
          position={[0, 0, 0]}
          args={[200, 200]}
          cellSize={10}
          cellThickness={0.5}
          cellColor="#3A3A3A"
          sectionSize={50}
          sectionThickness={1}
          sectionColor="#4A4A4A"
          fadeDistance={100}
          infiniteGrid
        />

        <ModelMesh geometry={activeGeometry} renderMode={renderMode} autoRotate={isSample && autoRotate} />
        <CameraController activePreset={activePreset} onPresetCleared={onPresetCleared} autoRotate={autoRotate && !isSample} />
      </Canvas>

      <AxesOverlay />
    </div>
  );
}
