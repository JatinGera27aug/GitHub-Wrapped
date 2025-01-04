'use client';

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { Card } from '@/components/ui/card';

interface ContributionGraphProps {
  data?: {
    date: string;
    count: number;
  }[];
  detailed?: boolean;
}

export function ContributionGraph({ data = [], detailed = false }: ContributionGraphProps) {
  if (!data.length) return null;

  return (
    <div className={detailed ? 'h-[400px]' : 'h-[200px]'}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorContributions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="date" 
            stroke="hsl(var(--muted-foreground))"
            tickFormatter={(value) => detailed ? new Date(value).toLocaleDateString() : ''}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            tickFormatter={(value) => value.toString()}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <Card className="p-2">
                    <p className="text-sm">
                      {new Date(payload[0].payload.date).toLocaleDateString()}
                    </p>
                    <p className="font-bold">
                      {payload[0].value} contributions
                    </p>
                  </Card>
                );
              }
              return null;
            }}
          />
          <Area
            type="monotone"
            dataKey="count"
            stroke="hsl(var(--chart-1))"
            fillOpacity={1}
            fill="url(#colorContributions)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}