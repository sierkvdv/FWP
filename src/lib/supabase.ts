import { createClient } from '@supabase/supabase-js';

// Supabase configuration
// Try multiple environment variable names to support different setups
// Priority: REACT_APP_ > NEXT_PUBLIC_ > direct SUPABASE_
const supabaseUrl = 
  process.env.REACT_APP_SUPABASE_URL || 
  process.env.NEXT_PUBLIC_SUPABASE_URL || 
  process.env.SUPABASE_URL || 
  '';

const supabaseAnonKey = 
  process.env.REACT_APP_SUPABASE_ANON_KEY || 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
  process.env.SUPABASE_ANON_KEY || 
  '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing. Video background may not work.');
  console.warn('Looking for: REACT_APP_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_URL, or SUPABASE_URL');
  console.warn('And: REACT_APP_SUPABASE_ANON_KEY, NEXT_PUBLIC_SUPABASE_ANON_KEY, or SUPABASE_ANON_KEY');
} else {
  console.log('Supabase configured successfully');
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Storage bucket name for videos (you can change this in your Supabase dashboard)
export const VIDEO_BUCKET_NAME = 'hero-videos';

/**
 * Get public URLs for all videos in the storage bucket
 * @returns Array of public video URLs
 */
export async function getVideoUrls(): Promise<string[]> {
  try {
    const { data, error } = await supabase.storage
      .from(VIDEO_BUCKET_NAME)
      .list('', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' }
      });

    if (error) {
      console.error('Error fetching videos from Supabase:', error);
      return [];
    }

    if (!data || data.length === 0) {
      console.log('No videos found in Supabase storage');
      return [];
    }

    // Filter for video files only
    const videoFiles = data.filter(file => {
      const extension = file.name.toLowerCase().split('.').pop();
      return ['mp4', 'webm', 'ogg', 'mov'].includes(extension || '');
    });

    // Get public URLs for each video
    const videoUrls = videoFiles.map(file => {
      const { data } = supabase.storage
        .from(VIDEO_BUCKET_NAME)
        .getPublicUrl(file.name);
      return data.publicUrl;
    });

    return videoUrls;
  } catch (error) {
    console.error('Error getting video URLs:', error);
    return [];
  }
}
