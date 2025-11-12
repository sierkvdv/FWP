import { useMemo } from 'react';
import { Project } from '../types';
import { projects } from '../data/projects';
import { projectTranslations } from '../data/projectTranslations';
import { useLanguage } from '../contexts/LanguageContext';

export const useProjects = (): Project[] => {
  const { language } = useLanguage();

  return useMemo(() => {
    return projects.map(project => {
      const translations = projectTranslations[project.id];
      
      if (!translations) {
        // If no translation exists, return original project
        return project;
      }

      const translation = translations[language] || translations.en || {};
      
      return {
        ...project,
        title: translation.title || project.title,
        subtitle: translation.subtitle || project.subtitle,
        description: translation.description || project.description,
      };
    });
  }, [language]);
};

