"use client";

import Header from "./components/Header";
import ProjectCarousel from "./components/carousel";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-gradient-to-b from-[#DEFAFF] via-[#BCFFEF] to-[#FFFFFF] bg-fixed">
      {/* Reusable Header */}
      <Header />

      {/* Main Content */}
      <main className="flex flex-col items-center pt-20 pb-10 px-4 min-h-full w-full">
        <ProjectCarousel />
      </main>
    </div>
  );
}
