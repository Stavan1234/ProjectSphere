"use client";

import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import { Textarea } from "@/components/ui/textarea"; 
import CreatorNames from "./creatorname";
import TechnologiesUsed from "./technologiesused";
import ProjectDomain from "./ProjectDomain";
import ThumbnailUploader from "./ThumbnailUploader"; // Import Thumbnail Uploader
import supabase from "../config/ProjectSphereClient"; 
import { Button } from "@/components/ui/button"; 
import FileUploadForm from "./uploadfiles";
import { useEffect } from "react";

const ProjectUploadForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [creatorNames, setCreatorNames] = useState([]); // Start as an empty array
  const [technologies, setTechnologies] = useState([]); // Empty array, avoid unnecessary nesting
  const [selectedDomain, setSelectedDomain] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [checkAgree, setCheckAgree] = useState(false);
  const [imgUrls, setImgUrls] = useState([]);
  const [vidUrls, setVidUrls] = useState([]);
  const [docUrls, setDocUrls] = useState([]);

  useEffect(() => {
    console.log("Updated URLs: ", { imgUrls, vidUrls, docUrls });
  }, [imgUrls, vidUrls, docUrls]);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !content || creatorNames.length === 0 || technologies.length === 0 || !selectedDomain || !thumbnailUrl) {
      alert("Please fill in all fields.");
      return;
    }

    if (!checkAgree) {
      alert("You must agree to the declaration.");
      return;
    }

    console.log("Form submitted successfully!");
    console.log({ title, content, creatorNames, technologies, selectedDomain });
    console.log("Submitting with: ", { imgUrls, vidUrls, docUrls });

    try {
      const { data, error } = await supabase
        .from("ProjectSphere Form")
        .insert([
          {
            Project_Title: title,
            Project_Text_area: content,
            Creator_names: creatorNames,
            Tech_Used: technologies,
            Project_Domain: selectedDomain,
            Thumbnail_URL: thumbnailUrl,// Save thumbnail URL in DB
            img_url: imgUrls, // Storing array of image URLs
            vid_url: vidUrls, // Storing array of video URLs
            file_url: docUrls, // Storing array of document URLs 
          }
        ]);

      if (error) {
        console.error("Error submitting data:", error.message);
        alert("Error submitting project data: " + error.message);
      } else {
        alert("Project submitted successfully!");

        // Reset form
        setTitle('');
        setContent('');
        setCreatorNames([]);
        setTechnologies([]);
        setSelectedDomain("");
        setThumbnailUrl(null);
        setCheckAgree(false);
        setImgUrls([]);
        setVidUrls([]);
        setDocUrls([]);
      }
    } catch (error) {
      console.error("Unexpected error:", error.message);
      alert("Unexpected error occurred.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-5 w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Project Uploading Form</h1>
        <p className="text-sm text-gray-600 text-center mb-4">
          <strong>Note:</strong> Do not include the source code used to create the project at any point of the form.
          <br />
          <span className="text-red-500">* All fields are required</span>
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-4">Project Title:</h3>
            <Input
              placeholder="Enter project title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              fullWidth
              className="shadow-lg border border-[#00A8A8] bg-[#E0F7FA] text-[#004D40] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ACC1]"
            />
          </div>

          <div>
            <CreatorNames onCreatorNamesChange={setCreatorNames} />
          </div>

          <div>
            <ProjectDomain onDomainChange={setSelectedDomain} />
          </div>

          <div className="flex space-x-4">
            <h3 className="text-lg font-semibold mb-1">Project description/Summary:</h3>
            <span className="text-red-500 text-sm">Max 500 words</span>
          </div>

          <div className="mb-4">
            <Textarea
              placeholder="Enter your description"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-[150px] shadow-lg border border-[#00A8A8] bg-[#E0F7FA] text-[#004D40] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ACC1] resize-none overflow-y-auto"
            />
          </div>

          <div className="mb-4">
            <TechnologiesUsed onTechnologiesChange={setTechnologies} />
          </div>

          {/* Thumbnail Upload Component */}
             {/* Pass setThumbnailUrl as prop to get the uploaded URL */}
                 <ThumbnailUploader onUpload={(url) => setThumbnailUrl(url)} />

           {/* Images, Videos & Doc Uploader */}
           <FileUploadForm onFilesUpload={(files) => {
  console.log("Received files:", files);

  setImgUrls((prev) => [...(prev || []), ...files.images]);
  setVidUrls((prev) => [...(prev || []), ...files.videos]);
  setDocUrls((prev) => [...(prev || []), ...files.documents]);
}} />




          <div className="flex items-start mb-6">
            <input
              type="checkbox"
              required
              checked={checkAgree}
              onChange={() => setCheckAgree(!checkAgree)}
              className="mt-1 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <p className="text-gray-600 text-sm">
              I hereby declare that all information provided is true and accurate to the best of my knowledge. I
              understand that failure to comply may result in project removal.
            </p>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProjectUploadForm;
