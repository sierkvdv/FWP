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
          <div className="cursorflow-animation">
            <div className="cursor">
              <div className="cursor-arrow"></div>
              <div className="cursor-glow"></div>
            </div>
            <div className="particles">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="particle" style={{ animationDelay: `${i * 0.5}s` }}></div>
              ))}
            </div>
            <div className="audio-bars">
              {[...Array(20)].map((_, i) => (
                <div 
                  key={i} 
                  className="audio-bar" 
                  style={{ 
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: `${0.3 + Math.random() * 0.7}s`
                  }}
                ></div>
              ))}
            </div>
          </div>
        );

      case 'clonebox':
        return (
          <div className="clonebox-animation">
            <div className="usb-drive">
              <div className="usb-connector"></div>
              <div className="usb-body"></div>
              <div className="usb-light"></div>
            </div>
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
            <div className="data-particles">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="data-particle" style={{ animationDelay: `${i * 0.8}s` }}></div>
              ))}
            </div>
          </div>
        );

      case 'neural-dreams':
        return (
          <div className="neural-dreams-animation">
            <div className="neural-network">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="neural-node" style={{ animationDelay: `${i * 0.2}s` }}></div>
              ))}
            </div>
            <div className="connections">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="connection" style={{ animationDelay: `${i * 0.3}s` }}></div>
              ))}
            </div>
            <div className="dream-particles">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="dream-particle" style={{ animationDelay: `${i * 1}s` }}></div>
              ))}
            </div>
          </div>
        );

      case 'living-posters':
        return (
          <div className="living-posters-animation">
            <div className="poster-frame">
              <div className="poster-content">
                <div className="poster-elements">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="poster-element" style={{ animationDelay: `${i * 0.5}s` }}></div>
                  ))}
                </div>
                <div className="poster-lines">
                  <div className="poster-line line-1"></div>
                  <div className="poster-line line-2"></div>
                </div>
              </div>
            </div>
            <div className="floating-particles">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="floating-particle" style={{ animationDelay: `${i * 0.7}s` }}></div>
              ))}
            </div>
          </div>
        );

      case 'virtual-dj':
        return (
          <div className="virtual-dj-animation">
            <div className="turntable">
              <div className="turntable-base"></div>
              <div className="turntable-surface"></div>
              <div className="vinyl-grooves">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="vinyl-groove" style={{ animationDelay: `${i * 0.1}s` }}></div>
                ))}
              </div>
            </div>
            <div className="sound-waves">
              <div className="speaker left">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="wave" style={{ animationDelay: `${i * 0.2}s` }}></div>
                ))}
              </div>
              <div className="speaker right">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="wave" style={{ animationDelay: `${i * 0.2}s` }}></div>
                ))}
              </div>
            </div>
            <div className="bass-frequencies">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bass-bar" style={{ animationDelay: `${i * 0.1}s` }}></div>
              ))}
            </div>
          </div>
        );

      case 'modular-synth':
        return (
          <div className="modular-synth-animation">
            <div className="synth-rack">
              <div className="module oscillator">
                <div className="module-label">OSC</div>
                <div className="waveform"></div>
                <div className="knob"></div>
              </div>
              <div className="module filter">
                <div className="module-label">FILTER</div>
                <div className="filter-curve"></div>
                <div className="knob"></div>
              </div>
              <div className="module envelope">
                <div className="module-label">ADSR</div>
                <div className="envelope-curve"></div>
              </div>
            </div>
            <div className="patch-cables">
              <div className="cable cable-1"></div>
              <div className="cable cable-2"></div>
            </div>
            <div className="audio-viz">
              {[...Array(20)].map((_, i) => (
                <div 
                  key={i} 
                  className="viz-bar" 
                  style={{ 
                    animationDelay: `${i * 0.05}s`,
                    animationDuration: `${0.2 + Math.random() * 0.3}s`
                  }}
                ></div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="default-animation">
            <div className="placeholder-icon">🌐</div>
            <div className="placeholder-title">{title}</div>
          </div>
        );
    }
  };

  return (
    <motion.div 
      className="animated-project-image"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {getAnimationContent()}
    </motion.div>
  );
};

export default AnimatedProjectImage;
