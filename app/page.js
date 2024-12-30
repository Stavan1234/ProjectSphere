"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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
    <div className="min-h-screen flex flex-col font-sans bg-gradient-to-b from-[#DEFAFF] via-[#BCFFEF] to-[#FFFFFF]">
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

      {/* Logo */}
      <div className="absolute" style={{ top: "-39px", left: "80px" }}>
        <Image src="/logo.png" alt="Site logo" width={140} height={140} />
      </div>

      {/* Main Content */}
      <main className="flex flex-col items-center pt-40 pb-10 px-4 flex-grow">
        <Link
          href="/project_page"
          className="rounded-full bg-blue-500 text-white px-4 py-2 mt-6 hover:bg-blue-600"
        >
          Go to Upload Form
        </Link>

        {/* Story Section */}
        <div className="mt-12 max-w-xl text-gray-800 text-left">
          <h2 className="text-2xl font-bold mb-4">The Enchanted Forest: A Tale of Courage</h2>
          <p>
            Once upon a time, in a small village nestled between the mountains and the sea,
            there lived a young girl named Elara. Elara was no ordinary girl; she possessed
            a rare gift—a deep connection to the forest that surrounded her village.
          </p>
          <p>
            The villagers often spoke of the forest with a mixture of awe and fear. They believed
            it was enchanted, filled with mysterious creatures and ancient magic. But Elara felt
            at home among the towering trees, the whispering leaves, and the chattering animals.
          </p>
          <p>
            One fateful day, disaster struck the village. A terrible drought dried up their rivers,
            withered their crops, and threatened their way of life. The village elder told a tale of
            a magical spring deep within the forest, said to be guarded by a fierce guardian. It was
            the only hope to save the village, but no one dared to venture into the heart of the forest.
          </p>
          <p>
            Elara knew she had to try. Armed with her courage and her unique bond with the forest,
            she ventured into the unknown. The journey was perilous, filled with challenges that tested
            her resolve. She faced wild beasts, solved riddles of the ancient trees, and overcame her own fears.
          </p>
          <p>
            In the end, Elara's bravery and determination led her to the magical spring. The guardian,
            a majestic creature with shimmering scales and kind eyes, recognized her pure heart and
            allowed her to take the water. She returned to the village as a hero, bringing hope and life
            back to her people.
          </p>
          <p>
            From that day forward, Elara's name was spoken with reverence, and the enchanted forest
            became a symbol of courage and unity for the villagers.
          </p>
        </div>
      </main>
    </div>
  );
}
