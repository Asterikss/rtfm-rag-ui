import { useState, useEffect } from 'react';
import { apiClient } from '@/services/api';

export const useIndexes = () => {
  const [indexes, setIndexes] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIndexes = async () => {
      try {
        setIsLoading(true);
        const data = await apiClient.getIndexesInfo();
        setIndexes(data.indexesNames);
        // Select first index by default
        if (data.indexesNames.length > 0 && !selectedIndex) {
          setSelectedIndex(data.indexesNames[0]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load indexes');
      } finally {
        setIsLoading(false);
      }
    };

    fetchIndexes();
  }, []);

  return {
    indexes,
    selectedIndex,
    setSelectedIndex,
    isLoading,
    error,
  };
};
