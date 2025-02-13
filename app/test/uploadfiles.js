"use client";

import { useState } from "react";

const UploadForm = ({ onUpload }) => {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Handle file selection based on type
  const handleFileChange = (event, type) => {
    const selectedFiles = Array.from(event.target.files);

    if (type === "images") {
      if (selectedFiles.length + images.length > 9) {
        alert("You can upload a maximum of 9 images.");
        return;
      }
      setImages((prev) => [...prev, ...selectedFiles]);
    } else if (type === "videos") {
      if (selectedFiles.length + videos.length > 2) {
        alert("You can upload a maximum of 2 videos.");
        return;
      }
      setVideos((prev) => [...prev, ...selectedFiles]);
    } else {
      setFiles((prev) => [...prev, ...selectedFiles]);
    }
  };

  // Upload function
  const handleUpload = async (type, filesToUpload) => {
    if (filesToUpload.length === 0) {
      alert(`Please select ${type} to upload.`);
      return;
    }

    setUploading(true);
    const formData = new FormData();
    filesToUpload.forEach((file) => formData.append("files", file));

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        onUpload(type, data.uploadedUrls); // Pass uploaded URLs to parent
        alert(`${type.charAt(0).toUpperCase() + type.slice(1)} upload successful!`);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      alert(`Upload failed: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {/* Image Upload */}
      <h3>Upload Images (Max: 9)</h3>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => handleFileChange(e, "images")}
      />
      <button
        onClick={() => handleUpload("images", images)}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload Images"}
      </button>

      {/* Video Upload */}
      <h3>Upload Videos (Max: 2)</h3>
      <input
        type="file"
        accept="video/*"
        multiple
        onChange={(e) => handleFileChange(e, "videos")}
      />
      <button
        onClick={() => handleUpload("videos", videos)}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload Videos"}
      </button>

      {/* File Upload (PDFs, Word, etc.) */}
      <h3>Upload Files</h3>
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        multiple
        onChange={(e) => handleFileChange(e, "files")}
      />
      <button
        onClick={() => handleUpload("files", files)}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload Files"}
      </button>
    </div>
  );
};

export default UploadForm;