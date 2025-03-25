"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import supabase from "../config/ProjectSphereClient";
import HamburgerMenu from "./HamburgerMenu";
import Profile from "./profile";
import { useRouter } from "next/navigation";

export default function Header() {
  const [query, setQuery] = useState("");
  const [projects, setProjects] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setProjects([]);
      setShowDropdown(false);
      return;
    }

    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("ProjectSphere_Names")  
        .select("project_title, project_id")  
        .ilike("project_title", `%${query}%`); 

      if (error) {
        console.error("Error fetching projects:", error);
      } else {
        setProjects(data);
        setShowDropdown(true);
      }
    };

    fetchProjects();
  }, [query]); // Runs whenever query changes

  return (
    <header>
      {/* Hamburger Menu */}
      <HamburgerMenu />

      {/* Profile */}
      <div className="absolute top-1 right-4">
        <Profile />
      </div>

      {/* Search Bar */}
      <div className="absolute w-full flex justify-center" style={{ top: "10px" }}>
        <div className="relative w-[90%] max-w-lg">
          <form
            onSubmit={(e) => e.preventDefault()} // Prevent page reload
            className="flex w-full rounded-full overflow-hidden shadow-md"
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
              <Image src="/Magnifying_glass.png" alt="Search icon" width={20} height={20} priority />
            </button>
          </form>

          {/* Dropdown Search Results */}
          {showDropdown && projects.length > 0 && (
            <div className="absolute w-full bg-white shadow-lg rounded-md mt-1">
              <ul>
                {projects.map((project) => (
                  <li
                    key={project.project_id}
                    className="p-2 border-b hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                      window.location.href = `/project_page/${project.project_id}`;
                    }}
                  >
                    {project.project_title}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Upload Section */}
      <div className="absolute flex items-center gap-1.5 font-bold" style={{ top: "5px", right: "300px" }}>
        <a
          href="/test"
          className="flex items-center gap-2 p-1.5 bg-transparent hover:bg-green-200 text-gray-800 rounded-full focus:outline-none transition-all duration-300 ease-in-out"
        >
          <Image src="/upload.png" alt="Upload icon" width={30} height={30} />
          <span>Upload</span>
        </a>
      </div>

      {/* Bookmark Section */}
      <div className="absolute flex items-center gap-1.5 font-bold" style={{ top: "9px", right: "170px" }}>
        <a
          href="/bookmarks"
          className="flex items-center gap-2 p-1.5 bg-transparent hover:bg-green-200 text-gray-800 rounded-full focus:outline-none transition-all duration-300 ease-in-out"
        >
          <Image src="/bookmark.png" alt="Bookmark icon" width={15} height={15} />
          <span>Bookmark</span>
        </a>
      </div>
    </header>
  );
}
