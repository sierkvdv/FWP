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

  // Get URLs based on current index
  const video1Url = videoUrls[currentIndex % videoUrls.length];
  const video2Url = videoUrls.length > 1 ? videoUrls[(currentIndex + 1) % videoUrls.length] : undefined;

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
        
        // Update next video src if needed
        if (nextVideo.src !== nextSrc) {
          nextVideo.src = nextSrc;
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

      // Fade out active video
      activeVideo.style.transition = 'opacity 0.8s ease-in-out';
      activeVideo.style.opacity = '0';

      // Start next video
      if (nextVideo.readyState >= 2) {
        nextVideo.currentTime = 0;
        nextVideo.play().catch(() => {
          // On iOS, autoplay may be blocked - that's OK for transitions
          console.log('Autoplay blocked during transition');
        });
        nextVideo.style.transition = 'opacity 0.8s ease-in-out';
        nextVideo.style.opacity = '1';
      } else {
        // Wait for video to be ready
        const startNext = () => {
          nextVideo.currentTime = 0;
          nextVideo.play().catch(() => {
            console.log('Autoplay blocked during transition');
          });
          nextVideo.style.transition = 'opacity 0.8s ease-in-out';
          nextVideo.style.opacity = '1';
        };
        nextVideo.addEventListener('canplay', startNext, { once: true });
      }

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

  if (videoUrls.length === 0 || !video1Url) {
    return null;
  }

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Video 1 - First video with src in JSX for iOS autoplay */}
      <video
        ref={video1Ref}
        src={video1Url}
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
      
      {/* Video 2 - Next video for smooth transitions */}
      {videoUrls.length > 1 && video2Url && (
        <video
          ref={video2Ref}
          src={video2Url}
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
