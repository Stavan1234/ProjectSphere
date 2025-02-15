"use client";

import React, { useState } from "react";
import supabase from "../config/ProjectSphereClient";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const ThumbnailUploader = ({ onUpload }) => {
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Handle file selection
  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      alert("Only JPG, PNG, and WebP files are allowed.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert("File size exceeds the 5MB limit.");
      return;
    }

    setThumbnail(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  // Upload Thumbnail to Supabase
  const uploadThumbnail = async () => {
    if (!thumbnail) return;

    setUploading(true);
    const uniqueFileName = `thumbnail-${Date.now()}-${thumbnail.name}`;
    const filePath = `thumbnails/${uniqueFileName}`;

    const { data, error } = await supabase.storage
      .from("ProjectSphere_Multimedia")
      .upload(filePath, thumbnail, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Upload error:", error.message);
      alert("Error uploading thumbnail: " + error.message);
      setUploading(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("ProjectSphere_Multimedia")
      .getPublicUrl(filePath);

    const publicUrl = publicUrlData.publicUrl;
    onUpload(publicUrl);

    alert("Thumbnail uploaded successfully!");
    setUploading(false);
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Upload Thumbnail:</h3>
      <input type="file" accept="image/*" onChange={handleThumbnailChange} className="mb-2" />

      {thumbnailPreview && (
        <div className="relative inline-block mt-2">
          <img
            src={thumbnailPreview}
            alt="Thumbnail Preview"
            className="w-32 h-32 object-cover rounded-lg"
          />
          <button
            onClick={() => {
              setThumbnail(null);
              setThumbnailPreview(null);
            }}
            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
          >
            ×
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={uploadThumbnail}
        disabled={!thumbnail || uploading}
        className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload Thumbnail"}
      </button>
    </div>
  );
};

export default ThumbnailUploader;
