import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Play, Calendar, Tag } from 'lucide-react';
import { projects } from '../data/projects.ts';

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project niet gevonden</h1>
          <p className="text-gray-400 mb-8">Het project dat je zoekt bestaat niet.</p>
          <Link to="/projects">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-accent text-dark font-semibold rounded-lg hover:bg-accent/90 transition-colors duration-200"
            >
              Terug naar Projecten
            </motion.button>
          </Link>
        </div>
      </div>
    );
  }

  const categoryColors = {
    ai: 'from-purple-500 to-pink-500',
    web: 'from-blue-500 to-cyan-500',
    music: 'from-green-500 to-emerald-500',
    design: 'from-orange-500 to-red-500',
    software: 'from-indigo-500 to-purple-500'
  };

  const categoryIcons = {
    ai: '🤖',
    web: '🌐',
    music: '🎵',
    design: '🎨',
    software: '⚡'
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link to="/projects">
          <motion.button
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-gray-400 hover:text-accent transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            Terug naar Projecten
          </motion.button>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Project Image/Video */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative h-96 lg:h-[500px] rounded-xl overflow-hidden glass-effect">
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <span className="text-8xl opacity-20">{categoryIcons[project.category]}</span>
                  </div>
                )}
                
                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${categoryColors[project.category]} text-white`}>
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
                <div className="absolute bottom-4 right-4 flex gap-2">
                  {project.demoUrl && (
                    <motion.a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-accent/20 backdrop-blur-sm rounded-lg text-accent hover:bg-accent/30 transition-colors"
                    >
                      <ExternalLink size={20} />
                    </motion.a>
                  )}
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-accent/20 backdrop-blur-sm rounded-lg text-accent hover:bg-accent/30 transition-colors"
                    >
                      <Github size={20} />
                    </motion.a>
                  )}
                  {project.video && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-accent/20 backdrop-blur-sm rounded-lg text-accent hover:bg-accent/30 transition-colors"
                    >
                      <Play size={20} />
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Project Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {project.title}
                </h1>
                <p className="text-xl text-accent font-mono mb-6">
                  {project.subtitle}
                </p>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {project.description}
                </p>
              </div>

              {/* Project Meta */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{project.year}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag size={16} />
                  <span>{project.category}</span>
                </div>
              </div>

              {/* Technologies */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="px-3 py-1 bg-dark-gray text-gray-300 rounded-full text-sm border border-gray-700"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                {project.demoUrl && (
                  <motion.a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-accent text-dark font-semibold rounded-lg hover:bg-accent/90 transition-colors duration-200 flex items-center gap-2"
                  >
                    <ExternalLink size={18} />
                    Live Demo
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
                    <Github size={18} />
                    View Code
                  </motion.a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20 px-4 bg-dark-gray">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            {/* Process Section */}
            <div>
              <h2 className="text-3xl font-bold mb-8 gradient-text">Project Proces</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { step: '01', title: 'Concept & Planning', description: 'Ideeën uitwerken en technische planning maken' },
                  { step: '02', title: 'Development', description: 'Coding, design en implementatie van features' },
                  { step: '03', title: 'Testing & Launch', description: 'Uitgebreid testen en live deployment' },
                ].map((phase, index) => (
                  <motion.div
                    key={phase.step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="glass-effect p-6 rounded-xl"
                  >
                    <div className="text-2xl font-bold text-accent mb-3">{phase.step}</div>
                    <h3 className="text-xl font-semibold text-white mb-2">{phase.title}</h3>
                    <p className="text-gray-400">{phase.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Challenges & Solutions */}
            <div>
              <h2 className="text-3xl font-bold mb-8 gradient-text">Uitdagingen & Oplossingen</h2>
              <div className="space-y-6">
                <div className="glass-effect p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-white mb-3">Technische Uitdagingen</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Het project presenteerde verschillende technische uitdagingen, waaronder performance optimalisatie, 
                    cross-platform compatibiliteit en real-time data processing. Deze werden opgelost door middel van 
                    geavanceerde caching strategieën en modulaire architectuur.
                  </p>
                </div>
                
                <div className="glass-effect p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-white mb-3">Creatieve Oplossingen</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Door het combineren van verschillende technologieën en het denken buiten de gebaande paden, 
                    zijn we tot innovatieve oplossingen gekomen die zowel functioneel als esthetisch zijn.
                  </p>
                </div>
              </div>
            </div>

            {/* Results */}
            <div>
              <h2 className="text-3xl font-bold mb-8 gradient-text">Resultaten</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-effect p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-white mb-3">Performance</h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>• 50% snellere laadtijden</li>
                    <li>• 99.9% uptime</li>
                    <li>• Responsive op alle devices</li>
                  </ul>
                </div>
                
                <div className="glass-effect p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-white mb-3">User Experience</h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>• Intuïtieve interface</li>
                    <li>• Smooth animaties</li>
                    <li>• Toegankelijk design</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetailPage; 