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
        <h1 className="text-4xl font-bold text-center">Project Title</h1>
        <div className="items-left gap-4 mt-[50px] ml-[-900px]">
          <h2 className="font-bold ml-[-40px] text-2xl mb-4">Creators:</h2>
          <Developers />

          {/* Domain Section */}
          <div className="flex items-center ml-[-40px] mt-12">
            <h2 className="font-bold text-2xl mr-2">Domain:</h2>
            <span className="text-xl text-gray-700">{userProps.domain}</span>
          </div>

          {/* Technologies Section */}
          <div className="ml-[-40px] mt-12">
            <h2 className="font-bold text-2xl mb-4">Technologies Used:</h2>
            {/* Using the Technologies component here */}
            <Technologies />
          </div>

          {/* <div className="ml-[-40px] mt-12">
            <h2 className="font-bold text-2xl mb-4">Project Description:</h2>
            <ProjectContent />
          </div> */}

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
