"use client";
import React, { FC, useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import { notFound } from "next/navigation";

interface ResultData {
  score: number;
  feedback: {
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

const ResultContainer: FC<{ params: { id: string } }> = ({ params }) => {
  const [result, setResult] = useState<ResultData | null>(null);
  const [activeTab, setActiveTab] = useState('content');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await fetch(`/api/result/${params.id}`);
        if (!response.ok) throw new Error('Failed to fetch result');
        const data = await response.json();
        setResult(data);
      } catch (error) {
        console.error('Error fetching result:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchResult();
  }, [params.id]);

  const scoreProps = useSpring({
    from: { number: 0 },
    to: { number: result?.score || 0 },
    delay: 500,
    config: { duration: 2000 },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary-light border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!result) {
    return notFound();
  }

  const sections = {
    content: result.feedback.content,
    format: result.feedback.format,
    additionals: result.feedback.additionals,
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Resume Analysis</h1>
          
          <div className="relative w-32 h-32 md:w-48 md:h-48 mx-auto mb-8">
            <div className="absolute inset-0 flex items-center justify-center">
              <animated.span className="text-4xl md:text-6xl font-bold text-white">
                {scoreProps.number.to((n) => Math.floor(n))}
              </animated.span>
            </div>
            <svg className="transform -rotate-90 w-full h-full">
              <circle
                className="text-white/10"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r="58"
                cx="66"
                cy="66"
              />
              <motion.circle
                className="text-primary-light"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r="58"
                cx="66"
                cy="66"
                initial={{ strokeDasharray: "364.4", strokeDashoffset: "364.4" }}
                animate={{ strokeDashoffset: 364.4 - (364.4 * result.score) / 100 }}
                transition={{ duration: 2, delay: 0.5 }}
              />
            </svg>
          </div>
        </motion.div>

        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 md:p-8">
          <div className="flex flex-wrap gap-2 mb-8">
            {Object.keys(sections).map((section) => (
              <button
                key={section}
                onClick={() => setActiveTab(section)}
                className={`px-4 py-2 rounded-lg transition-all text-sm md:text-base ${
                  activeTab === section
                    ? 'bg-primary text-white'
                    : 'bg-white/5 hover:bg-white/10 text-white/80'
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-8"
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-4 text-white">Strengths</h3>
                <ul className="space-y-3">
                  {sections[activeTab as keyof typeof sections].strengths.map((strength, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-2 text-white/90"
                    >
                      <span className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0" />
                      <span className="text-sm md:text-base">{strength}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-4 text-white">Areas for Improvement</h3>
                <ul className="space-y-3">
                  {sections[activeTab as keyof typeof sections].areas_for_improvement.map((area, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-2 text-white/90"
                    >
                      <span className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0" />
                      <span className="text-sm md:text-base">{area}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-semibold mb-4 text-white">Suggestions</h3>
              <ul className="space-y-4">
                {sections[activeTab as keyof typeof sections].suggestions.map((suggestion, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="bg-white/5 p-4 rounded-lg text-white/90 text-sm md:text-base"
                  >
                    {suggestion}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default ResultContainer;
