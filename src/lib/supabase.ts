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
    console.log(`Attempting to fetch videos from bucket: ${VIDEO_BUCKET_NAME}`);
    
    const { data, error } = await supabase.storage
      .from(VIDEO_BUCKET_NAME)
      .list('', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' }
      });

    if (error) {
      console.error('❌ Error fetching videos from Supabase:', error);
      console.error('Error details:', {
        message: error.message,
        statusCode: error.statusCode,
        error: error.error
      });
      
      // Common errors
      if (error.message?.includes('not found') || error.statusCode === '404') {
        console.error(`⚠️ Bucket "${VIDEO_BUCKET_NAME}" not found. Please check if the bucket exists in Supabase.`);
      } else if (error.message?.includes('permission') || error.statusCode === '403') {
        console.error(`⚠️ Permission denied. Please check if bucket "${VIDEO_BUCKET_NAME}" is public.`);
      }
      
      return [];
    }

    console.log(`📁 Found ${data?.length || 0} files in bucket "${VIDEO_BUCKET_NAME}"`);

    if (!data || data.length === 0) {
      console.warn(`⚠️ No files found in bucket "${VIDEO_BUCKET_NAME}"`);
      console.warn('Please check:');
      console.warn('1. Does the bucket exist?');
      console.warn('2. Is the bucket name exactly "' + VIDEO_BUCKET_NAME + '"?');
      console.warn('3. Are there any files uploaded to the bucket?');
      return [];
    }

    // Log all files found
    console.log('Files found:', data.map(f => f.name));

    // Filter for video files only
    const videoFiles = data.filter(file => {
      const extension = file.name.toLowerCase().split('.').pop();
      return ['mp4', 'webm', 'ogg', 'mov'].includes(extension || '');
    });

    console.log(`🎥 Found ${videoFiles.length} video files:`, videoFiles.map(f => f.name));

    if (videoFiles.length === 0) {
      console.warn('⚠️ No video files found. Only video files (.mp4, .webm, .ogg, .mov) are supported.');
      return [];
    }

    // Get public URLs for each video
    const videoUrls = videoFiles.map(file => {
      const { data } = supabase.storage
        .from(VIDEO_BUCKET_NAME)
        .getPublicUrl(file.name);
      console.log(`✅ Generated URL for ${file.name}:`, data.publicUrl);
      return data.publicUrl;
    });

    console.log(`✅ Successfully loaded ${videoUrls.length} video URL(s)`);
    return videoUrls;
  } catch (error) {
    console.error('❌ Error getting video URLs:', error);
    return [];
  }
}
