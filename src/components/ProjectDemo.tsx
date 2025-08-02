import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, ExternalLink, Monitor, Smartphone, Tablet, X } from 'lucide-react';

interface ProjectDemoProps {
  title: string;
  description: string;
  demoUrl?: string;
  videoUrl?: string;
  images?: string[];
  technologies: string[];
  onClose: () => void;
}

const ProjectDemo: React.FC<ProjectDemoProps> = ({
  title,
  description,
  demoUrl,
  videoUrl,
  images = [],
  technologies,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'demo' | 'features'>('preview');
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="bg-dark-gray rounded-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <div>
            <h2 className="text-2xl font-bold gradient-text">{title}</h2>
            <p className="text-gray-400">{description}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {/* Tabs */}
          <div className="flex justify-center mb-6">
            <div className="flex bg-dark rounded-xl p-2 shadow-lg">
              {[
                { id: 'preview', name: 'UI Preview', icon: <Monitor size={20} /> },
                { id: 'demo', name: 'Live Demo', icon: <Play size={20} /> },
                { id: 'features', name: 'Features', icon: <ExternalLink size={20} /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-accent text-dark shadow-lg'
                      : 'text-gray-300 hover:bg-white/10'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.icon}
                  <span className="font-medium">{tab.name}</span>
                </button>
              ))}
            </div>
          </div>

          {activeTab === 'preview' && (
            <div className="space-y-6">
              {/* Device Preview */}
              <div className="flex justify-center mb-6">
                <div className="flex gap-4">
                  <button className="p-2 bg-dark rounded-lg text-gray-400 hover:text-accent transition-colors">
                    <Monitor size={24} />
                  </button>
                  <button className="p-2 bg-dark rounded-lg text-gray-400 hover:text-accent transition-colors">
                    <Tablet size={24} />
                  </button>
                  <button className="p-2 bg-dark rounded-lg text-gray-400 hover:text-accent transition-colors">
                    <Smartphone size={24} />
                  </button>
                </div>
              </div>

              {/* Image Gallery */}
              {images.length > 0 ? (
                <div className="space-y-4">
                  <div className="relative h-96 rounded-xl overflow-hidden bg-dark">
                    <img
                      src={images[selectedImage]}
                      alt={`${title} preview ${selectedImage + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {images.length > 1 && (
                    <div className="flex gap-2 justify-center">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`w-3 h-3 rounded-full transition-colors ${
                            selectedImage === index ? 'bg-accent' : 'bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-96 rounded-xl bg-dark flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <Monitor size={64} className="mx-auto mb-4 opacity-50" />
                    <p>UI Preview</p>
                    <p className="text-sm">Screenshots van de interface</p>
                  </div>
                </div>
              )}

              {/* Technologies */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-dark text-gray-300 rounded-full text-sm border border-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'demo' && (
            <div className="space-y-6">
              {demoUrl ? (
                <div className="space-y-4">
                  <div className="bg-dark rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Live Demo</h3>
                    <p className="text-gray-400 mb-4">
                      Test de volledige functionaliteit van dit project
                    </p>
                    <motion.a
                      href={demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-dark font-semibold rounded-lg hover:bg-accent/90 transition-colors"
                    >
                      <ExternalLink size={18} />
                      Open Live Demo
                    </motion.a>
                  </div>
                </div>
              ) : videoUrl ? (
                <div className="space-y-4">
                  <div className="bg-dark rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Video Demo</h3>
                    <p className="text-gray-400 mb-4">
                      Bekijk een demonstratie van de functionaliteit
                    </p>
                    <video
                      controls
                      className="w-full rounded-lg"
                      src={videoUrl}
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Play size={64} className="mx-auto mb-4 text-gray-400 opacity-50" />
                  <h3 className="text-lg font-semibold text-white mb-2">Demo Niet Beschikbaar</h3>
                  <p className="text-gray-400">
                    Dit project heeft momenteel geen live demo beschikbaar.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-dark rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">User Experience</h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>• Intuïtieve interface</li>
                    <li>• Responsive design</li>
                    <li>• Smooth animaties</li>
                    <li>• Toegankelijk</li>
                  </ul>
                </div>
                
                <div className="bg-dark rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Performance</h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>• Snelle laadtijden</li>
                    <li>• Geoptimaliseerd</li>
                    <li>• Cross-platform</li>
                    <li>• Schaalbaar</li>
                  </ul>
                </div>
              </div>

              <div className="bg-dark rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Project Highlights</h3>
                <p className="text-gray-300 leading-relaxed">
                  Dit project demonstreert moderne web development technieken met focus op 
                  gebruikerservaring en performance. De interface is ontworpen met aandacht 
                  voor detail en toegankelijkheid.
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectDemo; 