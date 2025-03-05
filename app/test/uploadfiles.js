import React, { useState } from "react";

const FILE_LIMITS = {
  images: { maxCount: 9, maxSize: 5 * 1024 * 1024 },
  videos: { maxCount: 2, maxSize: 100 * 1024 * 1024 },
  documents: { maxCount: 5, maxSize: 10 * 1024 * 1024 },
};

const ALLOWED_FILE_TYPES = {
  images: ["image/jpeg", "image/png", "image/gif"],
  videos: ["video/mp4", "video/webm", "video/ogg"],
  documents: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
};

const FileUploadForm = ({ onFilesUpload }) => {
  const [files, setFiles] = useState({ images: [], videos: [], documents: [] });
  const [uploadedUrls, setUploadedUrls] = useState({ images: [], videos: [], documents: [] });
  const [uploadingType, setUploadingType] = useState(null); // Track which type is uploading

  const handleFileChange = (event, type) => {
    const selectedFiles = Array.from(event.target.files);

    if (selectedFiles.length + files[type].length > FILE_LIMITS[type].maxCount) {
      alert(`You can upload a maximum of ${FILE_LIMITS[type].maxCount} ${type}.`);
      return;
    }

    const validFiles = selectedFiles.filter((file) => {
      if (!ALLOWED_FILE_TYPES[type].includes(file.type)) {
        alert(`Invalid file type: ${file.name}`);
        return false;
      }
      if (file.size > FILE_LIMITS[type].maxSize) {
        alert(`File too large: ${file.name} (max ${FILE_LIMITS[type].maxSize / 1024 / 1024}MB)`);
        return false;
      }
      return true;
    });

    setFiles((prev) => ({ ...prev, [type]: [...prev[type], ...validFiles] }));
  };

  const handleUpload = async (type) => {
    if (files[type].length === 0) {
      alert(`Please select ${type} to upload.`);
      return;
    }

    setUploadingType(type);
    console.log(`Uploading ${type}...`);

    try {
      const newUrls = [];

      for (const file of files[type]) {
        console.log("Uploading file:", file.name);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", type);
        formData.append("fileName", file.name);
        formData.append("fileType", file.type);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Upload failed for ${file.name}:`, errorText);
          continue; // Skip this file but continue with others
        }

        const { fileUrl } = await response.json();
        console.log("Uploaded file URL:", fileUrl);

        newUrls.push(fileUrl);
      }

      // Update state without duplicates
      setUploadedUrls((prev) => ({
        ...prev,
        [type]: [...new Set([...prev[type], ...newUrls])], // Ensure uniqueness
      }));

      // Pass uploaded URLs to parent component
      onFilesUpload({
        images: type === "images" ? newUrls : files.images,
        videos: type === "videos" ? newUrls : files.videos,
        documents: type === "documents" ? newUrls : files.documents,
      });
      

      alert(`${type.charAt(0).toUpperCase() + type.slice(1)} uploaded successfully!`);
    } catch (error) {
      console.error("Upload error:", error);
      alert(`Upload failed: ${error.message}`);
    } finally {
      setUploadingType(null);
    }
  };

  return (
    <div className="space-y-6">
      {Object.keys(FILE_LIMITS).map((type) => (
        <div key={type}>
          <h3 className="text-lg font-semibold mb-2">
            Upload {type.charAt(0).toUpperCase() + type.slice(1)} (Max: {FILE_LIMITS[type].maxCount})
          </h3>
          <input
            type="file"
            accept={ALLOWED_FILE_TYPES[type].join(",")}
            multiple
            onChange={(e) => handleFileChange(e, type)}
            className="mb-2"
          />
          <button
            onClick={() => handleUpload(type)}
            disabled={uploadingType === type || files[type].length === 0}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {uploadingType === type ? "Uploading..." : `Upload ${type.charAt(0).toUpperCase() + type.slice(1)}`}
          </button>

          {/* {uploadedUrls[type].length > 0 && (
            <div className="mt-2">
              <h4 className="text-md font-semibold">Uploaded {type}:</h4>
              <ul>
                {uploadedUrls[type].map((url, index) => (
                  <li key={index}>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                      {url}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )} */}
        </div>
      ))}
    </div>
  );
};

export default FileUploadForm;
