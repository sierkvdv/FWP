import React, { useState } from 'react';

interface CaseMediaProps {
  src?: string;
  /** mp4-video — wint van src. Speelt stil in loop. */
  video?: string;
  poster?: string;
  label: string;
  /** aspect ratio, bv. '4/3' of '16/10' */
  ratio?: string;
  /** 'cover' (default, foto's) of 'contain' (decoratieve SVG's netjes passend) */
  fit?: 'cover' | 'contain';
  className?: string;
}

/**
 * Toont de case-media: video (stil, loop) of beeld — of, zolang er
 * nog niets is, een strak monochroom placeholder-vlak met de titel.
 * Nooit een kapotte <img>.
 */
const CaseMedia: React.FC<CaseMediaProps> = ({
  src,
  video,
  poster,
  label,
  ratio = '4/3',
  fit = 'cover',
  className = '',
}) => {
  const [failed, setFailed] = useState(false);
  const showImage = !video && src && !failed;

  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-line bg-surface ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {video ? (
        <video
          src={video}
          poster={poster}
          aria-label={label}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : showImage ? (
        <img
          src={src}
          alt={label}
          loading="lazy"
          onError={() => setFailed(true)}
          className={
            fit === 'contain'
              ? 'h-full w-full object-contain p-6'
              : 'h-full w-full object-cover'
          }
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          {/* Subtiele hairline-raster als textuur */}
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)',
              backgroundSize: '44px 44px',
              maskImage:
                'radial-gradient(120% 120% at 50% 40%, black 30%, transparent 75%)',
            }}
          />
          <span className="relative px-6 text-center text-2xl font-light tracking-display text-muted">
            {label}
          </span>
        </div>
      )}
    </div>
  );
};

export default CaseMedia;
