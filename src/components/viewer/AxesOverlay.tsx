export function AxesOverlay() {
  return (
    <div
      className="absolute bottom-4 left-4 z-10 w-[60px] h-[60px] rounded bg-black/50 pointer-events-none"
      style={{ padding: '4px' }}
    >
      <svg viewBox="0 0 60 60" className="w-full h-full">
        {/* X axis - red, pointing right */}
        <line x1="8" y1="52" x2="40" y2="52" stroke="#EF4444" strokeWidth="2" />
        <polygon points="40,52 36,49.5 36,54.5" fill="#EF4444" />
        <text x="42" y="55" fill="#EF4444" fontSize="9" fontWeight="bold" fontFamily="Inter">X</text>

        {/* Y axis - green, pointing up */}
        <line x1="8" y1="52" x2="8" y2="20" stroke="#22C55E" strokeWidth="2" />
        <polygon points="8,20 5.5,24 10.5,24" fill="#22C55E" />
        <text x="4" y="16" fill="#22C55E" fontSize="9" fontWeight="bold" fontFamily="Inter">Y</text>

        {/* Z axis - blue, pointing diagonal (isometric) */}
        <line x1="8" y1="52" x2="32" y2="36" stroke="#3B82F6" strokeWidth="2" />
        <polygon points="32,36 28.5,38 30.5,34" fill="#3B82F6" />
        <text x="34" y="34" fill="#3B82F6" fontSize="9" fontWeight="bold" fontFamily="Inter">Z</text>
      </svg>
    </div>
  );
}
