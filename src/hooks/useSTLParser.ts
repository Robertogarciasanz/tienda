import { useCallback, useState } from 'react';
import { BufferGeometry, Vector3 } from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import type { ModelStats } from '@/types';

interface ParseResult {
  geometry: BufferGeometry;
  stats: ModelStats;
  fileName: string;
  fileSize: number;
}

interface UseSTLParserReturn {
  parseFile: (file: File) => Promise<ParseResult>;
  isParsing: boolean;
  error: string | null;
  clearError: () => void;
}

function computeVolume(geometry: BufferGeometry): number {
  const positions = geometry.attributes.position.array as Float32Array;
  let volume = 0;
  const v1 = new Vector3();
  const v2 = new Vector3();
  const v3 = new Vector3();

  for (let i = 0; i < positions.length; i += 9) {
    v1.set(positions[i], positions[i + 1], positions[i + 2]);
    v2.set(positions[i + 3], positions[i + 4], positions[i + 5]);
    v3.set(positions[i + 6], positions[i + 7], positions[i + 8]);
    volume += v1.dot(v2.cross(v3)) / 6;
  }

  return Math.abs(volume) / 1000;
}

function formatPrintTime(volumeCm3: number): string {
  const totalMinutes = Math.ceil(volumeCm3 * 0.05 * 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours === 0) return `${minutes}min`;
  return `${hours}h ${minutes}min`;
}

export function useSTLParser(): UseSTLParserReturn {
  const [isParsing, setIsParsing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const parseFile = useCallback(async (file: File): Promise<ParseResult> => {
    setIsParsing(true);
    setError(null);

    try {
      if (!file.name.toLowerCase().endsWith('.stl')) {
        throw new Error('Solo se aceptan archivos .stl');
      }

      const arrayBuffer = await file.arrayBuffer();
      const loader = new STLLoader();
      const geometry = loader.parse(arrayBuffer);

      // Center geometry
      geometry.computeBoundingBox();
      if (!geometry.boundingBox) {
        throw new Error('No se pudo calcular el bounding box del modelo');
      }

      const center = new Vector3();
      geometry.boundingBox.getCenter(center);
      geometry.translate(-center.x, -center.y, -center.z);

      // Rest on grid (bottom at Y=0)
      const height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
      geometry.translate(0, height / 2, 0);

      // Recompute after translation
      geometry.computeBoundingBox();

      const box = geometry.boundingBox;
      const dimX = box.max.x - box.min.x;
      const dimY = box.max.y - box.min.y;
      const dimZ = box.max.z - box.min.z;
      const volume = computeVolume(geometry);

      const triCount = geometry.index
        ? geometry.index.count / 3
        : geometry.attributes.position.count / 3;

      const stats: ModelStats = {
        dimX: Math.round(dimX * 100) / 100,
        dimY: Math.round(dimY * 100) / 100,
        dimZ: Math.round(dimZ * 100) / 100,
        volume: Math.round(volume * 100) / 100,
        triangles: Math.floor(triCount),
        printTime: formatPrintTime(volume),
      };

      return {
        geometry,
        stats,
        fileName: file.name,
        fileSize: file.size,
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error al cargar el archivo';
      setError(msg);
      throw new Error(msg);
    } finally {
      setIsParsing(false);
    }
  }, []);

  return { parseFile, isParsing, error, clearError };
}
