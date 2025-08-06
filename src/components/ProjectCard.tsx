import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, Play } from 'lucide-react';
import { Project } from '../types';
import { CATEGORY_CONFIG, ANIMATION_DELAYS } from '../utils/constants';
import { fadeInUp } from '../utils/animations';

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
      <Link to={`/projects/${project.id}`}>
        <div className="relative overflow-hidden rounded-xl glass-effect hover-lift">
          {/* Project Image - SIMPLE VERSION */}
          <div style={{ height: '256px', backgroundColor: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {project.image ? (
              <img 
                src={project.image} 
                alt={project.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <div style={{ textAlign: 'center', color: 'white' }}>
                <div style={{ fontSize: '48px', marginBottom: '8px' }}>🌐</div>
                <div style={{ fontSize: '18px' }}>{project.title}</div>
                <div style={{ fontSize: '14px', color: '#9ca3af' }}>No Image</div>
              </div>
            )}
          </div>

          {/* Content */}
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
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard; 