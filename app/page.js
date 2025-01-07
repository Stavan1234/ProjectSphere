"use client";

import Image from "next/image";
import Link from "next/link";

import { useState } from "react";

import ProjectCarousel from "./components/carousel"
import HamburgerMenu from "./components/HamburgerMenu";


export default function Home() {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      console.log("Search Query:", query);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gradient-to-b from-[#DEFAFF] via-[#BCFFEF] to-[#FFFFFF] bg-fixed">
      {/* Hamburger Menu */}
      <HamburgerMenu />

      {/* Search Bar */}
      <div className="absolute w-full flex justify-center" style={{ top: "20px" }}>
        <form
          onSubmit={handleSearch}
          className="flex w-[90%] max-w-lg rounded-full overflow-hidden shadow-md"
          style={{ backgroundColor: "#73D8E3" }}
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for projects by name or keyword..."
            className="w-full px-4 py-2 text-black bg-[#73D8E3] border-none focus:outline-none placeholder-gray-500"
          />
          <button
            type="submit"
            className="px-4 py-2 cursor-pointer flex items-center justify-center"
            style={{ backgroundColor: "#73D8E3" }}
          >
            <Image
              src="/Magnifying_glass.png"
              alt="Search icon"
              width={20}
              height={20}
              priority
            />
          </button>
        </form>
      </div>

      {/* Upload Section */}
<div className="absolute flex items-center gap-1.5 font-bold" style={{ top: "20px", right: "300px" }}>
  <a
    href="/uploadform"
    className="flex items-center gap-2 p-1.5 bg-transparent hover:bg-green-200 text-gray-800 rounded-full focus:outline-none transition-all duration-300 ease-in-out"
  >
    <Image src="/upload.png" alt="Upload icon" width={30} height={30} />
    <span>Upload</span>
  </a>
</div>

{/* Bookmark Section */}
<div className="absolute flex items-center gap-1.5 font-bold" style={{ top: "24px", right: "170px" }}>
  <a
    href="/bookmark"
    className="flex items-center gap-2 p-1.5 bg-transparent hover:bg-green-200 text-gray-800 rounded-full focus:outline-none transition-all duration-300 ease-in-out"
  >
    <Image src="/bookmark.png" alt="Bookmark icon" width={15} height={15} />
    <span>Bookmark</span>
  </a>
</div>

      {/* Logo
      <div className="absolute" style={{ top: "-39px", left: "80px" }}>
        <Image src="/logo.png" alt="Site logo" width={140} height={140} />
      </div> */}

<Link
  href="/project_page"
  className="absolute rounded-full bg-blue-300 text-white px-1 py-1 mt-1 hover:bg-blue-600"
  style={{ top: "20px", right: "20px" }}
>
  Go to Upload Form
</Link>

      {/* Main Content */}
      <main className="flex flex-col items-center pt-10 pb-10 px-4 min-h-full w-full">
            <ProjectCarousel/>
       </main>
    </div>
  );
}
