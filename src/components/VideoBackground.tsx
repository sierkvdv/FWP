import React, { useRef, useEffect, useState, useCallback } from 'react';

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
  const [isLoading, setIsLoading] = useState(true);
  const hasPreloadedRef = useRef(false);

  // Get next video index
  const getNextIndex = useCallback((index: number) => {
    return (index + 1) % videoUrls.length;
  }, [videoUrls.length]);

  // Load video into specific layer
  const loadVideoIntoLayer = useCallback((layer: 'video1' | 'video2', index: number) => {
    const videoRef = layer === 'video1' ? video1Ref : video2Ref;
    const video = videoRef.current;
    if (!video || !videoUrls[index]) return;

    video.src = videoUrls[index];
    video.load();
  }, [videoUrls]);

  // Initialize first video
  useEffect(() => {
    if (videoUrls.length === 0) return;

    const video1 = video1Ref.current;
    if (!video1) return;

    // Load first video into video1
    loadVideoIntoLayer('video1', 0);
    
    // Preload second video into video2 immediately
    if (videoUrls.length > 1) {
      loadVideoIntoLayer('video2', getNextIndex(0));
    }

    // Start playing first video as soon as it can play (not waiting for full load)
    const handleCanPlay = () => {
      setIsLoading(false);
      if (video1.paused) {
        video1.play().catch(() => {
          console.log('Autoplay blocked');
        });
      }
    };

    // Try to start playing as soon as possible
    video1.addEventListener('loadeddata', handleCanPlay, { once: true });
    video1.addEventListener('canplay', handleCanPlay, { once: true });
    video1.addEventListener('canplaythrough', handleCanPlay, { once: true });

    return () => {
      video1.removeEventListener('loadeddata', handleCanPlay);
      video1.removeEventListener('canplay', handleCanPlay);
      video1.removeEventListener('canplaythrough', handleCanPlay);
    };
  }, [videoUrls, loadVideoIntoLayer, getNextIndex]);

  // Handle video transitions
  useEffect(() => {
    if (videoUrls.length === 0 || isLoading) return;

    const activeRef = activeLayer === 'video1' ? video1Ref : video2Ref;
    const nextRef = activeLayer === 'video1' ? video2Ref : video1Ref;
    const activeVideo = activeRef.current;
    const nextVideo = nextRef.current;

    if (!activeVideo || !nextVideo) return;

    // Preload next video when current video is playing
    const handleTimeUpdate = () => {
      const timeRemaining = activeVideo.duration - activeVideo.currentTime;
      // When 3 seconds remaining, ensure next video is loaded and ready
      if (timeRemaining <= 3 && timeRemaining > 0 && !hasPreloadedRef.current) {
        hasPreloadedRef.current = true;
        const nextIndex = getNextIndex(currentIndex);
        const nextLayer = activeLayer === 'video1' ? 'video2' : 'video1';
        
        // Load next video
        loadVideoIntoLayer(nextLayer, nextIndex);
        
        // Force preload to ensure video is ready
        nextVideo.load();
      }
    };

    // Handle video end - start crossfade
    const handleEnded = () => {
      const nextIndex = getNextIndex(currentIndex);
      const nextLayer = activeLayer === 'video1' ? 'video2' : 'video1';
      const nextVideoEl = nextRef.current;

      if (!nextVideoEl) return;

      // Ensure next video is loaded
      loadVideoIntoLayer(nextLayer, nextIndex);

      // Wait for next video to be ready, then start crossfade
      const startTransition = () => {
        // Fade out active video
        activeVideo.style.transition = 'opacity 0.8s ease-in-out';
        activeVideo.style.opacity = '0';

        // Start next video and fade in
        nextVideoEl.currentTime = 0;
        nextVideoEl.play().catch(() => {
          console.log('Autoplay blocked during transition');
        });
        nextVideoEl.style.transition = 'opacity 0.8s ease-in-out';
        nextVideoEl.style.opacity = '1';

        // Update state after transition
        setTimeout(() => {
          setCurrentIndex(nextIndex);
          setActiveLayer(nextLayer);
          
          // Reset active video for next transition
          activeVideo.style.opacity = '1';
          activeVideo.style.transition = '';
          
          // Reset preload flag for next video
          hasPreloadedRef.current = false;
        }, 800);
      };

      if (nextVideoEl.readyState >= 3) {
        // Video is ready, start transition
        startTransition();
      } else {
        // Wait for video to load
        nextVideoEl.addEventListener('canplaythrough', startTransition, { once: true });
      }
    };

    activeVideo.addEventListener('timeupdate', handleTimeUpdate);
    activeVideo.addEventListener('ended', handleEnded);

    return () => {
      activeVideo.removeEventListener('timeupdate', handleTimeUpdate);
      activeVideo.removeEventListener('ended', handleEnded);
    };
  }, [currentIndex, activeLayer, videoUrls, isLoading, getNextIndex, loadVideoIntoLayer]);

  if (videoUrls.length === 0) {
    return null;
  }

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Video 1 */}
      <video
        ref={video1Ref}
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
      
      {/* Video 2 */}
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

