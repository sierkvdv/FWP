import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Het FWP-merkteken, groot. Opbouw volgt de animatie-volgorde uit het
 * logo-pakket: (1) kernblok, (2) het kruis eromheen, (3) de rest van
 * het veld, (4) het losse blok breekt uit en draait 45°.
 */

// Grid uit het logo: cel 20, gap 6, pitch 26. Stap = animatie-fase.
const blocks: { x: number; y: number; o: number; step: number }[] = [
  { x: 26, y: 26, o: 1, step: 1 }, // kernblok
  { x: 26, y: 0, o: 0.5, step: 2 }, // kruis
  { x: 0, y: 26, o: 0.5, step: 2 },
  { x: 52, y: 26, o: 0.5, step: 2 },
  { x: 26, y: 52, o: 0.5, step: 2 },
  { x: 0, y: 0, o: 1, step: 3 }, // veld
  { x: 52, y: 0, o: 0.22, step: 3 },
  { x: 0, y: 52, o: 0.22, step: 3 },
];

const STEP_DELAY = 0.28;

const BrandMark: React.FC<{ className?: string }> = ({ className = '' }) => {
  const reduce = useReducedMotion();

  return (
    <svg
      viewBox="-6 -6 108 108"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {blocks.map((b, i) => (
        <motion.rect
          key={i}
          x={b.x}
          y={b.y}
          width={20}
          height={20}
          fill="#00e5c7"
          initial={reduce ? { opacity: b.o } : { opacity: 0, scale: 0.6 }}
          animate={{ opacity: b.o, scale: 1 }}
          transition={{
            duration: 0.45,
            ease: [0.16, 1, 0.3, 1],
            delay: b.step * STEP_DELAY + (b.step === 3 ? (i % 3) * 0.07 : 0),
          }}
          style={{ transformOrigin: `${b.x + 10}px ${b.y + 10}px` }}
        />
      ))}
      {/* Stap 4: het uitbrekende blok — schuift uit het raster en draait 45°. */}
      <motion.rect
        x={52}
        y={52}
        width={20}
        height={20}
        fill="#00e5c7"
        initial={
          reduce
            ? { x: 12, y: 12, rotate: 45, opacity: 1 }
            : { x: 0, y: 0, rotate: 0, opacity: 0 }
        }
        animate={{ x: 12, y: 12, rotate: 45, opacity: 1 }}
        transition={{
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
          delay: 4 * STEP_DELAY,
        }}
        style={{ transformOrigin: '62px 62px' }}
      />
    </svg>
  );
};

export default BrandMark;
