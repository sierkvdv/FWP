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
              style={{ 
                fontSize: '48px',
                display: 'inline-block',
                transformOrigin: 'center center',
                willChange: 'transform'
              }}
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
            {/* Scale of Justice - SIMPLE, CLEAR, SYMMETRIC */}
            <div style={{ 
              position: 'relative', 
              width: '100px', 
              height: '80px',
              margin: '0 auto'
            }}>
              {/* Vertical stand - CENTER */}
              <div style={{
                position: 'absolute',
                bottom: '0',
                left: '46px', // (100px - 8px) / 2 = 46px to center an 8px wide element
                width: '8px',
                height: '50px',
                background: '#475569',
                borderRadius: '4px'
              }} />
              
              {/* Horizontal beam - CENTERED, 80px wide, centered at x=50px */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: '45px',
                  left: '10px', // (100px - 80px) / 2 = 10px
                  width: '80px',
                  height: '10px',
                  background: '#f97316',
                  borderRadius: '5px',
                  transformOrigin: '50% 50%'
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
              
              {/* Left scale - at x=10px (left end of beam), aligned to start */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: '55px',
                  left: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  transform: 'translateX(0)'
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
                {/* Triangle connection - centered at left end */}
                <div style={{
                  width: '0',
                  height: '0',
                  borderLeft: '5px solid transparent',
                  borderRight: '5px solid transparent',
                  borderBottom: '8px solid #475569',
                  marginLeft: '0px'
                }} />
                {/* Scale bowl */}
                <div style={{
                  width: '20px',
                  height: '12px',
                  background: '#10b981',
                  borderRadius: '50% 50% 0 0',
                  border: '2px solid #475569',
                  borderBottom: 'none',
                  marginLeft: '0px'
                }} />
              </motion.div>
              
              {/* Right scale - at x=90px (right end of beam), aligned to end */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: '55px',
                  left: '90px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  transform: 'translateX(-100%)'
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

      case 'sumiko':
        return (
          <div style={{ 
            position: 'relative', 
            width: '100%', 
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0f172a'
          }}>
            <svg width="100%" height="100%" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="sumikoTeaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor:'#059669',stopOpacity:1}} />
                  <stop offset="100%" style={{stopColor:'#047857',stopOpacity:1}} />
                </linearGradient>
                <linearGradient id="sumikoCupGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor:'#f3f4f6',stopOpacity:1}} />
                  <stop offset="100%" style={{stopColor:'#e5e7eb',stopOpacity:1}} />
                </linearGradient>
                <radialGradient id="sumikoSteamGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" style={{stopColor:'#ffffff',stopOpacity:0.8}} />
                  <stop offset="100%" style={{stopColor:'#ffffff',stopOpacity:0}} />
                </radialGradient>
                <radialGradient id="sumikoLeafGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" style={{stopColor:'#10b981',stopOpacity:0.9}} />
                  <stop offset="100%" style={{stopColor:'#059669',stopOpacity:0.6}} />
                </radialGradient>
                <radialGradient id="sumikoGlowGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" style={{stopColor:'#10b981',stopOpacity:0.4}} />
                  <stop offset="100%" style={{stopColor:'#10b981',stopOpacity:0}} />
                </radialGradient>
                <filter id="sumikoGlow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              <rect width="400" height="300" fill="#0f172a" opacity="0.1"/>
              
              <g id="tea-cup">
                <ellipse cx="200" cy="200" rx="50" ry="15" fill="url(#sumikoCupGradient)" opacity="0.9"/>
                <path d="M 150 200 Q 150 180 160 180 L 240 180 Q 250 180 250 200" 
                      fill="url(#sumikoCupGradient)" stroke="#d1d5db" strokeWidth="1" opacity="0.9"/>
                <ellipse cx="200" cy="190" rx="45" ry="8" fill="url(#sumikoTeaGradient)" opacity="0.8">
                  <animate attributeName="opacity" values="0.7;0.9;0.7" dur="3s" repeatCount="indefinite"/>
                </ellipse>
                <ellipse cx="200" cy="188" rx="30" ry="3" fill="#ffffff" opacity="0.3">
                  <animate attributeName="opacity" values="0.2;0.4;0.2" dur="2s" repeatCount="indefinite"/>
                </ellipse>
              </g>
              
              <g id="steam">
                <path d="M 180 180 Q 175 160 180 140 Q 185 120 180 100" 
                      fill="none" stroke="url(#sumikoSteamGradient)" strokeWidth="3" opacity="0.6" strokeLinecap="round">
                  <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite"/>
                  <animate attributeName="d" 
                           values="M 180 180 Q 175 160 180 140 Q 185 120 180 100;M 180 180 Q 185 160 180 140 Q 175 120 180 100;M 180 180 Q 175 160 180 140 Q 185 120 180 100" 
                           dur="4s" repeatCount="indefinite"/>
                </path>
                <path d="M 200 180 Q 200 160 200 140 Q 200 120 200 100" 
                      fill="none" stroke="url(#sumikoSteamGradient)" strokeWidth="3" opacity="0.7" strokeLinecap="round">
                  <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3.5s" repeatCount="indefinite"/>
                  <animate attributeName="d" 
                           values="M 200 180 Q 200 160 200 140 Q 200 120 200 100;M 200 180 Q 205 160 200 140 Q 195 120 200 100;M 200 180 Q 200 160 200 140 Q 200 120 200 100" 
                           dur="4.5s" repeatCount="indefinite"/>
                </path>
                <path d="M 220 180 Q 225 160 220 140 Q 215 120 220 100" 
                      fill="none" stroke="url(#sumikoSteamGradient)" strokeWidth="3" opacity="0.5" strokeLinecap="round">
                  <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3.2s" repeatCount="indefinite"/>
                  <animate attributeName="d" 
                           values="M 220 180 Q 225 160 220 140 Q 215 120 220 100;M 220 180 Q 215 160 220 140 Q 225 120 220 100;M 220 180 Q 225 160 220 140 Q 215 120 220 100" 
                           dur="4.2s" repeatCount="indefinite"/>
                </path>
                <circle cx="180" cy="130" r="2" fill="url(#sumikoSteamGradient)" opacity="0.5">
                  <animate attributeName="cy" values="130;80;130" dur="4s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.5;0;0.5" dur="4s" repeatCount="indefinite"/>
                  <animate attributeName="cx" values="180;175;180" dur="4s" repeatCount="indefinite"/>
                </circle>
                <circle cx="200" cy="120" r="1.5" fill="url(#sumikoSteamGradient)" opacity="0.6">
                  <animate attributeName="cy" values="120;70;120" dur="4.5s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.6;0;0.6" dur="4.5s" repeatCount="indefinite"/>
                  <animate attributeName="cx" values="200;205;200" dur="4.5s" repeatCount="indefinite"/>
                </circle>
                <circle cx="220" cy="125" r="2" fill="url(#sumikoSteamGradient)" opacity="0.4">
                  <animate attributeName="cy" values="125;75;125" dur="4.2s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.4;0;0.4" dur="4.2s" repeatCount="indefinite"/>
                  <animate attributeName="cx" values="220;225;220" dur="4.2s" repeatCount="indefinite"/>
                </circle>
              </g>
              
              <g id="tea-leaves">
                <ellipse cx="120" cy="100" rx="8" ry="4" fill="url(#sumikoLeafGradient)" opacity="0.7" transform="rotate(45 120 100)">
                  <animate attributeName="cy" values="100;60;100" dur="6s" repeatCount="indefinite"/>
                  <animate attributeName="cx" values="120;110;120" dur="6s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.5;0.8;0.5" dur="3s" repeatCount="indefinite"/>
                  <animateTransform attributeName="transform" type="rotate" 
                                    values="45 120 100;50 120 100;45 120 100" 
                                    dur="4s" repeatCount="indefinite"/>
                </ellipse>
                <ellipse cx="280" cy="120" rx="6" ry="3" fill="url(#sumikoLeafGradient)" opacity="0.6" transform="rotate(-30 280 120)">
                  <animate attributeName="cy" values="120;80;120" dur="7s" repeatCount="indefinite"/>
                  <animate attributeName="cx" values="280;290;280" dur="7s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.4;0.7;0.4" dur="3.5s" repeatCount="indefinite"/>
                  <animateTransform attributeName="transform" type="rotate" 
                                    values="-30 280 120;-25 280 120;-30 280 120" 
                                    dur="5s" repeatCount="indefinite"/>
                </ellipse>
                <ellipse cx="100" cy="180" rx="7" ry="3.5" fill="url(#sumikoLeafGradient)" opacity="0.65" transform="rotate(60 100 180)">
                  <animate attributeName="cy" values="180;140;180" dur="8s" repeatCount="indefinite"/>
                  <animate attributeName="cx" values="100;95;100" dur="8s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.5;0.75;0.5" dur="4s" repeatCount="indefinite"/>
                  <animateTransform attributeName="transform" type="rotate" 
                                    values="60 100 180;65 100 180;60 100 180" 
                                    dur="6s" repeatCount="indefinite"/>
                </ellipse>
                <ellipse cx="300" cy="160" rx="5" ry="2.5" fill="url(#sumikoLeafGradient)" opacity="0.55" transform="rotate(-45 300 160)">
                  <animate attributeName="cy" values="160;120;160" dur="6.5s" repeatCount="indefinite"/>
                  <animate attributeName="cx" values="300;305;300" dur="6.5s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.4;0.65;0.4" dur="3.2s" repeatCount="indefinite"/>
                  <animateTransform attributeName="transform" type="rotate" 
                                    values="-45 300 160;-40 300 160;-45 300 160" 
                                    dur="4.5s" repeatCount="indefinite"/>
                </ellipse>
              </g>
              
              <circle cx="200" cy="190" r="60" fill="url(#sumikoGlowGradient)" opacity="0.3">
                <animate attributeName="opacity" values="0.2;0.4;0.2" dur="4s" repeatCount="indefinite"/>
                <animate attributeName="r" values="60;70;60" dur="4s" repeatCount="indefinite"/>
              </circle>
            </svg>
          </div>
        );

      case 'fieldworks-atelier':
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
            {/* Abstract atelier/workshop representation */}
            <div style={{ position: 'relative', width: '80px', height: '80px' }}>
              {/* Central geometric shape - represents workspace */}
              <motion.div
                style={{
                  width: '50px',
                  height: '50px',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 12, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity }
                }}
              />
              {/* Floating particles representing ideas/tools */}
              <motion.div 
                style={{ 
                  position: 'absolute', 
                  top: '10%', 
                  left: '10%', 
                  width: '6px', 
                  height: '6px', 
                  background: '#fbbf24', 
                  borderRadius: '50%'
                }}
                animate={{ 
                  y: [0, -8, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div 
                style={{ 
                  position: 'absolute', 
                  top: '20%', 
                  right: '10%', 
                  width: '5px', 
                  height: '5px', 
                  background: '#f59e0b', 
                  borderRadius: '50%'
                }}
                animate={{ 
                  y: [0, -10, 0],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
              />
              <motion.div 
                style={{ 
                  position: 'absolute', 
                  bottom: '15%', 
                  left: '15%', 
                  width: '4px', 
                  height: '4px', 
                  background: '#fbbf24', 
                  borderRadius: '50%'
                }}
                animate={{ 
                  y: [0, -6, 0],
                  opacity: [0.4, 0.9, 0.4]
                }}
                transition={{ duration: 2.2, repeat: Infinity, delay: 0.6 }}
              />
              <motion.div 
                style={{ 
                  position: 'absolute', 
                  bottom: '10%', 
                  right: '20%', 
                  width: '5px', 
                  height: '5px', 
                  background: '#f59e0b', 
                  borderRadius: '50%'
                }}
                animate={{ 
                  y: [0, -7, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ duration: 2.3, repeat: Infinity, delay: 0.9 }}
              />
              {/* Small geometric shapes representing creative elements */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: '5%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '8px',
                  height: '8px',
                  background: '#fbbf24',
                  clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
                }}
                animate={{ 
                  rotate: [0, 180, 360],
                  scale: [1, 1.3, 1]
                }}
                transition={{ 
                  rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity }
                }}
              />
              <motion.div
                style={{
                  position: 'absolute',
                  bottom: '5%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '6px',
                  height: '6px',
                  background: '#f59e0b',
                  clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
                }}
                animate={{ 
                  rotate: [360, 180, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 3.5, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2.2, repeat: Infinity }
                }}
              />
            </div>
            {/* Bottom particles representing collaboration */}
            <div style={{ 
              position: 'absolute', 
              bottom: '20px', 
              left: '50%', 
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '4px'
            }}>
              {[...Array(6)].map((_, i) => (
                <motion.div 
                  key={i} 
                  style={{ 
                    width: '3px', 
                    height: '12px', 
                    background: i % 2 === 0 ? '#f59e0b' : '#fbbf24',
                    borderRadius: '2px'
                  }}
                  animate={{ scaleY: [0.4, 1, 0.4] }}
                  transition={{ 
                    duration: 0.8 + i * 0.15, 
                    repeat: Infinity 
                  }}
                />
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
