"use client";
import React, { useState } from "react";
import HeroPresentation from "./HeroPresentation";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CONSTANT } from "@/constant";

export enum UploadStatus {
  IDLE = "IDLE",
  UPLOADING = "UPLOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

const HeroContainer = () => {
  const router = useRouter();
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>(
    UploadStatus.IDLE,
  );

  const uploadFile = async (file: File) => {
    try {
      setUploadStatus(UploadStatus.UPLOADING);

      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size must be less than 10MB");
        setUploadStatus(UploadStatus.ERROR);
        return;
      }

      // Validate file type
      if (!file.type.includes("pdf") && !file.type.includes("word")) {
        toast.error("Please upload a PDF or Word document");
        setUploadStatus(UploadStatus.ERROR);
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(CONSTANT.URLS.uploadResume, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      setUploadStatus(UploadStatus.SUCCESS);
      toast.success("Resume uploaded successfully!");
      router.push(`/result/${data.result_id}`);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload resume");
      setUploadStatus(UploadStatus.ERROR);
    }
  };

  return (
    <HeroPresentation uploadFile={uploadFile} uploadStatus={uploadStatus} />
  );
};
export default HeroContainer;
