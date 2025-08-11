import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, Instagram, Send, MapPin, Phone } from 'lucide-react';
import { contactInfo } from '../data/contact';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const socialLinks = [
    { icon: <Mail size={24} />, href: `mailto:${contactInfo.email}`, label: 'Email', color: 'hover:text-red-400' },
    { icon: <Github size={24} />, href: contactInfo.github, label: 'GitHub', color: 'hover:text-gray-400' },
    { icon: <Linkedin size={24} />, href: contactInfo.linkedin, label: 'LinkedIn', color: 'hover:text-blue-400' },
    { icon: <Twitter size={24} />, href: contactInfo.twitter, label: 'Twitter', color: 'hover:text-blue-400' },
    { icon: <Instagram size={24} />, href: contactInfo.instagram, label: 'Instagram', color: 'hover:text-pink-400' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create email body
    const emailBody = `
Naam: ${formData.name}
Email: ${formData.email}
Onderwerp: ${formData.subject}

Bericht:
${formData.message}
    `;
    
    // Open email client
    const mailtoLink = `mailto:${contactInfo.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(mailtoLink);
    
    setIsSubmitting(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    alert('Email client geopend! Stuur het bericht om contact met me op te nemen.');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
              <span className="gradient-text">Let's</span> Connect
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Ben je geïnteresseerd in samenwerking? Heb je een project in gedachten? 
              Ik hoor graag van je!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-8 gradient-text">Stuur een Bericht</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Naam
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-dark-gray border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent transition-colors"
                      placeholder="Jouw naam"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-dark-gray border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent transition-colors"
                      placeholder="jouw@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Onderwerp
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-dark-gray border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent transition-colors"
                    placeholder="Waar gaat het over?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Bericht
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-dark-gray border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent transition-colors resize-none"
                    placeholder="Vertel me meer over je project of idee..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-4 bg-accent text-dark font-semibold rounded-lg hover:bg-accent/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-dark border-t-transparent rounded-full animate-spin" />
                      Verzenden...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Verstuur Bericht
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold mb-8 gradient-text">Contact Info</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-accent/20 rounded-lg">
                      <Mail size={24} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <a 
                        href={`mailto:${contactInfo.email}`}
                        className="text-white hover:text-accent transition-colors"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-accent/20 rounded-lg">
                      <MapPin size={24} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Locatie</p>
                      <p className="text-white">Amsterdam, Nederland</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-accent/20 rounded-lg">
                      <Phone size={24} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Beschikbaarheid</p>
                      <p className="text-white">Voor nieuwe projecten</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6 text-white">Volg Mij</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className={`p-4 glass-effect rounded-lg text-accent transition-all duration-200 flex items-center gap-3 ${social.color}`}
                    >
                      {social.icon}
                      <span className="font-medium">{social.label}</span>
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="glass-effect p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4 text-white">Response Tijd</h3>
                <p className="text-gray-400 mb-4">
                  Ik probeer binnen 24 uur te reageren op alle berichten.
                </p>
                <div className="flex items-center gap-2 text-accent">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  <span className="text-sm font-mono">Meestal online</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage; 