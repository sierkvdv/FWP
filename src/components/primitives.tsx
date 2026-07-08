import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/** Content-breedte + horizontale padding. Eén bron van waarheid. */
export const Container: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className = '',
  children,
}) => (
  <div className={`mx-auto w-full max-w-content px-6 sm:px-10 lg:px-16 ${className}`}>
    {children}
  </div>
);

/** Sectie met verticaal ritme (80px mobiel → 120–160px desktop). */
export const Section: React.FC<{
  id?: string;
  className?: string;
  children: React.ReactNode;
}> = ({ id, className = '', children }) => (
  <section id={id} className={`py-20 md:py-28 lg:py-36 ${className}`}>
    {children}
  </section>
);

/** Uppercase kicker / eyebrow-label. */
export const Kicker: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => <span className={`kicker ${className}`}>{children}</span>;

/** Kalme fade-up on scroll — één beweging, ≤400ms, editorial easing. */
export const Reveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'li';
}> = ({ children, delay = 0, className = '', as = 'div' }) => {
  const reduce = useReducedMotion();
  const MotionTag = as === 'li' ? motion.li : motion.div;
  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </MotionTag>
  );
};
