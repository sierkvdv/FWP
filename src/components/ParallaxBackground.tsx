import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);

  return (
    <div ref={containerRef} className="relative w-full h-[200vh] overflow-hidden">
      {/* Parallax layers */}
      <motion.div
        style={{ y: y1 }}
        className="absolute inset-0 opacity-20"
      >
        <div className="absolute top-20 left-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute top-40 right-40 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl" />
      </motion.div>

      <motion.div
        style={{ y: y2 }}
        className="absolute inset-0 opacity-15"
      >
        <div className="absolute top-60 left-1/4 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-1/3 w-56 h-56 bg-accent/15 rounded-full blur-3xl" />
      </motion.div>

      <motion.div
        style={{ y: y3 }}
        className="absolute inset-0 opacity-10"
      >
        <div className="absolute top-1/3 left-1/2 w-40 h-40 bg-purple-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/6 w-24 h-24 bg-blue-500/20 rounded-full blur-3xl" />
      </motion.div>

      {/* Grid pattern */}
      <motion.div
        style={{ y: y2 }}
        className="absolute inset-0 opacity-5"
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </motion.div>
    </div>
  );
};

export default ParallaxBackground;
