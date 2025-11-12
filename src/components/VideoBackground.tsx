import React, { useRef, useEffect, useState } from 'react';

interface VideoBackgroundProps {
  videoUrls: string[]; // Array of video URLs (from Supabase Storage or any CDN)
  className?: string;
}

/**
 * Detects if the user is on iOS
 */
const isIOS = (): boolean => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) || 
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
};

const VideoBackground: React.FC<VideoBackgroundProps> = ({ 
  videoUrls, 
  className = '' 
}) => {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeLayer, setActiveLayer] = useState<'video1' | 'video2'>('video1');
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [isIOSDevice, setIsIOSDevice] = useState(false);
  
  // Track which video index is in each layer
  const [video1Index, setVideo1Index] = useState(0);
  const [video2Index, setVideo2Index] = useState(1);

  // Detect iOS on mount
  useEffect(() => {
    setIsIOSDevice(isIOS());
  }, []);

  // Handle user interaction for iOS autoplay
  useEffect(() => {
    if (!isIOSDevice || hasUserInteracted) return;

    const handleUserInteraction = () => {
      setHasUserInteracted(true);
      
      // Start playing the active video
      const activeVideo = activeLayer === 'video1' ? video1Ref.current : video2Ref.current;
      if (activeVideo) {
        activeVideo.play().catch((error) => {
          console.log('Error starting video after user interaction:', error);
        });
      }
    };

    // Listen for any user interaction
    const events = ['click', 'touchstart', 'touchend'];
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true, passive: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, [isIOSDevice, hasUserInteracted, activeLayer]);

  // Handle video transitions
  useEffect(() => {
    if (videoUrls.length <= 1) return;

    const activeRef = activeLayer === 'video1' ? video1Ref : video2Ref;
    const nextRef = activeLayer === 'video1' ? video2Ref : video1Ref;
    const activeVideo = activeRef.current;
    const nextVideo = nextRef.current;

    if (!activeVideo || !nextVideo) return;

    // Preload next video when current video is near end
    const handleTimeUpdate = () => {
      const timeRemaining = activeVideo.duration - activeVideo.currentTime;
      if (timeRemaining <= 2) {
        const activeIdx = activeLayer === 'video1' ? video1Index : video2Index;
        const nextIdx = (activeIdx + 1) % videoUrls.length;
        
        // Update next video if needed
        if (activeLayer === 'video1') {
          if (video2Index !== nextIdx) {
            nextVideo.src = videoUrls[nextIdx];
            nextVideo.muted = true;
            nextVideo.playsInline = true;
            nextVideo.load();
          }
        } else {
          if (video1Index !== nextIdx) {
            nextVideo.src = videoUrls[nextIdx];
            nextVideo.muted = true;
            nextVideo.playsInline = true;
            nextVideo.load();
          }
        }
      }
    };

    // Handle video end - start crossfade
    const handleEnded = () => {
      const activeIdx = activeLayer === 'video1' ? video1Index : video2Index;
      const nextIdx = (activeIdx + 1) % videoUrls.length;
      const nextLayer = activeLayer === 'video1' ? 'video2' : 'video1';

      // Fade out active video
      activeVideo.style.transition = 'opacity 0.8s ease-in-out';
      activeVideo.style.opacity = '0';

      // Update next video src and start playing
      if (nextLayer === 'video1') {
        if (video1Index !== nextIdx) {
          nextVideo.src = videoUrls[nextIdx];
          nextVideo.muted = true;
          nextVideo.playsInline = true;
          nextVideo.load();
          setVideo1Index(nextIdx);
        }
      } else {
        if (video2Index !== nextIdx) {
          nextVideo.src = videoUrls[nextIdx];
          nextVideo.muted = true;
          nextVideo.playsInline = true;
          nextVideo.load();
          setVideo2Index(nextIdx);
        }
      }

      // Start next video when ready
      const startNext = () => {
        nextVideo.currentTime = 0;
        nextVideo.play().catch(() => {
          console.log('Autoplay blocked during transition on iOS');
        });
        nextVideo.style.transition = 'opacity 0.8s ease-in-out';
        nextVideo.style.opacity = '1';
      };

      if (nextVideo.readyState >= 2) {
        startNext();
      } else {
        nextVideo.addEventListener('canplay', startNext, { once: true });
      }

      // Update state after transition
      setTimeout(() => {
        setActiveLayer(nextLayer);
        activeVideo.style.opacity = '1';
        activeVideo.style.transition = '';
        
        // Preload next video for next transition
        const nextNextIdx = (nextIdx + 1) % videoUrls.length;
        if (nextLayer === 'video1') {
          setVideo2Index(nextNextIdx);
          if (video2Ref.current) {
            video2Ref.current.src = videoUrls[nextNextIdx];
            video2Ref.current.load();
          }
        } else {
          setVideo1Index(nextNextIdx);
          if (video1Ref.current) {
            video1Ref.current.src = videoUrls[nextNextIdx];
            video1Ref.current.load();
          }
        }
      }, 800);
    };

    activeVideo.addEventListener('timeupdate', handleTimeUpdate);
    activeVideo.addEventListener('ended', handleEnded);

    return () => {
      activeVideo.removeEventListener('timeupdate', handleTimeUpdate);
      activeVideo.removeEventListener('ended', handleEnded);
    };
  }, [activeLayer, video1Index, video2Index, videoUrls]);

  if (videoUrls.length === 0) {
    return null;
  }

  // Get current video URLs - src directly in JSX for iOS autoplay
  const video1Url = videoUrls[video1Index];
  const video2Url = videoUrls.length > 1 ? videoUrls[video2Index] : undefined;

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{
        cursor: isIOSDevice && !hasUserInteracted ? 'pointer' : 'default',
      }}
    >
      {/* Video 1 - src directly in JSX for iOS autoplay compatibility */}
      <video
        ref={video1Ref}
        src={video1Url}
        autoPlay={!isIOSDevice || hasUserInteracted}
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
      
      {/* Video 2 - src directly in JSX, also has autoplay for iOS */}
      {videoUrls.length > 1 && video2Url && (
        <video
          ref={video2Ref}
          src={video2Url}
          autoPlay={!isIOSDevice || hasUserInteracted}
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
      
      {/* iOS tap overlay - shows when user hasn't interacted yet */}
      {isIOSDevice && !hasUserInteracted && (
        <div 
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/20"
          style={{
            pointerEvents: 'auto',
          }}
          onClick={(e) => {
            e.stopPropagation();
            setHasUserInteracted(true);
            const activeVideo = activeLayer === 'video1' ? video1Ref.current : video2Ref.current;
            if (activeVideo) {
              activeVideo.play().catch((error) => {
                console.log('Error starting video:', error);
              });
            }
          }}
        >
          <div className="bg-black/60 rounded-full p-4 opacity-80">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="white"
              className="ml-1"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
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
