import React, { useEffect, useRef } from 'react';

interface MagneticCursorProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

const MagneticCursor: React.FC<MagneticCursorProps> = ({ 
  children, 
  strength = 0.3, 
  className = "" 
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      
      const moveX = deltaX * strength;
      const moveY = deltaY * strength;
      
      element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };

    const handleMouseLeave = () => {
      element.style.transform = 'translate(0px, 0px)';
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return (
    <div 
      ref={elementRef} 
      className={`transition-transform duration-200 ease-out ${className}`}
    >
      {children}
    </div>
  );
};

export default MagneticCursor;
