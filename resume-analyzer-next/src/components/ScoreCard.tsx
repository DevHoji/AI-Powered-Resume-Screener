"use client";
import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function ScoreComponentCard({ score }: { score: number }) {
  const chartData = [
    { browser: "left", score: 100 - score, fill: "var(--color-outof)" },
    { browser: "score", score: score, fill: "var(--color-score)" },
  ];

  const chartConfig = {
    outof: {
      label: "out of 100%",
      color: "hsl(var(--chart-2))",
    },

    score: {
      label: "Score",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="sm:w-[80%] bg-transparent text-foreground ">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-2xl">Resume Score </CardTitle>
        <CardDescription className="flex-col gap-2 text-sm">
          You scored {chartData[1].score} out of 100%
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="score"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-foreground"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="text-4xl font-bold"
                          fill="white"
                        >
                          {chartData[1].score}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Score
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}