"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import HamburgerMenu from "./HamburgerMenu";
import Profile from "./profile";

export default function Header() {
  const [query, setQuery] = useState("");
  const [domains, setDomains] = useState([
    "Web Development",
    "Machine Learning",
    "IoT & Embedded Systems",
    "Robotics and Automation",
    "Digital Signal Processing & Communications",
    "Software Development",
    "Open Domain",
  ]);
  const [selectedDomain, setSelectedDomain] = useState("");

  useEffect(() => {
    // Ensure this runs only on client
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      console.log("Search Query:", query);
    }
  };

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

      {/* Domain Filter
      <div className="absolute top-[70px] left-40">
        <label htmlFor="domain" className="mr-2 font-medium">
          Filter by Domain:
        </label>
        <select
          id="domain"
          className="p-2 border rounded-md shadow-sm "
          value={selectedDomain}
          onChange={(e) => setSelectedDomain(e.target.value)}
        >
          <option value="">All Domains</option>
          {domains.map((domain) => (
            <option key={domain} value={domain}>
              {domain}
            </option>
          ))}
        </select>
      </div> */}

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
          href="/bookmark"
          className="flex items-center gap-2 p-1.5 bg-transparent hover:bg-green-200 text-gray-800 rounded-full focus:outline-none transition-all duration-300 ease-in-out"
        >
          <Image src="/bookmark.png" alt="Bookmark icon" width={15} height={15} />
          <span>Bookmark</span>
        </a>
      </div>
    </header>
  );
}
