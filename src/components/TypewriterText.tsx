import { useEffect, useRef, useState } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
}

export function TypewriterText({ text, speed = 75, onComplete, className = '' }: TypewriterTextProps) {
  const [visibleChars, setVisibleChars] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const hasCompleted = useRef(false);

  useEffect(() => {
    hasCompleted.current = false;

    const startDelay = setTimeout(() => {
      let current = 0;
      const total = text.length;

      const revealNext = () => {
        if (current < total) {
          current++;
          setVisibleChars(current);
          timerRef.current = setTimeout(revealNext, speed);
        } else if (!hasCompleted.current) {
          hasCompleted.current = true;
          onComplete?.();
        }
      };

      revealNext();
    }, 400);

    return () => {
      clearTimeout(startDelay);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [text, speed, onComplete]);

  return (
    <span className={className} aria-label={text}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="transition-opacity duration-[30ms]"
          style={{
            opacity: i < visibleChars ? 1 : 0,
          }}
        >
          {char === '\n' ? <br /> : char}
        </span>
      ))}
    </span>
  );
}
