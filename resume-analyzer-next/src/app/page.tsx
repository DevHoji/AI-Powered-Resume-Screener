'use client';

import Image from 'next/image';
import HeroContainer from "./_components/HeroContainer";
import { motion } from "framer-motion";
import UploadComponent from '@/components/UploadComponent';
import FeedbackComponent from '@/components/FeedbackComponent';
import { useState } from 'react';
import { Toaster } from "react-hot-toast";

interface Analysis {
  feedback: any;
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);

  const handleUpload = async (file: File) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      const resultResponse = await fetch(`/api/result/${data.id}`);
      
      if (!resultResponse.ok) {
        throw new Error('Failed to fetch results');
      }

      const resultData = await resultResponse.json();
      setAnalysis(resultData);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-background min-h-screen">
      <Toaster />
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <Image
              src="/logo.svg"
              alt="Resume Analyzer"
              width={72}
              height={72}
              className="mr-4"
            />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-primary">
              Resume Analyzer
            </h1>
          </div>
          <p className="text-lg text-muted text-center max-w-2xl">
            Get professional insights and recommendations to enhance your resume's impact
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <UploadComponent onUpload={handleUpload} loading={loading} />
          {analysis && <FeedbackComponent analysis={analysis.feedback} />}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {[
            {
              title: "Smart Analysis",
              description: "Advanced AI technology evaluates your resume's content and structure"
            },
            {
              title: "Detailed Feedback",
              description: "Receive comprehensive insights on strengths and areas for improvement"
            },
            {
              title: "Expert Recommendations",
              description: "Get actionable suggestions based on industry best practices"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.2 }}
              className="feature-card"
            >
              <h3 className="text-xl font-heading font-semibold mb-3 text-primary">
                {feature.title}
              </h3>
              <p className="text-muted">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}