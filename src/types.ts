export interface DisplaySettings {
  color: string;
  roughness: number;
  metalness: number;
  mode: 'solid' | 'wireframe' | 'points' | 'xray';
  showGrid: boolean;
  showAxes: boolean;
  autoRotate: boolean;
  showBoundingBox: boolean;
  projection: 'perspective' | 'orthographic';
  lighting: 'studio' | 'sunset' | 'industrial' | 'flat';
  gridSize: number;
  gridDivisions: number;
}

export interface ModelStats {
  volume: number; // in mm³
  surfaceArea: number; // in mm²
  boundingBox: {
    width: number;  // X direction (mm)
    height: number; // Y direction (mm)
    depth: number;  // Z direction (mm)
  };
  triangleCount: number;
  estimatedWeight: number; // in grams
  filamentLength: number; // in meters (assuming 1.75mm diameter)
}

export interface PresetModel {
  id: string;
  name: string;
  description: string;
  category: string;
}
