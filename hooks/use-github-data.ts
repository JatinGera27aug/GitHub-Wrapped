'use client';

import { useState, useEffect } from 'react';
import { fetchGithubData } from '@/lib/api';

interface GithubData {
  contributions: { date: string; count: number }[];
  languages: { name: string; value: number }[];
  topRepositories: {
    name: string;
    description: string;
    stars: number;
    forks: number;
    watchers: number;
    language: string;
  }[];
  activities: {
    type: 'commit' | 'pr' | 'merge' | 'star';
    date: string;
    description: string;
    repository: string;
  }[];
}

export function useGithubData(username: string) {
  const [data, setData] = useState<GithubData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchGithubData(username);
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };

    if (username) {
      fetchData();
    }
  }, [username]);

  return { data, isLoading, error };
}