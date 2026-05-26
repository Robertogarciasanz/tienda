import { BufferGeometry } from 'three';

export type RenderMode = 'solid' | 'wireframe' | 'edges' | 'hiddenLine';

export type CameraPreset = 'front' | 'back' | 'left' | 'right' | 'top' | 'bottom';

export interface ModelStats {
  dimX: number;
  dimY: number;
  dimZ: number;
  volume: number;
  triangles: number;
  printTime: string;
}

export interface ViewerState {
  geometry: BufferGeometry | null;
  fileName: string;
  fileSize: number;
  renderMode: RenderMode;
  activePreset: CameraPreset | null;
  autoRotate: boolean;
  isSample: boolean;
}

export const CAMERA_PRESETS: Record<CameraPreset, { position: [number, number, number]; name: string }> = {
  front:  { position: [0, 0, 100],   name: 'F' },
  back:   { position: [0, 0, -100],  name: 'B' },
  left:   { position: [-100, 0, 0],  name: 'L' },
  right:  { position: [100, 0, 0],   name: 'R' },
  top:    { position: [0, 100, 0],   name: 'T' },
  bottom: { position: [0, -100, 0],  name: 'D' },
};

export const RENDER_MODE_ICONS: Record<RenderMode, string> = {
  solid: 'Box',
  wireframe: 'Grid3X3',
  edges: 'Layers',
  hiddenLine: 'ScanEye',
};
