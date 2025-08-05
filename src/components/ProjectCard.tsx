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
          {/* Project Image */}
          <div className="relative h-64 overflow-hidden">
            {project.image ? (
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <span className="text-6xl opacity-20">{CATEGORY_CONFIG.icons[project.category]}</span>
              </div>
            )}
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Category badge */}
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${CATEGORY_CONFIG.colors[project.category]} text-white`}>
                {project.category.toUpperCase()}
              </span>
            </div>

            {/* Featured badge */}
            {project.featured && (
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-accent text-dark">
                  FEATURED
                </span>
              </div>
            )}

            {/* Action buttons */}
            <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {project.demoUrl && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-accent/20 backdrop-blur-sm rounded-lg text-accent hover:bg-accent/30 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(project.demoUrl, '_blank');
                  }}
                >
                  <ExternalLink size={16} />
                </motion.button>
              )}
              {project.githubUrl && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-accent/20 backdrop-blur-sm rounded-lg text-accent hover:bg-accent/30 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(project.githubUrl, '_blank');
                  }}
                >
                  <Github size={16} />
                </motion.button>
              )}
              {project.video && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-accent/20 backdrop-blur-sm rounded-lg text-accent hover:bg-accent/30 transition-colors"
                >
                  <Play size={16} />
                </motion.button>
              )}
            </div>
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