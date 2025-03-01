"use client";
import React, { ChangeEvent, DragEvent, FC, useState } from "react";
import { UploadStatus } from "./HeroContainer";
import { motion } from "framer-motion";

interface IHeroPresentationProps {
  uploadFile: (file: File) => void;
  uploadStatus: UploadStatus;
}

const HeroPresentation: FC<IHeroPresentationProps> = ({
  uploadFile,
  uploadStatus,
}) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: DragEvent<HTMLLabelElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      uploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      uploadFile(file);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative w-full rounded-2xl ${
          dragActive
            ? "border-2 border-primary-light bg-primary/10"
            : "border border-white/10 bg-white/5"
        } backdrop-blur-lg p-8 transition-all duration-300`}
      >
        <label
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 mb-4"
          >
            <svg
              className="w-full h-full text-primary-light"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </motion.div>

          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
          />

          <div className="text-center space-y-2">
            <p className="text-xl font-semibold text-white">
              Drop your resume here
            </p>
            <p className="text-sm text-white/60">
              or click to browse (PDF, DOC, DOCX)
            </p>
          </div>
        </label>

        {uploadStatus === "UPLOADING" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-2xl"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-primary-light border-t-transparent rounded-full mx-auto"
              />
              <p className="mt-4 text-white/80">Analyzing your resume...</p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default HeroPresentation;
