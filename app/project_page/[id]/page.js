"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "../../components/Header";
import Multimedia from "./Multimedia";
import supabase from "../../config/ProjectSphereClient";
import Developers from "../developers"; 
import Technologies from "../TechnologyUsed";
import ProjectContent from "../ProjectContent";
import ProjectLinks from "./ProjectLinks";
import DownloadLinks from "../DownloadLinks";
import BookmarkButton from "../../bookmarks/BookmarkButton";
import Comments from "../comment"; // ✅ Import Comments Component

export default function Project_page() {
  const { id } = useParams(); // Project ID from URL
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [links, setLinks] = useState([]); // State for storing links

  // Fetch project data from Supabase
  useEffect(() => {
    if (id) {
      const fetchProject = async () => {
        const { data, error } = await supabase
          .from("ProjectSphere Form") // Ensure the table name matches your Supabase setup
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.error("Error fetching project:", error);
        } else {

          setProject(data);

          // Debug: Check what we received for links

          // Parse and set links safely
          if (data.links) {
            try {
              const parsedLinks = Array.isArray(data.links)
              ? data.links.map(link => (typeof link === "string" ? JSON.parse(link) : link))
              : [];
            setLinks(parsedLinks);
          
              setLinks(parsedLinks);
            } catch (parseError) {
              console.error("Error parsing links JSON:", parseError);
            }
          }
        }
        setLoading(false);
      };
      fetchProject();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading project...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Project not found.</p>
      </div>
    );
  }

  // Parse dynamic data for our components.
  const creators =
    typeof project.Creator_names === "string"
      ? JSON.parse(project.Creator_names)
      : project.Creator_names;

      
      
      const technologies =
      typeof project.Tech_Used === "string"
        ? JSON.parse(project.Tech_Used).map((item) => JSON.parse(item)) // Parse each item
        : project.Tech_Used?.map((item) => (typeof item === "string" ? JSON.parse(item) : item));

     
  // Other fields (userProps is available if you need it)
  const userProps = {
    name: creators?.[0] || "Unknown Creator", // using the first name as a representative
    domain: project.Project_Domain || "Undefined Domain",
    email: project.creatorEmail || "no-email@example.com", // if available
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gradient-to-b from-[#DEFAFF] via-[#BCFFEF] to-[#FFFFFF] bg-fixed">

      {/* Reusable Header */}
      <Header />

      <BookmarkButton projectId={id} />

      {/* Main Content */}
      <main className="flex flex-col items-center pt-20 pb-10 px-4 min-h-full w-full">
        {/* Page Heading */}
        <div className="w-[900px] mx-auto">
          <h1 className="text-4xl text-center">
            <b>{project.Project_Title}</b>
          </h1>
        </div>

        {/* Main Content Wrapper */}
        <div className="w-full max-w-4xl pl-[10px]">
          {/* Creators Section */}
          <div className="flex items-center gap-4 mt-[50px]">
            <h2 className="font-bold text-2xl">Creators:</h2>
            <span>
              <Developers developers={creators} />
            </span>
          </div>

          {/* Domain Section */}
          <div className="flex items-center gap-4 mt-12">
            <h2 className="font-bold text-2xl">Domain:</h2>
            <span className="text-xl text-gray-700">
              {project.Project_Domain}
            </span>
          </div>

          {/* Technologies Section */}
          <div className="mt-6 flex items-center">
            <h2 className="font-bold text-2xl mb-4">Technologies Used:</h2>
            <Technologies technologies={technologies} />
          </div>
        </div>
      </main>

      {/* Multimedia Section */}
      <div className="ml-[-40px] mt-12">
        <Multimedia />
      </div>

      {/* Project Description */}
      <div className="ml-[25px] mt-12">
        <h2 className="font-bold text-2xl mb-4">Project Description:</h2>
        <div className="ml-4">
          <ProjectContent content={project.Project_Text_area} />
        </div>
      </div>

      {/* Project Reference & Links */}
      <div className="ml-[25px] mt-12">
        <h2 className="font-bold text-2xl mb-4">Project Reference & Links:</h2>
        <div className="ml-4">
          <ProjectLinks links={links} /> {/* Pass links as a prop */}
          <DownloadLinks />
        </div>
      </div>

      {/* ✅ Comments Section */}
      <div className="ml-[25px] mt-12">
        <h2 className="font-bold text-2xl mb-4">Comments:</h2>
        <div className="ml-4">
          <Comments projectId={id} /> {/* Pass project ID to Comments component */}
        </div>
      </div>
    </div>
  );
}
