import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { Project } from '../types';
import { ANIMATION_DELAYS } from '../utils/constants';
import { fadeInUp } from '../utils/animations';
import AnimatedProjectImage from './AnimatedProjectImage';
import VideoPreview from './VideoPreview';

/**
 * Checks if URL is a YouTube URL
 */
const isYouTubeUrl = (url: string): boolean => {
  return /youtube\.com|youtu\.be/.test(url);
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * ANIMATION_DELAYS.stagger }}
      whileHover={{ y: -10 }}
      className="group relative"
    >
      <div className={`relative overflow-hidden rounded-xl glass-effect-enhanced project-card-enhanced category-${project.category}`}>
        {/* Project Video or Image - Clickable to YouTube if video, otherwise just display */}
        <div style={{ height: '200px', backgroundColor: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
          {project.video && isYouTubeUrl(project.video) ? (
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
              <VideoPreview
                videoUrl={project.video}
                autoplay={true}
                muted={true}
                loop={true}
                className="absolute inset-0"
                overlayOpacity={0.2}
                showYouTubeButton={true}
                interactive={false}
              />
              {/* Clickable overlay to go to YouTube - stops propagation to Link */}
              <a
                href={project.video}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-40"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                aria-label={`Watch ${project.title} on YouTube (opens in new tab)`}
                title={`Watch ${project.title} on YouTube`}
                style={{
                  pointerEvents: 'auto',
                  cursor: 'pointer',
                }}
              >
                {/* Invisible but accessible text for screen readers */}
                <span style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', borderWidth: 0 }}>
                  Watch {project.title} on YouTube
                </span>
              </a>
            </div>
          ) : (
            <AnimatedProjectImage projectId={project.id} title={project.title} />
          )}
        </div>

        {/* Content - Link to project detail page */}
        <Link to={`/projects/${project.id}`} className="block">
          <div className="p-6">
            <div className="mb-3">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors duration-200">
                {project.title}
              </h3>
              <p className="text-sm text-accent font-mono">
                {project.subtitle}
              </p>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.slice(0, 3).map((tech, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded-md"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded-md">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>

            {/* Year */}
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500 font-mono">
                {project.year}
              </span>
              <motion.div
                className="text-accent"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ duration: ANIMATION_DELAYS.fast }}
              >
                <ExternalLink size={16} />
              </motion.div>
            </div>
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
