"use client";

import React, { useState, useEffect } from "react";

const ProjectDomain = ({ onDomainChange }) => {
  const [selectedDomain, setSelectedDomain] = useState("");

  const handleDomainChange = (event) => {
    const value = event.target.value;
    setSelectedDomain(value);
  };

  // Notify parent component of domain change
  useEffect(() => {
    onDomainChange(selectedDomain);
  }, [selectedDomain, onDomainChange]);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Project Domain:</h3>

      <div>
        <select
          value={selectedDomain}
          required
          onChange={handleDomainChange} // Use onChange here
          className="flex-grow shadow-lg border border-[#00A8A8] bg-[#E0F7FA] text-[#004D40] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00ACC1]"
        >
          <option value="">Select Domain</option>
          <option value="Web Development">Web Development</option>
          <option value="Machine Learning">Machine Learning</option>
          <option value="IOT & Embedded Systems">IOT & Embedded Systems</option>
          <option value="Robotics and Automation">Robotics and Automation</option>
          <option value="Digital Signal Processing & Communications">Digital Signal Processing & Communications</option>
          <option value="Software Development">Software Development</option>
          <option value="Open Domain">Open Domain</option>
        </select>
      </div>
    </div>
  );
};

export default ProjectDomain;
