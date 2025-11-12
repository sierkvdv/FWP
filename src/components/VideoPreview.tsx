import React, { useEffect, useRef, useState } from 'react';
import { Play, ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface VideoPreviewProps {
  videoUrl: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  className?: string;
  onClick?: () => void;
  interactive?: boolean; // If true, shows play button on iOS. If false, just shows thumbnail (for cards)
  showYouTubeButton?: boolean; // If true, shows a button to open video on YouTube
  overlayOpacity?: number; // Overlay opacity (0-1), default 0.3
}

/**
 * Detects if the user is on iOS
 */
const isIOS = (): boolean => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) || 
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
};

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
  onClick,
  interactive = false,
  showYouTubeButton = false,
  overlayOpacity = 0.3,
}) => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isIOSDevice, setIsIOSDevice] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    setIsIOSDevice(isIOS());
  }, []);

  // Reset iframe loaded state when playing state changes
  useEffect(() => {
    if (!isPlaying) {
      setIframeLoaded(false);
    }
  }, [isPlaying]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isYouTubeUrl(videoUrl)) return;
    
    // On iOS, don't autoplay - show thumbnail instead
    if (isIOSDevice && !isPlaying) return;

    const videoId = extractYouTubeId(videoUrl);
    if (!videoId) return;

    // Create iframe for YouTube embed
    const iframe = document.createElement('iframe');
    iframeRef.current = iframe;
    
    // YouTube embed parameters: autoplay, mute, loop, controls off, no related videos
    const params = new URLSearchParams({
      autoplay: (isIOSDevice && isPlaying) || (!isIOSDevice && autoplay) ? '1' : '0',
      mute: muted ? '1' : '0',
      loop: loop ? '1' : '0',
      playlist: loop ? videoId : '',
      controls: isIOSDevice ? '1' : '0', // Show controls on iOS for better UX
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
    iframe.style.position = 'absolute';
    iframe.style.top = '50%';
    iframe.style.left = '50%';
    iframe.style.transform = 'translate(-50%, -50%) scale(1.05)';
    iframe.style.minWidth = '100%';
    iframe.style.minHeight = '100%';
    iframe.style.width = '177.77vh';
    iframe.style.height = '100vh';
    iframe.style.border = 'none';
    iframe.style.objectFit = 'cover';
    iframe.style.zIndex = '30';
    
    iframe.onload = () => {
      setIframeLoaded(true);
    };

    container.appendChild(iframe);

    return () => {
      if (container && container.contains(iframe)) {
        container.removeChild(iframe);
      }
      iframeRef.current = null;
    };
  }, [videoUrl, autoplay, muted, loop, isIOSDevice, isPlaying]);

  const handlePlayClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isIOSDevice) {
      setIsPlaying(true);
      if (onClick) {
        onClick();
      }
    }
  };

  // If it's a local video file, use HTML5 video element
  if (!isYouTubeUrl(videoUrl)) {
    return (
      <div className={`relative w-full h-full overflow-hidden ${className}`}>
        <video
          ref={videoRef}
          src={videoUrl}
          autoPlay={autoplay && !isIOSDevice}
          muted={muted}
          loop={loop}
          playsInline
          className="w-full h-full object-cover"
          style={{ pointerEvents: isIOSDevice && !isPlaying ? 'auto' : 'none' }}
          onClick={isIOSDevice && !isPlaying ? () => {
            if (videoRef.current) {
              videoRef.current.play();
              setIsPlaying(true);
            }
          } : undefined}
        />
        {/* Dark blue overlay filter - lighter */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ 
            backgroundColor: `rgba(30, 41, 59, ${overlayOpacity})`
          }}
        />
        {/* Play button for iOS local videos */}
        {isIOSDevice && !isPlaying && (
          <div 
            className="absolute inset-0 flex items-center justify-center z-20"
            style={{ pointerEvents: 'none' }}
          >
            <div 
              className="bg-black/60 rounded-full p-6 transition-all duration-200 active:scale-95"
              style={{
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
              }}
            >
              <Play size={56} className="text-white fill-white" style={{ marginLeft: '6px' }} />
            </div>
          </div>
        )}
        {/* YouTube button - always visible if showYouTubeButton is true */}
        {showYouTubeButton && isYouTubeUrl(videoUrl) && (
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 right-4 z-30 flex items-center gap-2 bg-black/70 hover:bg-black/90 text-white px-4 py-2 rounded-lg transition-all duration-200 active:scale-95"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <ExternalLink size={18} />
            <span className="text-sm font-medium">{t('common.youtube')}</span>
          </a>
        )}
      </div>
    );
  }

  // Extract video ID once for all YouTube operations
  const videoId = extractYouTubeId(videoUrl);
  const thumbnailUrl = videoId 
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : '';

  // On iOS, show thumbnail (with or without play button depending on interactive prop)
  if (isIOSDevice && !isPlaying && videoId) {
    return (
      <div
        className={`relative w-full h-full overflow-hidden bg-black ${className}`}
        style={{ 
          cursor: interactive ? 'pointer' : 'default',
          WebkitTapHighlightColor: 'transparent',
        }}
        onClick={interactive ? handlePlayClick : undefined}
        onTouchEnd={interactive ? handlePlayClick : undefined}
      >
        {/* Thumbnail image */}
        <img
          src={thumbnailUrl}
          alt="Video thumbnail"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) scale(1.05)',
            minWidth: '100%',
            minHeight: '100%',
            width: '177.77vh',
            height: '100vh',
            objectFit: 'cover',
            pointerEvents: 'none',
          }}
        />
        {/* Dark blue overlay filter - lighter */}
        <div 
          className="absolute inset-0 pointer-events-none z-10"
          style={{ 
            backgroundColor: `rgba(30, 41, 59, ${overlayOpacity})`
          }}
        />
        {/* Play button overlay - only show if interactive */}
        {interactive && (
          <div 
            className="absolute inset-0 flex items-center justify-center z-20"
            style={{ pointerEvents: 'none' }}
          >
            <div 
              className="bg-black/60 rounded-full p-6 transition-all duration-200 active:scale-95"
              style={{
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
              }}
            >
              <Play size={56} className="text-white fill-white" style={{ marginLeft: '6px' }} />
            </div>
          </div>
        )}
        {/* YouTube button - always visible if showYouTubeButton is true */}
        {showYouTubeButton && (
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 right-4 z-30 flex items-center gap-2 bg-black/70 hover:bg-black/90 text-white px-4 py-2 rounded-lg transition-all duration-200 active:scale-95"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <ExternalLink size={18} />
            <span className="text-sm font-medium">{t('common.youtube')}</span>
          </a>
        )}
      </div>
    );
  }

  // Show thumbnail in background while iframe loads (for iOS)
  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden bg-black ${className}`}
    >
      {/* Thumbnail background - show while iframe loads on iOS */}
      {isIOSDevice && !iframeLoaded && thumbnailUrl && (
        <img
          src={thumbnailUrl}
          alt="Video thumbnail"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) scale(1.05)',
            minWidth: '100%',
            minHeight: '100%',
            width: '177.77vh',
            height: '100vh',
            objectFit: 'cover',
            pointerEvents: 'none',
            zIndex: 20,
          }}
        />
      )}
      {/* Dark blue overlay filter - lighter */}
      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{ 
          backgroundColor: `rgba(30, 41, 59, ${overlayOpacity})`
        }}
      />
      {/* YouTube button - always visible if showYouTubeButton is true */}
      {showYouTubeButton && isYouTubeUrl(videoUrl) && (
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 right-4 z-30 flex items-center gap-2 bg-black/70 hover:bg-black/90 text-white px-4 py-2 rounded-lg transition-all duration-200 active:scale-95"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <ExternalLink size={18} />
          <span className="text-sm font-medium">YouTube</span>
        </a>
      )}
    </div>
  );
};

export default VideoPreview;

