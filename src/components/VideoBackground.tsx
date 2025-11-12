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

  // Initialize first video when videoUrls are available
  useEffect(() => {
    if (videoUrls.length === 0) return;

    const video1 = video1Ref.current;
    if (!video1) return;

    // Load first video - this should work on iOS with autoplay attribute
    video1.src = videoUrls[0];
    video1.muted = true;
    video1.playsInline = true;
    
    // Preload second video if available
    if (videoUrls.length > 1) {
      const video2 = video2Ref.current;
      if (video2) {
        video2.src = videoUrls[1];
        video2.muted = true;
        video2.playsInline = true;
      }
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
        if (nextVideo.src !== videoUrls[nextIndex]) {
          nextVideo.src = videoUrls[nextIndex];
          nextVideo.muted = true;
          nextVideo.playsInline = true;
          nextVideo.load();
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

      // Start next video
      nextVideo.currentTime = 0;
      nextVideo.play().catch(() => {
        console.log('Autoplay blocked during transition - iOS may require user interaction');
      });
      nextVideo.style.transition = 'opacity 0.8s ease-in-out';
      nextVideo.style.opacity = '1';

      // Update state after transition
      setTimeout(() => {
        setCurrentIndex(nextIndex);
        setActiveLayer(nextLayer);
        activeVideo.style.opacity = '1';
        activeVideo.style.transition = '';
      }, 800);
    };

    activeVideo.addEventListener('timeupdate', handleTimeUpdate);
    activeVideo.addEventListener('ended', handleEnded);

    return () => {
      activeVideo.removeEventListener('timeupdate', handleTimeUpdate);
      activeVideo.removeEventListener('ended', handleEnded);
    };
  }, [currentIndex, activeLayer, videoUrls]);

  if (videoUrls.length === 0) {
    return null;
  }

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Video 1 - First video, always has autoplay */}
      <video
        ref={video1Ref}
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
          opacity: activeLayer === 'video1' ? 1 : 0,
          transition: 'opacity 0.8s ease-in-out',
          zIndex: activeLayer === 'video1' ? 2 : 1,
        }}
      />
      
      {/* Video 2 - Next video, only render if we have multiple videos */}
      {videoUrls.length > 1 && (
        <video
          ref={video2Ref}
          muted
          playsInline
          loop={false}
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            minWidth: '100%',
            minHeight: '100%',
            objectFit: 'cover',
            opacity: activeLayer === 'video2' ? 1 : 0,
            transition: 'opacity 0.8s ease-in-out',
            zIndex: activeLayer === 'video2' ? 2 : 1,
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
