import React, { useEffect, useRef } from 'react';

interface AutoVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
}

/**
 * Stille loop-video die alleen speelt wanneer 'ie (deels) in beeld is.
 * iOS Safari beperkt het aantal gelijktijdig spelende video's — door
 * buiten beeld te pauzeren speelt élke video zodra je 'm ziet, ook op
 * iPhone. muted/playsInline worden imperatief gezet (React rendert het
 * muted-attribuut niet altijd, wat iOS-autoplay blokkeert).
 */
const AutoVideo: React.FC<AutoVideoProps> = ({ src, ...rest }) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    // iOS: attribuut + property, vóór play().
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute('muted', '');
    v.playsInline = true;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          v.play().catch(() => {
            /* autoplay geweigerd — poster blijft staan */
          });
        } else {
          v.pause();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [src]);

  return (
    <video ref={ref} src={src} loop muted playsInline preload="metadata" {...rest} />
  );
};

export default AutoVideo;
