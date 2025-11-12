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
  
  // Track video sources for JSX (iOS compatibility)
  const [video1Src, setVideo1Src] = useState<string | undefined>(videoUrls.length > 0 ? videoUrls[0] : undefined);
  const [video2Src, setVideo2Src] = useState<string | undefined>(videoUrls.length > 1 ? videoUrls[1] : undefined);

  // Get next video index
  const getNextIndex = useCallback((index: number) => {
    return (index + 1) % videoUrls.length;
  }, [videoUrls.length]);

    // Load video into specific layer
  const loadVideoIntoLayer = useCallback((layer: 'video1' | 'video2', index: number) => {
    const videoRef = layer === 'video1' ? video1Ref : video2Ref;
    const video = videoRef.current;
    if (!video || !videoUrls[index]) return;

    // Only update src if it's different (to avoid interrupting playback on iOS)
    if (video.src !== videoUrls[index]) {
      video.src = videoUrls[index];
      video.muted = true;
      video.volume = 0;
      video.setAttribute('playsinline', 'true');
      video.setAttribute('webkit-playsinline', 'true');
      video.setAttribute('x5-playsinline', 'true');
      video.load();
    }
  }, [videoUrls]);

  // Update video sources when videoUrls change
  useEffect(() => {
    if (videoUrls.length === 0) {
      setVideo1Src(undefined);
      setVideo2Src(undefined);
      return;
    }
    
    // Set initial sources
    setVideo1Src(videoUrls[0]);
    if (videoUrls.length > 1) {
      setVideo2Src(videoUrls[1]);
    }
  }, [videoUrls]);

  // Initialize first video - src is now set directly in JSX for iOS compatibility
  useEffect(() => {
    if (videoUrls.length === 0 || !video1Src) return;

    const video1 = video1Ref.current;
    if (!video1) return;

    // Ensure video is configured for iOS
    video1.muted = true;
    video1.volume = 0;
    
    // iOS-compatible: Let autoplay attribute handle playback
    // Since src is set directly in JSX, autoplay should work on iOS
    const handleVideoReady = () => {
      setIsLoading(false);
      
      // On iOS, if autoplay attribute is present and video is muted/playsinline,
      // it should play automatically. Only assist if needed.
      if (video1.paused) {
        // Small delay to let autoplay attribute work
        setTimeout(() => {
          if (video1.paused) {
            // Fallback: try programmatically
            video1.play().catch((error) => {
              console.log('Autoplay may be blocked on iOS - video will play when user interacts');
            });
          }
        }, 500);
      } else {
        setIsLoading(false);
      }
    };

    // Listen for when video is ready
    video1.addEventListener('loadeddata', handleVideoReady, { once: true });
    video1.addEventListener('canplay', handleVideoReady, { once: true });
    
    // If video is already loaded
    if (video1.readyState >= 2) {
      handleVideoReady();
    }

    return () => {
      video1.removeEventListener('loadeddata', handleVideoReady);
      video1.removeEventListener('canplay', handleVideoReady);
    };
  }, [videoUrls, video1Src]);

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
      const startTransition = async () => {
        // Fade out active video
        activeVideo.style.transition = 'opacity 0.8s ease-in-out';
        activeVideo.style.opacity = '0';

        // Start next video and fade in (iOS-compatible)
        nextVideoEl.currentTime = 0;
        nextVideoEl.volume = 0;
        nextVideoEl.muted = true;
        nextVideoEl.setAttribute('playsinline', 'true');
        nextVideoEl.setAttribute('webkit-playsinline', 'true');
        
        // For iOS, ensure the video element is ready to play
        // The autoplay attribute should handle this, but we also try programmatically
        try {
          const playPromise = nextVideoEl.play();
          if (playPromise !== undefined) {
            await playPromise;
          }
        } catch (error) {
          console.log('Autoplay blocked during transition:', error);
          // On iOS, if programmatic play fails, the autoplay attribute should still work
          // Retry after a small delay as fallback
          setTimeout(async () => {
            try {
              await nextVideoEl.play();
            } catch (e) {
              console.log('Autoplay still blocked - relying on autoplay attribute');
            }
          }, 150);
        }
        
        nextVideoEl.style.transition = 'opacity 0.8s ease-in-out';
        nextVideoEl.style.opacity = '1';

        // Update state after transition
        setTimeout(() => {
          setCurrentIndex(nextIndex);
          setActiveLayer(nextLayer);
          
          // Update video sources for next transition
          if (nextLayer === 'video1') {
            setVideo1Src(videoUrls[nextIndex]);
            // Preload next video in video2
            const nextNextIndex = getNextIndex(nextIndex);
            setVideo2Src(videoUrls[nextNextIndex]);
          } else {
            setVideo2Src(videoUrls[nextIndex]);
            // Preload next video in video1
            const nextNextIndex = getNextIndex(nextIndex);
            setVideo1Src(videoUrls[nextNextIndex]);
          }
          
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
      {/* Video 1 - Set src directly for iOS autoplay compatibility */}
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
          opacity: activeLayer === 'video1' ? 1 : 0,
          transition: 'opacity 0.8s ease-in-out',
          zIndex: activeLayer === 'video1' ? 2 : 1,
          pointerEvents: 'none',
        }}
        {...({
          'webkit-playsinline': true,
          'x5-playsinline': true,
        } as any)}
      />
      
      {/* Video 2 - Preload next video for smooth transition */}
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
          opacity: activeLayer === 'video2' ? 1 : 0,
          transition: 'opacity 0.8s ease-in-out',
          zIndex: activeLayer === 'video2' ? 2 : 1,
          pointerEvents: 'none',
        }}
        {...({
          'webkit-playsinline': true,
          'x5-playsinline': true,
        } as any)}
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

