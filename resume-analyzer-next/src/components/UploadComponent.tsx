'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';
import LoadingSpinner from './LoadingSpinner';

interface UploadComponentProps {
  onUpload: (file: File) => void;
  loading: boolean;
}

const UploadComponent: React.FC<UploadComponentProps> = ({ onUpload, loading }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <label
        className={`
          relative block cursor-pointer rounded-xl border-2 border-dashed p-12
          ${isDragging 
            ? 'border-secondary bg-secondary/5' 
            : 'border-input-border/30 hover:border-secondary/50 hover:bg-primary/5'
          }
          transition-all duration-300 glass-effect
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileInput}
          className="hidden"
          disabled={loading}
        />
        
        <div className="flex flex-col items-center justify-center space-y-6">
          <motion.div
            animate={{
              scale: isDragging ? 1.1 : 1,
              rotate: loading ? 360 : 0,
            }}
            transition={{
              scale: { type: "spring", stiffness: 300 },
              rotate: {
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              },
            }}
            className="relative"
          >
            {loading ? (
              <div className="p-4 bg-secondary/10 rounded-full">
                <LoadingSpinner w="w-12" h="h-12" />
              </div>
            ) : (
              <div className="p-4 bg-secondary/10 rounded-full">
                <CloudArrowUpIcon className="h-12 w-12 text-secondary" />
              </div>
            )}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={loading ? "uploading" : "idle"}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-center space-y-2"
            >
              <h3 className="text-2xl font-heading font-semibold text-primary">
                {loading ? "Analyzing your resume..." : "Upload your resume"}
              </h3>
              <p className="text-muted">
                {loading
                  ? "This will just take a moment"
                  : "Drag & drop your resume or click to browse"}
              </p>
              {!loading && (
                <p className="text-sm text-muted/80">
                  Accepts PDF or Word documents (max 10MB)
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </label>
    </motion.div>
  );
};

export default UploadComponent;