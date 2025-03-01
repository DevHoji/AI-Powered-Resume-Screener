'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface BarChartCardProps {
  title: string;
  data: Array<{
    name: string;
    value: number;
  }>;
}

export function BarChartCard({ title, data }: BarChartCardProps) {
  return (
    <Card className="sm:w-[80%] md:w-[50%] bg-transparent text-foreground">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          Score for Content, Format and Additionals
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3498db" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
