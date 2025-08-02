import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface CloneboxDemoProps {
  onClose: () => void;
}

// Drive icons from the original Clonebox
const driveIcons: Record<string, React.ReactNode> = {
  hdd: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="7" width="18" height="10" rx="3" fill="#888"/><rect x="7" y="15" width="10" height="2" rx="1" fill="#bbb"/></svg>
  ),
  usb: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="9" y="2" width="6" height="6" rx="2" fill="#2196F3"/><rect x="7" y="8" width="10" height="10" rx="2" fill="#bbb"/><rect x="10" y="18" width="4" height="2" rx="1" fill="#2196F3"/></svg>
  ),
  sd: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="5" y="4" width="14" height="16" rx="2" fill="#FFD600"/><rect x="7" y="6" width="2" height="4" rx="1" fill="#bbb"/><rect x="11" y="6" width="2" height="4" rx="1" fill="#bbb"/><rect x="15" y="6" width="2" height="4" rx="1" fill="#bbb"/></svg>
  ),
  phone: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="7" y="2" width="10" height="20" rx="3" fill="#4fd1c5"/><rect x="10" y="19" width="4" height="2" rx="1" fill="#fff"/></svg>
  ),
  default: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#bbb"/></svg>
  )
};

// Data flow animation component - only bubbles, no lines
function DataFlowAnimationConnect({ active, isDark, sourceBtnRef, destBtnRef, rowRef, sourceDotRef, destDotRef }: { 
  active: boolean, 
  isDark: boolean, 
  sourceBtnRef: React.RefObject<HTMLButtonElement | null>, 
  destBtnRef: React.RefObject<HTMLButtonElement | null>, 
  rowRef: React.RefObject<HTMLDivElement | null>, 
  sourceDotRef: React.RefObject<HTMLSpanElement | null>, 
  destDotRef: React.RefObject<HTMLSpanElement | null> 
}) {
  const [coords, setCoords] = useState<{ x1: number; y1: number; x2: number; y2: number } | null>(null);
  const [containerSize, setContainerSize] = useState({ width: 1, height: 1 });
  const [bubbleStates, setBubbleStates] = useState<Array<{
    id: number;
    progress: number;
    speed: number;
    amplitude: number;
    phase: number;
    colorType: 'default' | 'purple' | 'green';
    size: number;
    opacity: number;
    active: boolean;
  }>>([]);

  // Create bubbles with different properties
  useEffect(() => {
    if (!active) {
      setBubbleStates([]);
      return;
    }

    const bubbles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      progress: Math.random() * 100, // Start at random positions
      speed: 0.3 + Math.random() * 1.5, // Different speeds
      amplitude: 5 + Math.random() * 15,
      phase: Math.random() * Math.PI * 2,
      colorType: (Math.random() < 0.15 ? (Math.random() < 0.5 ? 'purple' : 'green') : 'default') as 'default' | 'purple' | 'green',
      size: 2 + Math.random() * 3,
      opacity: 0.3 + Math.random() * 0.7,
      active: true // All bubbles are always active
    }));

    setBubbleStates(bubbles);
  }, [active]);

  useEffect(() => {
    function updateCoords() {
      let src, dst;
      if (sourceDotRef?.current) {
        src = sourceDotRef.current.getBoundingClientRect();
      } else if (sourceBtnRef.current) {
        src = sourceBtnRef.current.getBoundingClientRect();
      }
      if (destDotRef?.current) {
        dst = destDotRef.current.getBoundingClientRect();
      } else if (destBtnRef.current) {
        dst = destBtnRef.current.getBoundingClientRect();
      }
      if (src && dst && rowRef.current) {
        const rowRect = rowRef.current.getBoundingClientRect();
        setContainerSize({ width: rowRect.width, height: rowRect.height });
        setCoords({
          x1: src.left + src.width / 2 - rowRect.left,
          y1: src.top + src.height / 2 - rowRect.top,
          x2: dst.left + dst.width / 2 - rowRect.left,
          y2: dst.top + dst.height / 2 - rowRect.top
        });
      } else {
        setCoords(null);
      }
    }
    updateCoords();
    window.addEventListener('resize', updateCoords);
    return () => window.removeEventListener('resize', updateCoords);
  }, [sourceBtnRef, destBtnRef, active, rowRef, sourceDotRef, destDotRef]);

  // Animate bubbles continuously
  useEffect(() => {
    if (!active || !coords) return;

    const interval = setInterval(() => {
      setBubbleStates(prev => prev.map(bubble => {
        const newProgress = bubble.progress + bubble.speed;
        // When bubble reaches the end, restart from the beginning
        if (newProgress >= 100) {
          return { ...bubble, progress: 0 };
        }
        return { ...bubble, progress: newProgress };
      }));
    }, 50);

    return () => clearInterval(interval);
  }, [active, coords]);

  if (!active || !coords) return null;

  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: containerSize.width,
        height: containerSize.height,
        pointerEvents: 'none',
        zIndex: 5
      }}
    >
      {/* Only bubbles, no lines */}
      {bubbleStates.map((bubble) => {
        if (!bubble.active) return null;
        
        const t = bubble.progress / 100;
        const x = coords.x1 + (coords.x2 - coords.x1) * t;
        const y = coords.y1 + (coords.y2 - coords.y1) * t;
        
        // Wave motion
        const amplitude = bubble.amplitude * Math.sin(t * Math.PI * 2 + bubble.phase);
        const finalY = y + amplitude;
        
        // Fade effect - fade out at the end
        const fadeOpacity = t > 0.8 ? (1 - t) * 5 : bubble.opacity;
        
        let color = isDark ? '#4fd1c5' : '#007aff';
        if (bubble.colorType === 'purple') color = isDark ? '#a855f7' : '#8b5cf6';
        if (bubble.colorType === 'green') color = isDark ? '#10b981' : '#059669';
        
        return (
          <circle
            key={`${bubble.id}-${bubble.progress}`}
            cx={x}
            cy={finalY}
            r={bubble.size}
            fill={color}
            opacity={fadeOpacity}
          />
        );
      })}
    </svg>
  );
}

