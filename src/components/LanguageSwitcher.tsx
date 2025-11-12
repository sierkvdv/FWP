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
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-gray hover:bg-gray-800 border border-gray-700 hover:border-accent transition-all duration-200 text-white hover:text-accent font-medium"
      title={language === 'nl' ? 'Switch to English' : 'Schakel over naar Nederlands'}
      style={{ minWidth: '80px' }}
    >
      <Globe size={18} className="text-accent" />
      <span className="text-sm font-semibold">{language.toUpperCase()}</span>
    </motion.button>
  );
};

export default LanguageSwitcher;

