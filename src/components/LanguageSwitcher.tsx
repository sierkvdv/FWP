import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'nl' ? 'en' : 'nl');
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-dark-gray/80 hover:bg-dark-gray border border-gray-600 hover:border-accent transition-all duration-200 text-gray-200 hover:text-accent font-medium text-sm"
      title={language === 'nl' ? 'Switch to English' : 'Schakel over naar Nederlands'}
      style={{ minWidth: '70px', zIndex: 10 }}
    >
      <Globe size={16} className="text-accent" />
      <span className="font-semibold">{language.toUpperCase()}</span>
    </motion.button>
  );
};

export default LanguageSwitcher;

