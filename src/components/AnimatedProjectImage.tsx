import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedProjectImageProps {
  projectId: string;
  title: string;
}

const AnimatedProjectImage: React.FC<AnimatedProjectImageProps> = ({ projectId, title }) => {
  const getAnimationContent = () => {
    switch (projectId) {
      case 'cursorflow':
        return (
          <div style={{ 
            position: 'relative', 
            width: '100%', 
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#6366f1'
          }}>
            <div style={{ fontSize: '48px', animation: 'pulse 2s infinite' }}>🖱️</div>
            <div style={{ 
              position: 'absolute', 
              top: '20%', 
              left: '20%', 
              width: '8px', 
              height: '8px', 
              background: '#fbbf24', 
              borderRadius: '50%',
              animation: 'bounce 1s infinite'
            }}></div>
            <div style={{ 
              position: 'absolute', 
              bottom: '20px', 
              left: '50%', 
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '2px'
            }}>
              {[...Array(10)].map((_, i) => (
                <div 
                  key={i} 
                  style={{ 
                    width: '3px', 
                    height: '20px', 
                    background: '#6366f1',
                    animation: `pulse ${0.5 + i * 0.1}s infinite`
                  }}
                ></div>
              ))}
            </div>
          </div>
        );

      case 'clonebox':
        return (
          <div style={{ 
            position: 'relative', 
            width: '100%', 
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#10b981'
          }}>
            <div style={{ fontSize: '48px', animation: 'pulse 2s infinite' }}>💾</div>
            <div style={{ 
              width: '200px', 
              height: '8px', 
              background: '#374151', 
              borderRadius: '4px',
              marginTop: '20px',
              overflow: 'hidden'
            }}>
              <div style={{ 
                height: '100%', 
                background: '#3b82f6',
                borderRadius: '4px',
                animation: 'progress 4s infinite'
              }}></div>
            </div>
          </div>
        );

      case 'neural-dreams':
        return (
          <div style={{ 
            position: 'relative', 
            width: '100%', 
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#8b5cf6'
          }}>
            <div style={{ fontSize: '48px', animation: 'pulse 2s infinite' }}>🧠</div>
            <div style={{ 
              position: 'absolute', 
              top: '20%', 
              left: '30%', 
              width: '6px', 
              height: '6px', 
              background: '#fbbf24', 
              borderRadius: '50%',
              animation: 'bounce 1.5s infinite'
            }}></div>
            <div style={{ 
              position: 'absolute', 
              top: '30%', 
              right: '30%', 
              width: '6px', 
              height: '6px', 
              background: '#ec4899', 
              borderRadius: '50%',
              animation: 'bounce 1.8s infinite'
            }}></div>
          </div>
        );

      case 'living-posters':
        return (
          <div style={{ 
            position: 'relative', 
            width: '100%', 
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ef4444'
          }}>
            <div style={{ fontSize: '48px', animation: 'pulse 2s infinite' }}>🎨</div>
            <div style={{ 
              position: 'absolute', 
              top: '20%', 
              left: '20%', 
              width: '4px', 
              height: '4px', 
              background: '#fbbf24', 
              borderRadius: '50%',
              animation: 'bounce 2s infinite'
            }}></div>
            <div style={{ 
              position: 'absolute', 
              bottom: '20%', 
              right: '20%', 
              width: '4px', 
              height: '4px', 
              background: '#8b5cf6', 
              borderRadius: '50%',
              animation: 'bounce 2.5s infinite'
            }}></div>
          </div>
        );

      case 'virtual-dj':
        return (
          <div style={{ 
            position: 'relative', 
            width: '100%', 
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#f59e0b'
          }}>
            <div style={{ fontSize: '48px', animation: 'spin 3s linear infinite' }}>🎵</div>
            <div style={{ 
              position: 'absolute', 
              bottom: '20px', 
              left: '50%', 
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '2px'
            }}>
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i} 
                  style={{ 
                    width: '4px', 
                    height: '20px', 
                    background: '#f59e0b',
                    animation: `pulse ${0.3 + i * 0.1}s infinite`
                  }}
                ></div>
              ))}
            </div>
          </div>
        );

      case 'modular-synth':
        return (
          <div style={{ 
            position: 'relative', 
            width: '100%', 
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#06b6d4'
          }}>
            <div style={{ fontSize: '48px', animation: 'pulse 2s infinite' }}>🎛️</div>
            <div style={{ 
              position: 'absolute', 
              bottom: '20px', 
              left: '50%', 
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '2px'
            }}>
              {[...Array(12)].map((_, i) => (
                <div 
                  key={i} 
                  style={{ 
                    width: '4px', 
                    height: '25px', 
                    background: '#06b6d4',
                    animation: `pulse ${0.2 + i * 0.05}s infinite`
                  }}
                ></div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: 'white'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '8px' }}>🌐</div>
            <div style={{ fontSize: '18px', color: '#9ca3af' }}>{title}</div>
          </div>
        );
    }
  };

  return (
    <motion.div 
      style={{ width: '100%', height: '100%' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {getAnimationContent()}
    </motion.div>
  );
};

export default AnimatedProjectImage;
