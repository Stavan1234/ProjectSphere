"use client";

import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import { Button } from "@/components/ui/button";
import { FaExternalLinkAlt } from "react-icons/fa";

const LinksInput = ({ onLinksChange }) => {
  const [links, setLinks] = useState([]); // To store the list of links
  const [newLink, setNewLink] = useState(""); // To store the current input value

  // Validate URL
  const validateUrl = (url) => {
    try {
      new URL(url); // Throws an error if the URL is invalid
      return true;
    } catch (error) {
      return false;
    }
  };

  // Add a new link to the list
  const handleAddLink = () => {
    if (newLink && validateUrl(newLink)) {
      const updatedLinks = [...links, { url: newLink }];
      setLinks(updatedLinks);
      onLinksChange(updatedLinks); // Notify parent component of the updated links
      setNewLink(""); // Clear the input field
    } else {
      alert("Please enter a valid URL.");
    }
  };

  // Remove a link from the list
  const handleRemoveLink = (index) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    setLinks(updatedLinks);
    onLinksChange(updatedLinks); // Notify parent component of the updated links
  };

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-4">Project Links:</h3>
      <div className="flex space-x-2">
        <Input
          placeholder="Enter project link (e.g., GitHub, documentation)"
          value={newLink}
          onChange={(e) => setNewLink(e.target.value)}
          fullWidth
          className="shadow-lg border border-[#00A8A8] bg-[#E0F7FA] text-[#004D40] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ACC1]"
        />
        <Button
          onClick={handleAddLink}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Add Link
        </Button>
      </div>
      <div className="mt-2">
        {links.map((link, index) => (
          <div key={index} className="flex items-center justify-between space-x-2 text-blue-600 hover:text-blue-800">
            <div className="flex items-center space-x-2">
              <FaExternalLinkAlt />
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.url}
              </a>
            </div>
            <Button
              onClick={() => handleRemoveLink(index)}
              className="text-red-500 hover:text-red-700"
              variant="ghost"
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinksInput;