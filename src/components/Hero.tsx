import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { SITE_CONFIG, ANIMATION_DELAYS } from '../utils/constants';
import { fadeInUp, slideInLeft, slideInRight } from '../utils/animations';
import { useLanguage } from '../contexts/LanguageContext';
import ParticleBackground from './ParticleBackground';
import MagneticCursor from './MagneticCursor';
import VideoBackground from './VideoBackground';
import { useVideoUrls } from '../hooks/useVideoUrls';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const { videoUrls, isLoading } = useVideoUrls();
  
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Use video URLs from Supabase Storage
  const backgroundVideos = videoUrls || [];

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Video Background - if videos are configured and loaded */}
      {!isLoading && backgroundVideos.length > 0 && (
        <VideoBackground videoUrls={backgroundVideos} className="z-0" />
      )}
      
      {/* Particle Background - show while loading or if no videos */}
      {(isLoading || backgroundVideos.length === 0) && <ParticleBackground />}
      
      {/* Background Elements - lighter overlay if videos are playing */}
      <div className={`absolute inset-0 bg-gradient-to-br from-dark via-dark-gray to-dark ${!isLoading && backgroundVideos.length > 0 ? 'opacity-60' : 'opacity-90'}`} />
      
      {/* Smooth fade to parallax */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent" />
      
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 bg-accent/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Welcome Text */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: ANIMATION_DELAYS.fast }}
          className="mb-6"
        >
          <span className="text-accent text-lg font-mono">{t('hero.welcome')}</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          variants={slideInLeft}
          initial="hidden"
          animate="visible"
          transition={{ delay: ANIMATION_DELAYS.medium }}
          className="text-6xl md:text-8xl font-bold mb-6"
        >
          <span className="gradient-text text-glow">{SITE_CONFIG.name}</span>
          <br />
          <span className="text-white">{SITE_CONFIG.fullName}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={slideInRight}
          initial="hidden"
          animate="visible"
          transition={{ delay: ANIMATION_DELAYS.medium + 0.2 }}
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          {SITE_CONFIG.description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: ANIMATION_DELAYS.slow }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <MagneticCursor strength={0.2}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToProjects}
              className="px-8 py-4 bg-accent text-dark font-semibold rounded-lg hover:bg-accent/90 transition-colors duration-200 flex items-center gap-2"
            >
              <Sparkles size={20} />
              {t('hero.viewProjects')}
            </motion.button>
          </MagneticCursor>
          
          <MagneticCursor strength={0.2}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/contact'}
              className="px-8 py-4 border border-accent text-accent font-semibold rounded-lg hover:bg-accent/10 transition-colors duration-200 flex items-center gap-2"
            >
              {t('hero.getInTouch')}
            </motion.button>
          </MagneticCursor>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: ANIMATION_DELAYS.slow + 0.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            onClick={scrollToProjects}
            className="text-gray-400 hover:text-accent transition-colors duration-200"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown size={24} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 