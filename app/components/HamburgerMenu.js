"use client";

import { useState } from "react";
import Image from "next/image";

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Adjustable values for positioning the burger icon
  const burgerPosition = {
    top: "10px",    // Change this value to adjust vertical position
    left: "12px",   // Change this value to adjust horizontal position
    position: "absolute", // Ensure the button has absolute positioning within its parent container
    zIndex: 50, // Ensures it appears above other elements
  };

  return (
    <div className="relative z-50">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="p-2 bg-transparent border-none"
        aria-expanded={isOpen}
        aria-label="Toggle menu"
        style={burgerPosition} // Apply position styles here
      >
        <Image
          src="/burger.png"
          alt="Menu"
          width={30}
          height={30}
          priority // Optimizes the loading of this icon
        />
      </button>

      {/* Menu */}
      {isOpen && (
        <div
          className="absolute left-0 top-12 w-72 bg-transparent shadow-lg p-4 rounded-lg dark:bg-transparent dark:text-white z-50 max-h-[80vh] overflow-y-auto transition-all duration-200 ease-in-out"
          role="menu"
          style={{
            maxHeight: "80vh", // Limit height for better visibility
            overflowY: "auto", // Enable scrolling if content exceeds max height
          }}
        >
          {/* Home Section */}
          <ul>
            <li>
              <a
                href="/page.js"
                className="flex items-center py-2 px-4 hover:bg-blue-200 dark:hover:bg-green-200 rounded text-black"
                role="menuitem"
              >
                <Image
                  src="/home.png"
                  alt="Home"
                  width={24}
                  height={24}
                  className="mr-4"
                />
                Home
              </a>
            </li>
          </ul>

          <hr className="my-2 border-t border-gray-300 mx-4" />

          {/* Explore Projects */}
          <div className="px-4">
            <p className="font-bold text-lg text-black dark:text-black">
              Explore Projects
            </p>
          </div>
          <ul className="mt-2">
            {[
              { href: "/web-development", icon: "/globe.png", label: "Web Development" },
              { href: "/machine-learning", icon: "/MacLer.png", label: "Machine Learning" },
              { href: "/iot-embedded-systems", icon: "/IoT.png", label: "IoT & Embedded Systems" },
              { href: "/robotics-automation", icon: "/Robotics.png", label: "Robotics and Automation" },
              {
                href: "/digital-signal-processing",
                icon: "/DigitalSignal.png",
                label: "Digital Signal Processing & Communications",
              },
              { href: "/software-development", icon: "/SoftwareDev.png", label: "Software Development" },
              { href: "/open-domain", icon: "/openDomain.png", label: "Open Domain" },
            ].map(({ href, icon, label }) => (
              <li key={label}>
                <a
                  href={href}
                  className="flex items-center py-2 px-4 hover:bg-blue-200 dark:hover:bg-green-200 rounded text-black"
                  role="menuitem"
                >
                  <Image
                    src={icon}
                    alt={label}
                    width={24}
                    height={24}
                    className="mr-4"
                  />
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <hr className="my-2 border-t border-gray-300 mx-4" />

          {/* "You" Section */}
          <div className="px-4">
            <p className="font-bold text-lg text-black dark:text-black">You</p>
          </div>
          <ul className="mt-2">
            {[
              { href: "/my_projects", icon: "/myProject.png", label: "My Projects" },
              { href: "/profile_setting", icon: "/Profileset.png", label: "Profile Setting" },
              { href: "/feedback", icon: "/Feedback.png", label: "Feedback" },
              { href: "/top_projects", icon: "/topRated.png", label: "Top Rated Projects" },
              { href: "/new_projects", icon: "/recentProject.png", label: "New Projects" },
            ].map(({ href, icon, label }) => (
              <li key={label}>
                <a
                  href={href}
                  className="flex items-center py-2 px-4 hover:bg-blue-200 dark:hover:bg-green-200 rounded text-black"
                  role="menuitem"
                >
                  <Image
                    src={icon}
                    alt={label}
                    width={24}
                    height={24}
                    className="mr-4"
                  />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
