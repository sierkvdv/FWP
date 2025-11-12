import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Play, Calendar, Tag } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useProjects } from '../hooks/useProjects';
import AnimatedProjectImage from '../components/AnimatedProjectImage';
import VideoPreview from '../components/VideoPreview';

/**
 * Checks if URL is a YouTube URL
 */
const isYouTubeUrl = (url: string): boolean => {
  return /youtube\.com|youtu\.be/.test(url);
};

// Vercel deployment trigger comment

const ProjectDetailPage: React.FC = () => {
  const { t } = useLanguage();
  const projects = useProjects();
  const { id } = useParams<{ id: string }>();
  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">{t('project.notFound')}</h1>
          <Link to="/projects" className="text-accent hover:underline">
            ← {t('project.back')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors duration-200"
            >
              <ArrowLeft size={20} />
              {t('project.back')}
            </Link>
          </motion.div>

          {/* Project Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${project.category === 'ai' ? 'bg-purple-500/20 text-purple-400' : 
                project.category === 'web' ? 'bg-blue-500/20 text-blue-400' :
                project.category === 'music' ? 'bg-green-500/20 text-green-400' :
                project.category === 'design' ? 'bg-orange-500/20 text-orange-400' :
                'bg-gray-500/20 text-gray-400'}`}>
                {project.category.toUpperCase()}
              </span>
                             <div className="flex items-center gap-2 text-gray-400">
                 <Calendar size={16} />
                 <span className="text-sm">{project.year}</span>
               </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">{project.title}</span>
            </h1>

            <p className="text-xl text-gray-400 max-w-3xl leading-relaxed mb-8">
              {project.description}
            </p>

                         {/* Action Buttons */}
             <div className="flex flex-wrap gap-4">
               {project.demoUrl && (
                 <motion.a
                   href={project.demoUrl}
                   target="_blank"
                   rel="noopener noreferrer"
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   className="px-6 py-3 bg-accent text-dark font-semibold rounded-lg hover:bg-accent/90 transition-colors duration-200 flex items-center gap-2"
                 >
                  <ExternalLink size={20} />
                  {t('project.viewLive')}
                </motion.a>
              )}
              
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 border border-accent text-accent font-semibold rounded-lg hover:bg-accent/10 transition-colors duration-200 flex items-center gap-2"
                >
                  <Github size={20} />
                  {t('project.viewCode')}
                </motion.a>
              )}

              {project.demoUrl && (
                <motion.a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 border border-accent text-accent font-semibold rounded-lg hover:bg-accent/10 transition-colors duration-200 flex items-center gap-2"
                >
                  <Play size={20} />
                  {t('project.watchDemo')}
                </motion.a>
              )}
            </div>
          </motion.div>

          {/* Project Video or Animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <div className="relative overflow-hidden rounded-2xl bg-dark-gray p-8">
              {project.video ? (
                <div style={{ height: '600px', backgroundColor: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
                  <VideoPreview
                    videoUrl={project.video}
                    autoplay={true}
                    muted={true}
                    loop={true}
                    className="absolute inset-0"
                    interactive={true}
                    showYouTubeButton={isYouTubeUrl(project.video)}
                    overlayOpacity={0.2}
                  />
                </div>
              ) : (
                <div style={{ height: '400px', backgroundColor: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  <AnimatedProjectImage projectId={project.id} title={project.title} />
                </div>
              )}
            </div>
          </motion.div>

          {/* Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold mb-6 gradient-text">{t('project.technologies')}</h3>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="px-4 py-2 bg-dark-gray border border-gray-700 rounded-lg text-gray-300 hover:border-accent transition-colors duration-200 flex items-center gap-2"
                >
                  <Tag size={16} />
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Project Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-6 gradient-text">{t('project.about')}</h3>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed mb-6">
                {project.description}
              </p>
              
              {/* Demo Video Preview (for YouTube URLs) */}
              {project.demoUrl && isYouTubeUrl(project.demoUrl) && (
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-white mb-3">{t('project.firstVersion')}</h4>
                  <div className="relative w-full max-w-md h-48 rounded-lg overflow-hidden bg-black">
                    <VideoPreview
                      videoUrl={project.demoUrl}
                      autoplay={true}
                      muted={true}
                      loop={true}
                      className="w-full h-full"
                      interactive={true}
                      showYouTubeButton={true}
                      overlayOpacity={0.2}
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetailPage; 