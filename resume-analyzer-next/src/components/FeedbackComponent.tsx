'use client';

import { motion } from 'framer-motion';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';

interface FeedbackComponentProps {
  analysis: {
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
  };
}

const FeedbackSection = ({ title, score, strengths, improvements, suggestions }: {
  title: string;
  score: number;
  strengths: string[];
  improvements: string[];
  suggestions: string[];
}) => (
  <div className="card mb-8">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-xl font-heading font-semibold text-primary">{title}</h3>
      <div className="score-badge">
        Score: {score}%
      </div>
    </div>

    <div className="space-y-6">
      <div>
        <h4 className="flex items-center text-lg font-semibold text-success mb-3">
          <CheckCircleIcon className="w-5 h-5 mr-2" />
          Strengths
        </h4>
        <ul className="feedback-list">
          {strengths.map((strength, index) => (
            <li key={index} className="feedback-item">
              <span>• {strength}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="flex items-center text-lg font-semibold text-error mb-3">
          <ExclamationCircleIcon className="w-5 h-5 mr-2" />
          Areas for Improvement
        </h4>
        <ul className="feedback-list">
          {improvements.map((improvement, index) => (
            <li key={index} className="feedback-item">
              <span>• {improvement}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="flex items-center text-lg font-semibold text-secondary mb-3">
          <LightBulbIcon className="w-5 h-5 mr-2" />
          Suggestions
        </h4>
        <ul className="feedback-list">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="feedback-item">
              <span>• {suggestion}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export default function FeedbackComponent({ analysis }: FeedbackComponentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-12"
    >
      <h2 className="section-title">Analysis Results</h2>
      
      <FeedbackSection
        title="Content Analysis"
        score={analysis.content.score}
        strengths={analysis.content.strengths}
        improvements={analysis.content.areas_for_improvement}
        suggestions={analysis.content.suggestions}
      />

      <FeedbackSection
        title="Format Analysis"
        score={analysis.format.score}
        strengths={analysis.format.strengths}
        improvements={analysis.format.areas_for_improvement}
        suggestions={analysis.format.suggestions}
      />

      <FeedbackSection
        title="Additional Elements"
        score={analysis.additionals.score}
        strengths={analysis.additionals.strengths}
        improvements={analysis.additionals.areas_for_improvement}
        suggestions={analysis.additionals.suggestions}
      />
    </motion.div>
  );
}