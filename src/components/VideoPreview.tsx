import React, { useEffect, useRef } from 'react';

interface VideoPreviewProps {
  videoUrl: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  className?: string;
}

/**
 * Extracts YouTube video ID from various YouTube URL formats
 */
const extractYouTubeId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return null;
};

/**
 * Checks if URL is a YouTube URL
 */
const isYouTubeUrl = (url: string): boolean => {
  return /youtube\.com|youtu\.be/.test(url);
};

const VideoPreview: React.FC<VideoPreviewProps> = ({
  videoUrl,
  autoplay = true,
  muted = true,
  loop = true,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isYouTubeUrl(videoUrl)) return;

    const videoId = extractYouTubeId(videoUrl);
    if (!videoId) return;

    // Create iframe for YouTube embed
    const iframe = document.createElement('iframe');
    // YouTube embed parameters: autoplay, mute, loop, controls off, no related videos
    const params = new URLSearchParams({
      autoplay: autoplay ? '1' : '0',
      mute: muted ? '1' : '0',
      loop: loop ? '1' : '0',
      playlist: loop ? videoId : '',
      controls: '0',
      modestbranding: '1',
      rel: '0',
      showinfo: '0',
      iv_load_policy: '3',
      playsinline: '1',
      enablejsapi: '1',
    });
    
    iframe.src = `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
    iframe.frameBorder = '0';
    iframe.allow = 'autoplay; encrypted-media; accelerometer; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.position = 'absolute';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.border = 'none';

    container.appendChild(iframe);

    return () => {
      if (container && container.contains(iframe)) {
        container.removeChild(iframe);
      }
    };
  }, [videoUrl, autoplay, muted, loop]);

  // If it's a local video file, use HTML5 video element
  if (!isYouTubeUrl(videoUrl)) {
    return (
      <div className={`relative w-full h-full overflow-hidden ${className}`}>
        <video
          src={videoUrl}
          autoPlay={autoplay}
          muted={muted}
          loop={loop}
          playsInline
          className="w-full h-full object-cover"
          style={{ pointerEvents: 'none' }}
        />
      </div>
    );
  }

  // YouTube embed container
  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden bg-black ${className}`}
    />
  );
};

export default VideoPreview;