const CloneboxDemo: React.FC<CloneboxDemoProps> = ({ onClose }) => {
  const [isDark, setIsDark] = useState(true);
  const [mainTab, setMainTab] = useState<'backup' | 'compare' | 'autobackup'>('backup');
  const [source, setSource] = useState<number | null>(null);
  const [destination, setDestination] = useState<number | null>(null);
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'idle' | 'scanning' | 'copying' | 'completed'>('idle');
  
  // Refs for animation
  const sourceBtnRef = useRef<HTMLButtonElement>(null);
  const destBtnRef = useRef<HTMLButtonElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const sourceDotRef = useRef<HTMLSpanElement>(null);
  const destDotRef = useRef<HTMLSpanElement>(null);

  // Mock drives data
  const drives = [
    { id: 1, name: 'System Drive (C:)', size: '512 GB', type: 'hdd', usedSpace: '256 GB', freeSpace: '256 GB', isSystem: true, isRemovable: false },
    { id: 2, name: 'Data Drive (D:)', size: '1 TB', type: 'hdd', usedSpace: '750 GB', freeSpace: '250 GB', isSystem: false, isRemovable: false },
    { id: 3, name: 'SanDisk USB 3.0', size: '32 GB', type: 'usb', usedSpace: '8 GB', freeSpace: '24 GB', isSystem: false, isRemovable: true },
    { id: 4, name: 'Backup Drive (F:)', size: '2 TB', type: 'hdd', usedSpace: '1.2 TB', freeSpace: '800 GB', isSystem: false, isRemovable: true },
  ];

  const sourceDrives = drives.filter(d => !d.isSystem);
  const destDrives = drives.filter(d => d.isRemovable);

  const handleSelectSource = (id: number) => {
    setSource(id);
  };

  const handleSelectDestination = (id: number) => {
    setDestination(id);
  };

  const startBackup = () => {
    if (!source || !destination) return;
    
    setIsBackingUp(true);
    setStatus('scanning');
    setProgress(0);

    // Simulate scanning phase
    setTimeout(() => {
      setStatus('copying');
      setProgress(10);
      
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setStatus('completed');
            setIsBackingUp(false);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 500);
    }, 2000);
  };

  const resetDemo = () => {
    setIsBackingUp(false);
    setProgress(0);
    setStatus('idle');
    setSource(null);
    setDestination(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-dark-gray rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
                 {/* Header */}
         <div className="flex justify-between items-center p-6 border-b border-gray-700">
           <div>
             <h2 className="text-2xl font-bold gradient-text">Clonebox</h2>
             <p className="text-gray-400">USB Backup Tool</p>
           </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(95vh-120px)]">
          {/* Settings bar */}
          <div className="flex justify-end mb-6">
            <div className="flex items-center gap-4 bg-gray-800 rounded-lg p-3">
              <button 
                onClick={() => setIsDark(!isDark)}
                className="text-2xl hover:scale-110 transition-transform"
                title={isDark ? 'Licht modus' : 'Donker modus'}
              >
                {isDark ? '🌙' : '☀️'}
              </button>
            </div>
          </div>

          {/* Main tab navigation */}
          <div className="flex justify-center mb-8 border-b border-gray-700">
            <button
              onClick={() => setMainTab('backup')}
              className={`flex-1 py-4 px-6 font-bold text-lg transition-all ${
                mainTab === 'backup' 
                  ? 'border-b-4 border-accent text-accent' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              💾 Backup
            </button>
            <button
              onClick={() => setMainTab('compare')}
              className={`flex-1 py-4 px-6 font-bold text-lg transition-all ${
                mainTab === 'compare' 
                  ? 'border-b-4 border-accent text-accent' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              🩺 Vergelijk & Herstel
            </button>
            <button
              onClick={() => setMainTab('autobackup')}
              className={`flex-1 py-4 px-6 font-bold text-lg transition-all ${
                mainTab === 'autobackup' 
                  ? 'border-b-4 border-accent text-accent' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              ⚙️ Auto-backup
            </button>
          </div>

          {mainTab === 'backup' && (
            <div className="flex flex-col items-center gap-10">
              {/* Main Content */}
              <div 
                className="w-full flex items-center justify-center gap-16 relative"
                ref={rowRef}
              >
                {/* Source Selector */}
                <div className={`flex-1 max-w-md rounded-3xl p-8 ${
                  isDark 
                    ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600' 
                    : 'bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300'
                }`}>
                  <h2 className={`text-3xl font-bold mb-7 uppercase tracking-wider ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                    Source
                  </h2>
                  <div className="space-y-4">
                    {sourceDrives.map((drive) => (
                      <div key={drive.id} className="relative">
                        <button
                          ref={source === drive.id ? sourceBtnRef : undefined}
                          className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                            source === drive.id
                              ? 'border-accent bg-accent/20 text-accent shadow-lg'
                              : isDark 
                                ? 'border-transparent bg-white/5 text-white hover:border-gray-500'
                                : 'border-transparent bg-white/70 text-gray-800 hover:border-gray-400'
                          } ${isBackingUp ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                          onClick={() => !isBackingUp && handleSelectSource(drive.id)}
                          disabled={isBackingUp}
                        >
                          <div className="flex items-center gap-3">
                            <span className="flex items-center">
                              {driveIcons[drive.type] || driveIcons.default}
                            </span>
                            <div className="flex flex-col">
                              <span className="font-bold text-lg">{drive.name}</span>
                            </div>
                          </div>
                          <div className="mt-3 space-y-1">
                            <div className="text-sm text-gray-400"><b>Grootte:</b> {drive.size}</div>
                            <div className="text-sm text-gray-400"><b>Gebruikt:</b> {drive.usedSpace}</div>
                            <div className="text-sm text-gray-400"><b>Vrij:</b> {drive.freeSpace}</div>
                          </div>
                          {source === drive.id && (
                            <span ref={sourceDotRef} className="absolute left-1/2 top-1/2 w-0 h-0" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <DataFlowAnimationConnect
                  active={!!(source && destination)}
                  isDark={isDark}
                  sourceBtnRef={sourceBtnRef}
                  destBtnRef={destBtnRef}
                  rowRef={rowRef}
                  sourceDotRef={sourceDotRef}
                  destDotRef={destDotRef}
                />

                {/* Destination Selector */}
                <div className={`flex-1 max-w-md rounded-3xl p-8 ${
                  isDark 
                    ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600' 
                    : 'bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300'
                }`}>
                  <h2 className={`text-3xl font-bold mb-7 uppercase tracking-wider ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                    Destination
                  </h2>
                  <div className="space-y-4">
                    {destDrives.map((drive) => (
                      <div key={drive.id} className="relative">
                        <button
                          ref={destination === drive.id ? destBtnRef : undefined}
                          className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                            destination === drive.id
                              ? 'border-accent bg-accent/20 text-accent shadow-lg'
                              : isDark 
                                ? 'border-transparent bg-white/5 text-white hover:border-gray-500'
                                : 'border-transparent bg-white/70 text-gray-800 hover:border-gray-400'
                          } ${isBackingUp ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                          onClick={() => !isBackingUp && handleSelectDestination(drive.id)}
                          disabled={isBackingUp}
                        >
                          <div className="flex items-center gap-3">
                            <span className="flex items-center">
                              {driveIcons[drive.type] || driveIcons.default}
                            </span>
                            <div className="flex flex-col">
                              <span className="font-bold text-lg">{drive.name}</span>
                            </div>
                          </div>
                          <div className="mt-3 space-y-1">
                            <div className="text-sm text-gray-400"><b>Grootte:</b> {drive.size}</div>
                            <div className="text-sm text-gray-400"><b>Gebruikt:</b> {drive.usedSpace}</div>
                            <div className="text-sm text-gray-400"><b>Vrij:</b> {drive.freeSpace}</div>
                          </div>
                          {destination === drive.id && (
                            <span ref={destDotRef} className="absolute left-1/2 top-1/2 w-0 h-0" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Progress Section */}
              {source && destination && (
                <div className="w-full max-w-2xl">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-white">Backup Progress</h3>
                    <div className="flex gap-2">
                      {!isBackingUp && status === 'idle' && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={startBackup}
                          className="px-6 py-3 bg-accent text-dark font-bold rounded-lg hover:bg-accent/90 transition-colors"
                        >
                          Start Backup
                        </motion.button>
                      )}
                      {status === 'completed' && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={resetDemo}
                          className="px-6 py-3 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors"
                        >
                          Reset
                        </motion.button>
                      )}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="bg-dark rounded-lg p-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-gray-400">
                        {status === 'scanning' && 'Scanning files...'}
                        {status === 'copying' && 'Copying files...'}
                        {status === 'completed' && 'Backup completed!'}
                      </span>
                      <span className="text-accent font-mono font-bold">{Math.round(progress)}%</span>
                    </div>

                    <div className="w-full bg-gray-700 rounded-full h-4">
                      <motion.div
                        className="bg-gradient-to-r from-accent to-green-500 h-4 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>

                    {status === 'completed' && (
                      <div className="flex items-center gap-2 mt-3 text-green-400">
                        <span className="text-xl">✅</span>
                        <span className="font-semibold">Backup completed successfully!</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
                <div className="p-6 bg-dark rounded-xl">
                  <h4 className="font-bold text-white mb-3">Real-time Progress</h4>
                  <p className="text-sm text-gray-400">Live progress tracking with detailed status updates</p>
                </div>
                <div className="p-6 bg-dark rounded-xl">
                  <h4 className="font-bold text-white mb-3">Error Handling</h4>
                  <p className="text-sm text-gray-400">Advanced error detection and recovery mechanisms</p>
                </div>
                <div className="p-6 bg-dark rounded-xl">
                  <h4 className="font-bold text-white mb-3">Cross-platform</h4>
                  <p className="text-sm text-gray-400">Works on Windows, macOS, and Linux</p>
                </div>
              </div>
            </div>
          )}

          {mainTab === 'compare' && (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-white mb-4">Vergelijk & Herstel</h3>
              <p className="text-gray-400">Deze functionaliteit is beschikbaar in de volledige Clonebox applicatie</p>
            </div>
          )}

          {mainTab === 'autobackup' && (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-white mb-4">Auto-backup</h3>
              <p className="text-gray-400">Deze functionaliteit is beschikbaar in de volledige Clonebox applicatie</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CloneboxDemo; 