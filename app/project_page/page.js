"use client";

import Header from "../components/Header";
import Multimedia from "../components/Multimedia";

import Developers from "./developers";
import Technologies from "./TechnologyUsed"; // Importing Technologies component
import ProjectContent from "./ProjectContent";
import ProjectLinks from "./ProjectLinks";
import DownloadLinks from "./DownloadLinks";

const userProps = {
  name: "Stavan K",
  domain: "Web Development",
  email: "stavankalkumbe@gmail.com", // Example email
};

export default function Project_page() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-gradient-to-b from-[#DEFAFF] via-[#BCFFEF] to-[#FFFFFF] bg-fixed">
      {/* Reusable Header */}
      <Header />

      {/* Main Content */}
      <main className="flex flex-col items-center pt-20 pb-10 px-4 min-h-full w-full">
  {/* Page Heading */}
  <h1 className="text-4xl font-bold text-center">Project Title</h1>

  {/* Main Content Wrapper */}
  <div className="w-full max-w-4xl pl-[10px]">
    {/* Creators Section */}
    <div className="flex items-center gap-4 mt-[50px]">
      <h2 className="font-bold text-2xl">Creators:</h2>
      <span><Developers /></span>
    </div>

    {/* Domain Section */}
    <div className="flex items-center gap-4 mt-12">
      <h2 className="font-bold text-2xl">Domain:</h2>
      <span className="text-xl text-gray-700">{userProps.domain}</span>
    </div>

    {/* Technologies Section */}
    <div className="mt-6 flex items-center">
      <h2 className="font-bold text-2xl mb-4">Technologies Used:</h2>
      <Technologies />
    </div>
  </div>
</main>


      <div className="ml-[-40px] mt-12">
          <Multimedia/>
          </div>

         <div className="ml-[25px] mt-12">
            <h2 className="font-bold text-2xl mb-4">Project Description:</h2>
            <div className="ml-4">
            <ProjectContent />
            </div>
          </div>

          <div className="ml-[25px] mt-12">
            <h2 className="font-bold text-2xl mb-4">Project Reference & Links:</h2>
            <div className="ml-4">
            <ProjectLinks />
            <DownloadLinks />
            </div>
          </div>      
    </div>
  );
}
