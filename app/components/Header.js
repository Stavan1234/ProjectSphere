"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import HamburgerMenu from "./HamburgerMenu";
import Profile from "./profile";

export default function Header() {
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("highest");

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
     
           {/* Upload Section */}
           <div className="absolute flex items-center gap-1.5 font-bold" style={{ top: "5px", right: "300px" }}>
             <a
               href="../test"
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
      {/* Hamburger Menu */}
      <HamburgerMenu />

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

      {/* Sort Dropdown
      
      <div className="absolute top-3 left-60">
        
        <label htmlFor="sort" className="mr-2 font-medium">Sort by Rating:</label>
        <select
          id="sort"
          className="p-2 border rounded-md shadow-sm"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="highest">Highest First</option>
          <option value="lowest">Lowest First</option>
        </select>
      </div> */}

      {/* Upload Section */}
      <div className="absolute flex items-center gap-1.5 font-bold" style={{ top: "5px", right: "300px" }}>
        <a
          href="/uploadform"
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
