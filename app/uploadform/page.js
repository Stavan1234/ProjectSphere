"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Reusable Input Field Component
const InputField = ({ label, type = "text", placeholder, value, onChange, required = false, ...props }) => (
  <div>
    <label className="block text-gray-700 font-medium mb-2">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
      {...props}
    />
  </div>
);

// Reusable TextArea Component
const TextAreaField = ({ label, placeholder, value, onChange, rows = 4, required = false }) => (
  <div>
    <label className="block text-gray-700 font-medium mb-2">{label}</label>
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      required={required}
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
    ></textarea>
  </div>
);

// Reusable File Input Component
const FileInputField = ({ label, accept, onChange, required = false, maxFiles = 1 }) => (
  <div>
    <label className="block text-gray-700 font-medium mb-2">{label}</label>
    <input
      type="file"
      accept={accept}
      onChange={onChange}
      required={required}
      multiple={maxFiles > 1}
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
    />
  </div>
);

const ProjectUploadForm = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [creatorNames, setCreatorNames] = useState([""]);
  const [imageFiles, setImageFiles] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [pdfFiles, setPdfFiles] = useState([]);
  const router = useRouter();

  const closeForm = () => router.push("/");

  const addCreator = () => setCreatorNames([...creatorNames, ""]);

  const handleCreatorChange = (index, value) => {
    const updatedNames = [...creatorNames];
    updatedNames[index] = value;
    setCreatorNames(updatedNames);
  };

  const removeCreator = (index) => {
    const updatedNames = creatorNames.filter((_, i) => i !== index);
    setCreatorNames(updatedNames);
  };

  const isDuplicate = (name, index) => creatorNames.slice(0, index).includes(name);

  // Validation Functions
  const validateFiles = () => {
    const validImages = imageFiles.every((file) => file.size <= 5 * 1024 * 1024 && file.type.startsWith("image"));
    const validVideo = videoFile && videoFile.size <= 50 * 1024 * 1024 && videoFile.type.startsWith("video");
    const validPdf = pdfFiles.every((file) => (file.size <= 12 * 1024 * 1024 && (file.type === "application/pdf" || file.type === "application/msword" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")));

    return validImages && validVideo && validPdf;
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length <= 6 && files.every(file => file.size <= 5 * 1024 * 1024)) {
      setImageFiles(files);
    } else {
      alert("Please upload up to 6 images, each under 5MB.");
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 50 * 1024 * 1024 && file.type.startsWith("video")) {
      setVideoFile(file);
    } else {
      alert("Please upload a video under 50MB.");
    }
  };

  const handlePdfChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length <= 2 && files.every(file => file.size <= 12 * 1024 * 1024)) {
      setPdfFiles(files);
    } else {
      alert("Please upload up to 2 PDFs or Word files, each under 12MB.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-white">
      <div className="w-full max-w-3xl bg-white p-8 shadow-lg rounded-lg relative">
        {/* Close Button */}
        <button
          onClick={closeForm}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-600"
        >
          ×
        </button>


        {/* Form Heading */}
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Project Uploading Form
        </h1>
        <p className="text-sm text-gray-600 text-center mb-4">
          <strong>Note:</strong> Do not include the source code used to create the project at any point of the form.
          <br />
          <span className="text-red-500">* All fields are required</span>
        </p>

        {/* Form */}
        <form className="space-y-4">
          <InputField label="Project Title" placeholder="Enter project title" required />

          {/* Project Creator Names */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Project Creator Names:</label>
            {creatorNames.map((creator, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={creator}
                  onChange={(e) => handleCreatorChange(index, e.target.value)}
                  placeholder={`Enter Creator Name ${index + 1}`}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                {creatorNames.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeCreator(index)}
                    className="ml-2 w-8 h-8 text-white bg-gray-500 rounded-full hover:bg-gray-700"
                  >
                    -
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addCreator} className="text-blue-500 hover:text-blue-700">
              + Add More Creator
            </button>
            {creatorNames.some((name, idx) => isDuplicate(name, idx)) && (
              <p className="text-red-500 text-sm mt-2">* Duplicate creator names are not allowed.</p>
            )}
          </div>

          {/* Project Domain */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Project Domain</label>
            <select
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="">Select Domain</option>
              <option value="web-development">Web Development</option>
              <option value="machine-learning">Machine Learning</option>
              <option value="iot-embedded-systems">IOT & Embedded Systems</option>
              <option value="robotics-automation">Robotics and Automation</option>
              <option value="digital-signal-processing">Digital Signal Processing & Communications</option>
              <option value="software-development">Software Development</option>
              <option value="open-domain">Open Domain</option>
            </select>
          </div>

          <InputField label="Technologies Used" placeholder="List technologies used" required />
          <TextAreaField label="Project Summary" placeholder="Write a brief project summary" required />
          
          {/* File Inputs with Validation */}
          <FileInputField label="Attach Thumbnail Image (Max 1 Image, 5MB)" accept="image/*" onChange={handleImageChange} maxFiles={1} required />
          <FileInputField label="Attach Images/Videos of Final Result (Max 1 Video, 6 Images, 50MB)" accept="image/*,video/*" onChange={handleVideoChange} maxFiles={7} required />
          <FileInputField label="Attach Documentation (Max 2 PDFs/Word Files, 12MB Each)" accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={handlePdfChange} maxFiles={2} required />
          
          <TextAreaField
            label="Additional Reference Material (Optional)"
            placeholder="Any relevant links, articles, etc."
            rows={2}
          />

          {/* Declaration */}
          <div className="flex items-start">
            <input
              type="checkbox"
              required
              className="mt-1 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <p className="text-gray-600 text-sm">
              I hereby declare that all information provided is true and accurate to the best of my knowledge. I
              understand that failure to comply may result in project removal.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            onClick={validateFiles}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProjectUploadForm;
