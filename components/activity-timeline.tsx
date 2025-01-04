'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { GitCommit, GitPullRequest, GitMerge, Star } from 'lucide-react';

interface Activity {
  type: 'commit' | 'pr' | 'merge' | 'star';
  date: string;
  description: string;
  repository: string;
}

interface ActivityTimelineProps {
  activities?: Activity[];
}

const activityIcons = {
  commit: GitCommit,
  pr: GitPullRequest,
  merge: GitMerge,
  star: Star,
};

export function ActivityTimeline({ activities = [] }: ActivityTimelineProps) {
  if (!activities.length) return null;

  return (
    <div className="space-y-4">
      {activities.map((activity, index) => {
        const Icon = activityIcons[activity.type];
        
        return (
          <motion.div
            key={`${activity.date}-${index}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-4">
              <div className="flex items-start space-x-4">
                <div className="bg-muted p-2 rounded-full">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{activity.description}</p>
                  <p className="text-sm text-muted-foreground">
                    {activity.repository}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(activity.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}