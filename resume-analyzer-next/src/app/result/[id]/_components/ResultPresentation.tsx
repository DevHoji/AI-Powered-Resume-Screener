"use client";
import React, { FC, useEffect, useState } from "react";
import { DetailScoreComponent } from "@/components/DetailScore";
import { ScoreComponentCard } from "@/components/ScoreCard";
import { BarChartCard } from "@/components/BarChartCard";

interface Analysis {
  content: {
    score: number;
    strengths: string[];
    areas_for_improvement: string[];
    suggestions: string[];
  };
  format: {
    score: number;
    strengths: string[];
    areas_for_improvement: string[];
    suggestions: string[];
  };
  additionals: {
    score: number;
    strengths: string[];
    areas_for_improvement: string[];
    suggestions: string[];
  };
}

interface ResultPresentationProps {
  analysis: Analysis;
}

const ResultPresentation: FC<ResultPresentationProps> = ({ analysis }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const totalScore = Math.round(
    (analysis.content.score + analysis.format.score + analysis.additionals.score) / 3
  );

  return (
    <main className="w-full flex flex-col gap-4 bg-black p-6 sm:p-8">
      {/* score cards*/}
      <section className="flex flex-col gap-4 pt-5 sm:flex-row sm:justify-center sm:w-full">
        <ScoreComponentCard score={totalScore} />
        <BarChartCard
          contentScore={analysis.content.score}
          formatScore={analysis.format.score}
          additionalsScore={analysis.additionals.score}
        />
      </section>

      {/* detail section */}
      <section className="mb-24 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <DetailScoreComponent feedbackName="Content" feedback={analysis.content} />
        <DetailScoreComponent feedbackName="Format" feedback={analysis.format} />
        <DetailScoreComponent
          feedbackName="Additionals"
          feedback={analysis.additionals}
        />
      </section>
    </main>
  );
};

export default ResultPresentation;
