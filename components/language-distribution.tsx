'use client';

import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { Card } from '@/components/ui/card';



interface LanguageDistributionProps {
  data?: {
    name: string;
    value: number;
  }[];
  detailed?: boolean;
}

export function LanguageDistribution({ data = [], detailed = false }: LanguageDistributionProps) {
  if (!data.length) return null;

  const COLORS = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))',
  ];

  return (
    <div className={detailed ? 'h-[400px]' : 'h-[200px]'}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={detailed ? 60 : 40}
            outerRadius={detailed ? 80 : 60}
            fill="#8884d8"
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
              />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <Card className="p-2">
                    <p className="text-sm">{payload[0].name}</p>
                    <p className="font-bold">
                      {(payload[0].value/70).toLocaleString()} lines
                    </p>
                  </Card>
                );
              }
              return null;
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}