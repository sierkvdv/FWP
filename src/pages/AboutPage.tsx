import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../data/skills.ts';
import { Mail, Github, Linkedin, Twitter, Instagram } from 'lucide-react';

const AboutPage: React.FC = () => {
  const skillCategories = [
    { id: 'frontend', name: 'Frontend Development', color: 'from-blue-500 to-cyan-500' },
    { id: 'backend', name: 'Backend Development', color: 'from-green-500 to-emerald-500' },
    { id: 'ai', name: 'AI & Machine Learning', color: 'from-purple-500 to-pink-500' },
    { id: 'design', name: 'Design & Motion', color: 'from-orange-500 to-red-500' },
    { id: 'music', name: 'Music & Audio', color: 'from-indigo-500 to-purple-500' },
  ];

  const socialLinks = [
    { icon: <Mail size={20} />, href: 'mailto:hello@creativeengineer.dev', label: 'Email' },
    { icon: <Github size={20} />, href: 'https://github.com/creativeengineer', label: 'GitHub' },
    { icon: <Linkedin size={20} />, href: 'https://linkedin.com/in/creativeengineer', label: 'LinkedIn' },
    { icon: <Twitter size={20} />, href: 'https://twitter.com/creativeengineer', label: 'Twitter' },
    { icon: <Instagram size={20} />, href: 'https://instagram.com/creativeengineer', label: 'Instagram' },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">About</span> Me
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              FWP is een creatief bureau dat de grenzen tussen technologie en kunst vervaagt. 
              Onze passie ligt in het creëren van digitale ervaringen die zowel functioneel als esthetisch zijn.
            </p>
          </motion.div>

          {/* Personal Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Left Column - Story */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-6 gradient-text">Ons Verhaal</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  FWP is ontstaan uit een fascinatie voor de combinatie van technologie en creativiteit. 
                  Wat begon als experimenten met muziek en code, groeide uit tot een passie voor 
                  het creëren van digitale ervaringen die mensen raken.
                </p>
                <p>
                  We specialiseren ons in frontend development, AI-technologieën en muziekproductie. 
                  Ons werk varieert van interactieve websites tot AI-gegenereerde films en elektronische muziek.
                </p>
                <p>
                  We geloven dat de beste digitale producten ontstaan wanneer technologie en creativiteit 
                  samenkomen. Elk project is een kans om iets nieuws te ontdekken en te leren.
                </p>
              </div>
            </motion.div>

            {/* Right Column - Stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold mb-6 gradient-text">Experience</h2>
              
              {[
                { label: 'Years of Experience', value: '5+', icon: '🚀' },
                { label: 'Projects Completed', value: '50+', icon: '💼' },
                { label: 'Technologies Mastered', value: '20+', icon: '⚡' },
                { label: 'Happy Clients', value: '25+', icon: '😊' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="glass-effect p-6 rounded-xl"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">{stat.label}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                    <div className="text-3xl">{stat.icon}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 bg-dark-gray">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Skills</span> & Expertise
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Een overzicht van mijn technische vaardigheden en expertise
            </p>
          </motion.div>

          {/* Skills by Category */}
          <div className="space-y-12">
            {skillCategories.map((category, categoryIndex) => {
              const categorySkills = skills.filter(skill => skill.category === category.id);
              
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className={`text-2xl font-bold mb-6 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                    {category.name}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categorySkills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: skillIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="glass-effect p-4 rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-lg">{skill.icon}</span>
                          <span className="text-sm text-accent font-mono">
                            {skill.level}/5
                          </span>
                        </div>
                        <h4 className="font-semibold text-white mb-2">{skill.name}</h4>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <motion.div
                            className={`h-2 rounded-full bg-gradient-to-r ${category.color}`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${(skill.level / 5) * 100}%` }}
                            transition={{ duration: 1, delay: 0.5 + skillIndex * 0.1 }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              <span className="gradient-text">Let's</span> Connect
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Ben je geïnteresseerd in samenwerking? Neem contact op!
            </p>

            {/* Social Links */}
            <div className="flex justify-center gap-6 mb-8">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="p-4 glass-effect rounded-lg text-accent hover:text-white transition-colors duration-200"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-accent text-dark font-semibold rounded-lg hover:bg-accent/90 transition-colors duration-200"
            >
              Stuur een Bericht
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage; 