import React, { useRef, useEffect, useState } from 'react';

interface VideoBackgroundProps {
  videoUrls: string[]; // Array of video URLs (from Supabase Storage or any CDN)
  className?: string;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ 
  videoUrls, 
  className = '' 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    if (!videoRef.current || videoUrls.length === 0) return;

    const video = videoRef.current;

    const handleEnded = () => {
      // Move to next video, loop back to start if at end
      setCurrentVideoIndex((prev) => (prev + 1) % videoUrls.length);
    };

    const handleLoadedData = () => {
      // Try to play (may fail on mobile without user interaction)
      video.play().catch(() => {
        // Autoplay blocked, that's okay for background video
        console.log('Autoplay blocked, video will play on user interaction');
      });
    };

    video.addEventListener('ended', handleEnded);
    video.addEventListener('loadeddata', handleLoadedData);

    // Set current video source
    video.src = videoUrls[currentVideoIndex];
    video.load();

    return () => {
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [currentVideoIndex, videoUrls]);

  // Update video source when index changes
  useEffect(() => {
    if (videoRef.current && videoUrls.length > 0) {
      const video = videoRef.current;
      video.src = videoUrls[currentVideoIndex];
      video.load();
      video.play().catch(() => {
        // Autoplay may be blocked
      });
    }
  }, [currentVideoIndex, videoUrls]);

  if (videoUrls.length === 0) {
    return null;
  }

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          minWidth: '100%',
          minHeight: '100%',
          objectFit: 'cover',
        }}
      />
      {/* Dark overlay for better text readability */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-dark via-dark-gray to-dark opacity-80"
      />
      {/* Smooth fade to parallax at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent z-10" />
    </div>
  );
};

export default VideoBackground;

