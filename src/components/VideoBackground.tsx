import React, { useRef, useEffect, useState } from 'react';

interface VideoBackgroundProps {
  videoUrls: string[]; // Array of video URLs (from Supabase Storage or any CDN)
  className?: string;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ 
  videoUrls, 
  className = '' 
}) => {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeLayer, setActiveLayer] = useState<'video1' | 'video2'>('video1');
  const [video1Src, setVideo1Src] = useState<string | undefined>(videoUrls[0]);
  const [video2Src, setVideo2Src] = useState<string | undefined>(videoUrls.length > 1 ? videoUrls[1] : undefined);

  // Update sources when videoUrls change
  useEffect(() => {
    if (videoUrls.length === 0) {
      setVideo1Src(undefined);
      setVideo2Src(undefined);
      return;
    }
    setVideo1Src(videoUrls[0]);
    if (videoUrls.length > 1) {
      setVideo2Src(videoUrls[1]);
    }
  }, [videoUrls]);

  // Handle video transitions
  useEffect(() => {
    if (videoUrls.length === 0 || videoUrls.length === 1) return;

    const activeRef = activeLayer === 'video1' ? video1Ref : video2Ref;
    const nextRef = activeLayer === 'video1' ? video2Ref : video1Ref;
    const activeVideo = activeRef.current;
    const nextVideo = nextRef.current;

    if (!activeVideo || !nextVideo) return;

    // Preload next video when current video is near end
    const handleTimeUpdate = () => {
      const timeRemaining = activeVideo.duration - activeVideo.currentTime;
      if (timeRemaining <= 2) {
        const nextIndex = (currentIndex + 1) % videoUrls.length;
        const nextSrc = videoUrls[nextIndex];
        
        // Update src in state so it updates in JSX
        if (activeLayer === 'video1') {
          if (video2Src !== nextSrc) {
            setVideo2Src(nextSrc);
          }
        } else {
          if (video1Src !== nextSrc) {
            setVideo1Src(nextSrc);
          }
        }
      }
    };

    // Handle video end - start crossfade
    const handleEnded = () => {
      const nextIndex = (currentIndex + 1) % videoUrls.length;
      const nextLayer = activeLayer === 'video1' ? 'video2' : 'video1';

      // Start crossfade
      activeVideo.style.transition = 'opacity 0.8s ease-in-out';
      activeVideo.style.opacity = '0';

      // Ensure next video is ready
      if (nextVideo.readyState >= 2) {
        nextVideo.currentTime = 0;
        nextVideo.play().catch(() => {
          console.log('Autoplay blocked during transition');
        });
        nextVideo.style.transition = 'opacity 0.8s ease-in-out';
        nextVideo.style.opacity = '1';
      } else {
        // Wait for video to load
        const startNextVideo = () => {
          nextVideo.currentTime = 0;
          nextVideo.play().catch(() => {
            console.log('Autoplay blocked during transition');
          });
          nextVideo.style.transition = 'opacity 0.8s ease-in-out';
          nextVideo.style.opacity = '1';
        };
        nextVideo.addEventListener('canplay', startNextVideo, { once: true });
      }

      // Update state after transition
      setTimeout(() => {
        setCurrentIndex(nextIndex);
        setActiveLayer(nextLayer);
        activeVideo.style.opacity = '1';
        activeVideo.style.transition = '';
        
        // Preload next video for next transition
        const nextNextIndex = (nextIndex + 1) % videoUrls.length;
        if (nextLayer === 'video1') {
          setVideo2Src(videoUrls[nextNextIndex]);
        } else {
          setVideo1Src(videoUrls[nextNextIndex]);
        }
      }, 800);
    };

    activeVideo.addEventListener('timeupdate', handleTimeUpdate);
    activeVideo.addEventListener('ended', handleEnded);

    return () => {
      activeVideo.removeEventListener('timeupdate', handleTimeUpdate);
      activeVideo.removeEventListener('ended', handleEnded);
    };
  }, [currentIndex, activeLayer, videoUrls, video1Src, video2Src]);

  if (videoUrls.length === 0) {
    return null;
  }

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Video 1 - Always render if we have videos, always has autoplay for iOS */}
      <video
        ref={video1Ref}
        src={video1Src}
        autoPlay
        muted
        playsInline
        loop={false}
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          minWidth: '100%',
          minHeight: '100%',
          objectFit: 'cover',
          opacity: activeLayer === 'video1' && video1Src ? 1 : 0,
          transition: 'opacity 0.8s ease-in-out',
          zIndex: activeLayer === 'video1' ? 2 : 1,
          pointerEvents: 'none',
        }}
      />
      
      {/* Video 2 - Always render if we have multiple videos, also has autoplay */}
      {videoUrls.length > 1 && (
        <video
          ref={video2Ref}
          src={video2Src}
          autoPlay
          muted
          playsInline
          loop={false}
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            minWidth: '100%',
            minHeight: '100%',
            objectFit: 'cover',
            opacity: activeLayer === 'video2' && video2Src ? 1 : 0,
            transition: 'opacity 0.8s ease-in-out',
            zIndex: activeLayer === 'video2' ? 2 : 1,
            pointerEvents: 'none',
          }}
        />
      )}
      
      {/* Dark overlay for better text readability */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-dark via-dark-gray to-dark opacity-80 z-10"
      />
      {/* Smooth fade to parallax at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent z-20" />
    </div>
  );
};

export default VideoBackground;
