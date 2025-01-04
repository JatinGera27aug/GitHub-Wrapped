'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ContributionGraph } from '@/components/contribution-graph';
import { LanguageDistribution } from '@/components/language-distribution';
import { TopRepositories } from '@/components/top-repositories';
import { ActivityTimeline } from '@/components/activity-timeline';
import { useGithubData } from '@/hooks/use-github-data';
import { LoadingSpinner } from '@/components/loading-spinner';
import { ErrorMessage } from '@/components/error-message';

interface GithubStatsProps {
  username: string;
  onReset: () => void;
}

export function GithubStats({ username, onReset }: GithubStatsProps) {
  const { data, isLoading, error } = useGithubData(username);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner message="Generating your GitHub Wrapped..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-lg mx-auto space-y-4">
        <ErrorMessage 
          title="Failed to load GitHub data"
          message="Please check the username and try again."
        />
        <Button onClick={onReset} className="w-full">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">
          {username}&apos;s GitHub Wrapped 2024
        </h2>
        <Button variant="outline" onClick={onReset}>
          Try Another User
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="contributions">Contributions</TabsTrigger>
          <TabsTrigger value="languages">Languages</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Total Contributions</h3>
              <ContributionGraph data={data?.contributions} />
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Language Distribution</h3>
              <LanguageDistribution data={data?.languages} />
            </Card>
          </div>
          <TopRepositories repositories={data?.topRepositories} />
        </TabsContent>

        <TabsContent value="contributions">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Contribution Timeline</h3>
            <ContributionGraph data={data?.contributions} detailed />
          </Card>
        </TabsContent>

        <TabsContent value="languages">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Programming Languages</h3>
            <LanguageDistribution data={data?.languages} detailed />
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Activity Timeline</h3>
            <ActivityTimeline activities={data?.activities} />
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}