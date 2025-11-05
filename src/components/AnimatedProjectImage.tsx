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
            <motion.div 
              style={{ fontSize: '48px' }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🖱️
            </motion.div>
            <motion.div 
              style={{ 
                position: 'absolute', 
                top: '20%', 
                left: '20%', 
                width: '8px', 
                height: '8px', 
                background: '#fbbf24', 
                borderRadius: '50%'
              }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <div style={{ 
              position: 'absolute', 
              bottom: '20px', 
              left: '50%', 
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '2px'
            }}>
              {[...Array(10)].map((_, i) => (
                <motion.div 
                  key={i} 
                  style={{ 
                    width: '3px', 
                    height: '20px', 
                    background: '#6366f1'
                  }}
                  animate={{ scaleY: [1, 0.5, 1] }}
                  transition={{ 
                    duration: 0.5 + i * 0.1, 
                    repeat: Infinity 
                  }}
                />
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
            <motion.div 
              style={{ fontSize: '48px' }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💾
            </motion.div>
            <div style={{ 
              width: '200px', 
              height: '8px', 
              background: '#374151', 
              borderRadius: '4px',
              marginTop: '20px',
              overflow: 'hidden'
            }}>
              <motion.div 
                style={{ 
                  height: '100%', 
                  background: '#3b82f6',
                  borderRadius: '4px'
                }}
                animate={{ width: ['0%', '100%', '0%'] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
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
            <motion.div 
              style={{ fontSize: '48px' }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🧠
            </motion.div>
            <motion.div 
              style={{ 
                position: 'absolute', 
                top: '20%', 
                left: '30%', 
                width: '6px', 
                height: '6px', 
                background: '#fbbf24', 
                borderRadius: '50%'
              }}
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.div 
              style={{ 
                position: 'absolute', 
                top: '30%', 
                right: '30%', 
                width: '6px', 
                height: '6px', 
                background: '#ec4899', 
                borderRadius: '50%'
              }}
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
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
            <motion.div 
              style={{ fontSize: '48px' }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🎨
            </motion.div>
            <motion.div 
              style={{ 
                position: 'absolute', 
                top: '20%', 
                left: '20%', 
                width: '4px', 
                height: '4px', 
                background: '#fbbf24', 
                borderRadius: '50%'
              }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div 
              style={{ 
                position: 'absolute', 
                bottom: '20%', 
                right: '20%', 
                width: '4px', 
                height: '4px', 
                background: '#8b5cf6', 
                borderRadius: '50%'
              }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
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
            <motion.div 
              style={{ fontSize: '48px' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              🎵
            </motion.div>
            <div style={{ 
              position: 'absolute', 
              bottom: '20px', 
              left: '50%', 
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '2px'
            }}>
              {[...Array(8)].map((_, i) => (
                <motion.div 
                  key={i} 
                  style={{ 
                    width: '4px', 
                    height: '20px', 
                    background: '#f59e0b'
                  }}
                  animate={{ scaleY: [1, 0.3, 1] }}
                  transition={{ 
                    duration: 0.3 + i * 0.1, 
                    repeat: Infinity 
                  }}
                />
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
            <motion.div 
              style={{ fontSize: '48px' }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🎛️
            </motion.div>
            <div style={{ 
              position: 'absolute', 
              bottom: '20px', 
              left: '50%', 
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '2px'
            }}>
              {[...Array(12)].map((_, i) => (
                <motion.div 
                  key={i} 
                  style={{ 
                    width: '4px', 
                    height: '25px', 
                    background: '#06b6d4'
                  }}
                  animate={{ scaleY: [1, 0.4, 1] }}
                  transition={{ 
                    duration: 0.2 + i * 0.05, 
                    repeat: Infinity 
                  }}
                />
              ))}
            </div>
          </div>
        );

      case 'ai-album-gen':
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
            <motion.div 
              style={{ fontSize: '48px' }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🤖
            </motion.div>
            <motion.div 
              style={{ 
                position: 'absolute', 
                top: '20%', 
                left: '20%', 
                width: '8px', 
                height: '8px', 
                background: '#8b5cf6', 
                borderRadius: '50%'
              }}
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.div 
              style={{ 
                position: 'absolute', 
                top: '30%', 
                right: '20%', 
                width: '6px', 
                height: '6px', 
                background: '#ec4899', 
                borderRadius: '50%'
              }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        );

      case 'game-of-life':
        return (
          <div style={{ 
            position: 'relative', 
            width: '100%', 
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#10b981'
          }}>
            <motion.div 
              style={{ fontSize: '48px' }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🔬
            </motion.div>
            <div style={{ 
              position: 'absolute', 
              bottom: '20px', 
              left: '50%', 
              transform: 'translateX(-50%)',
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 8px)',
              gap: '2px'
            }}>
              {[...Array(16)].map((_, i) => (
                <motion.div 
                  key={i} 
                  style={{ 
                    width: '6px', 
                    height: '6px', 
                    background: '#10b981',
                    borderRadius: '1px'
                  }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ 
                    duration: 1 + i * 0.1, 
                    repeat: Infinity 
                  }}
                />
              ))}
            </div>
          </div>
        );

      case 'codebuddy':
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
            <motion.div 
              style={{ fontSize: '48px' }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🤖
            </motion.div>
            <motion.div 
              style={{ 
                position: 'absolute', 
                top: '20%', 
                left: '20%', 
                width: '6px', 
                height: '6px', 
                background: '#10b981', 
                borderRadius: '50%'
              }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.div 
              style={{ 
                position: 'absolute', 
                top: '30%', 
                right: '20%', 
                width: '6px', 
                height: '6px', 
                background: '#3b82f6', 
                borderRadius: '50%'
              }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
          </div>
        );

      case 'patch-field':
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
            <motion.div 
              style={{ fontSize: '48px' }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🔌
            </motion.div>
            <motion.div 
              style={{ 
                position: 'absolute', 
                top: '20%', 
                left: '20%', 
                width: '8px', 
                height: '8px', 
                background: '#a855f7', 
                borderRadius: '50%'
              }}
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div 
              style={{ 
                position: 'absolute', 
                top: '30%', 
                right: '20%', 
                width: '8px', 
                height: '8px', 
                background: '#c084fc', 
                borderRadius: '50%'
              }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
          </div>
        );

      case 'blastfield':
        return (
          <div style={{ 
            position: 'relative', 
            width: '100%', 
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#dc2626'
          }}>
            <motion.div 
              style={{ fontSize: '48px' }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              💥
            </motion.div>
            <motion.div 
              style={{ 
                position: 'absolute', 
                top: '20%', 
                left: '20%', 
                width: '6px', 
                height: '6px', 
                background: '#ef4444', 
                borderRadius: '50%'
              }}
              animate={{ scale: [1, 2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <motion.div 
              style={{ 
                position: 'absolute', 
                top: '30%', 
                right: '20%', 
                width: '6px', 
                height: '6px', 
                background: '#f87171', 
                borderRadius: '50%'
              }}
              animate={{ scale: [1, 1.8, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
          </div>
        );

      case 'washly':
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
            <motion.div 
              style={{ fontSize: '48px' }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🧺
            </motion.div>
            <motion.div 
              style={{ 
                position: 'absolute', 
                top: '20%', 
                left: '20%', 
                width: '6px', 
                height: '6px', 
                background: '#0891b2', 
                borderRadius: '50%'
              }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div 
              style={{ 
                position: 'absolute', 
                top: '30%', 
                right: '20%', 
                width: '6px', 
                height: '6px', 
                background: '#0e7490', 
                borderRadius: '50%'
              }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
          </div>
        );

      case 'charge-guard':
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
            <motion.div 
              style={{ fontSize: '48px' }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🔋
            </motion.div>
            <motion.div 
              style={{ 
                position: 'absolute', 
                top: '20%', 
                left: '20%', 
                width: '6px', 
                height: '6px', 
                background: '#fbbf24', 
                borderRadius: '50%'
              }}
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.div 
              style={{ 
                position: 'absolute', 
                top: '30%', 
                right: '20%', 
                width: '6px', 
                height: '6px', 
                background: '#fde047', 
                borderRadius: '50%'
              }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        );

      case 'atelier-ai':
        return (
          <div style={{ 
            position: 'relative', 
            width: '100%', 
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#6ee7ff'
          }}>
            {/* Prisma/Diamond shape representing A+I logo concept */}
            <motion.div
              style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #6ee7ff 0%, #a78bfa 100%)',
                clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
                position: 'relative'
              }}
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity }
              }}
            />
            {/* Cyan accent dots */}
            <motion.div 
              style={{ 
                position: 'absolute', 
                top: '20%', 
                left: '20%', 
                width: '8px', 
                height: '8px', 
                background: '#6ee7ff', 
                borderRadius: '50%'
              }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div 
              style={{ 
                position: 'absolute', 
                top: '30%', 
                right: '20%', 
                width: '8px', 
                height: '8px', 
                background: '#a78bfa', 
                borderRadius: '50%'
              }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            {/* Bottom particles representing video motion */}
            <div style={{ 
              position: 'absolute', 
              bottom: '20px', 
              left: '50%', 
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '3px'
            }}>
              {[...Array(6)].map((_, i) => (
                <motion.div 
                  key={i} 
                  style={{ 
                    width: '4px', 
                    height: '15px', 
                    background: i % 2 === 0 ? '#6ee7ff' : '#a78bfa',
                    borderRadius: '2px'
                  }}
                  animate={{ scaleY: [0.3, 1, 0.3] }}
                  transition={{ 
                    duration: 0.6 + i * 0.1, 
                    repeat: Infinity 
                  }}
                />
              ))}
            </div>
          </div>
        );

      case 'farli':
        return (
          <div style={{ 
            position: 'relative', 
            width: '100%', 
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#10b981'
          }}>
            {/* Scale of Justice - Simple and clear */}
            <div style={{ position: 'relative', width: '100px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Vertical stand - centered */}
              <div style={{
                position: 'absolute',
                bottom: '0',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '8px',
                height: '50px',
                background: '#475569',
                borderRadius: '4px'
              }} />
              
              {/* Horizontal beam - centered, rotating around middle */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: '40px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '80px',
                  height: '10px',
                  background: '#f97316',
                  borderRadius: '5px',
                  transformOrigin: 'center center'
                }}
                animate={{ 
                  rotate: [-1.5, 1.5, -1.5]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Left scale - at left end of beam */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: '50px',
                  left: '50%',
                  transform: 'translateX(calc(-50% - 40px))',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
                animate={{
                  y: [-1, 1, -1]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* Triangle connection */}
                <div style={{
                  width: '0',
                  height: '0',
                  borderLeft: '5px solid transparent',
                  borderRight: '5px solid transparent',
                  borderBottom: '8px solid #475569'
                }} />
                {/* Scale bowl */}
                <div style={{
                  width: '20px',
                  height: '12px',
                  background: '#10b981',
                  borderRadius: '50% 50% 0 0',
                  border: '2px solid #475569',
                  borderBottom: 'none'
                }} />
              </motion.div>
              
              {/* Right scale - at right end of beam */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: '50px',
                  left: '50%',
                  transform: 'translateX(calc(-50% + 40px))',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
                animate={{
                  y: [1, -1, 1]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.1
                }}
              >
                {/* Triangle connection */}
                <div style={{
                  width: '0',
                  height: '0',
                  borderLeft: '5px solid transparent',
                  borderRight: '5px solid transparent',
                  borderBottom: '8px solid #475569'
                }} />
                {/* Scale bowl */}
                <div style={{
                  width: '20px',
                  height: '12px',
                  background: '#10b981',
                  borderRadius: '50% 50% 0 0',
                  border: '2px solid #475569',
                  borderBottom: 'none'
                }} />
              </motion.div>
            </div>
            
            {/* Accent particles */}
            <motion.div 
              style={{ 
                position: 'absolute', 
                top: '20%', 
                left: '20%', 
                width: '6px', 
                height: '6px', 
                background: '#10b981', 
                borderRadius: '50%'
              }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div 
              style={{ 
                position: 'absolute', 
                top: '30%', 
                right: '20%', 
                width: '6px', 
                height: '6px', 
                background: '#f97316', 
                borderRadius: '50%'
              }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
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
