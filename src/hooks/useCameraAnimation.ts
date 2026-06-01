import { useRef, useCallback } from 'react';
import { Vector3, PerspectiveCamera } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface CameraAnimationState {
  isAnimating: React.MutableRefObject<boolean>;
  animateTo: (targetPosition: [number, number, number], onComplete?: () => void) => void;
  stopAnimation: () => void;
}

export function useCameraAnimation(
  cameraRef: React.RefObject<PerspectiveCamera | null>,
  controlsRef: React.RefObject<OrbitControls | null>
): CameraAnimationState {
  const isAnimating = useRef(false);
  const rafId = useRef<number>(0);

  const stopAnimation = useCallback(() => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
      rafId.current = 0;
    }
    isAnimating.current = false;
    if (controlsRef.current) {
      controlsRef.current.enabled = true;
    }
  }, [controlsRef]);

  const animateTo = useCallback(
    (targetPosition: [number, number, number], onComplete?: () => void) => {
      const camera = cameraRef.current;
      const controls = controlsRef.current;
      if (!camera || !controls) return;

      stopAnimation();

      const startPos = camera.position.clone();
      const target = new Vector3(...targetPosition);
      const duration = 800;
      const startTime = performance.now();

      isAnimating.current = true;
      controls.enabled = false;

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Cubic ease-out
        const eased = 1 - Math.pow(1 - progress, 3);

        camera.position.lerpVectors(startPos, target, eased);
        camera.lookAt(0, 0, 0);

        if (controls) {
          controls.target.set(0, 0, 0);
          controls.update();
        }

        if (progress < 1) {
          rafId.current = requestAnimationFrame(animate);
        } else {
          isAnimating.current = false;
          controls.enabled = true;
          onComplete?.();
        }
      };

      rafId.current = requestAnimationFrame(animate);
    },
    [cameraRef, controlsRef, stopAnimation]
  );

  return { isAnimating, animateTo, stopAnimation };
}
