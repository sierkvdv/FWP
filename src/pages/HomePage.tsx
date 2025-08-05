import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';
import { staggerContainer, fadeInUp } from '../utils/animations';
import { ANIMATION_DELAYS } from '../utils/constants';

const HomePage: React.FC = () => {
  const featuredProjects = projects.filter(project => project.featured);

  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Featured Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A showcase of our most innovative and creative work
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index} 
              />
            ))}
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: ANIMATION_DELAYS.slow }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-accent text-accent font-semibold rounded-lg hover:bg-accent/10 transition-colors duration-200"
              onClick={() => window.location.href = '/projects'}
            >
              View All Projects
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 