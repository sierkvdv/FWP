export const SITE_CONFIG = {
  name: 'FWP',
  fullName: 'Fieldworks Production',
  description: 'Creative engineering and AI-powered solutions',
  accentColor: '#00ff88',
  contactEmail: 'hello@fwp.com',
  // Background videos for homepage hero section
  // Add your Supabase Storage URLs here, or leave empty array to use particle background
  // Example: ['https://your-project.supabase.co/storage/v1/object/public/videos/video1.mp4', ...]
  backgroundVideos: [] as string[],
};

export const CATEGORY_CONFIG = {
  colors: {
    ai: 'from-purple-500 to-pink-500',
    web: 'from-blue-500 to-cyan-500',
    music: 'from-green-500 to-emerald-500',
    design: 'from-orange-500 to-red-500',
    software: 'from-indigo-500 to-purple-500'
  },
  icons: {
    ai: '🤖',
    web: '🌐',
    music: '🎵',
    design: '🎨',
    software: '⚡'
  }
};

export const ANIMATION_DELAYS = {
  stagger: 0.1,
  fast: 0.2,
  medium: 0.4,
  slow: 0.6
}; 