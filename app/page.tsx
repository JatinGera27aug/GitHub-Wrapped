'use client';

import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { GithubStats } from '@/components/github-stats';
import { ErrorMessage } from '@/components/error-message';

export default function Home() {
  const [username, setUsername] = useState('');
  const [showStats, setShowStats] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Please enter a GitHub username');
      return;
    }
    setError(null);
    setShowStats(true);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-16">
        {!showStats ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg mx-auto text-center space-y-8"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-block"
            >
              <Github className="w-20 h-20 mx-auto mb-6" />
            </motion.div>
            <h1 className="text-4xl font-bold tracking-tight">
              GitHub Wrapped Generator
            </h1>
            <p className="text-muted-foreground text-lg">
              Generate your personalized GitHub year in review. See your contributions, top repositories, and coding patterns visualized beautifully.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="Enter your GitHub username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="text-center text-lg"
              />
              {error && (
                <ErrorMessage message={error} />
              )}
              <Button type="submit" size="lg" className="w-full">
                Generate My Wrapped
              </Button>
            </form>
          </motion.div>
        ) : (
          <GithubStats username={username} onReset={() => setShowStats(false)} />
        )}
      </div>
    </main>
  );
}