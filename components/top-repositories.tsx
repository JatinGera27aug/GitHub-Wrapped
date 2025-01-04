'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Star, GitFork, Eye } from 'lucide-react';

interface Repository {
  name: string;
  description: string;
  stars: number;
  forks: number;
  watchers: number;
  language: string;
}

interface TopRepositoriesProps {
  repositories?: Repository[];
}

export function TopRepositories({ repositories = [] }: TopRepositoriesProps) {
  if (!repositories.length) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Top Repositories</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {repositories.map((repo, index) => (
          <motion.div
            key={repo.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-4 h-full">
              <h4 className="font-semibold text-lg mb-2">{repo.name}</h4>
              <p className="text-muted-foreground text-sm mb-4">
                {repo.description}
              </p>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span className="flex items-center">
                  <Star className="w-4 h-4 mr-1" />
                  {repo.stars}
                </span>
                <span className="flex items-center">
                  <GitFork className="w-4 h-4 mr-1" />
                  {repo.forks}
                </span>
                <span className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {repo.watchers}
                </span>
                <span className="ml-auto">{repo.language}</span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}