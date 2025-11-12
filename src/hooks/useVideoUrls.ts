import { useState, useEffect } from 'react';
import { getVideoUrls } from '../lib/supabase';

/**
 * Hook to fetch video URLs from Supabase Storage
 * @returns Array of video URLs and loading state
 */
export function useVideoUrls() {
  const [videoUrls, setVideoUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchVideoUrls() {
      setIsLoading(true);
      try {
        const urls = await getVideoUrls();
        setVideoUrls(urls);
      } catch (error) {
        console.error('Error fetching video URLs:', error);
        setVideoUrls([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchVideoUrls();
  }, []);

  return { videoUrls, isLoading };
}
