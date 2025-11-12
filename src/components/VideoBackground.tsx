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

  // Track which video is in which layer
  const [video1Index, setVideo1Index] = useState(0);
  const [video2Index, setVideo2Index] = useState(videoUrls.length > 1 ? 1 : 0);

  // Get URLs - keep video1 stable for iOS autoplay
  const video1Url = videoUrls[video1Index];
  const video2Url = videoUrls.length > 1 ? videoUrls[video2Index] : undefined;

  // Update video2 when transitioning
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
        
        // Update next video src if needed
        if (activeLayer === 'video1') {
          if (video2Index !== nextIdx) {
            setVideo2Index(nextIdx);
            // Update src directly
            nextVideo.src = videoUrls[nextIdx];
            nextVideo.muted = true;
            nextVideo.playsInline = true;
            nextVideo.load();
          }
        } else {
          if (video1Index !== nextIdx) {
            setVideo1Index(nextIdx);
            // Update src directly
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

      // Ensure next video has correct src and start playing
      if (nextLayer === 'video1') {
        if (video1Index !== nextIdx) {
          nextVideo.src = videoUrls[nextIdx];
          nextVideo.load();
        }
        setVideo1Index(nextIdx);
      } else {
        if (video2Index !== nextIdx) {
          nextVideo.src = videoUrls[nextIdx];
          nextVideo.load();
        }
        setVideo2Index(nextIdx);
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
        setCurrentIndex(nextIdx);
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
  }, [activeLayer, video1Index, video2Index, videoUrls]);

  if (videoUrls.length === 0 || !video1Url) {
    return null;
  }

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Video 1 - First video, src directly in JSX for iOS autoplay */}
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
      
      {/* Video 2 - Next video for smooth transitions, also has autoplay for iOS */}
      {videoUrls.length > 1 && video2Url && (
        <video
          ref={video2Ref}
          src={video2Url}
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
